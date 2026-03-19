import axios from 'axios'

const BASE_URL = '/api'

/**
 * Upload a study file (PDF, TXT, MD) and receive AI explanation + quiz
 * @param {File} file
 * @param {string} difficulty - 'beginner' | 'intermediate' | 'advanced'
 * @param {function} onProgress - upload progress callback (0-100)
 * @returns {{ explanation: string, quiz: string, summary: string }}
 */
export async function analyzeDocument(file, difficulty = 'intermediate', onProgress) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('difficulty', difficulty)

  const response = await axios.post(`${BASE_URL}/study`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percent)
      }
    },
  })

  return response.data
}
