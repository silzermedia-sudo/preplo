import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Cookie: request.headers.get('cookie') ?? '' } } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'UNAUTHENTICATED' }, { status: 401 })

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ data: profile }, { data: briefings }, { data: usage }] = await Promise.all([
    supabaseAdmin.from('profiles').select('*').eq('id', user.id).single(),
    supabaseAdmin.from('briefings').select('*').eq('user_id', user.id),
    supabaseAdmin.from('usage').select('*').eq('user_id', user.id),
  ])

  const exportData = {
    exportedAt: new Date().toISOString(),
    profile,
    briefings: briefings ?? [],
    usage: usage ?? [],
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="preplo-daten-export.json"',
    },
  })
}
