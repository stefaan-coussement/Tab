@echo off
setlocal enabledelayedexpansion

if "%1" neq "" goto folder

:nofolder
call add-links-all ..\docs
call add-links-all ..\docs\project
call add-links-all ..\docs\topics
call add-links-all ..\docs\reference
goto end

:folder
for /f "tokens=* delims=" %%a in ('dir /a:-d /b %1\*.md ^| find /v "_"') do (
    echo %1\%%a
    call add-links %1\%%a
)
goto end

:end
