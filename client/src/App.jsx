import React, { lazy, Suspense, useEffect } from 'react'
import AppHeader from './components/layout/AppHeader.jsx'
import AppFooter from './components/layout/AppFooter.jsx'
import useHashRoute from './hooks/useHashRoute.js'

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage.jsx'))
const WorkspacePage = lazy(() => import('./pages/WorkspacePage.jsx'))

const PAGES = {
  '/': LandingPage,
  '/features': FeaturesPage,
  '/workspace': WorkspacePage,
}

const PAGE_TITLES = {
  '/': 'StudyAI | Your AI-powered learning engine',
  '/features': 'Features | StudyAI',
  '/workspace': 'Study Workspace | StudyAI',
}

export default function App() {
  const currentPath = useHashRoute()
  const Page = PAGES[currentPath] || LandingPage
  const isWorkspace = currentPath === '/workspace'

  useEffect(() => {
    document.title = PAGE_TITLES[currentPath] || PAGE_TITLES['/']
  }, [currentPath])

  if (isWorkspace) {
    return (
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-950" role="status"><span className="h-10 w-10 animate-spin rounded-full border-4 border-white/15 border-t-brand-400" /><span className="sr-only">Loading workspace</span></div>}>
        <Page />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader currentPath={currentPath} />
      <main id="main-content">
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center bg-slate-50" role="status"><span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" /><span className="sr-only">Loading view</span></div>}>
          <Page />
        </Suspense>
      </main>
      <AppFooter />
    </div>
  )
}
