@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 12: CI/CD Pipeline & Automated Tests
echo ========================================================

echo [MongoDB Check] Ensuring MongoDB Windows Service is active...
powershell -NoProfile -Command "Get-Service MongoDB -ErrorAction SilentlyContinue | Where-Object { $_.Status -ne 'Running' } | Start-Service -ErrorAction SilentlyContinue"

if not exist "backend\node_modules" (
    echo [Setup] Installing backend npm packages (including Jest & Supertest)...
    pushd backend && call npm install && popd
)

if not exist "frontend\node_modules" (
    echo [Setup] Installing frontend npm packages...
    pushd frontend && call npm install && popd
)

echo [Launch 1/2] Starting Backend on http://localhost:5000 ...
start "Practical-12-Backend (Port 5000)" cmd /k "title Practical-12-Backend && cd /d ""%~dp0backend"" && node server.js"

timeout /t 2 >nul

echo [Launch 2/2] Starting Frontend on http://localhost:5173 ...
start "Practical-12-Frontend (Port 5173)" cmd /k "title Practical-12-Frontend && cd /d ""%~dp0frontend"" && npm run dev"

timeout /t 2 >nul
start http://localhost:5173/tasks
echo.
echo Application is running!
echo.
echo To run the automated test suite locally:
echo   cd backend ^&^& npm test
echo.
echo Run stop.bat to terminate both servers.
