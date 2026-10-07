@echo off
echo ========================================================
echo   Stopping Practical 07 (Backend Port 5000 + Frontend Port 5173)
echo ========================================================

powershell -NoProfile -Command ^
  "Get-NetTCPConnection -LocalPort 5000, 5173 -ErrorAction SilentlyContinue | " ^
  "ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }; " ^
  "Get-Process -Name 'node' -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Practical-07' } | Stop-Process -Force -ErrorAction SilentlyContinue"

echo [Done] Practical 07 servers stopped successfully.
pause
