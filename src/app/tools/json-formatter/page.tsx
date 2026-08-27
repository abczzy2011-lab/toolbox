"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Trash2, Code, FileJson, Check } from "lucide-react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: any) {
      setError(`JSON 格式错误: ${e.message}`);
      setOutput("");
    }
  };

  const handleMinify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: any) {
      setError(`JSON 格式错误: ${e.message}`);
      setOutput("");
    }
  };

  const handleValidate = () => {
    setError("");
    try {
      JSON.parse(input);
      setError("");
      alert("✅ JSON 格式正确!");
    } catch (e: any) {
      setError(`❌ JSON 格式错误: ${e.message}`);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prettifyJson = (jsonStr: string) => {
    try {
      const obj = JSON.parse(jsonStr);
      return JSON.stringify(obj, null, 2);
    } catch {
      return jsonStr;
    }
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
          <h1 className="ml-3 text-xl font-bold">JSON 格式化器</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 mb-4 flex flex-wrap items-center gap-3">
          <button onClick={handleFormat} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition text-sm flex items-center gap-2">
            <Code className="w-4 h-4" /> 格式化
          </button>
          <button onClick={handleMinify} className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition text-sm flex items-center gap-2">
            <FileJson className="w-4 h-4" /> 最小化
          </button>
          <button onClick={handleValidate} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-sm">
            验证
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-600">缩进:</label>
            <select aria-label="缩进空格数" value={indent} onChange={(e) => setIndent(parseInt(e.target.value))} className="px-2 py-1 rounded-lg border border-gray-200 text-sm">
              <option value={2}>2空格</option>
              <option value={4}>4空格</option>
              <option value={8}>Tab</option>
            </select>
          </div>
        </div>

        {/* Editor */}
        <div className="grid md:grid-cols-2 gap-4 h-[calc(100vh-260px)]">
          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">输入 JSON</span>
              <button aria-label="清空内容" onClick={() => { setInput(""); setOutput(""); setError(""); }} className="text-gray-600 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              aria-label="输入 JSON 数据"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-4 resize-none outline-none font-mono text-sm bg-gray-50 dark:bg-gray-700/50"
              placeholder='粘贴JSON数据，例如: {"name": "John", "age": 30}'
            />
          </div>

          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">输出结果</span>
              {output && (
                <button onClick={copyOutput} className="text-indigo-600 hover:text-indigo-800 transition text-sm font-medium flex items-center gap-1">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "已复制" : "复制"}
                </button>
              )}
            </div>
            <textarea
                aria-label="输入内容"
              value={output}
              readOnly
              className="flex-1 p-4 resize-none outline-none font-mono text-sm bg-gray-50 dark:bg-gray-700/50"
              placeholder="格式化后的JSON将显示在这里..."
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-600 dark:text-red-300 text-sm">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}
