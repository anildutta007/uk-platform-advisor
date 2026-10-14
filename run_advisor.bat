@echo off
title UK Investment Platform Advisor (ISA, SIPP & Trading)
echo ==============================================================
echo        Starting UK Investment Platform Advisor...
echo        Impartial Fee Comparison for AJ Bell, ii, HL, T212, Fidelity, Vanguard
echo ==============================================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting server with Node.js on http://127.0.0.1:8070 ...
    node server.js
    goto end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting server with Python on http://127.0.0.1:8070 ...
    python server.py
    goto end
)

echo.
echo Neither Node nor Python server available. Launching index.html directly in your default browser...
start "" "%~dp0index.html"

:end
pause
