# 🚀 Collaborative Task Manager

A full-stack **Task Management Dashboard** built using modern web technologies.
This application enables teams to manage projects, assign tasks, track progress, and visualize productivity through a clean and responsive interface.

---

## 📌 Overview

This project demonstrates a **real-world project management system** with:

* Project creation and team structure
* Task assignment and status tracking
* Dashboard insights for productivity monitoring
* RESTful backend architecture
* Clean and modular frontend design

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* H2 Database (for development)
* Maven

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

---

## ⚙️ Features

### ✅ Core Features

* Create and manage users
* Create and manage projects
* Create, update, and track tasks
* Update task status (TODO → IN_PROGRESS → DONE)

### 📊 Dashboard

* Total projects
* Total tasks
* Completed tasks
* In-progress tasks
* Pending tasks

### 🎨 UI Features

* Responsive design
* Clean dashboard layout
* Status badges with color coding
* Modular component structure

---

## 📂 Project Structure

```text
collaborative-task-manager/
│
├── backend/
│   ├── src/main/java/com/taskmanager/
│   ├── resources/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 🔹 Prerequisites

* Java 17+
* Node.js (v16+ recommended)
* Maven

---

## ▶️ Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8081
```

---

## ▶️ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Users

* `GET /api/users`
* `POST /api/users`

### Projects

* `GET /api/projects`
* `POST /api/projects`

### Tasks

* `GET /api/tasks/project/{id}`
* `POST /api/tasks`
* `PATCH /api/tasks/{id}/status`

### Dashboard

* `GET /api/dashboard`

---

## 🧪 Example Workflow

1. Create a user
2. Create a project
3. Create tasks under the project
4. Update task status
5. View dashboard metrics

---

## ⚠️ Notes

* Uses **H2 in-memory database** → data resets on restart
* No authentication implemented (can be extended with JWT)
* Designed for demonstration and learning purposes

---

## 🚀 Future Enhancements

* JWT Authentication & Role-Based Access Control
* Persistent database (PostgreSQL/MySQL)
* Real-time updates (WebSockets)
* Advanced analytics & charts
* Deployment (Railway / Render / Vercel)

---

## 📸 Screenshots

*Add UI screenshots here after frontend completion*

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 👤 Author

**Vijaykrishna**
GitHub: https://github.com/Vijaykrishna30

---

## ⭐ If you found this useful

Give this repository a ⭐ to support the project!
