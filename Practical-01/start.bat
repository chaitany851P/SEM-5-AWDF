@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 01: React Component Architecture
echo ========================================================

if not exist "node_modules" (
    echo [Setup] Installing npm dependencies...
    call npm install
)

echo [Launch] Starting Vite development server...
start "Practical-01 (Port 5173)" cmd /k "title Practical-01 && npm run dev"
timeout /t 2 >nul
start http://localhost:5173
echo.
echo Practical 01 is running at http://localhost:5173
echo Run stop.bat to terminate this practical.
