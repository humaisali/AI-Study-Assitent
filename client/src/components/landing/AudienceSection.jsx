import React from 'react'
import { RiBookReadLine, RiGraduationCapLine, RiLightbulbFlashLine, RiLoopLeftLine } from 'react-icons/ri'

const USE_CASES = [
  { icon: RiBookReadLine, title: 'After a dense lecture', text: 'Turn the slide deck into a connected explanation while the material is still fresh.' },
  { icon: RiGraduationCapLine, title: 'Before an exam', text: 'Compress a chapter into key ideas, then practice retrieval instead of rereading.' },
  { icon: RiLightbulbFlashLine, title: 'When a topic will not click', text: 'Ask for the same source at a simpler depth and rebuild the foundation.' },
  { icon: RiLoopLeftLine, title: 'During quick revision', text: 'Move between full guide, summary, and quiz without rebuilding your study setup.' },
]

export default function AudienceSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-7 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div className="lg:sticky lg:top-32 lg:self-start"><p className="eyebrow">Fits the way you already study</p><h2 className="section-title mt-4">Useful at every point in the learning cycle.</h2><p className="mt-6 text-base leading-8 text-slate-600">StudyAI does not replace your source material. It gives you better ways to work with it.</p><a href="#/workspace" className="btn-primary mt-8">Try your own notes</a></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {USE_CASES.map(({ icon: Icon, title, text }, index) => <article key={title} className={`rounded-[1.75rem] border p-6 sm:p-8 ${index === 0 ? 'border-brand-200 bg-brand-50' : index === 3 ? 'border-slate-900 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50'}`}><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 3 ? 'bg-cyan-300 text-slate-950' : 'bg-white text-brand-600 shadow-sm'}`}><Icon className="text-xl" aria-hidden="true" /></span><h3 className="mt-12 font-display text-2xl font-bold">{title}</h3><p className={`mt-3 text-sm leading-7 ${index === 3 ? 'text-slate-400' : 'text-slate-600'}`}>{text}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  )
}
