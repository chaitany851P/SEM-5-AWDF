@echo off
echo ========================================================
echo   Stopping All Running Practical Servers & Containers
echo ========================================================

echo [1/3] Terminating Node.js servers on ports 5000 and 5173...
powershell -NoProfile -Command ^
  "Get-NetTCPConnection -LocalPort 5000, 5173 -ErrorAction SilentlyContinue | " ^
  "ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo [2/3] Terminating any orphan practical terminal windows...
powershell -NoProfile -Command ^
  "Get-Process -Name 'node' -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Practical' } | Stop-Process -Force -ErrorAction SilentlyContinue"

echo [3/3] Stopping any running Docker containers...
docker-compose -f Practical-11\docker-compose.yml down >nul 2>&1

echo.
echo ========================================================
echo   All AWDF practical processes stopped.
echo ========================================================
pause
