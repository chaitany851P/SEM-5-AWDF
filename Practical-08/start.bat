@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 08: Performance & Lazy Loading
echo   (Code-Split React UI + Express Backend + MongoDB)
echo ========================================================

echo [MongoDB Check] Ensuring MongoDB Windows Service is active...
powershell -NoProfile -Command "Get-Service MongoDB -ErrorAction SilentlyContinue | Where-Object { $_.Status -ne 'Running' } | Start-Service -ErrorAction SilentlyContinue"

if not exist "backend\node_modules" (
    echo [Setup] Installing backend npm packages...
    pushd backend && call npm install && popd
)

if not exist "frontend\node_modules" (
    echo [Setup] Installing frontend npm packages...
    pushd frontend && call npm install && popd
)

echo [Launch 1/2] Starting Express Backend on http://localhost:5000 ...
start "Practical-08-Backend (Port 5000)" cmd /k "title Practical-08-Backend && cd /d ""%~dp0backend"" && node server.js"

timeout /t 2 >nul

echo [Launch 2/2] Starting Vite Frontend on http://localhost:5173 ...
start "Practical-08-Frontend (Port 5173)" cmd /k "title Practical-08-Frontend && cd /d ""%~dp0frontend"" && npm run dev"

timeout /t 2 >nul
start http://localhost:5173/analytics
echo.
echo Application is running!
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:5000
echo Run stop.bat to terminate both servers.
