@echo off
chcp 65001 >nul 2>&1
title 万能工具箱

echo ============================================
echo    万能工具箱 正在启动...
echo ============================================
echo.

REM 尝试查找 Python
if exist "%SYSTEMROOT%\python.exe" (
    set PY=%SYSTEMROOT%\python.exe
) else if exist "%SYSTEMROOT%\python3.exe" (
    set PY=%SYSTEMROOT%\python3.exe
) else if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    set PY=%LOCALAPPDATA%\Programs\Python\Python311\python.exe
) else if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
    set PY=%LOCALAPPDATA%\Programs\Python\Python312\python.exe
) else if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    set PY=%LOCALAPPDATA%\Programs\Python\Python313\python.exe
) else (
    REM 尝试用 PATH 中的 python
    where python >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        set PY=python
    ) else (
        where python3 >nul 2>&1
        if %ERRORLEVEL% EQU 0 (
            set PY=python3
        ) else (
            echo [错误] 未找到 Python！
            echo.
            echo 请安装 Python 3.8 或更高版本：
            echo https://www.python.org/downloads/
            echo.
            echo 安装后重新双击此文件即可。
            echo.
            pause
            exit /b 1
        )
    )
)

REM 切换到脚本所在目录
cd /d "%~dp0"

echo 启动中...
%PY% start.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 启动失败！请检查是否有端口冲突。
    echo 也可以尝试关闭其他占用 8899 端口的程序。
    echo.
    pause
)

exit /b
