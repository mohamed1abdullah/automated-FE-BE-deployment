# Personal Profile Web Application

## Project Overview

This project is a simple, containerized web application that displays a personal profile. It consists of a frontend, a backend, and a database.

The frontend is a single-page application that fetches profile data from the backend. It displays the profile information and allows the user to enter an "edit mode" to update the data.

The backend is a Node.js application using Express.js that serves the frontend and provides a RESTful API to retrieve and update profile data from a SQLite database.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js, SQLite3, CORS
- **Containerization:** Docker, Docker Compose

## Project Structure

```
.
├── docker-compose.yml
├── README.md
├── errors.md
├── backend/
│   ├── ...
├── db/
│   ├── ...
└── frontend/
    ├── ...
```

- **`backend/`**: Contains the Node.js API server.
- **`frontend/`**: Contains the single-page frontend application.
- **`db/`**: Contains the SQLite database file and seeding script.
- **`docker-compose.yml`**: The Docker Compose file for orchestrating the services.
- **`errors.md`**: A log of the errors encountered and their resolutions during development.

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/profile`: Retrieves the personal profile data.
- `PUT /api/profile`: Updates the personal profile data.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### How to Run

To run the application, execute the following command from the root directory of the project:

```bash
docker-compose up --build
```

- The frontend will be available at `http://localhost:8080`.
- The backend API will be available at `http://localhost:3000`.