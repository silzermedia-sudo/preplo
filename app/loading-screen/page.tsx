import { Suspense } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

export default function LoadingScreenPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface flex items-center justify-center">
          <span className="text-on-surface-variant text-sm">Laden…</span>
        </div>
      }
    >
      <LoadingScreen />
    </Suspense>
  )
}
