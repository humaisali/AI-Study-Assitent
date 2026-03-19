/**
 * Load .env before any other app code runs.
 * Must be the first import in index.js so GEMINI_API_KEY is available when geminiService loads.
 */
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })
