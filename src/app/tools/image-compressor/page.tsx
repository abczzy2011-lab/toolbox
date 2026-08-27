"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, X, Maximize2, Minimize2 } from "lucide-react";

interface ImageInfo {
  name: string;
  originalSize: number;
  compressedSize: number;
  preview: string;
  compressedPreview: string;
  width: number;
  height: number;
}

export default function ImageCompressorPage() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [quality, setQuality] = useState(70);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File, qualityVal: number): Promise<ImageInfo> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                name: file.name,
                originalSize: file.size,
                compressedSize: blob.size,
                preview: e.target!.result as string,
                compressedPreview: compressedUrl,
                width: img.width,
                height: img.height,
              });
            }
          }, "image/jpeg", qualityVal / 100);
        };
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const newImages: ImageInfo[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        const info = await compressImage(files[i], quality);
        newImages.push(info);
      }
    }
    setImages([...images, ...newImages]);
  };

  const downloadImage = (img: ImageInfo) => {
    const link = document.createElement("a");
    link.href = img.compressedPreview;
    link.download = `compressed_${img.name}`;
    link.click();
  };

  const downloadAll = () => {
    images.forEach(downloadImage);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].compressedPreview);
    setImages(images.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <span className="ml-4 badge-vip">VIP</span>
          <h1 className="ml-3 text-xl font-bold">图片压缩工具</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                压缩质量: {quality}%
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>低质量 (更小)</span>
                <span>高质量 (更大)</span>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 gradient-vip text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> 上传图片
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />

            {images.length > 0 && (
              <>
                <button onClick={downloadAll} className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2">
                  <Download className="w-4 h-4" /> 全部下载
                </button>
                <button onClick={() => setImages([])} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition">
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Drop Zone (when empty) */}
        {images.length === 0 && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            className={`bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed p-16 text-center cursor-pointer transition ${
              dragging ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20" : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <ImageIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">拖拽图片到这里，或点击上传</p>
            <p className="text-sm text-gray-600">支持 JPG, PNG, WebP, GIF 等格式</p>
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, i) => {
              const saved = img.originalSize - img.compressedSize;
              const savedPercent = Math.round((saved / img.originalSize) * 100);
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="relative">
                    <img src={img.compressedPreview} alt={img.name} className="w-full h-48 object-cover" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm truncate mb-1">{img.name}</h4>
                    <p className="text-xs text-gray-600 mb-3">{img.width} × {img.height}</p>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-600 line-through">{formatSize(img.originalSize)}</span>
                      <span className="text-green-600 font-bold">{formatSize(img.compressedSize)}</span>
                    </div>
                    {saved > 0 && (
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2 text-center text-sm text-green-600 dark:text-green-400 mb-3">
                        ↓ 节省了 {savedPercent}% ({formatSize(saved)})
                      </div>
                    )}
                    <button
                      onClick={() => downloadImage(img)}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> 下载
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
