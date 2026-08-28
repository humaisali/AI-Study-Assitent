import React, { useEffect, useState } from 'react'
import { RiAlertLine, RiBookOpenLine, RiBrainLine, RiFileTextLine, RiMagicLine, RiRestartLine, RiSparklingLine } from 'react-icons/ri'
import UploadBox from './UploadBox.jsx'
import ExplanationPanel from './ExplanationPanel.jsx'
import QuizPanel from './QuizPanel.jsx'
import Loader from './Loader.jsx'
import { analyzeDocument } from '../../services/aiService.js'

const LOADER_INTERVAL = 3200

const TABS = [
  { id: 'explanation', label: 'Study guide', detail: 'Explanation + summary', icon: RiBookOpenLine },
  { id: 'quiz', label: 'Practice quiz', detail: 'Active recall session', icon: RiBrainLine },
]

export default function StudyWorkspace() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loaderStage, setLoaderStage] = useState(0)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('explanation')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [activeFile, setActiveFile] = useState(null)

  useEffect(() => {
    if (!loading) { setLoaderStage(0); return undefined }
    const interval = setInterval(() => setLoaderStage((stage) => Math.min(stage + 1, 4)), LOADER_INTERVAL)
    return () => clearInterval(interval)
  }, [loading])

  const handleAnalyze = async (file, difficulty) => {
    setLoading(true); setError(''); setResult(null); setActiveFile({ name: file.name, difficulty }); setUploadProgress(0)
    try {
      const data = await analyzeDocument(file, difficulty, setUploadProgress)
      setResult(data); setActiveTab('explanation')
    } catch (requestError) {
      setError(requestError?.response?.data?.error || requestError.message || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  const handleReset = () => {
    setResult(null); setError(''); setLoaderStage(0); setUploadProgress(0); setActiveFile(null); setActiveTab('explanation')
  }

  if (loading) {
    return <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl sm:p-8 lg:p-10"><Loader stage={loaderStage} uploadProgress={uploadProgress} fileName={activeFile?.name} /></div>
  }

  if (result) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,.12)]">
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600"><RiFileTextLine className="text-xl" aria-hidden="true" /></span><div className="min-w-0"><p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan-300">Study set ready</p><h2 className="mt-1 truncate font-display text-2xl font-bold">{activeFile?.name || 'Study material'}</h2></div></div>
          <button type="button" onClick={handleReset} className="btn-on-dark self-start sm:self-auto"><RiRestartLine aria-hidden="true" /> New document</button>
        </div>

        <div className="grid lg:grid-cols-[17rem_1fr]">
          <aside className="border-b border-slate-200 bg-slate-50 p-4 lg:min-h-[45rem] lg:border-b-0 lg:border-r lg:p-5">
            <p className="px-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-400">Study views</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Study set views">
              {TABS.map(({ id, label, detail, icon: Icon }) => (
                <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`flex min-h-[4.5rem] items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${activeTab === id ? 'border-brand-200 bg-white text-slate-950 shadow-sm' : 'border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activeTab === id ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}><Icon aria-hidden="true" /></span><span><span className="block text-xs font-bold">{label}</span><span className="mt-0.5 block text-[0.62rem] text-slate-400">{detail}</span></span>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4"><p className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-400">Learning depth</p><p className="mt-2 text-sm font-bold capitalize text-slate-800">{activeFile?.difficulty || 'Intermediate'}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-brand-500" /></div></div>
          </aside>
          <div className="min-w-0 p-5 sm:p-7 lg:p-9">
            {activeTab === 'explanation' ? <ExplanationPanel explanation={result.explanation} summary={result.summary} /> : <QuizPanel quiz={result.quiz} />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,.12)] sm:p-5">
        {error ? (
          <div className="flex min-h-[34rem] flex-col items-center justify-center rounded-[1.5rem] border border-red-200 bg-red-50 p-7 text-center" role="alert"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm"><RiAlertLine className="text-2xl" aria-hidden="true" /></span><h2 className="mt-6 font-display text-2xl font-bold text-red-950">We could not finish that study set</h2><p className="mt-3 max-w-md text-sm leading-7 text-red-700">{error}</p><button type="button" onClick={handleReset} className="btn-secondary mt-6"><RiRestartLine aria-hidden="true" /> Choose another file</button></div>
        ) : <UploadBox onAnalyze={handleAnalyze} isLoading={loading} />}
      </div>

      <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,.18)] sm:p-8">
        <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Your output stack</p><h2 className="mt-2 font-display text-3xl font-bold">One upload. A complete loop.</h2></div><span className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-300 sm:flex"><RiMagicLine className="text-xl" aria-hidden="true" /></span></div>
        <div className="mt-8 space-y-3">{[{ icon: RiBookOpenLine, title: 'Understand', text: 'A structured guide for the full concept.', tone: 'bg-brand-500' }, { icon: RiSparklingLine, title: 'Compress', text: 'A focused summary of key ideas.', tone: 'bg-orange-500' }, { icon: RiBrainLine, title: 'Retrieve', text: 'A quiz generated from the same source.', tone: 'bg-cyan-400 text-slate-950' }].map(({ icon: Icon, title, text, tone }, index) => <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon aria-hidden="true" /></span><div><div className="flex items-center gap-2"><span className="font-mono text-[0.58rem] text-slate-500">0{index + 1}</span><p className="text-sm font-bold">{title}</p></div><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div></div>)}</div>
        <div className="mt-7 rounded-2xl bg-gradient-to-br from-brand-500/20 to-violet-500/10 p-5 ring-1 ring-white/10"><p className="text-xs font-bold text-brand-100">Built around your material</p><p className="mt-2 text-xs leading-6 text-slate-400">Every explanation and question starts from the document you choose.</p></div>
      </aside>
    </div>
  )
}
