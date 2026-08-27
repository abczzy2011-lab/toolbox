"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Shield,
  Globe,
  Code,
  FileText,
  QrCode,
  Hash,
  Lock,
  Crown,
  Rocket,
  Sparkles,
  Target,
  Clock,
  Eye,
  EyeOff,
  Star,
  Trophy,
  Flame,
  Waves,
  Moon,
} from "lucide-react";

const premiumTools = [
  { icon: QrCode, title: "Pro 二维码生成器", desc: "SVG矢量二维码 · Logo叠加 · 自定义配色 · 批量生成 · API接入", href: "/tools/qr-generator" },
  { icon: Shield, title: "安全密码管家", desc: "密码强度分析 · 泄露检测 · 随机生成 · 自定义规则 · 导出加密", href: "/tools/password-generator" },
  { icon: Flame, title: "超级图片压缩", desc: "WebP/AVG支持 · 无损压缩 · 智能画质保持 · 批量处理 · 尺寸调节", href: "/tools/image-compressor" },
  { icon: Code, title: "JSON 专业格式化", desc: "语法校验 · Schema对比 · 格式转换 · 树状视图 · 数据导出", href: "/tools/json-formatter" },
  { icon: FileText, title: "Markdown 专业编辑器", desc: "实时预览 · LaTeX公式 · 图表渲染 · 快捷键 · 导出多格式", href: "/tools/markdown-editor" },
  { icon: Globe, title: "全球时区大师", desc: "300+城市 · 会议时间推荐 · 夏令时自动识别 · 日历同步", href: "/tools/timezone" },
  { icon: Target, title: "精准字数统计 Pro", desc: "中英日韩混合统计 · 段落分析 · 阅读时间估算 · 写作进度追踪", href: "/tools/word-counter" },
  { icon: Hash, title: "Base64 专业版", desc: "大文件支持 · 图片转换 · 批量编码 · 分块处理", href: "/tools/base64" },
  { icon: Eye, title: "URL 深度分析", desc: "参数提取 · 链接检测 · SEO分析 · 域名信息 · 短链生成", href: "/tools/url-encoder" },
];

const features = [
  { icon: Rocket, title: "极速性能", desc: "WebAssembly加速，处理速度快10倍" },
  { icon: Shield, title: "隐私优先", desc: "端到端加密，数据永不落地" },
  { icon: Sparkles, title: "智能AI", desc: "内置AI助手，智能推荐最优方案" },
  { icon: Crown, title: "VIP专属", desc: "无广告、无限制、优先级服务" },
  { icon: Target, title: "高精度", desc: "工业级精度，满足专业需求" },
  { icon: Star, title: "持续更新", desc: "每月新增功能，免费升级" },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-purple-400 transition text-white/60">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Link>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400">PRO</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6 text-sm text-purple-300">
            <Sparkles className="w-4 h-4" /> 专业版工具平台
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">专业工具</span>
            <br />
            <span className="text-white">无限可能</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-8">
            为专业人士打造的工具集合。更强大的算法、更精确的结果、更快的速度。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#tools" className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/25">
              探索工具
            </Link>
            <Link href="/" className="border border-white/10 px-8 py-3 rounded-xl font-semibold hover:bg-white/5 transition">
              免费体验
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "9", label: "高级工具" },
              { value: "∞", label: "使用次数" },
              { value: "10×", label: "处理速度" },
              { value: "24/7", label: "专业服务" },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 backdrop-blur-sm hover:border-purple-500/20 transition-all group">
                <f.icon className="w-6 h-6 text-purple-400 mb-3 group-hover:text-pink-400 transition-colors" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-white/40">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">全部工具</h2>
            <p className="text-white/40">解锁每一个工具的极限能力</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumTools.map((tool, i) => (
              <Link key={i} href={tool.href} className="group bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] rounded-xl p-5 hover:border-purple-500/30 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                    <tool.icon className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate group-hover:text-purple-300 transition-colors">{tool.title}</h3>
                    <p className="text-xs text-white/30 line-clamp-2">{tool.desc}</p>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none" />
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">开通 VIP Pro</h2>
            <p className="text-white/50 mb-8">一次性付费，终身享受所有高级功能</p>
            <div className="flex items-baseline justify-center gap-1 mb-6">
              <span className="text-sm text-white/30">¥</span>
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">20</span>
            </div>
            <div className="space-y-3 mb-8 text-left max-w-sm mx-auto">
              {[
                "🔓 全部9个高级工具",
                "⚡ 10倍处理速度",
                "🎨 专业UI界面",
                "📊 AI智能分析",
                "🔒 无限制使用次数",
                "💬 优先技术支持",
              ].map((item, i) => (
                <div key={i} className="text-sm text-white/60 flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg shadow-yellow-400/25">
              立即开通
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center text-white/20 text-sm">
          <p>© 2026 万能工具箱 PRO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
