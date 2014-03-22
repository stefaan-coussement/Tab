@echo off
setlocal enabledelayedexpansion

if "%1" neq "" goto folder

:nofolder
call remove-links-all ..\docs
call remove-links-all ..\docs\project
call remove-links-all ..\docs\topics
call remove-links-all ..\docs\reference
goto end

:folder
for /f "tokens=* delims=" %%a in ('dir /a:-d /b %1\*.md ^| find /v "_"') do (
    echo %1\%%a
    call remove-links %1\%%a
)
goto end

:end
