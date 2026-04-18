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
