Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Launching Hari Nandhini S - Personal Portfolio System" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# Start FastAPI Backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting FastAPI Backend on http://127.0.0.1:8000...' -ForegroundColor Cyan; python backend/run.py"

# Start Vite Frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location frontend; Write-Host 'Starting Vite Frontend on http://localhost:5173...' -ForegroundColor Green; npm run dev"

Write-Host "Both Frontend and Backend services are running!" -ForegroundColor Green
Write-Host "Frontend Application: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend API Swagger:  http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host ""

