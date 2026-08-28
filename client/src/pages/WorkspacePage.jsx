import React from 'react'
import { RiFocus3Line, RiRouteLine, RiSparkling2Line } from 'react-icons/ri'
import StudyWorkspace from '../components/study/StudyWorkspace.jsx'

export default function WorkspacePage() {
  return (
    <section className="relative overflow-hidden bg-slate-100 py-12 sm:py-16 lg:py-20">
      <div className="workspace-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-7 lg:px-10">
        <div className="mb-10 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl"><p className="eyebrow"><RiSparkling2Line aria-hidden="true" /> Study workspace</p><h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-[-.045em] text-slate-950 sm:text-6xl">Turn one document into your next focused study session.</h1><p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">Choose the material and the depth. StudyAI will build the explanation, summary, and quiz in one workspace.</p></div>
          <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end"><span className="workspace-chip"><RiFocus3Line aria-hidden="true" /> Focused flow</span><span className="workspace-chip"><RiRouteLine aria-hidden="true" /> Three depths</span></div>
        </div>
        <StudyWorkspace />
      </div>
    </section>
  )
}
