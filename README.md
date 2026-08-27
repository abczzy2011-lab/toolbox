# 🛠️ 万能工具箱

27 款免费离线工具，纯浏览器端运行，数据完全本地化，隐私安全。

## 安装方式

### 1. Homebrew（macOS）

```bash
brew install toolbox
```

安装后自动启动：
```bash
brew services start tool-box
# 浏览器会自动打开 http://127.0.0.1:8899
```

手动操作：
```bash
brew services stop tool-box     # 停止服务
brew services restart tool-box  # 重启服务
```

### 2. 手动安装

```bash
unzip 万能工具箱-本地版.zip -d toolbox
cd toolbox
./tool-box serve          # 启动服务并打开浏览器
./tool-box ip             # 查看局域网地址（手机扫码用）
./tool-box status         # 检查服务状态
./tool-box stop           # 停止服务
./tool-box --port 9999    # 指定端口
./tool-box --no-browser   # 启动但不自动打开浏览器
```

---

## 📌 启动器功能说明

### 跨平台支持

| 系统 | 启动命令 | 浏览器打开 |
|------|----------|-----------|
| macOS | `./tool-box serve` | ✅ `open` 自动打开 |
| Linux | `./tool-box serve` | ✅ `xdg-open` 自动打开 |

### 命令参考

| 命令 | 说明 |
|------|------|
| `tool-box` / `tool-box serve` | 启动服务，自动打开浏览器 |
| `tool-box ip` | 显示局域网地址 |
| `tool-box status` | 检查服务是否运行 |
| `tool-box stop` | 停止服务 |
| `tool-box --port 9999` | 指定端口启动 |
| `tool-box --no-browser` | 启动但不打开浏览器 |
| `tool-box --help` | 显示帮助 |

### 使用示例

```bash
# 启动后终端会显示：
# ==============================================
#   🛠️  万能工具箱  |  http://localhost:8899
# ==============================================
#
#   🖥️  本机地址: http://192.168.0.111:8899
#   🌐  本地地址: http://127.0.0.1:8899
#
#   📌 手机扫码/输入地址访问:
#      http://192.168.0.111:8899
#
#   ⏹  停止服务: tool-box stop
```

---

## 🔧 配置项

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `TOOLBOX_PORT` | 服务端口 | `8899` |

---

## 双点击直接打开

macOS：双击 `start.command`  
Windows：双击 `start.bat`  

---

## 📁 目录结构

```
toolbox/
├── tool-box          # 跨平台启动器（CLI）
├── tool-box.rb       # Homebrew 公式
├── start.py          # Python HTTP 服务器
├── start.command     # macOS 双击启动
├── start.bat         # Windows 双击启动
├── postbuild.js      # 构建后修复
├── out/              # 静态网站文件
├── src/              # 源代码
├── LICENSE           # MIT 许可证
├── package.json
├── package-lock.json
├── next.config.js
└── 使用说明.txt
```

---

## 🛠️ 包含工具

| 分类 | 工具 |
|------|------|
| 计算 | 智能计算器、BMI计算器、进制转换器、单位转换器 |
| 文本 | 文本处理、字数统计、Base64编解码、URL编解码、CSV处理、文本对比、正则测试、随机文本 |
| 开发 | JSON格式化、Markdown编辑器、时区转换、哈希生成、文本搜索 |
| 安全 | 密码生成器、密码强度检测 |
| 图形 | 颜色选择器、图片压缩、图片裁剪、二维码生成、ASCII艺术、截图指南 |
| 趣味 | Emoji表情大全、色觉测试 |

---

## 📄 许可证

MIT License © 2026