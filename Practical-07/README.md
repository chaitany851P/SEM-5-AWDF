# Practical 7: Authentication and Middleware Pipeline

## Objective
To implement JWT-based authentication and input validation as part of the Express middleware pipeline and secure the frontend interactions.

## Carried Forward
- Extends the Practical 6 full-stack application.
- All task CRUD routes are now secured and require a valid Bearer JWT.

## Key Features Implemented
1. **User Authentication Architecture**:
   - `POST /api/auth/register`: Hashes passwords using `bcrypt.hash(password, 10)` before storing the `User` document.
   - `POST /api/auth/login`: Validates credentials using `bcrypt.compare()` and signs a JSON Web Token (JWT) with 1-hour expiration.
   - `GET /api/auth/me`: Decodes the active user token and returns profile details.
2. **Middleware Pipeline**:
   - `authMiddleware`: Extracts `Authorization: Bearer <token>`, validates via `jwt.verify()`, and attaches `req.user`. Returns 401 if missing or invalid.
   - `validateRegisterInput` & `validateLoginInput`: Enforces validation rules (email regex, password length >= 6) before reaching database logic.
3. **Frontend Integration**:
   - Authentication view with Sign In / Sign Up modes.
   - Persists JWT in `localStorage` and automatically sends `Bearer <token>` headers.
   - Gracefully handles session expirations with 401 automatic redirection to login.

## How to Run
### 1. Start Auth Backend
```bash
cd Practical-07/backend
npm install
npm start
# Runs on http://localhost:5000
```

### 2. Start Frontend
```bash
cd Practical-07/frontend
npm install
npm run dev
# Open http://localhost:5173
```
