@echo off
setlocal enabledelayedexpansion

:menu
echo -------------------------
echo Choose an option:
echo 1. Install
echo 2. Reinstall
echo 3. Delete
echo -------------------------
set /p choice="Enter your choice (1/2/3): "
if "%choice%"=="1" goto install
if "%choice%"=="2" goto reinstall
if "%choice%"=="3" goto delete
echo Invalid choice. Please try again.
goto menu

:install
echo [ Cache ] Removing current version & cache...
rmdir /s /q "%USERPROFILE%\AppData\LocalLow\Multiverse ApS" 2>nul
rmdir /s /q "%USERPROFILE%\AppData\Local\KogamaLauncher-WWW" 2>nul

echo [ Setting Up ] Downloading Kogama Launcher...
set download_url=https://www-gamelauncher.kogstatic.com/www/KogamaLauncher.msi?_t=1437643420
set temp_msi=%temp%\KogamaLauncher.msi

echo -------------------------
echo [ Downloading Installer ]
echo -------------------------

bitsadmin /transfer KogamaLauncherDownload %download_url% "%temp_msi%" >nul 2>&1
if %errorlevel% neq 0 (
    echo [ Setting Up ] BITSAdmin failed, switching to curl...
    curl -L -o "%temp_msi%" "%download_url%"
)
if not exist "%temp_msi%" (
    echo -------------------------
    echo [ Error ] Failed to download Kogama Launcher. Exiting...
    echo -------------------------
    pause
    exit /b 1
)

echo [ Installing ] Launching the Kogama Launcher installer...
start /wait msiexec /i "%temp_msi%"

echo [ Info ] Waiting 15 seconds for installation to complete...
timeout /t 15 >nul

set launcher_dir="%USERPROFILE%\AppData\Local\KogamaLauncher-WWW\Launcher"
if not exist !launcher_dir! (
    echo -------------------------
    echo [ Warning ] Installation did not complete. Attempting repair...
    echo -------------------------
    start /wait msiexec /fa "%temp_msi%"

    echo [ Info ] Waiting 15 seconds for repair to complete...
    timeout /t 15 >nul

    if not exist !launcher_dir! (
        echo -------------------------
        echo [ Error ] Installation/Repair failed. Exiting...
        echo -------------------------
        pause
        exit /b 1
    )
)
if exist !launcher_dir!\Launcher.exe (
    echo [ Cache ] Removing existing Launcher.exe...
    del /f /q !launcher_dir!\Launcher.exe
)

echo -------------------------
echo [ Patching Launcher ]
echo -------------------------
set micai_url=https://github.com/Aethusx/OpenKogama_Launcher/releases/download/1.0/Launcher_Micai.exe
set temp_micai=%temp%\Launcher_Micai.exe

bitsadmin /transfer CustomLauncherDownload %micai_url% "%temp_micai%" >nul 2>&1
if %errorlevel% neq 0 (
    echo [ Patching ] BITSAdmin failed, switching to curl...
    curl -L -o "%temp_micai%" "%micai_url%"
)
if not exist "%temp_micai%" (
    echo -------------------------
    echo [ Error ] Failed to download Micai. Exiting...
    echo -------------------------
    pause
    exit /b 1
)

echo [ Patching ] Replacing Launcher.exe...
copy /y "%temp_micai%" !launcher_dir!\Launcher.exe >nul

echo -------------------------
echo [ Completed ] Process completed successfully!
echo -------------------------
pause
exit /b

:reinstall
echo [ Reinstall ] Removing existing installation...
goto delete

echo [ Reinstall ] Installing again...
goto install

:delete
echo [ Delete ] Removing Kogama Launcher completely...
rmdir /s /q "%USERPROFILE%\AppData\LocalLow\Multiverse ApS" 2>nul
rmdir /s /q "%USERPROFILE%\AppData\Local\KogamaLauncher-WWW" 2>nul

echo -------------------------
echo [ Completed ] Kogama Launcher deleted.
echo -------------------------
pause
exit /b
