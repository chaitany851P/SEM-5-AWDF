@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 04: RESTful API (Express Backend)
echo ========================================================

if not exist "node_modules" (
    echo [Setup] Installing npm dependencies...
    call npm install
)

echo [Launch] Starting Express server on port 5000...
start "Practical-04 (Port 5000)" cmd /k "title Practical-04 && node server.js"
timeout /t 2 >nul
start http://localhost:5000/tasks
echo.
echo Practical 04 API is running at http://localhost:5000/tasks
echo Run stop.bat to terminate this practical.
