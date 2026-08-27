<div align="center">

# 🛠️ 万能工具箱

![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F94%2F100%2F100-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/abczzy2011-lab/toolbox)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Linux%20%7C%20Windows%20%7C%20HarmonyOS-lightgrey)](https://github.com/abczzy2011-lab/toolbox)
[![Stars](https://img.shields.io/github/stars/abczzy2011-lab/toolbox?style=social)](https://github.com/abczzy2011-lab/toolbox)

> 打开网页，解决问题，关掉网页，一切不留痕迹。

**27 款免费离线工具，纯浏览器运行，零安装 · 零注册 · 零数据上传**

</div>

---

## ⚡ Google Lighthouse 评分

| 🚀 Performance | ♿ Accessibility | ⚙️ Best Practices | 🔍 SEO |
|:-:|:-:|:-:|:-:|
| **100** | **94** | **100** | **100** |

![Lighthouse 评分实测](./images/lighthouse-score.png)

---

## ✨ 为什么选择万能工具箱

| | 万能工具箱 | 传统在线工具 |
|---|---|---|
| 隐私 | ✅ 数据完全本地，不上传 | ❌ 数据经过第三方服务器 |
| 注册 | ✅ 零注册，打开即用 | ❌ 需要注册登录 |
| 离线 | ✅ 纯离线运行 | ❌ 必须联网 |
| 广告 | ✅ 零广告，零干扰 | ❌ 满屏广告 |
| 价格 | ✅ 永久免费 | ❌ 需要付费解锁 |
| 更新 | ✅ 一键更新 | ❌ 手动找新地址 |

---

## 🚀 快速开始

### Homebrew Tap（macOS / Linux，推荐）

```bash
brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

> 浏览器会自动打开 `http://localhost:8899`，开始用吧 🎉

分步安装：

```bash
brew tap abczzy2011-lab/tap        # 添加软件源
brew install tool-box              # 安装工具箱
brew services start tool-box       # 启动服务
```

管理命令：

```bash
brew services stop tool-box        # 停止
brew services restart tool-box     # 重启
brew services status tool-box      # 状态
brew update && brew upgrade tool-box # 更新
brew uninstall tool-box            # 卸载
```

### 📦 还没有 Homebrew？

**macOS / Linux：** 一行安装

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后：
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"   # Apple Silicon
# 或 eval "$(/usr/local/bin/brew shellenv)" # Intel
brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

更多平台安装见 [brew.sh](https://brew.sh)

### 🖱️ 手动安装（Windows / HarmonyOS / 所有平台）

```bash
unzip 万能工具箱-本地版.zip -d toolbox
cd toolbox
./tool-box serve
```

| 系统 | 双击哪个文件 |
|------|-------------|
| macOS | `start.command` |
| Windows | `start.bat` |
| Linux | `start.command` |

---

## 🌍 跨平台支持

| 系统 | 安装方式 | 启动方式 | 浏览器 | 备注 |
|------|----------|----------|--------|------|
| 🍎 macOS | Homebrew Tap / 双击 | `tool-box serve` | ✅ 自动 | Apple Silicon + Intel |
| 🐧 Linux | Homebrew Tap / 双击 | `tool-box serve` | ✅ `xdg-open` | Ubuntu / Debian / Fedora / Arch |
| 🪟 Windows | 双击 / WSL | `start.bat` | ✅ 自动 | 或 `tool-box serve` |
| 📱 HarmonyOS NEXT | 手动安装 | `node start.js` | 手动打开 | DevEco Studio 终端 |

---

## 💻 启动界面

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

> 💡 手机也能用：电脑运行后，用手机浏览器访问 `tool-box ip` 输出的地址，27 个工具全在。

---

## 🛠️ 27 款工具

| 分类 | 工具 |
|------|------|
| 🧮 **计算** | 智能计算器、BMI 计算器、进制转换器、单位转换器 |
| ✏️ **文本** | 文本处理、字数统计、Base64 编解码、URL 编解码、CSV 处理、文本对比、正则测试、随机文本 |
| 💻 **开发** | JSON 格式化、Markdown 编辑器、时区转换、哈希生成、文本搜索 |
| 🔐 **安全** | 密码生成器、密码强度检测 |
| 🎨 **图形** | 颜色选择器、图片压缩、图片裁剪、二维码生成、ASCII 艺术、截图指南 |
| 🎭 **趣味** | Emoji 表情大全、色觉测试 |

---

## 🔧 命令参考

| 命令 | 说明 |
|------|------|
| `tool-box serve` | 启动服务，自动打开浏览器 |
| `tool-box ip` | 显示局域网地址 |
| `tool-box status` | 检查服务状态 |
| `tool-box stop` | 停止服务 |
| `tool-box --port 9999` | 指定端口 |
| `tool-box --no-browser` | 启动但不自动打开浏览器 |
| `tool-box --help` | 帮助 |

环境变量：

| 变量 | 默认值 |
|------|--------|
| `TOOLBOX_PORT` | `8899` |

---

## ❓ 常见问题

**Q：数据安全吗？**
> A：绝对安全。所有处理在浏览器本地完成，不上传任何服务器。

**Q：需要联网吗？**
> A：不需要。纯离线运行。

**Q：可以放 U 盘带吗？**
> A：可以。解压到 U 盘，插上任何电脑双击即可。

**Q：怎么更新？**
> A：`brew update && brew upgrade tool-box`，或重新下载解压覆盖。

---

## 📄 许可证

[MIT License](./LICENSE) © 2026 — 自由使用、修改、分发。

---

<div align="center">

**⭐ 如果这个工具箱帮到了你，请给一个 Star，这是最大的鼓励！**

</div>
