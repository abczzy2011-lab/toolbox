"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, Copy, Palette } from "lucide-react";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#6366f1");
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const pickerRef = useRef<HTMLInputElement>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const handleColorChange = (newHex: string) => {
    setColor(newHex);
    setHex(newHex);
    const newRgb = hexToRgb(newHex);
    setRgb(newRgb);
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    setHsl(newHsl);
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      handleColorChange(val);
    }
  };

  const handleRgbChange = (channel: keyof typeof rgb, val: number) => {
    const newRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, val)) };
    setRgb(newRgb);
    const hexStr = "#" + Object.values(newRgb).map(v => v.toString(16).padStart(2, "0")).join("");
    setHex(hexStr);
    setColor(hexStr);
  };

  const handleHslChange = (channel: keyof typeof hsl, val: number) => {
    // Simple conversion for demo
    setHsl({ ...hsl, [channel]: Math.max(0, Math.min(channel === "h" ? 360 : 100, val)) });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presets = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
    "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e",
    "#1e293b", "#475569", "#94a3b8", "#cbd5e1", "#ffffff",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <h1 className="ml-4 text-xl font-bold">颜色选择器</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="h-48" style={{ backgroundColor: color }}>
              <button
                onClick={() => pickerRef.current?.click()}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              <div className="relative h-full flex items-center justify-center">
                <Palette className="w-12 h-12 text-white/50" />
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={() => pickerRef.current?.click()}
                className="w-full py-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-xl font-medium hover:bg-indigo-200 transition"
              >
                点击选择颜色
              </button>
              <input
                ref={pickerRef}
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="hidden"
              />
            </div>
          </div>

          {/* Color Values */}
          <div className="space-y-3">
            {[
              { label: "HEX", value: hex, copy: hex },
              { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, copy: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
              { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, copy: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 font-medium">{item.label}</div>
                  <div className="font-mono text-sm">{item.value}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.copy)}
                  className="text-gray-600 hover:text-indigo-600 transition p-2"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* RGB Sliders */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md space-y-3">
              <h3 className="text-sm font-semibold text-gray-600">RGB 调整</h3>
              {(["r", "g", "b"] as const).map((ch) => (
                <div key={ch} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-4 uppercase text-gray-600">{ch}</span>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={rgb[ch.toUpperCase() as keyof typeof rgb]}
                    onChange={(e) => handleRgbChange(ch, parseInt(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="text-sm font-mono w-8 text-right">{rgb[ch.toUpperCase() as keyof typeof rgb]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="font-semibold mb-4">颜色预设</h3>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleColorChange(preset)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:scale-110 transition shadow-sm"
                style={{ backgroundColor: preset }}
                title={preset}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
