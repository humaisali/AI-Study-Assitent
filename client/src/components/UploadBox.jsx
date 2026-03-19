import React, { useRef, useState, useCallback } from 'react'
import { RiUploadCloud2Line, RiFilePdf2Line, RiFileTextLine, RiCloseLine, RiSparklingLine } from 'react-icons/ri'

const ACCEPTED = {
  'application/pdf': { ext: 'PDF', icon: RiFilePdf2Line },
  'text/plain': { ext: 'TXT', icon: RiFileTextLine },
  'text/markdown': { ext: 'MD', icon: RiFileTextLine },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { ext: 'PPTX', icon: RiFileTextLine },
}

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner', desc: 'Simple language, basics only', color: 'text-sage-600' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Balanced depth', color: 'text-amber-600' },
  { value: 'advanced', label: 'Advanced', desc: 'Technical and detailed', color: 'text-ink-700' },
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

  const validateAndSet = useCallback((f) => {
    setError('')
    if (!f) return
    const allowed = Object.keys(ACCEPTED)
    // also allow by extension for .md files
    const isMarkdown = f.name.endsWith('.md') || f.name.endsWith('.markdown')
    if (!allowed.includes(f.type) && !isMarkdown) {
      setError('Unsupported file type. Please upload a PDF, TXT, MD, or PPTX file.')
      return
    }
    if (f.size > 15 * 1024 * 1024) {
      setError('File is too large. Maximum size is 15 MB.')
      return
    }
    setFile(f)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    validateAndSet(dropped)
  }, [validateAndSet])

  const handleChange = (e) => {
    validateAndSet(e.target.files[0])
    e.target.value = ''
  }

  const handleSubmit = () => {
    if (file && onAnalyze) {
      onAnalyze(file, difficulty)
    }
  }

  const fileInfo = file ? (ACCEPTED[file.type] || { ext: 'FILE', icon: RiFileTextLine }) : null
  const FileIcon = fileInfo?.icon

  return (
    <div className="w-full animate-fadeUp animate-fill-both">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
          ${dragOver
            ? 'border-sage-400 bg-sage-50/60 scale-[1.01]'
            : file
              ? 'border-ink-200 bg-parchment/60 cursor-default'
              : 'border-ink-200 bg-parchment/40 hover:border-ink-300 hover:bg-parchment/70'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt,.md,.markdown,.pptx"
          className="hidden"
          onChange={handleChange}
        />

        <div className="p-10 flex flex-col items-center text-center">
          {!file ? (
            <>
              {/* Upload icon */}
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300
                ${dragOver ? 'bg-sage-100 scale-110' : 'bg-ink-100'}
              `}>
                <RiUploadCloud2Line className={`text-3xl transition-colors duration-300 ${dragOver ? 'text-sage-600' : 'text-ink-400'}`} />
              </div>

              <p className="font-display text-xl font-semibold text-ink-800 mb-1">
                {dragOver ? 'Release to upload' : 'Drop your study material'}
              </p>
              <p className="font-body text-sm text-ink-400 mb-4">
                Drag & drop here, or{' '}
                <span className="text-sage-600 font-medium underline underline-offset-2">browse files</span>
              </p>

              {/* Supported formats */}
              <div className="flex flex-wrap justify-center gap-2">
                {['PDF', 'TXT', 'Markdown', 'PPTX'].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 bg-white/70 border border-ink-100 rounded-lg text-xs font-mono text-ink-500 font-medium"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* File preview */}
              <div className="flex items-center gap-4 w-full max-w-sm">
                <div className="w-12 h-12 rounded-xl bg-ink-800 flex items-center justify-center shrink-0">
                  <FileIcon className="text-xl text-cream" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-body font-semibold text-ink-800 truncate text-sm">{file.name}</p>
                  <p className="font-mono text-xs text-ink-400 mt-0.5">
                    {fileInfo.ext} · {formatSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setError('') }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors duration-150"
                >
                  <RiCloseLine className="text-lg" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm font-body text-red-600 flex items-center gap-1.5 animate-fadeUp animate-fill-both">
          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
          {error}
        </p>
      )}

      {/* Difficulty Selector */}
      {file && (
        <div className="mt-5 animate-fadeUp animate-fill-both">
          <p className="section-label mb-3">Explanation Depth</p>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={`
                  p-3 rounded-xl border text-left transition-all duration-150
                  ${difficulty === opt.value
                    ? 'border-ink-700 bg-ink-800 text-cream shadow-warm'
                    : 'border-ink-200 bg-white/60 hover:border-ink-300'
                  }
                `}
              >
                <p className={`font-body font-semibold text-sm ${difficulty === opt.value ? 'text-cream' : 'text-ink-800'}`}>
                  {opt.label}
                </p>
                <p className={`font-body text-xs mt-0.5 ${difficulty === opt.value ? 'text-ink-300' : 'text-ink-400'}`}>
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {file && (
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-5 w-full btn-primary justify-center py-4 text-base rounded-2xl animate-fadeUp animate-fill-both animate-delay-100"
        >
          <RiSparklingLine className="text-lg" />
          {isLoading ? 'Analyzing…' : 'Analyze with AI'}
        </button>
      )}
    </div>
  )
}
