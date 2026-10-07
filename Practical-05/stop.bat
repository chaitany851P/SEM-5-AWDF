@echo off
echo ========================================================
echo   Stopping Practical 05 (Express API Server)
echo ========================================================

powershell -NoProfile -Command ^
  "Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | " ^
  "ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }; " ^
  "Get-Process -Name 'node' -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Practical-05' } | Stop-Process -Force -ErrorAction SilentlyContinue"

echo [Done] Practical 05 stopped successfully.
pause
