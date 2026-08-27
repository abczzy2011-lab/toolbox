"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calculator, Ruler, Type, Palette, Hash, Globe, Shield, Zap, Image, Code, QrCode, FileText, Clock, CheckCircle2, Mic, Search, Lock, Table, GitCompare, Crop, PenTool, Wand2, LayoutGrid, Feather, Binary, Activity, Key, Eye, Sparkles } from "lucide-react";

const tools = [
  { icon: Calculator, title: "智能计算器", desc: "基础计算、科学计算、百分比计算", href: "/tools/calculator" },
  { icon: Type, title: "文本处理工具", desc: "字数统计、大小写转换、去重排序", href: "/tools/text-tools" },
  { icon: Hash, title: "Base64编解码", desc: "Base64编码解码，支持文本和图片", href: "/tools/base64" },
  { icon: Globe, title: "URL编解码", desc: "URL编码与解码，自动识别格式", href: "/tools/url-encoder" },
  { icon: Code, title: "JSON格式化器", desc: "JSON格式化、校验、转换、对比", href: "/tools/json-formatter" },
  { icon: FileText, title: "Markdown编辑器", desc: "实时预览的富文本Markdown编辑器", href: "/tools/markdown-editor" },
  { icon: Clock, title: "时区转换器", desc: "全球时区对比，会议时间智能推荐", href: "/tools/timezone" },
  { icon: Palette, title: "颜色选择器", desc: "HEX/RGB/HSL颜色选择和转换", href: "/tools/color-picker" },
  { icon: Ruler, title: "单位转换器", desc: "长度、重量、温度、面积全面转换", href: "/tools/unit-converter" },
  { icon: QrCode, title: "二维码生成器", desc: "自定义样式二维码，支持Logo和颜色", href: "/tools/qr-generator" },
  { icon: Image, title: "图片压缩工具", desc: "智能压缩，保持画质的同时减小体积", href: "/tools/image-compressor" },
  { icon: Shield, title: "密码生成器", desc: "自定义规则生成超强安全密码", href: "/tools/password-generator" },
  { icon: CheckCircle2, title: "字数统计器", desc: "精确统计中文字数、英文单词等", href: "/tools/word-counter" },
  { icon: Mic, title: "Emoji表情大全", desc: "搜索、复制、收藏数千个常用表情", href: "/tools/emoji-picker" },
  { icon: Search, title: "文本搜索工具", desc: "关键词搜索、正则匹配、结果统计", href: "/tools/grep-tool" },
  { icon: Lock, title: "哈希生成器", desc: "SHA-1/256/384/512多种哈希算法", href: "/tools/hash-generator" },
  { icon: Table, title: "CSV数据处理", desc: "解析、编辑、导出CSV文件数据", href: "/tools/csv-tool" },
  { icon: GitCompare, title: "文本对比工具", desc: "LCS算法对比差异，高亮显示增删", href: "/tools/diff-tool" },
  { icon: Crop, title: "图片裁剪工具", desc: "拖拽选框、预设比例、自由裁剪", href: "/tools/image-cropper" },
  { icon: PenTool, title: "ASCII艺术转换器", desc: "上传图片转换为字符字符画", href: "/tools/text-to-ascii" },
  { icon: Wand2, title: "正则表达式测试", desc: "快速测试正则，常用模板一键套用", href: "/tools/regex-tester" },
  { icon: LayoutGrid, title: "截图尺寸指南", desc: "主流设备分辨率参考与代码生成", href: "/tools/screenshot-guide" },
  { icon: Feather, title: "随机文本生成", desc: "Lorem Ipsum占位符文本生成", href: "/tools/lorem-generator" },
  { icon: Binary, title: "进制转换器", desc: "二进制、八进制、十进制、十六进制互转", href: "/tools/number-base-converter" },
  { icon: Activity, title: "BMI计算器", desc: "体质指数计算与健康评估", href: "/tools/bmi-calculator" },
  { icon: Key, title: "密码强度检测", desc: "多维度评估密码安全性给出建议", href: "/tools/password-strength" },
  { icon: Eye, title: "色觉测试", desc: "红绿蓝三色盲筛查趣味测试", href: "/tools/color-blindness" },
];

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [gridAnimated, setGridAnimated] = useState(false);

  useEffect(() => {
    setHeroAnimated(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !gridAnimated) {
            setGridAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [gridAnimated]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero with floating particles */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-10 sm:py-14 md:py-20 px-4 overflow-hidden animate-gradient" style={{ backgroundSize: "200% 200%" }}>
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-float" />
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-white/5 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-white/5 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
        
        <div className={`max-w-6xl mx-auto text-center relative z-10 transition-all duration-700 ${heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 animate-scale-in">万能工具箱</h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-2 fade-in-up" style={{ animationDelay: "0.2s" }}>全部免费 · 无需注册 · 即用即走</p>
          <p className="text-sm sm:text-lg opacity-75 mb-4 sm:mb-8">{tools.length}款实用在线工具，满足你所有需求</p>
          <Link href="#tools" className="inline-block bg-white text-indigo-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition shadow-lg animate-float">
            浏览所有工具 →
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            {[
              { value: tools.length, label: "在线工具", color: "text-indigo-600" },
              { value: "100%", label: "免费使用", color: "text-green-600" },
              { value: "0 元", label: "无需付费", color: "text-purple-600" },
              { value: "24/7", label: "全天候服务", color: "text-orange-600" },
            ].map((s, i) => (
              <div key={i} className={`transition-all duration-400 ${heroAnimated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${0.25 + i * 0.08}s` }}>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-8 sm:py-16" ref={gridRef}>
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">🛠️ 所有工具</h2>
          <p className="text-gray-600 text-sm sm:text-base">全部免费使用，无需注册登录</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className={`bg-white rounded-xl p-5 shadow-md border border-gray-100 block card-hover group cursor-pointer transition-all duration-300 ${
                gridAnimated ? `animate-slide-blur` : ""
              }`}
              style={gridAnimated ? { animationDelay: `${i * 0.02}s` } : {}}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all group-hover:scale-110 group-hover:rotate-3">
                  <tool.icon className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate">{tool.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{tool.desc}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-indigo-500 text-xs font-medium group-hover:font-semibold transition-all duration-300">
                使用工具 <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10"><h2 className="text-3xl font-bold mb-2">✨ 为什么选择我们</h2></div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, color: "bg-indigo-100 text-indigo-600", title: "极速响应", desc: "所有工具本地运行，无需等待服务器响应" },
            { icon: Shield, color: "bg-green-100 text-green-600", title: "隐私安全", desc: "数据不上传服务器，完全保护您的隐私" },
            { icon: Sparkles, color: "bg-purple-100 text-purple-600", title: "持续更新", desc: "定期新增工具和功能，满足各种需求" },
          ].map((f, i) => (
            <div key={i} className={`text-center card-hover transition-all duration-400 ${gridAnimated ? `animate-fade-in-up` : ""}`} style={gridAnimated ? { animationDelay: `${i * 0.08}s` } : {}}>
              <div className={`w-16 h-16 rounded-full ${f.color} flex items-center justify-center mx-auto mb-4`}>
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden animate-gradient" style={{ backgroundSize: "200% 200%", animationDuration: "4s" }}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">🚀 {tools.length}+ 工具随时可用</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">覆盖文本处理、图像处理、开发工具、健康计算等多个领域，总有一个适合你。</p>
            <Link href="#tools" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg">
              立即开始使用 →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-600 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">🔧 万能工具箱</h3>
              <p className="text-sm">{tools.length}款免费在线工具，浏览器端运行，数据安全。</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">热门工具</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/calculator" className="hover:text-white">智能计算器</Link></li>
                <li><Link href="/tools/unit-converter" className="hover:text-white">单位转换器</Link></li>
                <li><Link href="/tools/json-formatter" className="hover:text-white">JSON格式化</Link></li>
                <li><Link href="/tools/password-generator" className="hover:text-white">密码生成器</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">全部工具</h4>
              <ul className="space-y-2 text-sm">
                {tools.map(t => <li key={t.href}><Link href={t.href} className="hover:text-white">{t.title}</Link></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">© 2026 万能工具箱. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
