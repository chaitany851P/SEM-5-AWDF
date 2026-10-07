@echo off
echo ========================================================
echo   Stopping Practical 04 (Express API Server)
echo ========================================================

powershell -NoProfile -Command ^
  "Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | " ^
  "ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }; " ^
  "Get-Process -Name 'node' -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Practical-04' } | Stop-Process -Force -ErrorAction SilentlyContinue"

echo [Done] Practical 04 stopped successfully.
pause
