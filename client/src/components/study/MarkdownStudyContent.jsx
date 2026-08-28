import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
import { normalizeStudyMarkdown } from '../../utils/normalizeStudyMarkdown.js'

const markdownComponents = {
  h1: ({ children }) => <h3 className="study-heading study-heading-primary">{children}</h3>,
  h2: ({ children }) => <h3 className="study-heading study-heading-primary">{children}</h3>,
  h3: ({ children }) => <h4 className="study-heading study-heading-secondary">{children}</h4>,
  h4: ({ children }) => <h5 className="study-heading study-heading-tertiary">{children}</h5>,
  p: ({ children }) => <p className="study-paragraph">{children}</p>,
  ul: ({ children }) => <ul className="study-list list-disc marker:text-brand-500">{children}</ul>,
  ol: ({ children }) => <ol className="study-list list-decimal marker:font-bold marker:text-brand-700">{children}</ol>,
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  strong: ({ children }) => <strong className="font-bold text-slate-950">{children}</strong>,
  em: ({ children }) => <em className="font-medium italic text-slate-700">{children}</em>,
  hr: () => <hr className="my-8 border-slate-200" />,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
  blockquote: ({ children }) => <blockquote className="study-blockquote">{children}</blockquote>,
  pre: ({ children }) => <pre className="study-code-block scrollbar-thin">{children}</pre>,
  code: ({ className, children }) => <code className={className || 'study-inline-code'}>{children}</code>,
  table: ({ children }) => (
    <figure className="study-table-frame">
      <div className="study-table-scroll scrollbar-thin" role="region" aria-label="Scrollable comparison table" tabIndex="0">
        <table className="study-table">{children}</table>
      </div>
      <figcaption className="study-table-hint sm:hidden">Scroll sideways to compare every column</figcaption>
    </figure>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th scope="col">{children}</th>,
  td: ({ children }) => <td>{children}</td>,
}

export default function MarkdownStudyContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
      components={markdownComponents}
    >
      {normalizeStudyMarkdown(content)}
    </ReactMarkdown>
  )
}
