@echo off
cd /d "%~dp0"
echo ========================================================
echo   Stopping Practical 11: Docker Compose Teardown
echo ========================================================

echo Stopping and removing containers and networks...
docker-compose down

echo.
echo [Done] All Practical 11 containers stopped successfully.
pause
