import React from 'react'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import FeatureVisual from './FeatureVisual.jsx'

const COPY = {
  explanation: { eyebrow: '01 / Understand', title: 'Get a guided explanation instead of a generic answer.', text: 'StudyAI begins with your exact source and rebuilds it as a coherent learning path.', bullets: ['Headings and sections create a clear hierarchy', 'Important terms stay connected to their context', 'Readable formatting supports long study sessions'] },
  summary: { eyebrow: '02 / Compress', title: 'Reduce the material without losing what matters.', text: 'The summary view gives you a fast route back into the topic when time is limited.', bullets: ['Key concepts are separated from supporting detail', 'A compact format makes rapid review easier', 'Switch back to the full guide whenever needed'] },
  quiz: { eyebrow: '03 / Retrieve', title: 'Turn reading into a memory-building practice loop.', text: 'Generated questions move the session from recognition to active recall.', bullets: ['Immediate answer feedback', 'Visible progress through the question set', 'A final score encourages another retrieval pass'] },
}

export default function FeatureDetail({ type, reverse = false }) {
  const copy = COPY[type]
  return (
    <section className="border-t border-slate-200 bg-white py-20 sm:py-28">
      <div className={`mx-auto grid max-w-[90rem] items-center gap-12 px-5 sm:px-7 lg:grid-cols-2 lg:gap-20 lg:px-10 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div><p className="eyebrow">{copy.eyebrow}</p><h2 className="section-title mt-4">{copy.title}</h2><p className="mt-6 max-w-xl text-base leading-8 text-slate-600">{copy.text}</p><ul className="mt-7 space-y-3">{copy.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><RiCheckboxCircleLine className="mt-0.5 shrink-0 text-xl text-cyan-600" aria-hidden="true" />{bullet}</li>)}</ul></div>
        <FeatureVisual type={type} />
      </div>
    </section>
  )
}
