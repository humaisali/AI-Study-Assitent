import React from 'react'
import { RiArrowLeftLine, RiRestartLine, RiSparkling2Line } from 'react-icons/ri'

export default function WorkspaceTopbar({ activeFile, loading, onReset }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl">
      <a href="#workspace-main" className="skip-link">Skip to workspace</a>
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <a href="#/" className="group flex min-h-11 shrink-0 items-center gap-2.5" aria-label="StudyAI home">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-slate-950 text-white shadow-md">
              <span className="absolute inset-0 bg-gradient-to-br from-brand-500 via-violet-500 to-orange-500 opacity-90 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <RiSparkling2Line className="relative" aria-hidden="true" />
            </span>
            <span className="hidden font-display text-lg font-bold tracking-[-0.035em] text-slate-950 sm:block">StudyAI</span>
          </a>

          <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-bold text-slate-900">Study workspace</p>
              <span className="hidden rounded-md bg-brand-50 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-brand-700 sm:inline">AI</span>
            </div>
            <p className="hidden truncate text-[0.65rem] text-slate-400 md:block">{activeFile ? activeFile.name : 'A focused place to understand and practise'}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="mr-1 hidden min-h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 text-[0.68rem] font-semibold text-slate-600 md:flex" role="status">
            <span className={`h-2 w-2 rounded-full ${loading ? 'animate-pulse bg-orange-500' : 'bg-emerald-500'}`} aria-hidden="true" />
            {loading ? 'Building study set' : 'AI ready'}
          </div>
          {activeFile && !loading && (
            <button type="button" onClick={onReset} className="workspace-topbar-action">
              <RiRestartLine aria-hidden="true" /><span className="hidden sm:inline">New document</span><span className="sr-only sm:hidden">Start a new document</span>
            </button>
          )}
          <a href="#/" className="workspace-topbar-action" aria-label="Back to website">
            <RiArrowLeftLine aria-hidden="true" /><span className="hidden sm:inline">Website</span>
          </a>
        </div>
      </div>
    </header>
  )
}
