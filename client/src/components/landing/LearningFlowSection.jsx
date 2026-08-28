import React from 'react'
import { RiArrowRightDownLine, RiBrainLine, RiFileUploadLine, RiSparklingLine } from 'react-icons/ri'

const STEPS = [
  { number: '01', icon: RiFileUploadLine, title: 'Bring the source', body: 'Upload a PDF, slide deck, text file, or Markdown document—up to 15 MB.' },
  { number: '02', icon: RiSparklingLine, title: 'Choose the depth', body: 'Pick essential, balanced, or in-depth learning before the AI starts working.' },
  { number: '03', icon: RiBrainLine, title: 'Learn actively', body: 'Read the guide, scan the summary, then test yourself with generated questions.' },
]

export default function LearningFlowSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-7 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow">A tighter learning loop</p>
            <h2 className="section-title mt-4">From “I have notes” to “I actually get it.”</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end">StudyAI structures the entire session around one simple sequence: understand the material, compress the key ideas, then retrieve them from memory.</p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {STEPS.map(({ number, icon: Icon, title, body }, index) => (
            <article key={number} className={`group relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-8 ${index === 1 ? 'border-brand-200 bg-brand-50' : index === 2 ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-start justify-between">
                <span className={`font-mono text-xs font-bold ${index === 2 ? 'text-slate-500' : 'text-slate-400'}`}>{number} / 03</span>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? 'bg-brand-600 text-white' : index === 2 ? 'bg-cyan-300 text-slate-950' : 'bg-white text-orange-600 shadow-sm'}`}><Icon className="text-xl" aria-hidden="true" /></span>
              </div>
              <h3 className="mt-16 font-display text-2xl font-bold">{title}</h3>
              <p className={`mt-3 text-sm leading-7 ${index === 2 ? 'text-slate-400' : 'text-slate-600'}`}>{body}</p>
              <RiArrowRightDownLine className={`absolute -bottom-3 -right-2 text-7xl transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 ${index === 2 ? 'text-white/5' : 'text-slate-900/[0.04]'}`} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
