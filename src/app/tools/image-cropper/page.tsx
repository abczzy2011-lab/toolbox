"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, Crop, Download, Move, Scale, RotateCw, Trash2, Copy, Check } from "lucide-react";

export default function ImageCropperPage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Crop rectangle state
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<"move"|"resize">("move");
  const [copying, setCopying] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = ev.target?.result as string;
      setImage(img);
      // Set initial crop to 80% of image
      setCropX(0.1 * 100);
      setCropY(0.1 * 100);
      setCropW(0.8 * 100);
      setCropH(0.8 * 100);
      setRotate(0);
      setScale(1);
    };
    reader.readAsDataURL(file);
  };

  const applyCrop = () => {
    if (!image || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const c = canvasRef.current!;
      const ctx = c.getContext("2d")!;
      
      // Calculate actual pixel positions
      const cw = containerRef.current!.clientWidth - 48;
      const ch = containerRef.current!.clientHeight - 200;
      const displayAspect = img.width / img.height;
      let dw = cw;
      let dh = dw / displayAspect;
      if (dh > ch) { dh = ch; dw = dh * displayAspect; }
      
      const sx = (cropX / 100) * cw + (cw - dw) / 2;
      const sy = (cropY / 100) * ch + (ch - dh) / 2;
      const sw = (cropW / 100) * dw;
      const sh = (cropH / 100) * dh;
      
      c.width = Math.round(sw);
      c.height = Math.round(sh);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
      
      // Download
      const link = document.createElement("a");
      link.download = `cropped_${fileName}`;
      link.href = c.toDataURL("image/png");
      link.click();
    };
    img.src = image;
  };

  const copyToClipboard = async () => {
    if (!image || !canvasRef.current) return;
    const img = new Image();
    img.onload = async () => {
      const c = canvasRef.current!;
      const ctx = c.getContext("2d")!;
      const cw = containerRef.current!.clientWidth - 48;
      const ch = containerRef.current!.clientHeight - 200;
      const displayAspect = img.width / img.height;
      let dw = cw, dh = dw / displayAspect;
      if (dh > ch) { dh = ch; dw = dh * displayAspect; }
      const sx = (cropX / 100) * cw + (cw - dw) / 2;
      const sy = (cropY / 100) * ch + (ch - dh) / 2;
      const sw = (cropW / 100) * dw;
      const sh = (cropH / 100) * dh;
      c.width = Math.round(sw);
      c.height = Math.round(sh);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
      
      c.toBlob(async blob => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({"image/png": blob})]);
          setCopying(true);
          setTimeout(() => setCopying(false), 1500);
        }
      });
    };
    img.src = image;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Check if clicking inside crop area
    if (x >= cropX && x <= cropX + cropW && y >= cropY && y <= cropY + cropH) {
      setDragging(true);
      setDragStart({ x: x - cropX, y: y - cropY });
      setMode("move");
    } else {
      setCropX(x);
      setCropY(y);
      setCropW(10);
      setCropH(10);
      setDragging(true);
      setDragStart({ x, y });
      setMode("resize");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !image) return;
    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (mode === "move") {
      setCropX(Math.max(0, Math.min(100 - cropW, x - dragStart.x)));
      setCropY(Math.max(0, Math.min(100 - cropH, y - dragStart.y)));
    } else {
      const newW = Math.max(1, x - dragStart.x);
      const newH = aspectRatio ? newW / aspectRatio : Math.max(1, y - dragStart.y);
      setCropW(newW);
      setCropH(newH);
    }
  };

  const resetCrop = () => {
    if (!image) return;
    setCropX(10); setCropY(10); setCropW(80); setCropH(80);
    setRotate(0); setScale(1);
  };

  const presetPresets = [
    { name: "原图", w: 1, h: 1 },
    { name: "1:1 正方形", w: 1, h: 1 },
    { name: "16:9", w: 16, h: 9 },
    { name: "4:3", w: 4, h: 3 },
    { name: "3:4", w: 3, h: 4 },
    { name: "9:16", w: 9, h: 16 },
    { name: "微信头像", w: 1, h: 1 },
    { name: "Instagram", w: 1, h: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-amber-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">✂️ 图片裁剪工具</h1>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-6">
        {/* Upload Area */}
        {!image ? (
          <label className="block max-w-2xl mx-auto bg-white rounded-2xl border-2 border-dashed border-amber-300 p-16 text-center cursor-pointer hover:border-amber-500 transition shadow-sm">
            <Crop className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600 mb-2">点击上传或拖拽图片到这里</p>
            <p className="text-sm text-gray-600">支持 JPG, PNG, WebP, GIF</p>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              <button onClick={() => setMode("move")} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${mode === "move" ? "bg-amber-500 text-white" : "bg-white text-gray-600"}`}><Move className="w-4 h-4 inline mr-1" />移动模式</button>
              {[90, 180, 270].map(r => (
                <button key={r} onClick={() => setRotate(r)} className={`px-4 py-2 rounded-xl text-sm font-medium transition bg-white ${rotate === r ? "ring-2 ring-amber-400" : ""} text-gray-600`}><RotateCw className="w-4 h-4 inline mr-1" />{r}°</button>
              ))}
              <button onClick={resetCrop} className="px-4 py-2 bg-white text-red-500 rounded-xl text-sm font-medium hover:bg-red-50"><Trash2 className="w-4 h-4 inline mr-1" />重置</button>
            </div>

            {/* Presets */}
            <div className="flex gap-2 mb-4 justify-center flex-wrap">
              {presetPresets.map(p => (
                <button key={p.name} onClick={() => {
                  const ar = p.w / p.h;
                  setAspectRatio(ar);
                  const hPercent = Math.sqrt(100 / ar);
                  setCropW(hPercent * 2);
                  setCropH(hPercent * 2);
                  setCropX((100 - hPercent * 2) / 2);
                  setCropY((100 - hPercent * 2) / 2);
                }} className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-600 hover:bg-amber-100 transition border">{p.name}</button>
              ))}
            </div>

            {/* Image Editor */}
            <div className="relative bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden" style={{ minHeight: 400 }}>
              <img src={image} alt="" ref={c => { if (c && c.addEventListener) { /* handled below */ } }} className="w-full pointer-events-none select-none" style={{ transform: `rotate(${rotate}deg)`, opacity: 0.4 }} />
              
              {/* Interactive overlay */}
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
                className="absolute inset-0 cursor-crosshair"
              >
                {/* Dark overlay outside crop */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: `polygon(${cropX}% ${cropY}%, ${cropX + cropW}% ${cropY}%, ${cropX + cropW}% ${cropY + cropH}%, ${cropX}% ${cropY + cropH}%)`,
                    background: "none"
                  }}
                />
                
                {/* Dim areas */}
                <div className="absolute inset-0 pointer-events-none bg-black/40"
                  style={{ clipPath: `inset(${100 - cropY}% calc(100% - ${cropX + cropW}%) ${100 - (cropY + cropH)}% ${100 - cropX}%)` }}
                />

                {/* Crop Border */}
                <div className="absolute border-2 border-white pointer-events-none"
                  style={{ left: `${cropX}%`, top: `${cropY}%`, width: `${cropW}%`, height: `${cropH}%` }}
                >
                  {/* Rule of thirds grid */}
                  <div className="w-full h-full" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1/3, transparent 1/3), linear-gradient(to bottom, rgba(255,255,255,0.2) 1/3, transparent 1/3)`,
                    backgroundSize: "33.33% 33.33%"
                  }} />
                  {/* Corner handles */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-500" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-500" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500" />
                  {/* Size label */}
                  <div className="absolute -top-6 left-0 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{Math.round(cropW)}% × {Math.round(cropH)}%</div>
                </div>
              </div>

              {/* Hidden canvas for export */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 justify-center">
              <button onClick={applyCrop} className="px-8 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition flex items-center gap-2"><Download className="w-4 h-4" /> 下载裁剪</button>
              <button onClick={copyToClipboard} className={`px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${copying ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
                {copying ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copying ? "已复制!" : "复制到剪贴板"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
