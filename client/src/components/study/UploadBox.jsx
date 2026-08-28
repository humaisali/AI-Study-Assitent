import React, { useCallback, useRef, useState } from 'react'
import {
  RiCloseLine,
  RiFilePdf2Line,
  RiFileTextLine,
  RiPresentationLine,
  RiSparklingLine,
  RiUploadCloud2Line,
} from 'react-icons/ri'

const ACCEPTED = {
  'application/pdf': { ext: 'PDF', icon: RiFilePdf2Line },
  'text/plain': { ext: 'TXT', icon: RiFileTextLine },
  'text/markdown': { ext: 'MD', icon: RiFileTextLine },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { ext: 'PPTX', icon: RiPresentationLine },
}

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Essential', desc: 'Clear foundations' },
  { value: 'intermediate', label: 'Balanced', desc: 'Useful depth' },
  { value: 'advanced', label: 'In depth', desc: 'Technical detail' },
]

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadBox({ onAnalyze, isLoading }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [difficulty, setDifficulty] = useState('intermediate')

  const validateAndSet = useCallback((nextFile) => {
    setError('')
    if (!nextFile) return

    const isMarkdown = /\.(md|markdown)$/i.test(nextFile.name)
    if (!Object.keys(ACCEPTED).includes(nextFile.type) && !isMarkdown) {
      setError('That format is not supported. Choose a PDF, TXT, Markdown, or PPTX file.')
      return
    }
    if (nextFile.size > 15 * 1024 * 1024) {
      setError('That file is over the 15 MB limit. Choose a smaller document.')
      return
    }

    setFile(nextFile)
  }, [])

  const handleDrop = useCallback((event) => {
    event.preventDefault()
    setDragOver(false)
    validateAndSet(event.dataTransfer.files[0])
  }, [validateAndSet])

  const handleChange = (event) => {
    validateAndSet(event.target.files[0])
    event.target.value = ''
  }

  const handleSubmit = () => {
    if (file && onAnalyze) onAnalyze(file, difficulty)
  }

  const fileInfo = file ? (ACCEPTED[file.type] || { ext: 'MD', icon: RiFileTextLine }) : null
  const FileIcon = fileInfo?.icon

  return (
    <div className="rounded-2xl bg-white p-3 sm:p-4">
      <input
        ref={inputRef}
        id="study-file"
        type="file"
        accept=".pdf,.txt,.md,.markdown,.pptx"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleChange}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={() => setDragOver(true)}
          onDragOver={(event) => { event.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          aria-describedby="file-requirements"
          className={`group flex min-h-[20rem] w-full flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-8 text-center transition-all duration-200 sm:min-h-[22rem] ${
            dragOver
              ? 'border-amber-500 bg-amber-50 shadow-inner'
              : 'border-ink-200 bg-ink-50/70 hover:border-amber-400 hover:bg-amber-50/40'
          }`}
        >
          <span className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-all duration-200 ${
            dragOver
              ? 'border-amber-200 bg-amber-100 text-amber-700'
              : 'border-white bg-white text-ink-700 group-hover:-translate-y-1 group-hover:text-amber-700'
          }`}>
            <RiUploadCloud2Line className="text-3xl" aria-hidden="true" />
          </span>
          <span className="font-display text-2xl font-semibold text-ink-900">
            {dragOver ? 'Release to add your file' : 'Add your study material'}
          </span>
          <span className="mt-2 max-w-xs text-sm leading-6 text-ink-500">
            Drop a document here, or <span className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4">browse your device</span>
          </span>
          <span id="file-requirements" className="mt-7 flex flex-wrap justify-center gap-2">
            {['PDF', 'TXT', 'MD', 'PPTX'].map((format) => (
              <span key={format} className="rounded-lg border border-ink-100 bg-white px-2.5 py-1 font-mono text-[0.66rem] font-medium text-ink-500 shadow-sm">
                {format}
              </span>
            ))}
          </span>
          <span className="mt-3 text-[0.7rem] font-medium text-ink-400">Maximum file size: 15 MB</span>
        </button>
      ) : (
        <div className="animate-fadeUp animate-fill-both">
          <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/80 p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white shadow-md">
              <FileIcon className="text-xl" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{file.name}</p>
              <p className="mt-1 font-mono text-[0.68rem] text-ink-400">{fileInfo.ext} · {formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => { setFile(null); setError('') }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink-400 transition-colors duration-200 hover:bg-white hover:text-ink-800"
              aria-label={`Remove ${file.name}`}
            >
              <RiCloseLine className="text-xl" aria-hidden="true" />
            </button>
          </div>

          <fieldset className="mt-5">
            <legend className="section-label mb-3">Choose explanation depth</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {DIFFICULTY_OPTIONS.map((option) => {
                const isSelected = difficulty === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setDifficulty(option.value)}
                    className={`min-h-[4.5rem] rounded-xl border p-3 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-ink-900 bg-ink-900 text-white shadow-md'
                        : 'border-ink-100 bg-ink-50/70 text-ink-800 hover:border-amber-300 hover:bg-amber-50/40'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{option.label}</span>
                    <span className={`mt-1 block text-[0.68rem] ${isSelected ? 'text-ink-300' : 'text-ink-400'}`}>{option.desc}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-primary mt-5 w-full py-3.5 text-sm"
          >
            <RiSparklingLine className="text-lg" aria-hidden="true" />
            {isLoading ? 'Creating your study set…' : 'Create my study set'}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-700" role="alert">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[0.62rem] font-bold" aria-hidden="true">!</span>
          {error}
        </p>
      )}
    </div>
  )
}
