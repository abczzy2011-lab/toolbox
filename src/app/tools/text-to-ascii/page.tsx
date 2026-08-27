"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, Copy, Image, Type, Download, Trash2, Check } from "lucide-react";

const ASCII_CHARS = "@%#*+=-:. ";

export default function TextToAsciiPage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [resolution, setResolution] = useState(120);
  const [invert, setInvert] = useState(false);
  const [outputMode, setOutputMode] = useState<"full"|"cols">("full");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convertToAscii = (img: HTMLImageElement) => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    
    const aspectRatio = img.height / img.width;
    const cols = outputMode === "cols" ? resolution : Math.floor(resolution * 0.5);
    const height = Math.floor(cols * aspectRatio * 0.5);
    
    c.width = cols;
    c.height = height;
    ctx.drawImage(img, 0, 0, cols, height);
    
    const imageData = ctx.getImageData(0, 0, cols, height);
    let ascii = "";
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < cols; x++) {
        const offset = (y * cols + x) * 4;
        const r = imageData.data[offset];
        const g = imageData.data[offset + 1];
        const b = imageData.data[offset + 2];
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        const charIndex = invert
          ? Math.floor((brightness / 255) * (ASCII_CHARS.length - 1))
          : Math.floor((1 - brightness / 255) * (ASCII_CHARS.length - 1));
        
        ascii += ASCII_CHARS[charIndex];
      }
      ascii += "\n";
    }
    
    setResult(ascii);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImage(dataUrl);
      const img = new Image();
      img.onload = () => convertToAscii(img);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadAscii = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-gray-700 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">🎨 ASCII 艺术转换器</h1>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-6">
        {/* Controls */}
        {!image ? (
          <label className="block max-w-lg mx-auto bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center cursor-pointer hover:border-gray-500 transition shadow-sm">
            <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-gray-600 mb-1">上传一张图片</p>
            <p className="text-sm text-gray-600 mb-4">将转换为 ASCII 字符画</p>
            <input aria-label="选择图片文件" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-semibold text-gray-700">设置</h3>
              
              <div>
                <label className="text-sm text-gray-600 block mb-1">分辨率: {resolution}</label>
                <input aria-label="ASCII 分辨率" type="range" min={20} max={300} value={resolution} onChange={e => {
                  setResolution(parseInt(e.target.value));
                  const img = new Image();
                  img.onload = () => convertToAscii(img);
                  img.src = image;
                }} className="w-full accent-gray-600" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">反转颜色</span>
                <button aria-label="切换反转颜色" onClick={() => {
                  setInvert(!invert);
                  const img = new Image();
                  img.onload = () => convertToAscii(img);
                  img.src = image;
                }} className={`w-10 h-5 rounded-full transition ${invert ? "bg-gray-700" : "bg-gray-300"} relative`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${invert ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div>
                <span className="text-sm text-gray-600 block mb-2">输出模式</span>
                <div className="flex gap-2">
                  <button onClick={() => setOutputMode("full")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${outputMode === "full" ? "bg-gray-700 text-white" : "bg-gray-100"}`}>全屏</button>
                  <button onClick={() => setOutputMode("cols")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${outputMode === "cols" ? "bg-gray-700 text-white" : "bg-gray-100"}`}>宽度限制</button>
                </div>
              </div>

              <button onClick={() => { setImage(null); setResult(""); }} className="w-full py-2 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition"><Trash2 className="w-4 h-4 inline mr-1" />重新上传图片</button>
            </div>

            {/* Preview & Result */}
            <div className="lg:col-span-2 space-y-4">
              {/* Source Image */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">原始图片</h3>
                <img src={image} alt="" className="max-h-48 rounded-lg object-contain mx-auto" />
              </div>

              {/* ASCII Output */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
                  <h3 className="text-sm font-semibold text-gray-600">ASCII 艺术</h3>
                  <div className="flex gap-2">
                    <button onClick={copyResult} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${copied ? "bg-green-100 text-green-700" : "bg-gray-100 hover:bg-gray-200"}`}>
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? "已复制" : "复制"}
                    </button>
                    <button onClick={downloadAscii} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 transition flex items-center gap-1">
                      <Download className="w-3 h-3" /> 下载
                    </button>
                  </div>
                </div>
                <pre className="p-4 text-[10px] leading-[10px] font-mono whitespace-pre overflow-auto max-h-[50vh] bg-black text-green-400">{result || "转换结果将显示在这里..."}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
