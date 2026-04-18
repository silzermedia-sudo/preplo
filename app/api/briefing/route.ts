import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { anthropic, SYSTEM_PROMPT } from '@/lib/anthropic'
import type { BriefingOutput } from '@/types'

export async function POST(request: NextRequest) {
  const { company, url } = await request.json()

  if (!company?.trim()) {
    return NextResponse.json({ error: 'Firmenname fehlt' }, { status: 400 })
  }

  // Auth via Supabase cookie
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Cookie: request.headers.get('cookie') ?? '' },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHENTICATED' }, { status: 401 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Freemium-Check
  const thisMonth = new Date().toISOString().slice(0, 7)

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  if (profile?.plan === 'free') {
    const { data: usage } = await supabaseAdmin
      .from('usage')
      .select('count')
      .eq('user_id', user.id)
      .eq('month', thisMonth)
      .single()

    if ((usage?.count ?? 0) >= 3) {
      return NextResponse.json({ error: 'UPGRADE_REQUIRED' }, { status: 402 })
    }
  }

  // Anthropic API mit Web-Search
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 2000,
    tools: [{ type: 'web_search_20250305' as const, name: 'web_search' }],
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Erstelle ein Briefing für: ${company}${url ? ` (Website: ${url})` : ''}`,
      },
    ],
  })

  // JSON aus der Antwort extrahieren
  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    return NextResponse.json({ error: 'Keine Antwort von KI' }, { status: 500 })
  }

  let output: BriefingOutput
  try {
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/)
    output = JSON.parse(jsonMatch?.[0] ?? textBlock.text)
  } catch {
    return NextResponse.json({ error: 'Ungültiges JSON von KI' }, { status: 500 })
  }

  // Briefing in Supabase speichern
  const { data: briefing, error: insertError } = await supabaseAdmin
    .from('briefings')
    .insert({
      user_id: user.id,
      company_name: company.trim(),
      company_url: url?.trim() || null,
      output,
    })
    .select('id')
    .single()

  if (insertError) {
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 })
  }

  // Usage-Zähler erhöhen
  const { data: currentUsage } = await supabaseAdmin
    .from('usage')
    .select('count')
    .eq('user_id', user.id)
    .eq('month', thisMonth)
    .single()

  await supabaseAdmin.from('usage').upsert({
    user_id: user.id,
    month: thisMonth,
    count: (currentUsage?.count ?? 0) + 1,
  })

  return NextResponse.json({ id: briefing.id })
}
