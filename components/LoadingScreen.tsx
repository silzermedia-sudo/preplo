'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type StepStatus = 'done' | 'active' | 'pending'

interface Step {
  label: string
  activeLabel: string
  status: StepStatus
}

const STEPS: Step[] = [
  { label: 'Website analysiert', activeLabel: 'Website wird analysiert...', status: 'pending' },
  { label: 'News der letzten 30 Tage gefunden', activeLabel: 'News werden gesucht...', status: 'pending' },
  { label: 'Wachstumssignale werden ausgewertet...', activeLabel: 'Wachstumssignale werden ausgewertet...', status: 'pending' },
  { label: 'Gesprächseinstiege werden generiert', activeLabel: 'Gesprächseinstiege werden generiert...', status: 'pending' },
]

export default function LoadingScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const company = searchParams.get('company') || ''
  const url = searchParams.get('url') || ''

  const [steps, setSteps] = useState<Step[]>(STEPS)
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!company) { router.push('/'); return }
    if (started.current) return
    started.current = true
    runBriefing()
  }, [company])

  const setStepState = (activeIndex: number) => {
    setSteps(prev =>
      prev.map((s, i) => ({
        ...s,
        status: i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending',
      }))
    )
    setProgress(Math.round((activeIndex / STEPS.length) * 100))
  }

  const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

  const runBriefing = async () => {
    try {
      setStepState(0)
      await delay(900)
      setStepState(1)
      await delay(1100)
      setStepState(2)

      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, url }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.error === 'UPGRADE_REQUIRED') { router.push('/?upgrade=true'); return }
        if (data.error === 'UNAUTHENTICATED') { router.push('/login'); return }
        throw new Error(data.error || 'Fehler beim Erstellen des Briefings')
      }

      setStepState(3)
      await delay(700)

      const data = await res.json()

      setSteps(prev => prev.map(s => ({ ...s, status: 'done' })))
      setProgress(100)
      await delay(400)

      router.push(`/briefing/${data.id}`)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unbekannter Fehler')
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Ambient Deko */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 p-12 md:p-16 flex flex-col items-center text-center relative z-10">
        {/* Header */}
        <div className="mb-10 w-full">
          <h2 className="font-headline text-[28px] font-bold tracking-tight text-on-surface mb-3">{company}</h2>
          <p className="font-body text-base text-on-surface-variant max-w-[60ch] mx-auto leading-relaxed">
            {errorMsg ?? 'Briefing wird erstellt...'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-12">
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="w-full max-w-md text-left flex flex-col gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-4 ${step.status === 'pending' ? 'opacity-50' : ''}`}>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'done'
                    ? 'bg-secondary-container'
                    : step.status === 'active'
                    ? 'bg-primary-container'
                    : 'border-2 border-outline-variant'
                }`}
              >
                {step.status === 'done' && (
                  <span
                    className="material-symbols-outlined text-[18px] text-on-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                )}
                {step.status === 'active' && (
                  <span className="material-symbols-outlined text-[18px] text-on-primary-container spin">
                    sync
                  </span>
                )}
              </div>
              <span
                className={`font-body text-[16px] leading-tight ${
                  step.status === 'active' ? 'font-medium text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                {step.status === 'active' ? step.activeLabel : step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="font-label text-[12px] uppercase tracking-[0.05em] text-outline mt-4">
          Dauert meist unter 60 Sekunden
        </p>
      </div>
    </main>
  )
}
