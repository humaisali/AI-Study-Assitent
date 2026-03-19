# 🎓 AI Study Assistant

Turn your study notes into clear explanations and practice quizzes — powered by Google Gemini AI.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss) ![Node](https://img.shields.io/badge/Node.js-20-339933?logo=node.js) ![Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-4285F4?logo=google)

---

## ✨ Features

- 📄 **Upload** PDF, TXT, Markdown, or PPTX files
- 🤖 **AI Explanation** — Gemini explains your notes in simple, clear language
- 🧠 **Quiz Generation** — Practice with auto-generated multiple choice questions
- 📚 **Smart Summary** — Concise bullet-point summary of key concepts
- 🎯 **Difficulty Levels** — Beginner, Intermediate, or Advanced explanations
- 📊 **Quiz Scoring** — Track your performance with a score card

---

## 🗂️ Project Structure

```
ai-study-assistant/
│
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadBox.jsx       # Drag-and-drop file upload
│   │   │   ├── ExplanationPanel.jsx # AI explanation display
│   │   │   ├── QuizPanel.jsx       # Interactive quiz
│   │   │   └── Loader.jsx          # Animated loading state
│   │   ├── services/
│   │   │   └── aiService.js        # Axios API calls
│   │   ├── pages/
│   │   │   └── Home.jsx            # Main page
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css              # Tailwind + custom styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
│
├── server/                    # Node.js + Express backend
│   ├── controllers/
│   │   └── aiController.js        # Request handler + file extraction
│   ├── routes/
│   │   └── aiRoutes.js            # Express routes + multer config
│   ├── services/
│   │   └── geminiService.js       # Gemini API integration
│   ├── utils/
│   │   └── prompts.js             # AI prompt templates
│   ├── uploads/                   # Temp file storage (auto-cleaned)
│   ├── .env.example
│   └── index.js                   # Server entry point
│
├── package.json               # Root scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-study-assistant.git
cd ai-study-assistant
```

### 2. Install dependencies

```bash
# Install all dependencies (root + client + server)
npm run install:all
```

Or manually:

```bash
# Root
npm install

# Client
cd client && npm install

# Server
cd ../server && npm install
```

### 3. Configure environment variables

```bash
cd server
cp .env.example .env
```

Open `server/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

> **Get your Gemini API key:** Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and create a free API key.

### 4. Start the development servers

From the root directory:

```bash
npm run dev
```

This runs both servers concurrently:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 📡 API Reference

### `POST /api/study`

Upload a study document and receive AI analysis.

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | PDF, TXT, MD, or PPTX (max 15 MB) |
| `difficulty` | string | ❌ | `beginner` \| `intermediate` \| `advanced` (default: `intermediate`) |

**Response:** `application/json`

```json
{
  "explanation": "## Photosynthesis\n\nPhotosynthesis is the process...",
  "quiz": "Q1: What is the main purpose of photosynthesis?\nA) ...\nAnswer: B",
  "summary": "## Key Concepts\n\n- Plants convert sunlight...\n\n## Key Takeaways\n..."
}
```

**Error responses:**

| Status | Meaning |
|--------|---------|
| `400` | No file uploaded or invalid file type |
| `413` | File too large (> 15 MB) |
| `422` | Cannot extract text from file |
| `429` | Gemini API quota exceeded |
| `500` | Server error |

### `GET /api/health`

Health check endpoint.

```json
{ "status": "ok", "timestamp": "...", "service": "AI Study Assistant API" }
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Styling | TailwindCSS 3 (pure, no custom PostCSS) |
| Icons | React Icons |
| Markdown | react-markdown |
| HTTP client | Axios |
| Backend | Node.js, Express |
| File uploads | Multer |
| PDF parsing | pdf-parse |
| AI | Google Gemini 1.5 Flash |

---

## 🎨 Design System

The UI uses a warm editorial aesthetic with:

- **Fonts:** Playfair Display (headings) + DM Sans (body) + JetBrains Mono (code)
- **Colors:** Warm ink tones, sage green accents, amber highlights
- **Theme:** Parchment/cream background with subtle grain texture

---

## 📝 Supported File Types

| Format | Notes |
|--------|-------|
| `.pdf` | Text-based PDFs only (scanned PDFs not supported) |
| `.txt` | Plain text files |
| `.md` / `.markdown` | Markdown files |
| `.pptx` | PowerPoint presentations (basic text extraction) |

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend in dev mode |
| `npm run client` | Run frontend only |
| `npm run server` | Run backend only |
| `npm run install:all` | Install all dependencies |

---

## 📄 License

MIT — feel free to use this project for learning or as a base for your own apps.
