"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Check, Link as LinkIcon, Unlink } from "lucide-react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    setError("");
    try {
      setEncoded(encodeURIComponent(input));
      setDecoded("");
    } catch { setError("编码失败"); }
  };

  const handleDecode = () => {
    setError("");
    try {
      setDecoded(decodeURIComponent(input));
      setEncoded("");
    } catch { setError("解码失败，请输入有效的URL编码字符串"); }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <h1 className="ml-4 text-xl font-bold">URL 编解码</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="flex gap-3 mb-6">
            <button onClick={handleEncode} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <LinkIcon className="w-4 h-4" /> URL编码
            </button>
            <button onClick={handleDecode} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <Unlink className="w-4 h-4" /> URL解码
            </button>
          </div>

          <div className="mb-4">
            <textarea

              aria-label="输入URL或文本"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-sm resize-none h-28 outline-none focus:border-indigo-500"
              placeholder="输入URL或文本..."
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 rounded-xl p-3 mb-4 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          {(encoded || decoded) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">结果</span>
                <button onClick={() => copyText(encoded || decoded)} className="text-indigo-600 hover:text-indigo-800 transition text-sm font-medium flex items-center gap-1">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "已复制" : "复制"}
                </button>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 font-mono text-sm break-all">
                {encoded || decoded}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
