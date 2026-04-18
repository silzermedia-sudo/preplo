import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'

export async function DELETE(request: NextRequest) {
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

  // Stripe Customer löschen
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (profile?.stripe_customer_id) {
    await stripe.customers.del(profile.stripe_customer_id)
  }

  // Daten löschen (Cascading Delete übernimmt briefings + usage)
  await supabaseAdmin.from('profiles').delete().eq('id', user.id)
  await supabaseAdmin.auth.admin.deleteUser(user.id)

  return NextResponse.json({ success: true })
}
