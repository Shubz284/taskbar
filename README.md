# Task Manager (Taskify)

A full-stack todo application with user authentication and per-user task management.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Express-5-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## Live Demo

- **Frontend:** https://taskbar-blue.vercel.app
- **Backend API:** https://taskbar-backend-v8sa.onrender.com

## Features

- User registration and login (JWT authentication)
- Create, update, delete, and complete todos
- Active and completed task views
- Search tasks by title or description
- Responsive card-based dashboard
- User profile management

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Radix UI, React Router |
| Backend  | Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Zod |
| Deploy   | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Project Structure

```
taskbar/
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── components/   # UI and todo components
│   │   ├── pages/        # Login, Signup, Dashboard
│   │   └── lib/          # Utilities
│   └── vercel.json       # SPA routing for Vercel
├── backend/           # Express REST API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── validation/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_TOKEN
npm run dev
```

Server runs on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
echo "VITE_BACKEND_URL=http://localhost:5000" > .env
npm run dev
```

App runs on `http://localhost:5173`.

## API Reference

| Method   | Endpoint                    | Description        |
|----------|-----------------------------|--------------------|
| `POST`   | `/api/auth/signup`          | Register user      |
| `POST`   | `/api/auth/login`           | Login, get JWT     |
| `GET`    | `/api/auth/profile`         | Get user profile   |
| `POST`   | `/api/todo/add`             | Create todo        |
| `GET`    | `/api/todo/getalltodos`     | List todos         |
| `PATCH`  | `/api/todo/update/:todoId`  | Update todo        |
| `DELETE` | `/api/todo/delete/:todoId`  | Delete todo        |

Protected routes require a `token` header with the JWT.

## Deployment

### Backend (Render)

1. Connect this repo and set root directory to `backend`
2. Build: `npm install` | Start: `npm start`
3. Set `MONGO_URI` and `JWT_TOKEN` in environment variables

### Frontend (Vercel)

1. Connect this repo and set root directory to `frontend`
2. Set `VITE_BACKEND_URL` to your deployed backend URL
3. Deploy — `vercel.json` handles client-side routing

## License

ISC
