import React from 'react'
import {
  RiBookReadLine,
  RiBrainLine,
  RiFileSearchLine,
  RiQuestionnaireLine,
  RiSparklingLine,
} from 'react-icons/ri'

const STAGES = [
  { label: 'Reading your document', detail: 'Extracting the useful material', icon: RiFileSearchLine },
  { label: 'Finding the key ideas', detail: 'Mapping concepts and relationships', icon: RiBrainLine },
  { label: 'Writing your study guide', detail: 'Explaining each idea with clarity', icon: RiBookReadLine },
  { label: 'Building practice questions', detail: 'Turning knowledge into active recall', icon: RiQuestionnaireLine },
  { label: 'Adding the finishing touches', detail: 'Organizing your complete study set', icon: RiSparklingLine },
]

export default function Loader({ stage = 0, uploadProgress = 0, fileName = 'Your document' }) {
  const safeStage = Math.min(stage, STAGES.length - 1)
  const current = STAGES[safeStage]
  const CurrentIcon = current.icon
  const progress = Math.min(100, Math.max(8, (safeStage * 20) + Math.round(uploadProgress * 0.2)))

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-ink-900 text-amber-300 shadow-warm-lg">
          <span className="absolute inset-0 animate-ping rounded-3xl border border-amber-400/30" aria-hidden="true" />
          <CurrentIcon className="relative text-3xl" aria-hidden="true" />
        </div>
        <p className="section-label text-amber-700">Study set in progress</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-none text-ink-900 sm:text-5xl">{current.label}</h1>
        <p className="mt-4 text-sm leading-6 text-ink-500">{current.detail}. This usually takes less than a minute.</p>
        <p className="mt-5 max-w-full truncate rounded-full border border-ink-100 bg-ink-50 px-3 py-2 font-mono text-[0.68rem] text-ink-500">{fileName}</p>
      </div>

      <div className="rounded-3xl border border-ink-100 bg-ink-50/70 p-5 sm:p-7">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink-900">Preparing your workspace</p>
            <p className="mt-1 text-xs text-ink-500">You can keep this tab open while we work.</p>
          </div>
          <span className="font-display text-2xl font-semibold text-amber-700">{progress}%</span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-ink-100"
          role="progressbar"
          aria-label="Study set creation progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div className="h-full rounded-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <ol className="mt-7 space-y-2.5">
          {STAGES.map(({ label, icon: Icon }, index) => {
            const complete = index < safeStage
            const active = index === safeStage
            return (
              <li key={label} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 ${active ? 'bg-white shadow-sm' : ''}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  complete ? 'bg-sage-100 text-sage-700' : active ? 'bg-amber-100 text-amber-700' : 'bg-ink-100 text-ink-400'
                }`}>
                  <Icon aria-hidden="true" />
                </span>
                <span className={`text-xs font-semibold ${active ? 'text-ink-900' : complete ? 'text-ink-600' : 'text-ink-400'}`}>{label}</span>
                {complete && <span className="ml-auto text-[0.65rem] font-semibold uppercase tracking-wider text-sage-600">Done</span>}
                {active && <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-amber-500" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
