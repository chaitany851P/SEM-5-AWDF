@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 02: Routing & State Management
echo ========================================================

if not exist "node_modules" (
    echo [Setup] Installing npm dependencies...
    call npm install
)

echo [Launch] Starting Vite development server...
start "Practical-02 (Port 5173)" cmd /k "title Practical-02 && npm run dev"
timeout /t 2 >nul
start http://localhost:5173
echo.
echo Practical 02 is running at http://localhost:5173
echo Run stop.bat to terminate this practical.
