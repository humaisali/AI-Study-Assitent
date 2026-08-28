/**
 * Repair small formatting mistakes language models commonly make without
 * changing the meaning of the generated study material.
 */
export function normalizeStudyMarkdown(value = '') {
  const normalizedMath = value
    .replace(/\u00a0/g, ' ')
    .replace(/\s*\u2014\s*/g, ' - ')
    .replace(/\r\n?/g, '\n')
    .replace(/\$\$[\s\S]*?\$\$|\$[^$\n]*\$/g, (expression) => expression.replace(/\\_/g, '_'))

  return normalizedMath
    .split('\n')
    .map((line) => {
      const cleanLine = line.replace(/^\s*\\\|/, '|')
      const collapsedBreaks = cleanLine.match(/\|\s+\|/g)?.length || 0
      const hasTableDivider = /\|\s*:?-{3,}:?\s*\|/.test(cleanLine)

      if (collapsedBreaks >= 2 && hasTableDivider) {
        return cleanLine.replace(
          /\|\s+\|\s*(?=(?:\*\*|`|\$|[A-Za-z0-9]|:?-{3}))/g,
          '|\n| ',
        )
      }

      return cleanLine
    })
    .join('\n')
    .trim()
}
