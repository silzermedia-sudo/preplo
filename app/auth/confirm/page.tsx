'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function ConfirmInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) { router.replace('/'); return }

    supabase.auth.exchangeCodeForSession(code).then(() => {
      router.replace('/')
    }).catch(() => {
      router.replace('/login')
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <p className="text-on-surface-variant text-sm">Anmeldung wird verarbeitet…</p>
    </div>
  )
}

import { Suspense } from 'react'

export default function AuthConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-on-surface-variant text-sm">Anmeldung wird verarbeitet…</p>
      </div>
    }>
      <ConfirmInner />
    </Suspense>
  )
}
