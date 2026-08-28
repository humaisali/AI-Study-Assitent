import React from 'react'
import { RiArrowRightLine, RiSparkling2Line } from 'react-icons/ri'

export default function FinalCTA() {
  return (
    <section className="bg-white px-4 pb-20 sm:px-7 sm:pb-28 lg:px-10">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white sm:rounded-[2.5rem] sm:px-10 sm:py-20">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-orange-500"><RiSparkling2Line className="text-2xl" aria-hidden="true" /></span><p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Your next study session starts here</p><h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-[-0.04em] sm:text-6xl">Stop collecting notes. Start building understanding.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">Bring one document and leave with a complete learning loop.</p><a href="#/workspace" className="btn-primary mt-8 min-h-14 px-7 text-base">Open StudyAI workspace <RiArrowRightLine aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}
