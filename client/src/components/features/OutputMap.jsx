import React from 'react'
import { RiArrowRightLine, RiBookOpenLine, RiBrainLine, RiFileList3Line, RiFileTextLine } from 'react-icons/ri'

export default function OutputMap() {
  const outputs = [{ icon: RiBookOpenLine, label: 'Explanation', tone: 'bg-brand-100 text-brand-700' }, { icon: RiFileList3Line, label: 'Summary', tone: 'bg-orange-100 text-orange-700' }, { icon: RiBrainLine, label: 'Quiz', tone: 'bg-cyan-100 text-cyan-800' }]
  return (
    <section className="bg-slate-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-7 lg:px-10"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">The StudyAI transformation</p><h2 className="section-title mt-4">One upload becomes an entire study session.</h2></div>
        <div className="mt-14 grid items-center gap-5 lg:grid-cols-[.8fr_auto_1.2fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white"><RiFileTextLine className="text-xl" aria-hidden="true" /></span><p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Your input</p><h3 className="mt-2 font-display text-2xl font-bold text-slate-950">One source document</h3><p className="mt-3 text-sm leading-7 text-slate-600">The notes, slides, chapter, or Markdown file you already have.</p></div>
          <span className="mx-auto flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl lg:rotate-0"><RiArrowRightLine aria-hidden="true" /></span>
          <div className="grid gap-3 sm:grid-cols-3">{outputs.map(({ icon: Icon, label, tone }) => <div key={label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}><Icon className="text-xl" aria-hidden="true" /></span><p className="mt-9 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Output</p><h3 className="mt-2 font-display text-xl font-bold text-slate-950">{label}</h3></div>)}</div>
        </div>
      </div>
    </section>
  )
}
