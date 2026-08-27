"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Hash, Text, LineChart, BarChart3, Trash2 } from "lucide-react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const englishWords = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lines = text === "" ? 1 : text.split("\n").length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
  const sentences = (text.match(/[.!?。！？；;]+/g) || []).length || (text.trim() ? 1 : 0);
  const readTime = Math.ceil(englishWords / 200);
  const speakTime = Math.ceil(chineseChars / 300);

  const statCards = [
    { icon: Hash, label: "总字符", value: chars, color: "indigo" },
    { icon: Text, label: "中文字符", value: chineseChars, color: "green" },
    { icon: LineChart, label: "英文单词", value: englishWords, color: "blue" },
    { icon: BarChart3, label: "行数", value: lines, color: "purple" },
  ];

  const copyText = () => {
    if (!text.trim()) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
              <ArrowLeft className="w-5 h-5 mr-1" />
              返回首页
            </Link>
            <h1 className="ml-4 text-lg font-bold">字数统计</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={copyText} disabled={!text.trim()} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition ${text.trim() ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200" : "bg-gray-100 dark:bg-gray-700 text-gray-600 cursor-not-allowed"}`}>
              <Text className="w-3 h-3" />
              {copied ? "已复制" : "复制"}
            </button>
            {text && (
              <button onClick={clearText} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 transition flex items-center gap-1">
                <Trash2 className="w-3 h-3" />
                清空
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <card.icon className={`w-4 h-4 text-${card.color}-500`} />
                <span className="text-xs text-gray-600">{card.label}</span>
              </div>
              <div className="text-2xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">无空格字符</div>
            <div className="text-xl font-bold">{charsNoSpace}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">句子数</div>
            <div className="text-xl font-bold">{sentences}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">段落数</div>
            <div className="text-xl font-bold">{paragraphs}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">阅读时间</div>
            <div className="text-xl font-bold">{readTime} 分钟</div>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[calc(100vh-340px)] p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 font-mono text-sm leading-relaxed"
          placeholder="在此输入或粘贴文本，实时统计字数..."
        />
      </div>
    </div>
  );
}
