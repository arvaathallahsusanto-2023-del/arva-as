@echo off
cd /d "%~dp0"
echo === POSYANDU DIGITAL ARCHIVE - AUTO RUN ===
echo.
echo [1/2] Mengupdate Database...
call npm run db:push
if %errorlevel% neq 0 (
    echo Gagal update database! Mereset...
)
echo.

echo [2/2] Menjalankan Server...
echo Aplikasi akan berjalan di: http://localhost:5000/posyandu
echo Tekan Ctrl+C untuk berhenti.
echo.
call npm run dev
pause
