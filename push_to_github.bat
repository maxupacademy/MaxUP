@echo off
title Push to GitHub - MaxUP
echo ===================================================
echo   Pushing MaxUP changes to GitHub...
echo ===================================================
echo.

git push origin main
if %errorlevel% equ 0 goto success

echo.
echo [WARNING] Standard push failed (Permission / authentication required).
echo.
set /p GITHUB_TOKEN="Enter your GitHub Personal Access Token (PAT): "
if "%GITHUB_TOKEN%"=="" goto end

git push https://%GITHUB_TOKEN%@github.com/maxupacademy/MaxUP.git main
if %errorlevel% equ 0 goto success

goto error

:success
echo.
echo ===================================================
echo [SUCCESS] Push completed successfully!
echo Vercel will automatically trigger deployment.
echo ===================================================
goto end

:error
echo.
echo [ERROR] Git push failed. Please check token permissions.
goto end

:end
echo.
pause
