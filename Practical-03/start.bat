@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 03: REST API Integration
echo ========================================================

if not exist "node_modules" (
    echo [Setup] Installing npm dependencies...
    call npm install
)

echo [Launch] Starting Vite development server...
start "Practical-03 (Port 5173)" cmd /k "title Practical-03 && npm run dev"
timeout /t 2 >nul
start http://localhost:5173/projects
echo.
echo Practical 03 is running at http://localhost:5173
echo Run stop.bat to terminate this practical.
