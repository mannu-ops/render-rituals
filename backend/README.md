# Render Rituals — Backend REST API

Production-ready Node.js & Express REST API for **Render Rituals Studio & Admin Control Center**.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, JSON Parser, Dotenv
- **Data Store**: JSON Document Store (`src/data/db.json`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run the Server
```bash
npm run dev
# Server starts at http://localhost:5000
```

---

## 📡 API Endpoints

### Health & Auth
- `GET /api/health` — Service health check
- `POST /api/auth/login` — Verify admin master passcode

### Projects (3D Renders & 2D CAD Plans)
- `GET /api/projects` — Get all project suites
- `GET /api/projects/:slug` — Get project details by slug
- `POST /api/projects` — Create a new project suite
- `PUT /api/projects/:id` — Update an existing project
- `DELETE /api/projects/:id` — Delete a project

### Inquiries & Leads Pipeline
- `GET /api/inquiries` — List all client inquiries
- `POST /api/inquiries` — Submit new inquiry from contact form
- `PATCH /api/inquiries/:id/status` — Update inquiry status (`new`, `in_discussion`, `completed`)

### Studio Settings
- `GET /api/settings` — Get studio WhatsApp, email, status
- `PUT /api/settings` — Update studio configuration
