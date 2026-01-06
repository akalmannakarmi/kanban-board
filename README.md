# Kanban Board — Full Stack Assignment

A production-ready Kanban Board application built as a hiring assignment.  
The focus is on **clean architecture, correctness, and clarity**, not over-engineering.

🔗 **Live Demo:** https://kanban.akal.com.np

---

## ✨ Features

- Kanban board with 4 columns:
  - To Do
  - In Progress
  - In Review
  - Done
- Create, edit, delete tasks
- Drag & drop between columns
- Stable ordering within columns
- Task metadata:
  - title, description
  - status, position
  - created_at, updated_at

### Data Modes
- **Local Mode**
  - Uses browser `localStorage`
- **Backend Mode**
  - Uses FastAPI + PostgreSQL
- Mode is user-selectable and persisted

> The two modes are intentionally independent to avoid implicit merging and data loss.

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- HTML5 Drag & Drop

### Backend
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy / SQLModel
- Pydantic

### Infrastructure & DevOps
- Docker & docker-compose
- GitHub Actions (CI/CD)
  - Build backend Docker image
  - Push to Docker Hub
- Kubernetes (backend deployment)
- Frontend deployed on Cloudflare Pages

---

## 🚀 Local Development

### Prerequisites
- Docker
- Docker Compose

### Run locally

```bash
cp example.env .env
docker-compose up
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs


```
