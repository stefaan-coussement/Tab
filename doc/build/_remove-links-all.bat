@echo off
setlocal enabledelayedexpansion

if "%1" neq "" goto folder

:nofolder
call _remove-links-all ..\..
call _remove-links-all ..
call _remove-links-all ..\project
call _remove-links-all ..\topics
call _remove-links-all ..\reference
goto end

:folder
for /f "tokens=* delims=" %%a in ('dir /a:-d /b %1\*.md ^| find /v "_"') do (
    echo %1\%%a
    call _remove-links %1\%%a
)
goto end

:end
