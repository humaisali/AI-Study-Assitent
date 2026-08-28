import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  RiBookOpenLine,
  RiCheckLine,
  RiFileCopyLine,
  RiListCheck2,
  RiSparklingLine,
} from 'react-icons/ri'

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
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="mb-4 mt-9 font-display text-3xl font-semibold leading-tight text-ink-900 first:mt-0">{children}</h1>,
              h2: ({ children }) => <h2 className="mb-3 mt-8 font-display text-2xl font-semibold leading-tight text-ink-900">{children}</h2>,
              h3: ({ children }) => <h3 className="mb-2 mt-6 font-display text-xl font-semibold text-ink-800">{children}</h3>,
              p: ({ children }) => <p className="mb-4 text-[0.94rem] leading-7 text-ink-700">{children}</p>,
              ul: ({ children }) => <ul className="mb-5 ml-5 list-disc space-y-2 marker:text-amber-500">{children}</ul>,
              ol: ({ children }) => <ol className="mb-5 ml-5 list-decimal space-y-2 marker:font-semibold marker:text-amber-700">{children}</ol>,
              li: ({ children }) => (
                <li className="pl-1 text-[0.94rem] leading-7 text-ink-700">
                  {children}
                </li>
              ),
              strong: ({ children }) => <strong className="font-semibold text-ink-900">{children}</strong>,
              em: ({ children }) => <em className="font-medium italic text-ink-600">{children}</em>,
              code: ({ inline, children }) => inline ? (
                <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[0.82rem] text-amber-800">{children}</code>
              ) : (
                <pre className="my-5 overflow-x-auto rounded-2xl bg-ink-900 p-5 text-cream shadow-inner scrollbar-thin">
                  <code className="font-mono text-sm leading-6">{children}</code>
                </pre>
              ),
              blockquote: ({ children }) => <blockquote className="my-5 rounded-r-2xl border-l-4 border-amber-400 bg-amber-50/60 py-3 pl-4 pr-3 italic text-ink-600">{children}</blockquote>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
