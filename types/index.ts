export interface BriefingOutput {
  gesprachseinstiege: string[]
  wachstumssignale: { label: string; text: string }[]
  firmenprofil: {
    branche: string | null
    mitarbeiter: string | null
    standorte: string | null
    gegruendet: string | null
  }
  aktuelle_news: { datum: string; text: string }[]
}

export interface Briefing {
  id: string
  user_id: string
  company_name: string
  company_url: string | null
  output: BriefingOutput | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  plan: 'free' | 'pro' | 'team'
  stripe_customer_id: string | null
  created_at: string
}
