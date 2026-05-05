'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function OAuthHandlerInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) return

    supabase.auth.exchangeCodeForSession(code).then(() => {
      router.replace('/briefings')
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default function OAuthHandler() {
  return (
    <Suspense fallback={null}>
      <OAuthHandlerInner />
    </Suspense>
  )
}
