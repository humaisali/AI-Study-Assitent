import React, { useState, useMemo } from 'react'
import {
  RiBrainLine, RiCheckboxCircleLine, RiCloseCircleLine,
  RiRefreshLine, RiTrophyLine, RiArrowRightLine, RiArrowLeftLine
} from 'react-icons/ri'

/**
 * Parse quiz text from AI response into structured question objects.
 * Handles formats like:
 *   Q1: question text
 *   A) option
 *   B) option
 *   Answer: A
 */
function parseQuiz(quizText) {
  if (!quizText) return []

  const questions = []
  // Split on question number patterns: Q1, 1., Question 1, etc.
  const questionBlocks = quizText.split(/(?=(?:Q\d+[:.)]|\d+[.)])\s)/i).filter(Boolean)

  for (const block of questionBlocks) {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length < 3) continue

    // Extract question text (first line, stripped of Q1: prefix)
    const questionLine = lines[0].replace(/^(?:Q\d+[:.)]|\d+[.):])\s*/i, '').trim()
    if (!questionLine) continue

    // Extract options
    const options = []
    let answer = ''
    let shortAnswer = ''

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]

      // MCQ option
      const optionMatch = line.match(/^([A-D])[.)]\s*(.+)/)
      if (optionMatch) {
        options.push({ letter: optionMatch[1], text: optionMatch[2] })
        continue
      }

      // Answer line
      const answerMatch = line.match(/^(?:Answer|Ans|Correct)[:.]\s*([A-D]|.+)/i)
      if (answerMatch) {
        const raw = answerMatch[1].trim()
        // If single letter, it's MCQ answer
        if (/^[A-D]$/i.test(raw)) {
          answer = raw.toUpperCase()
        } else {
          shortAnswer = raw
        }
      }
    }

    questions.push({
      id: questions.length,
      question: questionLine,
      options,
      answer,
      shortAnswer,
      type: options.length >= 2 ? 'mcq' : 'short',
    })
  }

  return questions
}

function ScoreCard({ score, total, onReset }) {
  const pct = Math.round((score / total) * 100)
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '✅' : pct >= 40 ? '💪' : '📚'
  const label = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : pct >= 40 ? 'Keep going!' : 'Keep studying!'

  return (
    <div className="flex flex-col items-center py-10 animate-scaleIn animate-fill-both">
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="font-display text-2xl font-bold text-ink-900 mb-1">{label}</h3>
      <p className="font-body text-ink-500 mb-6 text-sm">You answered {score} out of {total} correctly</p>

      {/* Score ring */}
      <div className="relative w-24 h-24 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e8e3d8" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke={pct >= 70 ? '#4d7040' : pct >= 40 ? '#f0a500' : '#dc2626'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42 * pct / 100} ${2 * Math.PI * 42}`}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-xl text-ink-900">{pct}%</span>
        </div>
      </div>

      <button onClick={onReset} className="btn-primary gap-2">
        <RiRefreshLine /> Try Again
      </button>
    </div>
  )
}

export default function QuizPanel({ quiz }) {
  const questions = useMemo(() => parseQuiz(quiz), [quiz])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState({})   // { questionId: chosenLetter }
  const [revealed, setRevealed] = useState({})   // { questionId: true }
  const [finished, setFinished] = useState(false)

  if (!questions.length) {
    return (
      <div className="text-center py-12">
        <RiBrainLine className="text-4xl text-ink-300 mx-auto mb-3" />
        <p className="font-body text-ink-400 text-sm">No quiz questions found.</p>
      </div>
    )
  }

  if (finished) {
    const score = questions.filter(q => selected[q.id] === q.answer).length
    return (
      <ScoreCard
        score={score}
        total={questions.length}
        onReset={() => { setSelected({}); setRevealed({}); setCurrent(0); setFinished(false) }}
      />
    )
  }

  const q = questions[current]
  const isRevealed = revealed[q.id]
  const chosenLetter = selected[q.id]
  const isCorrect = chosenLetter === q.answer

  const handleSelect = (letter) => {
    if (isRevealed) return
    setSelected(s => ({ ...s, [q.id]: letter }))
    setRevealed(r => ({ ...r, [q.id]: true }))
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
    } else {
      setFinished(true)
    }
  }

  const optionClass = (letter) => {
    const base = 'quiz-option'
    if (!isRevealed) return `${base} ${chosenLetter === letter ? 'selected' : ''}`
    if (letter === q.answer) return `${base} correct`
    if (letter === chosenLetter && letter !== q.answer) return `${base} incorrect`
    return base
  }

  return (
    <div className="animate-scaleIn animate-fill-both">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <RiBrainLine className="text-amber-700 text-base" />
          </div>
          <h2 className="font-display text-xl font-semibold text-ink-900">Practice Quiz</h2>
        </div>

        {/* Progress */}
        <span className="section-label">{current + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-ink-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sage-400 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${((current + (isRevealed ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="section-label mb-2">Question {current + 1}</p>
        <p className="font-display text-lg font-semibold text-ink-900 leading-snug text-balance">
          {q.question}
        </p>
      </div>

      {/* MCQ Options */}
      {q.type === 'mcq' && q.options.length > 0 && (
        <div className="space-y-2.5 mb-6">
          {q.options.map(({ letter, text }) => (
            <button
              key={letter}
              onClick={() => handleSelect(letter)}
              disabled={isRevealed}
              className={`${optionClass(letter)} w-full`}
            >
              {/* Letter badge */}
              <span className={`
                w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors duration-150
                ${!isRevealed
                  ? 'bg-ink-100 text-ink-600'
                  : letter === q.answer
                    ? 'bg-sage-500 text-white'
                    : letter === chosenLetter
                      ? 'bg-red-400 text-white'
                      : 'bg-ink-100 text-ink-400'
                }
              `}>
                {letter}
              </span>
              <span className="font-body text-sm text-ink-700 text-left">{text}</span>

              {/* Result icon */}
              {isRevealed && letter === q.answer && (
                <RiCheckboxCircleLine className="text-sage-500 text-lg ml-auto shrink-0" />
              )}
              {isRevealed && letter === chosenLetter && letter !== q.answer && (
                <RiCloseCircleLine className="text-red-400 text-lg ml-auto shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Short answer reveal */}
      {q.type === 'short' && (
        <div className="mb-6">
          {!isRevealed ? (
            <button
              onClick={() => setRevealed(r => ({ ...r, [q.id]: true }))}
              className="btn-secondary w-full justify-center"
            >
              Reveal Answer
            </button>
          ) : (
            <div className="p-4 bg-sage-50 border border-sage-200 rounded-xl animate-fadeUp animate-fill-both">
              <p className="section-label mb-1 text-sage-700">Answer</p>
              <p className="font-body text-ink-800 text-sm leading-relaxed">{q.shortAnswer || q.answer}</p>
            </div>
          )}
        </div>
      )}

      {/* Feedback + Nav */}
      <div className="flex items-center justify-between">
        {/* Feedback */}
        <div className="text-sm font-body">
          {isRevealed && q.type === 'mcq' && (
            <span className={`font-medium ${isCorrect ? 'text-sage-600' : 'text-red-500'}`}>
              {isCorrect ? '✓ Correct!' : `✗ Correct answer: ${q.answer}`}
            </span>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          {current > 0 && (
            <button
              onClick={() => setCurrent(c => c - 1)}
              className="btn-secondary py-2.5 px-4"
            >
              <RiArrowLeftLine />
            </button>
          )}
          {isRevealed && (
            <button onClick={handleNext} className="btn-primary">
              {current < questions.length - 1 ? (
                <>Next <RiArrowRightLine /></>
              ) : (
                <><RiTrophyLine /> Finish</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
