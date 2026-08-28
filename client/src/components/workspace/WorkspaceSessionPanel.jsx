import React from 'react'
import { RiBookOpenLine, RiBrainLine, RiCheckboxCircleFill, RiFileTextLine, RiListCheck2, RiLoader4Line } from 'react-icons/ri'

const OUTPUTS = [
  { label: 'Full study guide', icon: RiBookOpenLine },
  { label: 'Quick summary', icon: RiListCheck2 },
  { label: 'Practice quiz', icon: RiBrainLine },
]

export default function WorkspaceSessionPanel({ activeFile, hasResult, loading, error }) {
  const status = error ? 'Needs attention' : loading ? 'Generating' : hasResult ? 'Ready to study' : 'Waiting for material'

  return (
    <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start" aria-label="Current study session">
      <section className="workspace-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div><p className="workspace-kicker">Current session</p><h2 className="mt-1.5 font-display text-lg font-bold text-slate-950">{status}</h2></div>
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${error ? 'bg-red-50 text-red-600' : loading ? 'bg-orange-50 text-orange-600' : hasResult ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{loading ? <RiLoader4Line className="animate-spin" aria-hidden="true" /> : hasResult ? <RiCheckboxCircleFill aria-hidden="true" /> : <RiFileTextLine aria-hidden="true" />}</span>
        </div>
        {activeFile ? (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5"><p className="truncate text-xs font-bold text-slate-800">{activeFile.name}</p><div className="mt-2 flex items-center justify-between text-[0.63rem] font-semibold text-slate-500"><span className="capitalize">{activeFile.difficulty} depth</span><span>{loading ? 'In progress' : hasResult ? 'Complete' : 'Selected'}</span></div></div>
        ) : <p className="mt-4 text-xs leading-5 text-slate-500">Choose one document to create a complete, source-based study session.</p>}
        <div className="mt-5 space-y-2">
          {OUTPUTS.map(({ label, icon: Icon }) => (
            <div key={label} className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-100 px-3"><Icon className="text-slate-400" aria-hidden="true" /><span className="text-[0.68rem] font-semibold text-slate-600">{label}</span><span className="ml-auto">{loading ? <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" aria-label="Generating" /> : hasResult ? <RiCheckboxCircleFill className="text-emerald-500" aria-label="Ready" /> : <span className="text-[0.56rem] font-semibold uppercase tracking-wide text-slate-300">Pending</span>}</span></div>
          ))}
        </div>
      </section>
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 p-5 text-white shadow-[0_16px_44px_rgba(15,23,42,.18)]">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-cyan-300">Study rhythm</p><p className="mt-2 font-display text-lg font-bold">Understand → compress → recall.</p><p className="mt-2 text-[0.7rem] leading-5 text-slate-400">Review the guide first, scan the summary, then take the quiz without looking back.</p>
      </section>
    </aside>
  )
}
