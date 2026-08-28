import React from 'react'
import { RiBookOpenLine, RiBrainLine, RiCheckboxCircleLine, RiFileList3Line, RiSparklingLine } from 'react-icons/ri'

export default function FeatureVisual({ type }) {
  if (type === 'summary') {
    return (
      <div className="rounded-[2rem] bg-slate-950 p-4 text-white shadow-2xl sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300"><RiFileList3Line aria-hidden="true" /> Quick summary</span><span className="font-mono text-[0.65rem] text-slate-500">06 IDEAS</span></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {['Core definition', 'Main process', 'Critical detail', 'Common mistake', 'Key relationship', 'Review prompt'].map((item, index) => (
            <div key={item} className={`rounded-2xl border p-4 ${index === 2 ? 'border-orange-400/40 bg-orange-400/10' : 'border-white/10 bg-white/[0.04]'}`}>
              <span className={`font-mono text-[0.6rem] font-bold ${index === 2 ? 'text-orange-300' : 'text-slate-500'}`}>0{index + 1}</span><p className="mt-4 text-sm font-bold">{item}</p><span className="mt-3 block h-1.5 w-4/5 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'quiz') {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
        <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"><RiBrainLine className="text-xl" aria-hidden="true" /></span><span className="rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[0.65rem] font-bold text-slate-500">03 / 08</span></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Question 03</p><h3 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-950">Which stage produces the largest amount of ATP?</h3>
        <div className="mt-6 space-y-2.5">{['Glycolysis', 'Electron transport chain', 'Krebs cycle', 'Fermentation'].map((answer, index) => <div key={answer} className={`flex items-center gap-3 rounded-xl border p-3 text-sm font-semibold ${index === 1 ? 'border-cyan-300 bg-cyan-50 text-cyan-900' : 'border-slate-200 text-slate-500'}`}><span className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs ${index === 1 ? 'bg-cyan-500 text-white' : 'bg-slate-100'}`}>{String.fromCharCode(65 + index)}</span>{answer}{index === 1 && <RiCheckboxCircleLine className="ml-auto text-xl text-cyan-600" aria-hidden="true" />}</div>)}</div>
      </div>
    )
  }

  return (
    <div className="rounded-[2rem] border border-brand-200 bg-brand-50 p-4 shadow-2xl sm:p-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600"><RiBookOpenLine aria-hidden="true" /> Structured explanation</div><h3 className="mt-5 font-display text-2xl font-bold text-slate-950">How the ideas connect</h3><p className="mt-3 text-sm leading-7 text-slate-600">Instead of isolated definitions, the guide explains what happens, why it happens, and how each step leads to the next.</p><div className="mt-5 rounded-xl border-l-4 border-orange-400 bg-orange-50 p-4"><div className="flex items-center gap-2 text-xs font-bold text-orange-800"><RiSparklingLine aria-hidden="true" /> Key connection</div><p className="mt-2 text-xs leading-5 text-orange-900">The output of one stage becomes the input for another.</p></div></div>
      <div className="mt-3 grid grid-cols-3 gap-2">{['What', 'Why', 'How'].map((item, index) => <span key={item} className={`rounded-xl px-3 py-3 text-center text-xs font-bold ${index === 1 ? 'bg-brand-600 text-white' : 'bg-white text-slate-500'}`}>{item}</span>)}</div>
    </div>
  )
}
