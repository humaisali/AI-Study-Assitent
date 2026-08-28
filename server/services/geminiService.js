/**
 * services/geminiService.js
 * Wrapper around the Google Gen AI SDK.
 */

import { GoogleGenAI } from '@google/genai'
import { getExplanationPrompt, getQuizPrompt, getSummaryPrompt } from '../utils/prompts.js'

const DEFAULT_MODEL = 'gemini-3.6-flash'
const LEGACY_MODEL_ALIASES = new Set([
  'gemini-1.0-pro',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-2.5-flash',
])

/**
 * Resolve environment values at request time. Static ESM imports are evaluated
 * before loadEnv.js runs, so reading process.env at module scope is unreliable.
 */
export function getConfiguredModelName() {
  const configuredModel = process.env.GEMINI_MODEL?.trim()
  if (!configuredModel || LEGACY_MODEL_ALIASES.has(configuredModel)) {
    return DEFAULT_MODEL
  }
  return configuredModel
}

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error(
      'Gemini API key is not configured. Add GEMINI_API_KEY to server/.env. Get one at https://aistudio.google.com/app/apikey',
    )
  }
  return apiKey
}

function isTransientError(error) {
  const message = error?.message || String(error)
  return /429|RESOURCE_EXHAUSTED|5\d\d|UNAVAILABLE|fetch failed|ECONNRESET|ETIMEDOUT|socket hang up/i.test(message)
}

function removeEmDashes(value) {
  return value.replace(/\s*\u2014\s*/g, ' - ')
}

/**
 * Generate text from a prompt with retry logic
 */
async function generateText(ai, model, prompt, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          maxOutputTokens: 8192,
        },
      })

      const text = response.text?.trim()
      if (!text) {
        throw new Error('Gemini returned an empty response.')
      }
      return removeEmDashes(text)
    } catch (error) {
      if (attempt === retries || !isTransientError(error)) throw error
      await new Promise(resolve => setTimeout(resolve, 750 * 2 ** attempt))
    }
  }
}

/**
 * Run all three AI tasks (explanation, quiz, summary) in parallel
 * @param {string} text - Extracted document text
 * @param {string} difficulty - 'beginner' | 'intermediate' | 'advanced'
 * @returns {{ explanation: string, quiz: string, summary: string }}
 */
export async function analyzeText(text, difficulty = 'intermediate') {
  if (!text || text.trim().length < 50) {
    throw new Error('Document content is too short to analyze. Please upload a file with more content.')
  }

  const ai = new GoogleGenAI({ apiKey: getApiKey() })
  const model = getConfiguredModelName()

  const [explanation, quiz, summary] = await Promise.all([
    generateText(ai, model, getExplanationPrompt(text, difficulty)),
    generateText(ai, model, getQuizPrompt(text, difficulty)),
    generateText(ai, model, getSummaryPrompt(text)),
  ])

  return { explanation, quiz, summary }
}
