@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 05: Express + MongoDB Mongoose API
echo ========================================================

echo [MongoDB Check] Ensuring MongoDB Windows Service is active...
powershell -NoProfile -Command "Get-Service MongoDB -ErrorAction SilentlyContinue | Where-Object { $_.Status -ne 'Running' } | Start-Service -ErrorAction SilentlyContinue"

if not exist "node_modules" (
    echo [Setup] Installing npm dependencies...
    call npm install
)

echo [Launch] Starting Express MongoDB server on port 5000...
start "Practical-05 (Port 5000)" cmd /k "title Practical-05 && node server.js"
timeout /t 2 >nul
start http://localhost:5000/tasks
echo.
echo Practical 05 API is running at http://localhost:5000/tasks
echo Run stop.bat to terminate this practical.
