# Practical 5: MongoDB Integration and Schema Design with Mongoose

## Objective
To connect a MongoDB database to an Express server and enforce data validation through a Mongoose schema.

## Carried Forward from Practical 4
- Replaces the temporary in-memory JavaScript array with persistent MongoDB document collections.
- Maintains the request logging middleware, route parameters validation, and centralized error handling pipeline.

## Key Features & Schema Definition
1. **Mongoose Schema (`models/Task.js`)**:
   - `title`: String, required, trim, minlength: 2.
   - `description`: String, trim.
   - `completed`: Boolean, default: `false`.
   - `priority`: String, enum: `['low', 'medium', 'high']`, default: `'medium'`.
   - `createdAt`: Date, default: `Date.now`.
   - **Pre-save Hook:** Automatically trims whitespace from the title string.
2. **Robust Validation & Error Transformation**:
   - Catches Mongoose `ValidationError` and returns clean, human-readable structured JSON error messages instead of raw database stack traces.
   - ObjectId verification ensures non-hex ID params return 400 Bad Request immediately.

## Configuration & Environment
Configure your database connection inside `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/taskdb?retryWrites=true&w=majority
```

## How to Run
1. Navigate to the directory:
   ```bash
   cd Practical-05
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Test CRUD operations via Postman / Thunder Client using `http://localhost:5000/tasks`.
