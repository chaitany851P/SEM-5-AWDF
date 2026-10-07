@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting Practical 11: Multi-Container Docker Stack
echo   (Frontend + Backend + MongoDB via Docker Compose)
echo ========================================================

echo [Docker Check] Verifying Docker daemon is responding...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker Desktop and retry.
    pause
    exit /b 1
)

echo [Compose] Building and launching containers...
docker-compose up -d --build

echo.
echo Containers are booting in the background!
docker ps
echo.
echo Application Endpoints:
echo - Frontend UI: http://localhost:5173
echo - Backend API: http://localhost:5000/tasks
echo - MongoDB:     localhost:27017
echo.
timeout /t 3 >nul
start http://localhost:5173
echo Run stop.bat to stop and remove all containers.
pause
