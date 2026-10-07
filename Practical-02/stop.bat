@echo off
echo ========================================================
echo   Stopping Practical 02 (Vite Dev Server)
echo ========================================================

powershell -NoProfile -Command ^
  "Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | " ^
  "ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }; " ^
  "Get-Process -Name 'node' -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Practical-02' } | Stop-Process -Force -ErrorAction SilentlyContinue"

echo [Done] Practical 02 stopped successfully.
pause
