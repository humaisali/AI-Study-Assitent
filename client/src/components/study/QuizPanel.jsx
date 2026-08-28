import React, { useMemo, useState } from 'react'
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBookOpenLine,
  RiBrainLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiLightbulbFlashLine,
  RiMedalLine,
  RiRefreshLine,
  RiTrophyLine,
} from 'react-icons/ri'

function parseQuiz(quizText) {
  if (!quizText) return []

  const questions = []
  const questionBlocks = quizText.split(/(?=(?:Q\d+[:.)]|\d+[.)])\s)/i).filter(Boolean)

  for (const block of questionBlocks) {
    const lines = block.trim().split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length < 3) continue

    const questionLine = lines[0].replace(/^(?:Q\d+[:.)]|\d+[.):])\s*/i, '').trim()
    if (!questionLine) continue

    const options = []
    let answer = ''
    let shortAnswer = ''

    for (let index = 1; index < lines.length; index += 1) {
      const line = lines[index]
      const optionMatch = line.match(/^([A-D])[.)]\s*(.+)/)
      if (optionMatch) {
        options.push({ letter: optionMatch[1], text: optionMatch[2] })
        continue
      }

      const answerMatch = line.match(/^(?:Answer|Ans|Correct)[:.]\s*([A-D]|.+)/i)
      if (answerMatch) {
        const raw = answerMatch[1].trim()
        if (/^[A-D]$/i.test(raw)) answer = raw.toUpperCase()
        else shortAnswer = raw
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
  const pct = total ? Math.round((score / total) * 100) : 100
  const result = pct >= 80
    ? { label: 'Excellent recall', detail: 'You have a strong grasp of this material.', icon: RiTrophyLine, tone: 'text-amber-700', ring: 'text-amber-600' }
    : pct >= 60
      ? { label: 'A solid result', detail: 'One more pass will make it stick.', icon: RiMedalLine, tone: 'text-sage-700', ring: 'text-sage-600' }
      : pct >= 40
        ? { label: 'Good progress', detail: 'Review the guide, then try once more.', icon: RiLightbulbFlashLine, tone: 'text-amber-700', ring: 'text-amber-600' }
        : { label: 'Keep building', detail: 'Return to the key ideas and go again.', icon: RiBookOpenLine, tone: 'text-ink-700', ring: 'text-red-500' }

  const ResultIcon = result.icon
  const circumference = 2 * Math.PI * 42

  return (
    <div className="flex flex-col items-center py-7 text-center animate-scaleIn animate-fill-both">
      <span className={`mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-ink-50 ${result.tone}`}>
        <ResultIcon className="text-3xl" aria-hidden="true" />
      </span>
      <p className="section-label">Quiz complete</p>
      <h3 className="mt-2 font-display text-3xl font-semibold text-ink-900">{result.label}</h3>
      <p className="mt-2 max-w-xs text-sm leading-6 text-ink-500">{result.detail}</p>

      <div className={`relative my-7 h-28 w-28 ${result.ring}`}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" className="text-ink-100" stroke="currentColor" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${circumference * pct / 100} ${circumference}`}
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-ink-900">{pct}%</span>
      </div>

      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">{score} of {total} correct</p>
      <button type="button" onClick={onReset} className="btn-primary">
        <RiRefreshLine aria-hidden="true" /> Try the quiz again
      </button>
    </div>
  )
}

export default function QuizPanel({ quiz }) {
  const questions = useMemo(() => parseQuiz(quiz), [quiz])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState({})
  const [revealed, setRevealed] = useState({})
  const [finished, setFinished] = useState(false)

  if (!questions.length) {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-50 text-ink-400">
          <RiBrainLine className="text-2xl" aria-hidden="true" />
        </span>
        <p className="mt-4 font-semibold text-ink-700">No quiz questions were found</p>
        <p className="mt-1 text-sm text-ink-400">The study guide is still ready to review.</p>
      </div>
    )
  }

  if (finished) {
    const scorable = questions.filter((question) => question.type === 'mcq' && question.answer)
    const score = scorable.filter((question) => selected[question.id] === question.answer).length
    const total = scorable.length || questions.length
    return (
      <ScoreCard
        score={score}
        total={total}
        onReset={() => { setSelected({}); setRevealed({}); setCurrent(0); setFinished(false) }}
      />
    )
  }

  const question = questions[current]
  const isRevealed = revealed[question.id]
  const chosenLetter = selected[question.id]
  const isCorrect = chosenLetter === question.answer

  const handleSelect = (letter) => {
    if (isRevealed) return
    setSelected((answers) => ({ ...answers, [question.id]: letter }))
    setRevealed((answers) => ({ ...answers, [question.id]: true }))
  }

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent((value) => value + 1)
    else setFinished(true)
  }

  const optionClass = (letter) => {
    if (!isRevealed) return `quiz-option ${chosenLetter === letter ? 'selected' : ''}`
    if (letter === question.answer) return 'quiz-option correct'
    if (letter === chosenLetter) return 'quiz-option incorrect'
    return 'quiz-option opacity-65'
  }

  const completion = ((current + (isRevealed ? 1 : 0)) / questions.length) * 100

  return (
    <section className="animate-scaleIn animate-fill-both" aria-labelledby="quiz-title">
      <header className="flex items-center justify-between border-b border-ink-100 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <RiBrainLine className="text-xl" aria-hidden="true" />
          </span>
          <div>
            <p className="section-label">Active recall</p>
            <h2 id="quiz-title" className="mt-1 font-display text-2xl font-semibold leading-none text-ink-900">Practice quiz</h2>
          </div>
        </div>
        <span className="rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 font-mono text-[0.68rem] font-medium text-ink-500">{current + 1} / {questions.length}</span>
      </header>

      <div
        className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink-100"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(completion)}
      >
        <div className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-300 transition-all duration-500" style={{ width: `${completion}%` }} />
      </div>

      <div className="my-6">
        <p className="section-label mb-2">Question {current + 1}</p>
        <p className="text-balance font-display text-xl font-semibold leading-snug text-ink-900">{question.question}</p>
      </div>

      {question.type === 'mcq' && (
        <div className="mb-6 space-y-2.5">
          {question.options.map(({ letter, text }) => (
            <button
              key={letter}
              type="button"
              onClick={() => handleSelect(letter)}
              disabled={isRevealed}
              aria-pressed={chosenLetter === letter}
              className={optionClass(letter)}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                !isRevealed
                  ? 'bg-ink-100 text-ink-600'
                  : letter === question.answer
                    ? 'bg-sage-600 text-white'
                    : letter === chosenLetter
                      ? 'bg-red-500 text-white'
                      : 'bg-ink-100 text-ink-400'
              }`}>{letter}</span>
              <span className="pt-1 text-sm leading-6 text-ink-700">{text}</span>
              {isRevealed && letter === question.answer && <RiCheckboxCircleLine className="ml-auto mt-1 shrink-0 text-xl text-sage-600" aria-hidden="true" />}
              {isRevealed && letter === chosenLetter && letter !== question.answer && <RiCloseCircleLine className="ml-auto mt-1 shrink-0 text-xl text-red-500" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}

      {question.type === 'short' && (
        <div className="mb-6">
          {!isRevealed ? (
            <button type="button" onClick={() => setRevealed((answers) => ({ ...answers, [question.id]: true }))} className="btn-secondary w-full">
              <RiLightbulbFlashLine aria-hidden="true" /> Reveal answer
            </button>
          ) : (
            <div className="rounded-2xl border border-sage-100 bg-sage-50 p-4 animate-fadeUp animate-fill-both">
              <p className="section-label text-sage-700">Suggested answer</p>
              <p className="mt-2 text-sm leading-6 text-ink-800">{question.shortAnswer || question.answer}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex min-h-12 items-center justify-between gap-3 border-t border-ink-100 pt-5">
        <div className="min-w-0 text-sm" aria-live="polite">
          {isRevealed && question.type === 'mcq' && (
            <span className={`inline-flex items-center gap-1.5 font-semibold ${isCorrect ? 'text-sage-700' : 'text-red-600'}`}>
              {isCorrect ? <RiCheckboxCircleLine aria-hidden="true" /> : <RiCloseCircleLine aria-hidden="true" />}
              {isCorrect ? 'Correct' : `Answer: ${question.answer}`}
            </span>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          {current > 0 && (
            <button type="button" onClick={() => setCurrent((value) => value - 1)} className="btn-secondary w-11 px-0" aria-label="Previous question">
              <RiArrowLeftLine aria-hidden="true" />
            </button>
          )}
          {isRevealed && (
            <button type="button" onClick={handleNext} className="btn-primary px-4">
              {current < questions.length - 1 ? <>Next <RiArrowRightLine aria-hidden="true" /></> : <><RiTrophyLine aria-hidden="true" /> Finish</>}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
