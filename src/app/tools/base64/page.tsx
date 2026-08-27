"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Check, Hash, ScanBarcode } from "lucide-react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError("");
    setOutput("");
    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch (e: any) {
      setError("输入格式不正确，请检查后重试");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
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
          <h1 className="ml-4 text-xl font-bold">Base64 编解码</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Mode Toggle */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => { setMode("encode"); setOutput(""); }}
              className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                mode === "encode" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <Hash className="w-4 h-4" /> 编码
            </button>
            <button
              onClick={() => { setMode("decode"); setOutput(""); }}
              className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                mode === "decode" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <ScanBarcode className="w-4 h-4" /> 解码
            </button>
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              {mode === "encode" ? "待编码文本" : "Base64 字符串"}
            </label>
            <textarea

              aria-label="输入文本或Base64字符串"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 font-mono text-sm resize-none h-32 outline-none focus:border-indigo-500"
              placeholder={mode === "encode" ? "输入要编码的文本..." : "输入Base64字符串..."}
            />
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={!input}
            className="w-full py-3 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {mode === "encode" ? "🔒 编码" : "🔓 解码"}
          </button>

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4 text-red-600 dark:text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Output */}
          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">结果</label>
                <button onClick={copyOutput} className="text-indigo-600 hover:text-indigo-800 transition text-sm font-medium flex items-center gap-1">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "已复制" : "复制"}
                </button>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 font-mono text-sm break-all">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
