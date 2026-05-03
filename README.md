# Team Task Manager

A modern full-stack task management application built with Spring Boot on the backend and Vite-powered React on the frontend.

## Overview

`team-task-manager` is designed to help teams organize projects, manage tasks, and monitor progress through a clean dashboard experience. The backend exposes a REST API with authentication, user management, project collaboration, and task tracking. The frontend consumes that API with a responsive React UI.

## Architecture

- `backend/` — Spring Boot REST API
- `frontend/` — Vite + React UI
- `backend/src/main/java` — Java application source
- `frontend/src` — React application source

## Technology Stack

- Java 17
- Spring Boot 3.2.x
- Spring Security
- Spring Data JPA
- H2 in-memory database (default runtime)
- JWT authentication
- Vite
- React
- Tailwind CSS
- Axios
- React Router DOM
- Recharts

## Key Features

- JWT-based authentication and authorization
- User management and role control
- Project and task CRUD operations
- Dashboard metrics and analytics
- Responsive frontend with modern UI components

## Prerequisites

- Java 17 JDK
- Maven 3.9+
- Node.js 18+
- npm 10+ or Yarn

## Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Build the backend application:
   ```bash
   mvn clean package
   ```

3. Run the backend service:
   ```bash
   mvn spring-boot:run
   ```

4. By default, the backend uses an embedded H2 database. Configuration is available in `backend/src/main/resources/application.properties`.

## Frontend Setup

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the local Vite URL in your browser to view the application.

## Production Build

### Backend

```bash
cd backend
mvn clean package
java -jar target/task-manager-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
```

The built frontend assets will be available under `frontend/dist`.

## API Endpoints

The backend exposes REST endpoints under `/api/*`. Common endpoint groups include:

- `/api/auth` — authentication and login
- `/api/users` — user management
- `/api/projects` — project operations
- `/api/tasks` — task operations
- `/api/dashboard` — dashboard reporting

> Tip: Use the network inspector or API client to verify exact request shapes when integrating the frontend.

## Developer Notes

- The backend is configured for Java 17 and Spring Boot 3.2.x.
- The frontend uses Vite with React and Tailwind CSS.
- Authentication is token-based; the frontend should attach the JWT to API requests.
- If you extend the API, verify CORS and security configuration in `backend/src/main/java/com/taskmanager/config`.

## Recommended Workflow

1. Run backend and frontend concurrently during development.
2. Use `npm run dev` for fast frontend hot reload.
3. Use the Maven build for backend validation and packaging.

## Contribution

1. Fork the repository.
2. Create a feature branch.
3. Add or update functionality.
4. Verify backend build with `mvn clean package`.
5. Verify frontend behavior with `npm run dev`.

## License

This project does not specify a license. Add a license file if you intend to distribute or open-source this code.
