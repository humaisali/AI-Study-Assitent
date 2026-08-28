import React from 'react'
import { RiArrowRightLine, RiGithubLine, RiSparkling2Line } from 'react-icons/ri'

export default function AppFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-7 lg:px-10 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:pb-14">
          <div className="max-w-xl">
            <a href="#/" className="inline-flex items-center gap-3" aria-label="StudyAI home">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-violet-500 to-orange-500"><RiSparkling2Line className="text-xl" aria-hidden="true" /></span>
              <span className="font-display text-2xl font-bold">StudyAI</span>
            </a>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">Transform the material you already have into explanations, summaries, and active-recall practice.</p>
            <a href="#/workspace" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition-colors hover:text-white">Open your workspace <RiArrowRightLine aria-hidden="true" /></a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Navigate</p>
            <ul className="mt-4 space-y-3">
              {[['#/', 'Home'], ['#/features', 'Features'], ['#/workspace', 'Workspace']].map(([href, label]) => <li key={label}><a href={href} className="text-sm font-medium text-slate-300 transition-colors hover:text-white">{label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Built with</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Gemini AI', 'React', 'Tailwind', 'Express'].map((item) => <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300">{item}</span>)}
            </div>
            <a href="https://github.com/humaisali" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><RiGithubLine aria-hidden="true" /> View the developer</a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>StudyAI — built for focused, independent learning.</p>
          <p className="font-mono">PDF · TXT · MD · PPTX</p>
        </div>
      </div>
    </footer>
  )
}
