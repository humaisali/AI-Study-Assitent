/**
 * controllers/aiController.js
 * Handles file extraction and orchestrates AI analysis
 */

import fs from 'fs'
import path from 'path'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import { analyzeText } from '../services/geminiService.js'

/**
 * Extract plain text from an uploaded file based on mimetype / extension
 * @param {Express.Multer.File} file
 * @returns {Promise<string>}
 */
async function extractText(file) {
  const ext = path.extname(file.originalname).toLowerCase()
  const buffer = fs.readFileSync(file.path)

  // PDF extraction
  if (file.mimetype === 'application/pdf' || ext === '.pdf') {
    const data = await pdf(buffer)
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('Could not extract text from this PDF. It may be scanned or image-based.')
    }
    return data.text
  }

  // Plain text / markdown
  if (
    file.mimetype === 'text/plain' ||
    file.mimetype === 'text/markdown' ||
    ['.txt', '.md', '.markdown'].includes(ext)
  ) {
    return buffer.toString('utf-8')
  }

  // PPTX — extract raw XML text (basic extraction)
  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    ext === '.pptx'
  ) {
    // Basic text extraction from PPTX (XML-based)
    const content = buffer.toString('binary')
    // Extract text between XML tags — good enough for slide text
    const textMatches = content.match(/<a:t>([^<]+)<\/a:t>/g) || []
    const text = textMatches
      .map(m => m.replace(/<\/?a:t>/g, ''))
      .join(' ')
      .trim()

    if (!text) {
      throw new Error('Could not extract text from this PPTX file.')
    }
    return text
  }

  throw new Error(`Unsupported file type: ${ext}`)
}

/**
 * POST /api/study
 * Main controller — extract text then call AI
 */
export async function studyController(req, res) {
  const file = req.file

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded. Please attach a PDF, TXT, MD, or PPTX file.' })
  }

  try {
    // 1. Extract text from the uploaded file
    const text = await extractText(file)

    // 2. Get difficulty from form data (default: intermediate)
    const difficulty = req.body.difficulty || 'intermediate'
    const validDifficulties = ['beginner', 'intermediate', 'advanced']
    const safeDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'intermediate'

    // 3. Run AI analysis
    const result = await analyzeText(text, safeDifficulty)

    // 4. Return results
    return res.status(200).json(result)

  } catch (err) {
    const msg = err.message || String(err)
    console.error('[studyController] Error:', msg)
    if (process.env.NODE_ENV !== 'production') {
      console.error('[studyController] Full error:', err)
    }

    // Known user-facing errors (extraction / content)
    if (msg.includes('too short') || msg.includes('extract text') || msg.includes('Unsupported')) {
      return res.status(422).json({ error: msg })
    }

    // Gemini: missing or invalid API key
    if (
      msg.includes('API_KEY') ||
      msg.includes('API key') ||
      msg.includes('not configured') ||
      msg.includes('not valid') ||
      msg.includes('invalid') ||
      msg.includes('Invalid API key')
    ) {
      return res.status(500).json({
        error: 'Invalid or missing Gemini API key. Check GEMINI_API_KEY in server/.env and get a key at https://makersuite.google.com/app/apikey',
      })
    }

    // Gemini: actual rate limit (429 / RESOURCE_EXHAUSTED) — "try again later"
    const isRateLimit =
      msg.includes('429') ||
      msg.includes('RESOURCE_EXHAUSTED') ||
      /quota exceeded|rate limit|too many requests/i.test(msg)
    if (isRateLimit) {
      return res.status(429).json({ error: 'AI quota exceeded. Please try again later.' })
    }

    // Gemini: model not available / quota not enabled (e.g. gemini-2.0 not enabled for key)
    if (/quota|not available|not enabled|disabled|unsupported model/i.test(msg)) {
      return res.status(500).json({
        error: 'This model may not be available for your API key. Try setting GEMINI_MODEL=gemini-1.5-flash-latest in server/.env',
      })
    }

    // Gemini: permission / API not enabled
    if (msg.includes('403') || msg.includes('PERMISSION_DENIED')) {
      return res.status(500).json({
        error: 'Gemini API access denied. Ensure the API is enabled and your key has access.',
      })
    }

    // Gemini: blocked / safety
    if (msg.includes('blocked') || msg.includes('SAFETY') || msg.includes('Blocked')) {
      return res.status(400).json({
        error: 'Content was blocked by the AI safety filters. Try different study material.',
      })
    }

    // In development, surface the real error so you can fix it
    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ error: msg })
    }

    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' })

  } finally {
    // Always clean up the temp file
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path)
    }
  }
}
