"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Camera, Monitor, Smartphone, Copy, Check, Info } from "lucide-react";

interface Res { w: number; h: number; label: string; type: "desktop"|"mobile"|"tablet"; }

const resolutions: Res[] = [
  // Desktop
  { w: 1920, h: 1080, label: "Full HD", type: "desktop" },
  { w: 2560, h: 1440, label: "QHD (2K)", type: "desktop" },
  { w: 3840, h: 2160, label: "4K UHD", type: "desktop" },
  { w: 7680, h: 4320, label: "8K UHD", type: "desktop" },
  { w: 1280, h: 720, label: "HD", type: "desktop" },
  { w: 1600, h: 900, label: "HD+", type: "desktop" },
  // Mobile
  { w: 390, h: 844, label: "iPhone 14/15", type: "mobile" },
  { w: 393, h: 852, label: "iPhone 15 Pro", type: "mobile" },
  { w: 430, h: 932, label: "iPhone 15 Pro Max", type: "mobile" },
  { w: 360, h: 780, label: "Pixel 7", type: "mobile" },
  { w: 384, h: 854, label: "Samsung S23", type: "mobile" },
  { w: 412, h: 915, label: "Pixel 8 Pro", type: "mobile" },
  // Tablet
  { w: 810, h: 1080, label: "iPad Mini", type: "tablet" },
  { w: 820, h: 1180, label: "iPad Air", type: "tablet" },
  { w: 810, h: 1080, label: "iPad 10.9\"", type: "tablet" },
  { w: 1024, h: 1366, label: "iPad Pro 11\"", type: "tablet" },
  { w: 1366, h: 1024, label: "Surface Pro", type: "tablet" },
];

export default function ScreenshotGuidePage() {
  const [selected, setSelected] = useState<Res>(resolutions[0]);
  const [copied, setCopied] = useState("");

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const filtered = resolutions.filter(r => r.type === selected.type);
  const devices = ["desktop" as const, "mobile" as const, "tablet" as const];

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-violet-50 to-purple-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-violet-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">📸 截图尺寸指南</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Device Tabs */}
        <div className="flex gap-3 mb-6">
          {devices.map(d => (
            <button
              key={d}
              onClick={() => setSelected(resolutions.filter(r => r.type === d)[0])}
              className={`flex-1 py-3 rounded-2xl font-medium transition flex items-center justify-center gap-2 ${
                selected.type === d ? "bg-violet-600 text-white shadow-lg shadow-violet-200" : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {d === "desktop" ? <Monitor className="w-5 h-5" /> : d === "mobile" ? <Smartphone className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              {d === "desktop" ? "桌面端" : d === "mobile" ? "手机端" : "平板端"}
            </button>
          ))}
        </div>

        {/* Device Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {filtered.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelected(r)}
              className={`bg-white rounded-2xl p-4 text-left border-2 transition hover:shadow-md ${
                selected.w === r.w && selected.h === r.h ? "border-violet-500 bg-violet-50" : "border-gray-100"
              }`}
            >
              <div className="font-semibold text-gray-800">{r.label}</div>
              <div className="text-sm text-gray-600 mt-1">{r.w} × {r.h}</div>
              <div className="mt-2 aspect-video rounded-lg bg-gray-100 border relative overflow-hidden">
                <div className="absolute inset-[10%] bg-violet-200/50 rounded" style={{ aspectRatio: `${r.w}/${r.h}` }} />
              </div>
            </button>
          ))}
        </div>

        {/* Selected Device Detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-violet-200 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 text-white">
            <div className="text-3xl font-black mb-1">{selected.w} × {selected.h}</div>
            <div className="opacity-80">{selected.label} — {selected.type === "desktop" ? "桌面端" : selected.type === "mobile" ? "移动端" : "平板端"}</div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <strong>截图建议：</strong>在浏览器中使用开发者工具（F12），切换到设备模拟器，选择 {selected.label} 尺寸进行截图。
              </div>
            </div>

            {/* Copyable Codes */}
            <div className="space-y-3">
              {[
                { label: "CSS Viewport Meta", code: `<meta name="viewport" content="width=${selected.w}, initial-scale=1.0" />` },
                { label: "Playwright 截图", code: `await page.setViewportSize({ width: ${selected.w}, height: ${selected.h} });\nawait page.screenshot({ path: 'screenshot.png' });` },
                { label: "Chrome DevTools", code: `Ctrl+Shift+M → ${selected.label} (${selected.w}×${selected.h})` },
                { label: "响应式断点建议", code: `@media (max-width: ${selected.w - 1}px) { /* mobile styles */ }\n@media (min-width: ${selected.w}px) { /* desktop styles */ }` },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="text-xs text-gray-600 mb-1 font-medium">{item.label}</div>
                  <div className="flex items-center gap-2 bg-gray-900 text-green-400 rounded-xl p-3 font-mono text-xs overflow-x-auto">
                    <code className="flex-1 whitespace-pre">{item.code}</code>
                    <button onClick={() => copyToClipboard(item.code, `code-${i}`)} className="p-1 rounded hover:bg-gray-700 transition text-gray-600 hover:text-white">
                      {copied === `code-${i}` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
