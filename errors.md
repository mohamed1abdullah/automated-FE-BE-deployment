# Explanation of Errors and Fixes

This document details the errors that were encountered and the steps taken to resolve them.

## 1. Initial "db error"

- **Error**: When running `curl http://localhost:3000/api/profile`, the backend returned `{"error":"db error"}`.
- **Problem**: The backend service, running inside a Docker container, was unable to connect to the SQLite database. The file path to the database was incorrect within the container's filesystem, and the Docker configuration was not correctly set up to handle the application's structure.
- **Fix**:
    1.  **Simplified `backend/Dockerfile`**: The Dockerfile was modified to have a consistent working directory (`/app`) and to correctly copy the application files.
    2.  **Adjusted `docker-compose.yml`**: The build context for the backend service was updated to point directly to the `backend` directory, making the build process more explicit and reliable.

## 2. Database Initialization Failure (`ENOENT`)

- **Error**: During the `docker-compose up --build` process, the build failed with an `ENOENT: no such file or directory, open '/db/seed.sql'` error.
- **Problem**: The `db-init.js` script, responsible for seeding the database, was being run as a `RUN` command in the `backend/Dockerfile`. This command is executed when the Docker image is *built*. However, the `db` directory containing the `seed.sql` file was being mounted as a volume, which only occurs when the container is *run*. Therefore, the `seed.sql` file was not available during the build process.
- **Fix**:
    1.  **Modified Dockerfile `CMD`**: The `RUN node db-init.js` command was removed from the Dockerfile.
    2.  **Created `start:docker` script**: A new script was added to `backend/package.json`: `"start:docker": "node db-init.js && node server.js"`. This script first initializes the database and then starts the application server.
    3.  **Updated Dockerfile `CMD`**: The `CMD` in the `backend/Dockerfile` was changed to `["npm", "run", "start:docker"]`. This ensures that the database is initialized every time the container starts, at which point the database volume is correctly mounted and accessible.

## 3. Database Connection Failure (`SQLITE_CANTOPEN`)

- **Error**: After fixing the initialization issue, the backend logs showed a `DB open error [Error: SQLITE_CANTOPEN: unable to open database file]`.
- **Problem**: While the `db-init.js` script was now working, the main application itself (`db.js`) was still using an incorrect path to the database file within the container.
- **Fix**: The file path in `backend/db.js` was corrected to point to the proper location of the database file within the container's filesystem (`/app/db/data.db`).

## 4. Frontend JavaScript `TypeError`

- **Error**: The frontend application was failing with `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`.
- **Problem**: This error indicated that the JavaScript code in `app.js` was executing before the HTML document was fully loaded and parsed. As a result, the script was trying to attach event listeners to DOM elements that did not yet exist.
- **Fix**:
    1.  **Initial Attempt**: The code in `app.js` was wrapped in a `DOMContentLoaded` event listener. This is the standard solution for this type of problem, as it ensures the script only runs after the DOM is ready.
    2.  **Root Cause and Final Fix**: The error persisted, which pointed to a browser caching issue. The browser was loading a stale, cached version of `app.js` that did not include the `DOMContentLoaded` fix. The final solution was to implement "cache busting" by adding a version query parameter to the script tag in `index.html` (e.g., `<script src="app.js?v=2"></script>`). This forces the browser to bypass the cache and download the latest version of the `app.js` file, ensuring the correct code is executed.
