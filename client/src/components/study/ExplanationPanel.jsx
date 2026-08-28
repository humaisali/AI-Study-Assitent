import React, { lazy, Suspense, useState } from 'react'
import {
  RiBookOpenLine,
  RiCheckLine,
  RiFileCopyLine,
  RiListCheck2,
  RiSparklingLine,
} from 'react-icons/ri'

const MarkdownStudyContent = lazy(() => import('./MarkdownStudyContent.jsx'))

export default function ExplanationPanel({ explanation, summary }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('explanation')
  const content = activeTab === 'summary' ? summary : explanation

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className="animate-scaleIn animate-fill-both">
      <header className="flex flex-col gap-4 border-b border-ink-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-50 text-sage-700">
            <RiBookOpenLine className="text-xl" aria-hidden="true" />
          </span>
          <div>
            <p className="section-label">AI study guide</p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-none text-ink-900">Learn the material</h2>
          </div>
        </div>

        <button type="button" onClick={handleCopy} className="btn-secondary self-start px-3.5" aria-live="polite">
          {copied ? <RiCheckLine className="text-sage-600" aria-hidden="true" /> : <RiFileCopyLine aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy notes'}
        </button>
      </header>

      {summary && (
        <div className="my-5 flex gap-1 rounded-2xl border border-ink-100 bg-ink-50/80 p-1" role="tablist" aria-label="Study guide view">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'explanation'}
            onClick={() => setActiveTab('explanation')}
            className={`tab-btn flex-1 sm:flex-none ${activeTab === 'explanation' ? 'active' : 'inactive'}`}
          >
            <RiBookOpenLine aria-hidden="true" /> Full guide
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'summary'}
            onClick={() => setActiveTab('summary')}
            className={`tab-btn flex-1 sm:flex-none ${activeTab === 'summary' ? 'active' : 'inactive'}`}
          >
            <RiListCheck2 aria-hidden="true" /> Quick summary
          </button>
        </div>
      )}

      <div className="relative mt-5" role="tabpanel">
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5 text-xs leading-5 text-amber-900">
          <RiSparklingLine className="shrink-0 text-amber-700" aria-hidden="true" />
          {activeTab === 'summary' ? 'A focused review of the ideas worth remembering.' : 'A structured explanation generated from your material.'}
        </div>

        <div className="prose-study max-h-[42rem] overflow-y-auto pr-2 scrollbar-thin">
          <Suspense fallback={<div className="space-y-3" role="status" aria-label="Formatting study guide"><div className="skeleton h-8 w-2/3 rounded-lg" /><div className="skeleton h-4 w-full rounded" /><div className="skeleton h-4 w-5/6 rounded" /></div>}>
            <MarkdownStudyContent content={content} />
          </Suspense>
        </div>
      </div>
    </article>
  )
}
