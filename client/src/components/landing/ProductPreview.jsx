import React from 'react'
import { RiBookOpenLine, RiBrainLine, RiCheckboxCircleLine, RiFileTextLine, RiListCheck2, RiSparkling2Line } from 'react-icons/ri'

export default function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-2xl" aria-label="Preview of the StudyAI learning workspace">
      <div className="absolute -left-8 top-16 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-10 bottom-10 h-44 w-44 rounded-full bg-orange-400/25 blur-3xl" aria-hidden="true" />

      <div className="relative rotate-[1.5deg] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/90 p-2 shadow-[0_35px_100px_rgba(2,6,23,.55)] backdrop-blur-xl transition-transform duration-500 hover:rotate-0">
        <div className="rounded-[1.55rem] border border-white/10 bg-slate-950 p-3 sm:p-4">
          <div className="flex items-center justify-between border-b border-white/10 px-1 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white"><RiSparkling2Line aria-hidden="true" /></span>
              <div><p className="text-[0.68rem] font-bold text-white">Biology — Chapter 06</p><p className="text-[0.55rem] text-slate-500">Intermediate depth</p></div>
            </div>
            <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-wider text-cyan-300">Ready</span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[.9fr_1.35fr]">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-wider text-slate-400"><RiFileTextLine className="text-cyan-300" aria-hidden="true" /> Source</div>
                <p className="mt-3 text-xs font-semibold text-white">Cellular respiration</p>
                <div className="mt-3 space-y-1.5"><span className="block h-1.5 w-full rounded-full bg-white/10" /><span className="block h-1.5 w-4/5 rounded-full bg-white/10" /><span className="block h-1.5 w-2/3 rounded-full bg-white/10" /></div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 p-4 text-white">
                <RiListCheck2 className="text-xl" aria-hidden="true" />
                <p className="mt-7 text-[0.62rem] font-bold uppercase tracking-wider text-white/70">Smart summary</p>
                <p className="mt-1 text-sm font-bold leading-snug">6 key ideas extracted</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 text-slate-900">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500"><RiBookOpenLine className="text-brand-600" aria-hidden="true" /> Explanation</span><span className="font-mono text-[0.55rem] text-slate-400">01 / 03</span></div>
              <h3 className="mt-4 font-display text-lg font-bold leading-tight">Energy, explained without the textbook fog.</h3>
              <p className="mt-2 text-[0.68rem] leading-5 text-slate-500">Cells convert glucose into usable ATP through a sequence of connected stages.</p>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {['Glycolysis', 'Krebs cycle', 'ETC'].map((item, index) => <span key={item} className={`rounded-lg px-2 py-2 text-center text-[0.5rem] font-bold ${index === 1 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{item}</span>)}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-[0.6rem] font-bold text-slate-700"><RiBrainLine className="text-violet-600" aria-hidden="true" /> Quick check</div>
                <p className="mt-2 text-[0.65rem] font-semibold leading-4">Where does glycolysis happen?</p>
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-1.5 text-[0.55rem] font-bold text-cyan-800"><RiCheckboxCircleLine aria-hidden="true" /> Cytoplasm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-2 hidden -rotate-3 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600"><RiBrainLine aria-hidden="true" /></span>
        <div><p className="text-xs font-bold text-slate-900">Active recall</p><p className="text-[0.6rem] text-slate-500">Built into every set</p></div>
      </div>
    </div>
  )
}
