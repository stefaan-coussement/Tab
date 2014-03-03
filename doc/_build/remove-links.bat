@echo off
setlocal enabledelayedexpansion
type nul > __temp__
set marker="<!-- ##### start of links ##### -->"
set flag=1
for /f "tokens=1* delims=]" %%a in ('find /v /n "" ^< %1') do (
    if /i %marker% equ "%%b" (set flag=0)
    if !flag! equ 1 echo.%%b>> __temp__
)
type __temp__ > %1
del __temp__