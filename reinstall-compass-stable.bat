@echo off
echo ========================================================
echo  Cleaning and Installing Stable MongoDB Compass (v1.41)
echo ========================================================
echo.

echo [1/3] Closing any stuck Compass processes...
taskkill /F /IM MongoDBCompass.exe /T 2>nul

echo [2/3] Clearing corrupted AppData cache...
rmdir /s /q "%APPDATA%\MongoDB Compass" 2>nul
rmdir /s /q "%LOCALAPPDATA%\mongodb\compass" 2>nul

echo [3/3] Installing stable MongoDB Compass Community edition via winget...
winget install --id MongoDB.Compass.Community -e --accept-package-agreements --accept-source-agreements

echo.
echo ========================================================
echo  Installation completed! 
echo  You can now launch MongoDB Compass from the Start Menu.
echo  Connect to: mongodb://127.0.0.1:27017
echo ========================================================
pause
