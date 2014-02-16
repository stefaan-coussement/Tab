@echo off
setlocal enabledelayedexpansion

if "%1" neq "" goto folder

:nofolder
call _add-links-all ..\..
call _add-links-all ..
call _add-links-all ..\project
call _add-links-all ..\topics
call _add-links-all ..\reference
goto end

:folder
for /f "tokens=* delims=" %%a in ('dir /a:-d /b %1\*.md ^| find /v "_"') do (
    echo %1\%%a
    call _add-links %1\%%a
)
goto end

:end
