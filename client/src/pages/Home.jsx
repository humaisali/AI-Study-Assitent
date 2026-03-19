import React, { useState, useEffect } from 'react'
import UploadBox from '../components/UploadBox.jsx'
import ExplanationPanel from '../components/ExplanationPanel.jsx'
import QuizPanel from '../components/QuizPanel.jsx'
import Loader from '../components/Loader.jsx'
import { analyzeDocument } from '../services/aiService.js'
import {
  RiSparklingLine, RiGithubLine, RiBookOpenLine,
  RiBrainLine, RiFileList2Line, RiAlertLine
} from 'react-icons/ri'

const TABS = [
  { id: 'explanation', label: 'Explanation', icon: RiBookOpenLine },
  { id: 'quiz', label: 'Quiz', icon: RiBrainLine },
]

const LOADER_INTERVAL = 3200 // ms per stage

export default function Home() {
  const [result, setResult] = useState(null)        // { explanation, quiz, summary }
  const [loading, setLoading] = useState(false)
  const [loaderStage, setLoaderStage] = useState(0)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('explanation')
  const [uploadProgress, setUploadProgress] = useState(0)

  // Advance loader stage while loading
  useEffect(() => {
    if (!loading) { setLoaderStage(0); return }
    const interval = setInterval(() => {
      setLoaderStage(s => Math.min(s + 1, 4))
    }, LOADER_INTERVAL)
    return () => clearInterval(interval)
  }, [loading])

  const handleAnalyze = async (file, difficulty) => {
    setLoading(true)
    setError('')
    setResult(null)
    setUploadProgress(0)

    try {
      const data = await analyzeDocument(file, difficulty, (pct) => {
        setUploadProgress(pct)
      })
      setResult(data)
      setActiveTab('explanation')
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError('')
    setLoaderStage(0)
    setActiveTab('explanation')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── NAV ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-cream/80 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-6xl px-5 mx-auto h-14">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg w-7 h-7 bg-ink-800">
              <RiSparklingLine className="text-sm text-amber-300" />
            </div>
            <span className="text-lg font-semibold font-display text-ink-900">StudyAI</span>
          </div>

          <nav className="items-center hidden gap-1 sm:flex">
            {result && (
              TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn flex items-center gap-1.5 text-sm ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="text-base" />
                  {tab.label}
                </button>
              ))
            )}
          </nav>

          <div className="flex items-center gap-2">
            {result && (
              <button onClick={handleReset} className="btn-secondary py-1.5 px-3 text-xs">
                New Upload
              </button>
            )}
            <a
              href="https://github.com/humaisali"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-100"
            >
              <RiGithubLine className="text-lg" />
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO (shown only when no result) ──────────────────────── */}
      {!result && !loading && (
        <section className="px-5 pt-16 pb-10 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sage-50 border border-sage-200 rounded-full mb-6 animate-fadeUp animate-fill-both">
              <RiSparklingLine className="text-sm text-sage-600" />
              <span className="text-xs font-medium font-body text-sage-700">Powered by Gemini AI</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold font-display sm:text-5xl text-ink-900 text-balance animate-fadeUp animate-fill-both animate-delay-100">
              Turn your notes into{' '}
              <em className="not-italic text-sage-600">deep understanding</em>
            </h1>

            <p className="mb-10 text-lg leading-relaxed font-body text-ink-500 text-balance animate-fadeUp animate-fill-both animate-delay-200">
              Upload any study material — PDF, TXT, or Markdown — and get a clear explanation
              plus a personalized quiz in seconds.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fadeUp animate-fill-both animate-delay-300">
              {[
                { icon: RiBookOpenLine, label: 'Simple Explanations' },
                { icon: RiBrainLine, label: 'Practice Quizzes' },
                { icon: RiFileList2Line, label: 'Smart Summaries' },
              ].map(f => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white/70 border border-ink-100 rounded-xl text-sm font-body text-ink-600 shadow-card"
                >
                  <f.icon className="text-base text-sage-500" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── MAIN CONTENT ───────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-6xl px-5 pb-16 mx-auto">

        {/* Upload state */}
        {!result && !loading && (
          <div className="max-w-xl mx-auto animate-fadeUp animate-fill-both animate-delay-400">
            <UploadBox onAnalyze={handleAnalyze} isLoading={loading} />
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="max-w-xl mx-auto">
            <Loader stage={loaderStage} uploadProgress={uploadProgress} />
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="max-w-xl mx-auto animate-scaleIn animate-fill-both">
            <div className="p-6 border-red-100 card">
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 shrink-0">
                  <RiAlertLine className="text-base text-red-500" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold font-display text-ink-900">Something went wrong</h3>
                  <p className="text-sm font-body text-ink-500">{error}</p>
                </div>
              </div>
              <button onClick={handleReset} className="mt-4 text-sm btn-secondary">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="mt-4">
            {/* Mobile tab bar */}
            <div className="flex gap-1 p-1 mb-5 border sm:hidden bg-parchment rounded-xl border-ink-100 w-fit">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn flex items-center gap-1.5 text-sm ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="text-base" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
              {/* Explanation — 3 cols */}
              <div className={`lg:col-span-3 card p-6 lg:p-8 ${activeTab !== 'explanation' ? 'hidden lg:block' : ''}`}>
                <ExplanationPanel
                  explanation={result.explanation}
                  summary={result.summary}
                />
              </div>

              {/* Quiz — 2 cols */}
              <div className={`lg:col-span-2 card p-6 lg:p-8 ${activeTab !== 'quiz' ? 'hidden lg:block' : ''}`}>
                <QuizPanel quiz={result.quiz} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="px-5 py-6 border-t border-ink-100">
        <div className="flex flex-col items-center justify-between max-w-6xl gap-3 mx-auto sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-ink-800">
              <RiSparklingLine className="text-xs text-amber-300" />
            </div>
            <span className="text-xs font-body text-ink-400">StudyAI — Your personal learning companion</span>
          </div>
          <p className="font-mono text-xs text-ink-300">Built with Gemini · React · Tailwind</p>
        </div>
      </footer>
    </div>
  )
}
