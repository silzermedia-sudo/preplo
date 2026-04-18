'use client'

import Link from 'next/link'

interface NavbarProps {
  variant?: 'landing' | 'app'
  activeNav?: 'dashboard' | 'briefings' | 'insights'
  onPdfExport?: () => void
  onShare?: () => void
}

export default function Navbar({ variant = 'landing', activeNav = 'briefings', onPdfExport, onShare }: NavbarProps) {
  if (variant === 'app') {
    return (
      <nav className="bg-[#faf9fc]/70 backdrop-blur-xl sticky top-0 shadow-[0_10px_40px_0_rgba(26,28,30,0.04)] z-50">
        <div className="flex justify-between items-center h-20 px-12 w-full max-w-[1440px] mx-auto bg-[#f4f3f7] transition-colors duration-300">
          <Link href="/" className="text-2xl font-bold tracking-[-0.02em] text-[#022448]">Preplo</Link>
          <div className="hidden md:flex space-x-8">
            {(['dashboard', 'briefings', 'insights'] as const).map((nav) => (
              <Link
                key={nav}
                href={nav === 'dashboard' ? '/dashboard' : '#'}
                className={`font-medium transition-all rounded-md px-3 py-2 capitalize ${
                  activeNav === nav
                    ? 'text-[#022448] font-semibold border-b-2 border-[#022448]'
                    : 'text-[#1a1c1e]/60 hover:text-[#022448] hover:bg-[#f4f3f7]'
                }`}
              >
                {nav.charAt(0).toUpperCase() + nav.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4 text-[#022448]">
            {onPdfExport && (
              <button onClick={onPdfExport} aria-label="Als PDF exportieren" className="hover:bg-[#f4f3f7] rounded-md transition-all p-2">
                <span className="material-symbols-outlined">picture_as_pdf</span>
              </button>
            )}
            {onShare && (
              <button onClick={onShare} aria-label="Teilen" className="hover:bg-[#f4f3f7] rounded-md transition-all p-2">
                <span className="material-symbols-outlined">share</span>
              </button>
            )}
            <Link href="/settings" aria-label="Einstellungen" className="hover:bg-[#f4f3f7] rounded-md transition-all p-2 block">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center ml-2">
              <span className="material-symbols-outlined text-[16px] text-on-secondary-container">person</span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-surface/70 backdrop-blur-md sticky top-0 z-50 w-full transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">Preplo</Link>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#">Leistungen</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#">Methodik</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#">Über uns</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#">Kontakt</a>
        </div>
        <Link href="/login">
          <button className="bg-transparent border border-outline-variant/30 text-primary px-6 py-2 rounded-md font-medium text-sm hover:bg-surface-container-low transition-colors active:scale-95">
            Anmelden
          </button>
        </Link>
      </div>
    </nav>
  )
}
