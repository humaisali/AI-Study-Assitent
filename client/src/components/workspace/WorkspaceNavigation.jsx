import React from 'react'
import { RiAddLine, RiBookOpenLine, RiBrainLine, RiCheckboxCircleFill, RiInformationLine } from 'react-icons/ri'

const VIEWS = [
  { id: 'create', label: 'New study set', mobileLabel: 'Create', detail: 'Upload material', icon: RiAddLine },
  { id: 'guide', label: 'Study guide', mobileLabel: 'Guide', detail: 'Explain + summarize', icon: RiBookOpenLine },
  { id: 'quiz', label: 'Practice quiz', mobileLabel: 'Quiz', detail: 'Test your recall', icon: RiBrainLine },
]

export default function WorkspaceNavigation({ activeView, hasResult, loading, onChange, onReset }) {
  const selectView = (viewId) => viewId === 'create' ? onReset() : onChange(viewId)

  return (
    <aside className="border-b border-slate-800 bg-slate-950 text-white lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:border-slate-800">
      <div className="px-3 py-3 lg:sticky lg:top-16 lg:px-4 lg:py-6">
        <div className="hidden px-3 lg:block">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate-500">Your workflow</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Move from source material to understanding, then recall.</p>
        </div>
        <nav className="grid grid-cols-3 gap-2 lg:mt-5 lg:grid-cols-1" aria-label="Workspace views">
          {VIEWS.map(({ id, label, mobileLabel, detail, icon: Icon }, index) => {
            const disabled = id !== 'create' && (!hasResult || loading)
            const active = activeView === id
            const complete = hasResult && id !== 'create'
            return (
              <button key={id} type="button" disabled={disabled} onClick={() => selectView(id)} aria-current={active ? 'page' : undefined} className={`group flex min-h-[4.25rem] items-center gap-3 rounded-xl border p-2.5 text-left transition-all duration-200 lg:min-h-[4.75rem] lg:p-3 ${active ? 'border-white/15 bg-white/[0.09] text-white shadow-[0_12px_28px_rgba(0,0,0,.18)]' : disabled ? 'cursor-not-allowed border-transparent text-slate-600' : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.05] hover:text-white'}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 lg:h-10 lg:w-10 ${active ? 'bg-brand-500 text-white' : 'bg-white/[0.06] text-slate-400 group-hover:text-white'}`}><Icon aria-hidden="true" /></span>
                <span className="min-w-0"><span className="block text-[0.68rem] font-bold sm:hidden">{mobileLabel}</span><span className="hidden truncate text-xs font-bold sm:block">{label}</span><span className="mt-0.5 hidden truncate text-[0.6rem] text-slate-500 sm:block">{detail}</span></span>
                <span className="ml-auto hidden lg:block">{complete ? <RiCheckboxCircleFill className="text-emerald-400" aria-label="Ready" /> : <span className="font-mono text-[0.58rem] text-slate-600">0{index + 1}</span>}</span>
              </button>
            )
          })}
        </nav>
        <div className="mt-7 hidden rounded-xl border border-white/10 bg-white/[0.035] p-4 lg:block">
          <RiInformationLine className="text-lg text-cyan-300" aria-hidden="true" /><p className="mt-3 text-xs font-bold text-slate-200">Built for focus</p><p className="mt-1.5 text-[0.68rem] leading-5 text-slate-500">Your study tools stay together while the marketing site stays out of the way.</p>
        </div>
      </div>
    </aside>
  )
}
