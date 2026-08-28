import React from 'react'
import { RiArrowRightLine, RiArrowRightUpLine, RiFlashlightLine, RiPlayCircleLine, RiShieldCheckLine } from 'react-icons/ri'
import ProductPreview from './ProductPreview.jsx'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-brand-600/30 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-violet-600/25 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[90rem] items-center gap-14 px-5 py-16 sm:px-7 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-20 xl:gap-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
            <RiFlashlightLine aria-hidden="true" /> Your AI-powered learning engine
          </div>
          <h1 className="mt-7 text-balance font-display text-5xl font-bold leading-[0.94] tracking-[-0.05em] sm:text-7xl lg:text-[5.2rem] xl:text-[6.3rem]">
            Your notes,<br /><span className="gradient-text">rebuilt for</span><br />your brain.
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Upload what you are studying. StudyAI turns it into a clear explanation, a compressed review, and a quiz that makes the knowledge stick.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#/workspace" className="btn-primary min-h-14 px-6 text-base">Build a study set <RiArrowRightLine aria-hidden="true" /></a>
            <a href="#/features" className="btn-on-dark min-h-14 px-6 text-base"><RiPlayCircleLine className="text-xl" aria-hidden="true" /> Explore how it works</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
            <span className="inline-flex items-center gap-2"><RiShieldCheckLine className="text-cyan-300" aria-hidden="true" /> No account required</span>
            <span className="inline-flex items-center gap-2"><RiArrowRightUpLine className="text-orange-300" aria-hidden="true" /> Four file formats</span>
          </div>
        </div>
        <ProductPreview />
      </div>

      <div className="relative border-t border-white/10 bg-white/[0.025]">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Study from the files you already use</p>
          <div className="flex flex-wrap gap-2">{['PDF', 'PPTX', 'TXT', 'MARKDOWN'].map((item) => <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.65rem] font-semibold text-slate-300">.{item}</span>)}</div>
        </div>
      </div>
    </section>
  )
}
