# Start both frontend and backend servers

Write-Host "Starting Mee-Shop Full Stack Application..." -ForegroundColor Green
Write-Host ""

# Start backend server in new window
Write-Host "Starting Backend Server on http://localhost:5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 2

# Start frontend server in new window
Write-Host "Starting Frontend Server on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
