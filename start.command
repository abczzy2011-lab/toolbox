#!/bin/bash
# 万能工具箱 - macOS 启动器
# 双击运行即可在浏览器中打开万能工具箱

# 设置终端标题
echo -e "\033]0;万能工具箱\007"

# 切换到脚本所在目录
cd "$(dirname "$0")"

echo "============================================"
echo "   万能工具箱 正在启动..."
echo "============================================"
echo ""

# 尝试查找 Python
if command -v python3 &>/dev/null; then
    PY=python3
elif command -v python &>/dev/null; then
    PY=python
else
    echo "[错误] 未找到 Python！"
    echo ""
    echo "macOS 通常自带 Python。如果找不到，请运行："
    echo "  xcode-select --install"
    echo ""
    echo "或从 https://www.python.org/downloads/ 下载安装"
    echo ""
    read -p "按回车键退出..."
    exit 1
fi

echo "启动中..."
echo ""
$PY start.py
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo ""
    echo "[错误] 启动失败！请检查是否有端口冲突。"
    echo ""
    read -p "按回车键退出..."
fi

exit $EXIT_CODE
