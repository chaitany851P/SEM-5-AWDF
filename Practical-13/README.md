# Practical 13: AI API Integration into a Web Application

## Objective
To integrate an external AI service (Google Gemini API / OpenAI API) securely into the full-stack Task Management application with responsible AI guardrails and graceful failure degradation.

## Architecture
```
React Frontend (localhost:5173)
       │
       ├──► 1. Clicks '✨ AI Generate Description'
       │
       ▼ (Passes title only via authenticated Bearer JWT)
Express Backend (localhost:5000)
       │
       ├──► Stored API Key in .env (GEMINI_API_KEY / OPENAI_API_KEY)
       ├──► Rate Limiter Check (Max 5 requests/min)
       │
       ▼ (HTTPS API Call)
Google Gemini 1.5 Flash / OpenAI API
       │
       ├──► Success: Parsed text returned to Express
       └──► Failure / Timeout / No Key: Caught by try/catch ──► Local Graceful Fallback Engine
       │
       ▼
React Form UI
       └──► Description populated as editable suggestion + AI Disclaimer Badge
```

---

## Key Features & Security Design

1. **Strict Server-Side Key Isolation**:
   - The AI API key is loaded into process memory from `.env` on the Node/Express backend.
   - The key is **never bundled** into Vite frontend bundles or transmitted in client network requests.
2. **Graceful Failure Degradation**:
   - If an API key is missing, network is offline, or rate quota is reached, the backend catches the error without crashing.
   - It seamlessly returns a deterministic local template fallback:
     ```json
     {
       "success": true,
       "description": "Complete the necessary milestones, review requirements, and verify implementation...",
       "provider": "Local Graceful Degradation Engine",
       "fallback": true
     }
     ```
3. **Editable User In-The-Loop AI**:
   - Generated descriptions and priority suggestions are pre-filled as editable form suggestions, keeping the human user in control before persistence.
4. **Responsible AI & Governance**:
   - Transparent disclaimer displayed on every generated output: *"Content is AI-assisted. Please review before saving."*
   - Only non-sensitive task titles are sent to the external model (no passwords, PII, or internal tokens).

---

## How to Run

### 1. Configure Optional API Key (Optional)
In `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb_ai
JWT_SECRET=ai_secret_key_2026

# Optional: Add your key if available (leave blank to test Graceful Degradation):
GEMINI_API_KEY=your_gemini_api_key_here
# or
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Start Backend
```bash
cd Practical-13/backend
npm install
npm start
```

### 3. Start Frontend
```bash
cd Practical-13/frontend
npm install
npm run dev
```

### 4. Test the Feature
1. Sign in or register in the UI (`http://localhost:5173/tasks`).
2. Type a title, e.g. `Implement Microservice Architecture`.
3. Click **"✨ AI Generate Description"**.
4. Observe the description auto-fill instantly with provider attribution and disclaimer!
