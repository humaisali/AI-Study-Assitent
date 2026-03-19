/**
 * routes/aiRoutes.js
 * Defines all /api routes and sets up multer file upload middleware
 */

import express from 'express'
import multer from 'multer'
import path from 'path'
import { studyController } from '../controllers/aiController.js'

const router = express.Router()

// ─── Multer Configuration ─────────────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, `study-${unique}${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ]
  const allowedExts = ['.pdf', '.txt', '.md', '.markdown', '.pptx']
  const ext = path.extname(file.originalname).toLowerCase()

  if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only PDF, TXT, MD, and PPTX files are allowed.'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB max
  },
})

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /api/study — upload file and get AI analysis
router.post(
  '/study',
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: 'File is too large. Maximum allowed size is 15 MB.' })
        }
        return res.status(400).json({ error: err.message })
      }
      if (err) {
        return res.status(400).json({ error: err.message })
      }
      next()
    })
  },
  studyController
)

// GET /api/health — simple health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AI Study Assistant API',
  })
})

export default router
