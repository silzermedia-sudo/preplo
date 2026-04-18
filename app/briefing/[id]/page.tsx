import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import BriefingCard from '@/components/BriefingCard'
import type { Briefing } from '@/types'

export default async function BriefingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('briefings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const briefing = data as Briefing

  if (!briefing.output) notFound()

  return <BriefingCard companyName={briefing.company_name} output={briefing.output} />
}
