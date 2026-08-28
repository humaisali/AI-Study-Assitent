import { useEffect, useState } from 'react'

const ROUTES = new Set(['/', '/features', '/workspace'])

function getRoute() {
  const route = window.location.hash.replace(/^#/, '') || '/'
  return ROUTES.has(route) ? route : '/'
}

export default function useHashRoute() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handleChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleChange)
    return () => window.removeEventListener('hashchange', handleChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  return route
}
