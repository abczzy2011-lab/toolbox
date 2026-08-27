"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, Copy, Download, Wifi, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function QrGeneratorPage() {
  const [text, setText] = useState("http://127.0.0.1:8899");
  const [localIp, setLocalIp] = useState<string | null>(null);
  const [fetchingIp, setFetchingIp] = useState(true);
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#1e1b4b");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [includeLogo, setIncludeLogo] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/my-ip")
      .then((res) => res.json())
      .then((data) => {
        if (data.ip && data.ip !== "127.0.0.1") {
          setLocalIp(data.ip);
          setText(data.url);
        }
      })
      .catch(() => {
        // 如果无法获取IP（比如直接打开HTML文件），保持默认
      })
      .finally(() => setFetchingIp(false));
  }, []);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = size * 2;
      canvas.height = size * 2;
      ctx?.drawImage(img, 0, 0, size * 2, size * 2);
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <h1 className="ml-3 text-xl font-bold">二维码生成器</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 局域网提示横幅 */}
        {localIp && (
          <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
                📱 手机扫码访问工具箱
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                本机地址：<span className="font-mono font-bold">{localIp}</span> : 8899
                &nbsp;|&nbsp; 手机浏览器输入：
                <span className="font-mono font-bold">http://{localIp}:8899</span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium">
                <Wifi className="w-3 h-3" /> 局域网
              </span>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">内容 / 链接</label>
              <textarea
                aria-label="二维码内容或链接"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm resize-none h-24 outline-none focus:border-indigo-500"
                placeholder="输入网址、文本、联系方式等..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">尺寸: {size}px</label>
              <input
                type="range"
                aria-label="二维码尺寸"
                min={128}
                max={512}
                step={32}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">前景色</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                  <span className="text-xs font-mono">{fgColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">背景色</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                  <span className="text-xs font-mono">{bgColor}</span>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer">
              <input type="checkbox" checked={includeLogo} onChange={(e) => setIncludeLogo(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
              <span className="text-sm">包含Logo（需手动配置）</span>
            </label>

            <div className="flex gap-3">
              <button onClick={downloadQR} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> 下载PNG
              </button>
              <button aria-label="复制二维码" onClick={() => {
                const svg = qrRef.current?.querySelector("svg");
                if (svg) {
                  navigator.clipboard.writeText(svg.outerHTML);
                }
              }} className="py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center">
            <h3 className="font-semibold mb-4">预览</h3>
            <div ref={qrRef} className="p-4 bg-white rounded-xl shadow-inner mb-4">
              <QRCodeSVG
                value={text || " "}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-xs text-gray-600 text-center break-all max-w-xs">
              {text || "请输入内容生成二维码"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
