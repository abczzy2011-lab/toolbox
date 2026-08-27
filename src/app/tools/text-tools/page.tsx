"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Type, Copy, Trash2, SortAsc, SortDesc, Hash, Tag } from "lucide-react";

export default function TextToolsPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [stats, setStats] = useState<any>(null);

  const countStats = (txt: string) => {
    const chars = txt.length;
    const charsNoSpace = txt.replace(/\s/g, "").length;
    const chineseChars = (txt.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = txt.trim() === "" ? 0 : txt.trim().split(/\s+/).length;
    const lines = txt.split("\n").length;
    const paragraphs = txt.split(/\n\s*\n/).filter(p => p.trim()).length || (txt.trim() ? 1 : 0);
    setStats({ chars, charsNoSpace, chineseChars, englishWords, lines, paragraphs });
  };

  const handleAction = (action: string) => {
    let res = text;
    switch (action) {
      case "upper": res = text.toUpperCase(); break;
      case "lower": res = text.toLowerCase(); break;
      case "capitalize": res = text.replace(/\b\w/g, c => c.toUpperCase()); break;
      case "sentence": res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase()); break;
      case "reverse": res = text.split("").reverse().join(""); break;
      case "trim": res = text.replace(/\n\s*\n/g, "\n").trim(); break;
      case "remove-duplicates": {
        const lines = text.split("\n");
        res = [...new Set(lines)].join("\n");
        break;
      }
      case "sort-asc": {
        res = text.split("\n").sort().join("\n");
        break;
      }
      case "sort-desc": {
        res = text.split("\n").sort().reverse().join("\n");
        break;
      }
      case "count-chars": {
        res = `总字符数: ${text.length}\n无空格字符: ${text.replace(/\s/g, "").length}\n中文字符: ${(text.match(/[\u4e00-\u9fff]/g) || []).length}\n英文单词: ${text.trim() === "" ? 0 : text.trim().split(/\s+/).length}\n行数: ${text.split("\n").length}`;
        break;
      }
      case "remove-lines": {
        res = text.split("\n").filter(l => l.trim()).join("\n");
        break;
      }
      case "add-line-numbers": {
        res = text.split("\n").map((l, i) => `${i + 1}. ${l}`).join("\n");
        break;
      }
      case "remove-extra-spaces": {
        res = text.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n");
        break;
      }
      default: res = text;
    }
    setResult(res);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result || text);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <h1 className="ml-4 text-xl font-bold">文本处理工具</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-140px)]">
          {/* Input */}
          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
              <h2 className="font-semibold flex items-center gap-2"><Type className="w-4 h-4" />输入文本</h2>
              <button onClick={() => { setText(""); setResult(""); setStats(null); }} aria-label="清空文本" className="text-gray-600 hover:text-red-500 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              aria-label="输入要处理的文本"
              value={text}
              onChange={(e) => { setText(e.target.value); countStats(e.target.value); }}
              className="flex-1 p-4 resize-none outline-none text-sm leading-relaxed"
              placeholder="在此粘贴或输入文本..."
            />
            {stats && (
              <div className="flex gap-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
                <span>字符: {stats.chars}</span>
                <span>无空格: {stats.charsNoSpace}</span>
                <span>中文: {stats.chineseChars}</span>
                <span>英文单词: {stats.englishWords}</span>
                <span>行数: {stats.lines}</span>
                <span>段落: {stats.paragraphs}</span>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
              <h2 className="font-semibold flex items-center gap-2"><Tag className="w-4 h-4" />结果</h2>
              <button onClick={copyResult} className="text-indigo-600 hover:text-indigo-800 transition text-sm font-medium">
                <Copy className="w-4 h-4 inline mr-1" />复制
              </button>
            </div>
            <textarea
                aria-label="输入内容"
              value={result}
              readOnly
              className="flex-1 p-4 resize-none outline-none text-sm leading-relaxed bg-gray-50 dark:bg-gray-700/50"
              placeholder="操作结果将显示在这里..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">转换操作</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "转大写", action: "upper", icon: "A↑" },
              { label: "转小写", action: "lower", icon: "a↓" },
              { label: "首字母大写", action: "capitalize", icon: "Abc" },
              { label: "句子大小写", action: "sentence", icon: "Sentence" },
              { label: "反转", action: "reverse", icon: "↩" },
              { label: "去空行", action: "remove-lines", icon: "🗑" },
              { label: "去重复行", action: "remove-duplicates", icon: "🔄" },
              { label: "排序A-Z", action: "sort-asc", icon: <SortAsc className="w-4 h-4" /> },
              { label: "排序Z-A", action: "sort-desc", icon: <SortDesc className="w-4 h-4" /> },
              { label: "去多余空格", action: "remove-extra-spaces", icon: "⬜" },
              { label: "添加行号", action: "add-line-numbers", icon: "#️⃣" },
              { label: "去除首尾空格", action: "trim", icon: "✂" },
              { label: "统计信息", action: "count-chars", icon: <Hash className="w-4 h-4" /> },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleAction(btn.action)}
                className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
