/**
 * services/geminiService.js
 * Wrapper around Google Gemini API
 */

import { GoogleGenerativeAI } from '@google/generative-ai'
import { getExplanationPrompt, getQuizPrompt, getSummaryPrompt } from '../utils/prompts.js'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Supported: gemini-1.5-flash-latest | gemini-1.5-pro-latest | gemini-2.0-flash
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

/**
 * Get a Gemini model instance with safety settings
 */
function getModel() {
  return genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 4096,
    },
  })
}

/**
 * Generate text from a prompt with retry logic
 * @param {string} prompt
 * @param {number} retries
 */
async function generateText(prompt, retries = 2) {
  const model = getModel()
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const response = result.response
      return response.text()
    } catch (err) {
      if (attempt === retries) throw err
      // Wait before retry (exponential backoff)
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
    }
  }
}

/**
 * Ensure Gemini API key is configured
 */
function ensureApiKey() {
  const key = process.env.GEMINI_API_KEY
  if (!key || typeof key !== 'string' || key.trim() === '') {
    throw new Error('API key is not configured. Add GEMINI_API_KEY to server/.env — get one at https://makersuite.google.com/app/apikey')
  }
}

/**
 * Run all three AI tasks (explanation, quiz, summary) in parallel
 * @param {string} text - Extracted document text
 * @param {string} difficulty - 'beginner' | 'intermediate' | 'advanced'
 * @returns {{ explanation: string, quiz: string, summary: string }}
 */
export async function analyzeText(text, difficulty = 'intermediate') {
  ensureApiKey()

  if (!text || text.trim().length < 50) {
    throw new Error('Document content is too short to analyze. Please upload a file with more content.')
  }

  const [explanation, quiz, summary] = await Promise.all([
    generateText(getExplanationPrompt(text, difficulty)),
    generateText(getQuizPrompt(text, difficulty)),
    generateText(getSummaryPrompt(text)),
  ])

  return { explanation, quiz, summary }
}
