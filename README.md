# 🛠️ 万能工具箱

![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F96%2F94%2F100-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/abczzy2011-lab/toolbox)

> 写给每一个需要工具，却不想被工具困住的普通人。

这不仅仅是一个工具箱——它是**你桌面上的瑞士军刀**，27 款工具，零安装、零注册、零数据上传，纯浏览器运行。

**它想帮你做到的是：** 打开网页，解决问题，关掉网页，一切不留痕迹。

---

## ⚡ Google Lighthouse 评分

经过严格测试，所有维度均达到最高分区间：

| 维度 | 分数 | 含义 |
|------|------|------|
| 🚀 Performance 性能 | **100** | 秒开，不卡顿 |
| ♿ Accessibility 无障碍 | **96** | 所有人都能用 |
| ⚙️ Best Practices 最佳实践 | **94** | 代码健康，安全合规 |
| 🔍 SEO 搜索优化 | **100** | 搜索引擎友好 |

> 实际测试截图：

![Lighthouse 评分实测](./images/lighthouse-score.png)

---

## 👋 你好，欢迎

如果你看到这里，说明你需要一个**简单、可靠、不需要动脑的工具箱**。

别担心——这个就是。

它不需要：
- ❌ 注册账号
- ❌ 安装一堆软件
- ❌ 记住一堆网址
- ❌ 担心隐私泄露

它只需要你：
- ✅ 打开一个网页
- ✅ 做你想做的事
- ✅ 关掉，走了

就这么简单。

---

## 🍺 安装方式

### 1. Homebrew Tap（macOS / Linux，推荐）

> Homebrew 是 macOS 和 Linux 最流行的包管理器。如果你还没装，下面有安装方法。

**一行搞定：**

```bash
brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

浏览器会自动打开 `http://localhost:8899`，开始用吧 🎉

如果你已经装好了 Homebrew，分步来：

```bash
brew tap abczzy2011-lab/tap         # 添加软件源
brew install tool-box               # 安装工具箱
brew services start tool-box        # 启动服务
```

管理命令：

```bash
brew services stop tool-box         # 停止服务
brew services restart tool-box      # 重启服务
brew services status tool-box       # 查看状态
brew update && brew upgrade tool-box # 更新到最新版
brew uninstall tool-box             # 卸载
```

---

### 📦 如果你还没有 Homebrew

**macOS：** 打开终端，粘贴以下命令并回车：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后继续：
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"   # Apple Silicon Mac
# 或
eval "$(/usr/local/bin/brew shellenv)"      # Intel Mac

brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

**Linux (Ubuntu / Debian)：**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后：
```bash
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

**Linux (Fedora / Arch / 其他)：** 见 [brew.sh](https://brew.sh)

---

### 2. 手动安装（所有系统通用）

适合不想装 Homebrew，或者用 Windows / HarmonyOS 的你。

下载压缩包后解压：

```bash
unzip 万能工具箱-本地版.zip -d toolbox
cd toolbox
./tool-box serve          # 启动服务并打开浏览器
```

常用命令：

| 命令 | 说明 |
|------|------|
| `./tool-box serve` | 启动服务，自动打开浏览器 |
| `./tool-box ip` | 显示局域网地址（手机访问用） |
| `./tool-box status` | 检查服务是否运行 |
| `./tool-box stop` | 停止服务 |
| `./tool-box --port 9999` | 指定端口 |
| `./tool-box --no-browser` | 启动但不自动打开浏览器 |

---

## 🌍 你的设备，它都能用

| 系统 | 怎么装 | 启动方式 | 备注 |
|------|--------|----------|------|
| 🍎 **macOS** | Homebrew Tap / 双击 `start.command` | 自动打开浏览器 | 支持 Apple Silicon 和 Intel |
| 🐧 **Linux** | Homebrew Tap / 双击 `start.command` | `xdg-open` 自动打开 | Ubuntu / Debian / Fedora / Arch |
| 📱 **HarmonyOS NEXT** | 手动安装，用 DevEco Studio 终端 | `node start.js` 手动打开 | 需要手动输入地址访问 |
| 🪟 **Windows** | 双击 `start.bat` / WSL | 自动打开浏览器 | 或用 Homebrew on WSL |

---

## 💻 启动后长这样

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

> 💡 **手机也能用：** 把上面"本机地址"那行复制到手机浏览器，或者用 `tool-box ip` 获取地址后用手机扫码/输入，27 个工具全在。

---

## 🖱️ 双点击直接打开

不用开终端，双击一个文件就能用：

| 系统 | 双击哪个文件 |
|------|-------------|
| macOS | `start.command` |
| Windows | `start.bat` |
| Linux | `start.command`（需要 bash） |

---

## 🛠️ 27 款工具，总有一款帮你

| 分类 | 工具 |
|------|------|
| 🧮 计算 | 智能计算器、BMI 计算器、进制转换器、单位转换器 |
| ✏️ 文本 | 文本处理、字数统计、Base64 编解码、URL 编解码、CSV 处理、文本对比、正则测试、随机文本 |
| 💻 开发 | JSON 格式化、Markdown 编辑器、时区转换、哈希生成、文本搜索 |
| 🔐 安全 | 密码生成器、密码强度检测 |
| 🎨 图形 | 颜色选择器、图片压缩、图片裁剪、二维码生成、ASCII 艺术、截图指南 |
| 🎭 趣味 | Emoji 表情大全、色觉测试 |

---

## 🔧 配置

| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `TOOLBOX_PORT` | 服务端口 | `8899` |

```bash
TOOLBOX_PORT=9999 tool-box serve
```

---

## ❓ 常见问题

**Q：数据安全吗？**

A：绝对安全。所有处理都在你的浏览器里完成，数据不上传任何服务器。关闭页面后，一切消失。

**Q：手机能用吗？**

A：可以。电脑上运行后，用手机浏览器访问 `tool-box ip` 输出的地址即可。

**Q：需要联网吗？**

A：不需要。所有工具纯离线运行。

**Q：怎么更新？**

A：Homebrew 用户：`brew update && brew upgrade tool-box`。手动安装：重新下载解压覆盖。

**Q：可以放到 U 盘随身带吗？**

A：可以。解压到 U 盘，插上任何电脑双击 `start.command` / `start.bat` 即可。

---

## 📄 许可证

MIT License © 2026 — 你可以自由使用、修改、分发。

---

*感谢你看到这里。现在，去用它吧 💛*
