@echo off
REM HackLearn Pro - Quick Start Script for Windows
REM This script helps you quickly deploy the platform using Docker

echo.
echo ===================================================================
echo    HackLearn Pro - Gamified Ethical Hacking Platform
echo ===================================================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running.
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [OK] Docker is installed and running
echo.

echo Building and starting HackLearn Pro...
echo.

REM Try docker-compose first, then docker compose
docker-compose version >nul 2>&1
if errorlevel 1 (
    docker compose up -d --build
) else (
    docker-compose up -d --build
)

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to start HackLearn Pro
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ===================================================================
echo    HackLearn Pro is now running!
echo ===================================================================
echo.
echo Access the platform at: http://localhost:8080
echo.
echo Useful commands:
echo    Stop:    docker-compose down
echo    Restart: docker-compose restart
echo    Logs:    docker-compose logs -f
echo.
echo Happy learning! Stay ethical, stay secure!
echo.
pause