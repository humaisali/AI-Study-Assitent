import React, { useState } from 'react'
import { RiArrowRightUpLine, RiCloseLine, RiGithubLine, RiMenu3Line, RiSparkling2Line } from 'react-icons/ri'

const NAV_ITEMS = [
  { href: '#/', path: '/', label: 'Home' },
  { href: '#/features', path: '/features', label: 'Features' },
  { href: '#/workspace', path: '/workspace', label: 'Workspace' },
]

export default function AppHeader({ currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a href="#/" onClick={() => setMenuOpen(false)} className="group flex min-h-11 items-center gap-3" aria-label="StudyAI home">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-white shadow-[0_8px_24px_rgba(10,15,31,.2)]">
              <span className="absolute inset-0 bg-gradient-to-br from-brand-500 via-violet-500 to-orange-500 opacity-90 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
              <RiSparkling2Line className="relative text-xl" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold leading-none tracking-[-0.03em] text-slate-950">StudyAI</span>
              <span className="mt-1 hidden text-[0.58rem] font-bold uppercase tracking-[0.24em] text-slate-400 sm:block">Learning engine</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-1 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.path} href={item.href} aria-current={currentPath === item.path ? 'page' : undefined} className={`min-h-10 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${currentPath === item.path ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/70 hover:text-slate-900'}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com/humaisali" target="_blank" rel="noopener noreferrer" className="hidden h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950 sm:flex" aria-label="Open Humais Ali on GitHub">
              <RiGithubLine className="text-xl" aria-hidden="true" />
            </a>
            <a href="#/workspace" className="btn-primary hidden sm:inline-flex">Start learning <RiArrowRightUpLine aria-hidden="true" /></a>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
              {menuOpen ? <RiCloseLine className="text-xl" aria-hidden="true" /> : <RiMenu3Line className="text-xl" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-[90rem] flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a key={item.path} href={item.href} onClick={() => setMenuOpen(false)} aria-current={currentPath === item.path ? 'page' : undefined} className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold ${currentPath === item.path ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  {item.label} <RiArrowRightUpLine aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
