import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // Pass code to client-side page so the browser supabase client
    // can exchange it and store the session in localStorage
    return NextResponse.redirect(`${origin}/auth/confirm?code=${code}`)
  }

  return NextResponse.redirect(`${origin}/`)
}
