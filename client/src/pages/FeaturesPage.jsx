import React from 'react'
import { RiArrowRightLine, RiApps2Line, RiFileList3Line, RiRouteLine, RiSparkling2Line } from 'react-icons/ri'
import FeatureDetail from '../components/features/FeatureDetail.jsx'
import OutputMap from '../components/features/OutputMap.jsx'
import FinalCTA from '../components/landing/FinalCTA.jsx'

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-28">
        <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" /><div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/30 blur-[110px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-7 lg:px-10"><div className="max-w-5xl"><p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300"><RiSparkling2Line aria-hidden="true" /> Product capabilities</p><h1 className="mt-7 text-balance font-display text-5xl font-bold leading-[.96] tracking-[-.05em] sm:text-7xl lg:text-[6.4rem]">Three views.<br /><span className="gradient-text">One learning loop.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Every feature is designed to move you from exposure to understanding, then from understanding to recall.</p><a href="#/workspace" className="btn-primary mt-9 min-h-14 px-7 text-base">Try the full workflow <RiArrowRightLine aria-hidden="true" /></a></div>
          <div className="mt-16 grid gap-3 sm:grid-cols-3">{[{ icon: RiApps2Line, value: '3', label: 'learning outputs' }, { icon: RiRouteLine, value: '3', label: 'depth levels' }, { icon: RiFileList3Line, value: '4', label: 'file formats' }].map(({ icon: Icon, value, label }) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><Icon className="text-xl text-cyan-300" aria-hidden="true" /><p className="mt-8 font-display text-4xl font-bold">{value}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{label}</p></div>)}</div>
        </div>
      </section>
      <OutputMap />
      <FeatureDetail type="explanation" />
      <FeatureDetail type="summary" reverse />
      <FeatureDetail type="quiz" />
      <FinalCTA />
    </>
  )
}
