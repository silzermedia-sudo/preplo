'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicSent, setMagicSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/')
  }

  const handleMagicLink = async () => {
    if (!email) { setError('Bitte Email eingeben.'); return }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) { setError(error.message); setLoading(false); return }
    setMagicSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant/15 shadow-sm p-10">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary block mb-8">Preplo</Link>
        <h1 className="text-[24px] font-bold text-on-surface mb-2">Anmelden</h1>
        <p className="text-sm text-on-surface-variant mb-8">Willkommen zurück.</p>

        {magicSent ? (
          <div className="bg-secondary-container text-on-secondary-container rounded-lg p-4 text-sm">
            Magic Link gesendet! Prüfe deine Email.
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-3 text-[15px] text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Lädt…' : 'Anmelden'}
            </button>
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full border border-outline-variant/30 text-on-surface py-3 rounded-lg font-medium text-sm hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              Magic Link senden
            </button>
          </form>
        )}

        <p className="text-sm text-on-surface-variant mt-6 text-center">
          Noch kein Konto?{' '}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}
