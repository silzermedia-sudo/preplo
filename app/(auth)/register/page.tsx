'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm p-10">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary block mb-8">Preplo</Link>
        <h1 className="text-[24px] font-bold text-on-surface mb-2">Konto erstellen</h1>
        <p className="text-sm text-on-surface-variant mb-8">3 Briefings/Monat kostenlos.</p>

        {success ? (
          <div className="bg-secondary-container text-on-secondary-container rounded-lg p-4 text-sm">
            Bestätigungs-Email gesendet! Prüfe dein Postfach.
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-error-container text-on-error-container rounded-lg p-3 text-sm">{error}</div>
            )}
            <div>
              <label className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-3 text-[15px] text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="deine@email.de"
              />
            </div>
            <div>
              <label className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold block mb-1">
                Passwort
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-3 text-[15px] text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Mindestens 8 Zeichen"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Lädt…' : 'Registrieren'}
            </button>
          </form>
        )}

        <div className="mt-4">
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            <span className="relative bg-surface-container-lowest px-3 text-xs text-on-surface-variant">oder</span>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-outline-variant/30 text-on-surface py-3 rounded-lg font-medium text-sm hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.167 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Mit Google registrieren
          </button>
        </div>

        <p className="text-sm text-on-surface-variant mt-6 text-center">
          Bereits registriert?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Anmelden
          </Link>
        </p>
      </div>
    </div>
  )
}
