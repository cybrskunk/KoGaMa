@echo off
REM 
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm is not installed. Please install Node.js to get npm.
    exit /b 1
)

REM Install the npm package
echo Installing obfuscator-io-deobfuscator...
npm install -g obfuscator-io-deobfuscator
if %errorlevel% neq 0 (
    echo Failed to install obfuscator-io-deobfuscator.
    exit /b 1
)

REM
where pip >nul 2>nul
if %errorlevel% neq 0 (
    echo pip is not installed. Please install Python to get pip.
    exit /b 1
)

REM
echo Installing colorama==0.4.6...
pip install colorama==0.4.6
if %errorlevel% neq 0 (
    echo Failed to install colorama.
    exit /b 1
)

echo Installing Requests==2.32.3...
pip install Requests==2.32.3
if %errorlevel% neq 0 (
    echo Failed to install Requests.
    exit /b 1
)

echo All packages installed successfully.
pause
