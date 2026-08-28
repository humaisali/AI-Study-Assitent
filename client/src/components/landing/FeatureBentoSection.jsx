import React from 'react'
import { RiBookOpenLine, RiBrainLine, RiFileList3Line, RiFocus3Line, RiRouteLine, RiTimerFlashLine } from 'react-icons/ri'

export default function FeatureBentoSection() {
  return (
    <section className="overflow-hidden bg-slate-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-7 lg:px-10">
        <div className="max-w-3xl"><p className="eyebrow">One source. Multiple ways to learn.</p><h2 className="section-title mt-4">A complete study system, not another chatbot window.</h2></div>

        <div className="mt-14 grid auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-12">
          <article className="bento-card relative overflow-hidden bg-brand-600 text-white lg:col-span-7 lg:row-span-2">
            <div className="max-w-md"><span className="bento-icon bg-white/15"><RiBookOpenLine aria-hidden="true" /></span><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-100">Structured explanations</p><h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Learn the concept, not just the definition.</h3><p className="mt-4 text-sm leading-7 text-brand-100">Long-form explanations turn dense source material into a readable sequence of ideas.</p></div>
            <div className="mt-8 rounded-2xl border border-white/15 bg-slate-950/25 p-4 backdrop-blur-sm"><div className="h-2 w-2/3 rounded-full bg-white/50" /><div className="mt-3 h-2 w-full rounded-full bg-white/15" /><div className="mt-2 h-2 w-5/6 rounded-full bg-white/15" /><div className="mt-5 grid grid-cols-3 gap-2">{['Context', 'Process', 'Meaning'].map((item) => <span key={item} className="rounded-lg bg-white/10 p-2 text-center text-[0.6rem] font-bold">{item}</span>)}</div></div>
          </article>

          <article className="bento-card bg-white lg:col-span-5"><span className="bento-icon bg-orange-100 text-orange-600"><RiFileList3Line aria-hidden="true" /></span><h3 className="mt-6 font-display text-2xl font-bold text-slate-950">Summary without the fluff</h3><p className="mt-3 text-sm leading-7 text-slate-600">Pull the core ideas into a fast review for the moments before class or an exam.</p></article>

          <article className="bento-card bg-slate-950 text-white lg:col-span-5"><div className="flex items-start justify-between"><span className="bento-icon bg-cyan-300 text-slate-950"><RiBrainLine aria-hidden="true" /></span><span className="font-mono text-xs text-cyan-300">ACTIVE RECALL</span></div><h3 className="mt-6 font-display text-2xl font-bold">Questions built from your notes.</h3><div className="mt-5 space-y-2">{['A', 'B', 'C'].map((item, index) => <div key={item} className={`flex items-center gap-3 rounded-xl border p-2.5 text-xs ${index === 1 ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200' : 'border-white/10 text-slate-500'}`}><span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 font-mono">{item}</span> Practice option</div>)}</div></article>

          <article className="bento-card bg-white md:col-span-2 lg:col-span-4"><span className="bento-icon bg-violet-100 text-violet-600"><RiRouteLine aria-hidden="true" /></span><h3 className="mt-6 font-display text-2xl font-bold">Three levels of depth</h3><div className="mt-5 grid grid-cols-3 gap-2">{['Essential', 'Balanced', 'In depth'].map((item, index) => <span key={item} className={`rounded-xl border px-2 py-3 text-center text-[0.6rem] font-bold ${index === 1 ? 'border-violet-400 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-500'}`}>{item}</span>)}</div></article>

          <article className="bento-card bg-orange-500 text-white lg:col-span-4"><span className="bento-icon bg-white/20"><RiTimerFlashLine aria-hidden="true" /></span><p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-orange-100">Less setup</p><h3 className="mt-2 font-display text-3xl font-bold">More time actually studying.</h3></article>

          <article className="bento-card bg-cyan-300 text-slate-950 lg:col-span-4"><span className="bento-icon bg-slate-950 text-cyan-300"><RiFocus3Line aria-hidden="true" /></span><p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-cyan-900">Focused by design</p><h3 className="mt-2 font-display text-3xl font-bold">One material. One clear workspace.</h3></article>
        </div>
      </div>
    </section>
  )
}
