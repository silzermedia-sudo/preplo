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
      // Strip the code from the URL so it doesn't get reused
      const url = new URL(window.location.href)
      url.searchParams.delete('code')
      router.replace(url.pathname + (url.search || ''))
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
