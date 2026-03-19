import React from 'react'

const stages = [
  { label: 'Reading your document…', icon: '📄' },
  { label: 'Understanding the content…', icon: '🔍' },
  { label: 'Crafting your explanation…', icon: '✍️' },
  { label: 'Building quiz questions…', icon: '🧠' },
  { label: 'Almost ready…', icon: '✨' },
]

export default function Loader({ stage = 0 }) {
  const current = stages[Math.min(stage, stages.length - 1)]

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-scaleIn animate-fill-both">
      {/* Spinning book pages */}
      <div className="relative w-16 h-16 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-ink-100" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-sage-500 border-r-amber-500"
          style={{ animation: 'spin 1.2s cubic-bezier(0.4,0,0.2,1) infinite' }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {current.icon}
        </div>
      </div>

      {/* Stage label */}
      <p className="font-body text-ink-600 font-medium text-center mb-6 animate-fadeUp animate-fill-both">
        {current.label}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2">
        {stages.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stage
                ? 'bg-sage-500 w-6'
                : 'bg-ink-200 w-1.5'
            }`}
          />
        ))}
      </div>

      {/* Skeleton preview */}
      <div className="mt-10 w-full max-w-lg space-y-3">
        {[80, 100, 60, 90, 70].map((w, i) => (
          <div
            key={i}
            className="skeleton h-3 rounded-full"
            style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
