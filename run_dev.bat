@echo off
echo ========================================================
echo   Launching Hari Nandhini S - Personal Portfolio System
echo ========================================================
echo.

REM Start FastAPI Backend
start cmd /k "echo Starting FastAPI Backend on http://127.0.0.1:8000... && python backend/run.py"

REM Start Vite Frontend
cd frontend
start cmd /k "echo Starting Vite React Frontend on http://localhost:5173... && npm run dev"

echo Both services launched in separate windows!
echo Frontend: http://localhost:5173
echo Backend API Docs: http://127.0.0.1:8000/docs
echo.
pause

