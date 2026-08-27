# 🛠️ 万能工具箱

27 款免费离线工具，纯浏览器端运行，数据完全本地化，隐私安全。

![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F96%2F94%2F100-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/abczzy2011-lab/toolbox)

## ⚡ Google Lighthouse 评分

| 维度 | 分数 |
|------|------|
| Performance 性能 | **100** |
| Accessibility 无障碍 | **96** |
| Best Practices 最佳实践 | **94** |
| SEO 搜索优化 | **100** |

---

## 安装方式

### 1. Homebrew Tap（macOS / Linux）

```bash
brew tap abczzy2011-lab/tap
brew install tool-box
brew services start tool-box
# 浏览器自动打开 http://localhost:8899
```

一行安装：

```bash
brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

更新：

```bash
brew update && brew upgrade tool-box
```

手动管理：

```bash
brew services stop tool-box      # 停止
brew services restart tool-box   # 重启
brew services status tool-box    # 状态
```

卸载：

```bash
brew uninstall tool-box
brew untap abczzy2011-lab/tap
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

## 🌍 跨平台支持

| 系统 | 安装方式 | 启动命令 | 浏览器打开 | 备注 |
|------|----------|----------|-----------|------|
| **macOS** | `brew tap abczzy2011-lab/tap && brew install tool-box` | `tool-box serve` | ✅ `open` 自动打开 | 支持 Apple Silicon + Intel |
| **Linux** (x86_64/ARM64) | `brew install tool-box` (需先装 Homebrew) | `tool-box serve` | ✅ `xdg-open` 自动打开 | Ubuntu/Debian/Fedora/Arch |
| **HarmonyOS** (NEXT) | 手动安装 | `node start.js` 或 `bash start.sh` | 手动打开 URL | DevEco Studio 终端 |
| **Windows** | 手动安装 / WSL | 双击 `start.bat` | ✅ 自动打开 | 或 `tool-box serve` |

---

## 📌 启动器功能说明

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

```
==============================================
  🛠️  万能工具箱  |  http://localhost:8899
==============================================

  🖥️  本机地址: http://192.168.0.111:8899
  🌐  本地地址: http://127.0.0.1:8899

  📌 手机扫码/输入地址访问:
     http://192.168.0.111:8899

  ⏹  停止服务: tool-box stop
```

---

## 🖱️ 双点击直接打开

| 系统 | 操作 |
|------|------|
| macOS | 双击 `start.command` |
| Windows | 双击 `start.bat` |
| Linux | 双击 `start.command`（需有 bash） |
| HarmonyOS | DevEco Studio 终端运行 `node start.js` |

---

## 🔧 配置项

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `TOOLBOX_PORT` | 服务端口 | `8899` |

---

## 📁 目录结构

```
toolbox/
├── tool-box          # 跨平台启动器（CLI）
├── start.py          # Python HTTP 服务器
├── start.js          # Node.js HTTP 服务器
├── start.sh          # HarmonyOS/Linux 启动脚本
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

## 🛠️ 包含 27 款工具

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
