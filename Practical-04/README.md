# Practical 4: Building a RESTful API with Node.js and Express

## Objective
To design and implement a RESTful backend server with complete CRUD endpoints using the Express middleware pipeline.

## Features Implemented
1. **CRUD Endpoints**:
   - `GET /tasks`: Retrieve all tasks.
   - `GET /tasks/:id`: Retrieve a specific task by ID.
   - `POST /tasks`: Create a new task (validates `title` presence).
   - `PUT /tasks/:id`: Update an existing task.
   - `DELETE /tasks/:id`: Delete a task.
2. **Middleware Pipeline**:
   - **Global Request Logger:** Logs method, URL, and timestamp (`[LOG] GET /tasks - ISO_TIMESTAMP`).
   - **Content-Type Validator:** Rejects POST/PUT requests without `application/json` header (400 Bad Request).
   - **Parameter Validator:** Ensures `:id` is a valid integer.
   - **Custom 404 Route Handler:** Returns structured JSON for undefined paths.
   - **Global Error Handling Middleware:** Defined with 4 arguments `(err, req, res, next)` at the end of the pipeline to catch uncaught exceptions and return structured JSON (500).

## How to Run
1. Navigate to the directory:
   ```bash
   cd Practical-04
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Test endpoints in Postman, Thunder Client, or cURL at `http://localhost:5000/tasks`.
