import React, { useEffect, useState } from 'react'
import { RiAlertLine, RiBookOpenLine, RiBrainLine, RiRestartLine, RiSparkling2Line } from 'react-icons/ri'
import UploadBox from './UploadBox.jsx'
import ExplanationPanel from './ExplanationPanel.jsx'
import QuizPanel from './QuizPanel.jsx'
import Loader from './Loader.jsx'
import WorkspaceTopbar from '../workspace/WorkspaceTopbar.jsx'
import WorkspaceNavigation from '../workspace/WorkspaceNavigation.jsx'
import WorkspaceSessionPanel from '../workspace/WorkspaceSessionPanel.jsx'
import { analyzeDocument } from '../../services/aiService.js'

const LOADER_INTERVAL = 3200

const VIEW_COPY = {
  guide: {
    kicker: 'Understand the material',
    title: 'Your study guide',
    description: 'Move between the full explanation and a condensed review of the ideas that matter.',
  },
  quiz: {
    kicker: 'Practise active recall',
    title: 'Test what you remember',
    description: 'Answer one question at a time and get immediate feedback before moving forward.',
  },
}

export default function StudyWorkspace() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loaderStage, setLoaderStage] = useState(0)
  const [error, setError] = useState('')
  const [activeView, setActiveView] = useState('create')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [activeFile, setActiveFile] = useState(null)

  useEffect(() => {
    if (!loading) {
      setLoaderStage(0)
      return undefined
    }
    const interval = setInterval(() => setLoaderStage((stage) => Math.min(stage + 1, 4)), LOADER_INTERVAL)
    return () => clearInterval(interval)
  }, [loading])

  const handleAnalyze = async (file, difficulty) => {
    setLoading(true)
    setError('')
    setResult(null)
    setActiveView('create')
    setActiveFile({ name: file.name, difficulty })
    setUploadProgress(0)

    try {
      const data = await analyzeDocument(file, difficulty, setUploadProgress)
      setResult(data)
      setActiveView('guide')
    } catch (requestError) {
      setError(requestError?.response?.data?.error || requestError.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError('')
    setLoaderStage(0)
    setUploadProgress(0)
    setActiveFile(null)
    setActiveView('create')
  }

  const renderCanvas = () => {
    if (loading) {
      return <section className="workspace-panel p-5 sm:p-7 lg:p-9"><Loader stage={loaderStage} uploadProgress={uploadProgress} fileName={activeFile?.name} /></section>
    }

    if (error) {
      return (
        <section className="workspace-panel flex min-h-[32rem] flex-col items-center justify-center p-7 text-center" role="alert">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100"><RiAlertLine className="text-2xl" aria-hidden="true" /></span>
          <p className="workspace-kicker mt-6 text-red-600">Generation interrupted</p>
          <h1 className="mt-2 text-balance font-display text-3xl font-bold tracking-[-0.035em] text-slate-950">We could not finish that study set</h1>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">{error}</p>
          <button type="button" onClick={handleReset} className="btn-primary mt-7"><RiRestartLine aria-hidden="true" /> Choose another file</button>
        </section>
      )
    }

    if (result && activeView !== 'create') {
      const view = VIEW_COPY[activeView]
      return (
        <div className="space-y-4">
          <header className="workspace-panel px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="workspace-kicker">{view.kicker}</p>
                <h1 className="mt-1.5 font-display text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-3xl">{view.title}</h1>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">{view.description}</p>
              </div>
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1" role="tablist" aria-label="Study views">
                <button type="button" role="tab" aria-selected={activeView === 'guide'} onClick={() => setActiveView('guide')} className={`workspace-view-switch ${activeView === 'guide' ? 'active' : ''}`}><RiBookOpenLine aria-hidden="true" /> Guide</button>
                <button type="button" role="tab" aria-selected={activeView === 'quiz'} onClick={() => setActiveView('quiz')} className={`workspace-view-switch ${activeView === 'quiz' ? 'active' : ''}`}><RiBrainLine aria-hidden="true" /> Quiz</button>
              </div>
            </div>
          </header>
          <section className="workspace-panel min-h-[36rem] p-5 sm:p-7 lg:p-8" role="tabpanel">
            {activeView === 'guide' ? <ExplanationPanel explanation={result.explanation} summary={result.summary} /> : <QuizPanel quiz={result.quiz} />}
          </section>
        </div>
      )
    }

    return (
      <div className="space-y-5">
        <header className="max-w-3xl">
          <p className="eyebrow"><RiSparkling2Line aria-hidden="true" /> New study session</p>
          <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">What are we learning today?</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Add one source document and choose the depth. Your guide, summary, and practice quiz will stay organized inside this workspace.</p>
        </header>
        <section className="workspace-panel p-2.5 shadow-[0_18px_60px_rgba(15,23,42,.08)] sm:p-4"><UploadBox onAnalyze={handleAnalyze} isLoading={loading} /></section>
        <div className="grid gap-3 sm:grid-cols-3" aria-label="Study set outputs">
          {[
            { icon: RiBookOpenLine, number: '01', title: 'Understand', text: 'A structured explanation grounded in your source.' },
            { icon: RiSparkling2Line, number: '02', title: 'Review', text: 'A concise summary for quick revision.' },
            { icon: RiBrainLine, number: '03', title: 'Recall', text: 'An interactive quiz to check retention.' },
          ].map(({ icon: Icon, number, title, text }) => (
            <article key={title} className="workspace-panel p-4">
              <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon aria-hidden="true" /></span><span className="font-mono text-[0.58rem] text-slate-300">{number}</span></div>
              <h2 className="mt-4 text-sm font-bold text-slate-900">{title}</h2><p className="mt-1 text-[0.68rem] leading-5 text-slate-500">{text}</p>
            </article>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="workspace-app min-h-screen bg-slate-100">
      <WorkspaceTopbar activeFile={activeFile} loading={loading} onReset={handleReset} />
      <div className="grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
        <WorkspaceNavigation activeView={activeView} hasResult={Boolean(result)} loading={loading} onChange={setActiveView} onReset={handleReset} />
        <main id="workspace-main" className="min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:px-7 xl:px-8">
          <div className="mx-auto grid max-w-[96rem] gap-5 xl:grid-cols-[minmax(0,1fr)_18rem] xl:gap-6">
            <div className="min-w-0">{renderCanvas()}</div>
            <WorkspaceSessionPanel activeFile={activeFile} hasResult={Boolean(result)} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </div>
  )
}
