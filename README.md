<div align="center">

# 🛠️ 万能工具箱

![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F94%2F100%2F100-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/abczzy2011-lab/toolbox)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Linux%20%7C%20Windows%20%7C%20HarmonyOS-lightgrey)](https://github.com/abczzy2011-lab/toolbox)
[![Stars](https://img.shields.io/github/stars/abczzy2011-lab/toolbox?style=social)](https://github.com/abczzy2011-lab/toolbox)

> 你桌面上缺的那把瑞士军刀，来了。

**27 款工具，零安装 · 零注册 · 零数据上传 · 零广告 · 零良心不安**

</div>

---

## ⚡ Google Lighthouse 评分

| 🚀 Performance | ♿ Accessibility | ⚙️ Best Practices | 🔍 SEO |
|:-:|:-:|:-:|:-:|
| **100** | **94** | **100** | **100** |

![Lighthouse 评分实测](./images/lighthouse-score.png)

---

## ✨ 说真的，你还要忍受那些在线工具吗？

| | 万能工具箱 | 那些网站 |
|---|---|---|
| 隐私 | ✅ 数据就在你电脑里 | ❌ 悄悄发到谁也不知道的服务器 |
| 注册 | ✅ 打开就用 | ❌ 填个表单再等验证邮件 |
| 离线 | ✅ 断网也能用 | ❌ 断网就成废纸了 |
| 广告 | ✅ 一个都没有 | ❌ 弹广告比功能还多 |
| 价格 | ✅ 永远免费 | ❌ "免费试用 7 天"？呵呵 |
| 更新 | ✅ 一行命令搞定 | ❌ 收藏夹又失效了... |

**说白了：这不是选择题，是智商题。**

---

## 🚀 三步走，开干

### Homebrew Tap（macOS / Linux，丝滑体验）

```bash
brew tap abczzy2011-lab/tap && brew install tool-box && brew services start tool-box
```

> 浏览器自动打开，开始用吧。就这么简单，真的。

分步来也行：

```bash
brew tap abczzy2011-lab/tap        # 加个软件源
brew install tool-box              # 装上
brew services start tool-box       # 开干
```

管它：

```bash
brew services stop tool-box        # 停
brew services restart tool-box     # 重启
brew update && brew upgrade tool-box # 更新
brew uninstall tool-box            # 卸载（希望你不会需要）
```

### 📦 还没装 Homebrew？

**macOS / Linux：** 一行搞定

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

### 🖱️ 手动安装（Windows / HarmonyOS / 懒得装 Homebrew 的你）

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

> 💡 **手机也能用**：电脑跑着，手机浏览器输个地址，27 个工具全在，出门在外也能用。

---

## 🛠️ 27 款工具，总有一款帮你

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
> A：安全得离谱。所有处理都在你的浏览器里完成，关掉页面，数据消失得比你的工资还快。

**Q：需要联网吗？**
> A：不需要。纯离线，断网了照样能用。

**Q：可以放 U 盘带吗？**
> A：可以。解压到 U 盘，插上任何电脑双击就能用。你的秘密武器，随身携带。

**Q：怎么更新？**
> A：`brew update && brew upgrade tool-box`，或者重新下载解压覆盖。

---

## 📄 许可证

[MIT License](./LICENSE) © 2026 — 想用怎么用，想改就改，想分发就分发。

---

<div align="center">

**⭐ 觉得有用？给个 Star 吧！你的一次点击，就是我继续更新的动力 💛**

</div>
