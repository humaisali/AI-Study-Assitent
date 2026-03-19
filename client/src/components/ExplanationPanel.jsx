import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { RiBookOpenLine, RiFileCopyLine, RiCheckLine, RiListCheck2 } from 'react-icons/ri'

export default function ExplanationPanel({ explanation, summary }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(summary ? 'summary' : 'explanation')

  const handleCopy = async () => {
    const text = activeTab === 'summary' ? summary : explanation
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const content = activeTab === 'summary' ? summary : explanation

  return (
    <div className="animate-scaleIn animate-fill-both">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
            <RiBookOpenLine className="text-sage-700 text-base" />
          </div>
          <h2 className="font-display text-xl font-semibold text-ink-900">AI Explanation</h2>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary py-2 px-3 text-xs gap-1.5"
          title="Copy to clipboard"
        >
          {copied
            ? <><RiCheckLine className="text-sage-600" /> Copied</>
            : <><RiFileCopyLine /> Copy</>
          }
        </button>
      </div>

      {/* Tabs */}
      {summary && (
        <div className="flex gap-1 mb-5 p-1 bg-parchment rounded-xl border border-ink-100 w-fit">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`tab-btn flex items-center gap-1.5 ${activeTab === 'explanation' ? 'active' : 'inactive'}`}
          >
            <RiBookOpenLine />
            Full Explanation
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`tab-btn flex items-center gap-1.5 ${activeTab === 'summary' ? 'active' : 'inactive'}`}
          >
            <RiListCheck2 />
            Summary
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sage-300 via-amber-300 to-transparent rounded-full" />

        <div className="pt-5 prose-study max-h-[520px] overflow-y-auto scrollbar-thin pr-2">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="font-display text-2xl font-semibold text-ink-900 mt-8 mb-4 first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-display text-xl font-semibold text-ink-800 mt-6 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-display text-lg font-semibold text-ink-800 mt-5 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="font-body text-ink-700 leading-relaxed mb-4 text-[15px]">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="my-3 space-y-1.5 ml-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-3 space-y-1.5 ml-4 list-decimal">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="font-body text-ink-700 text-[15px] leading-relaxed relative pl-2 before:content-['·'] before:absolute before:-left-2 before:text-sage-500 before:font-bold">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-ink-900">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-ink-600">{children}</em>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="font-mono text-sm bg-ink-100 text-sage-700 px-1.5 py-0.5 rounded">{children}</code>
                ) : (
                  <pre className="bg-ink-900 text-cream rounded-xl p-4 my-4 overflow-x-auto scrollbar-thin">
                    <code className="font-mono text-sm">{children}</code>
                  </pre>
                ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-sage-300 pl-4 my-4 italic text-ink-500">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
