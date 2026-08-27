"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Search, Filter, Copy, Trash2, LineChart, BookOpen } from "lucide-react";

export default function GrepToolPage() {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matches, setMatches] = useState<{line: number; text: string; col: number}[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [stats, setStats] = useState<any>(null);

  const doSearch = () => {
    if (!pattern.trim()) return;
    const newMatches: {line: number; text: string; col: number}[] = [];
    const lines = text.split("\n");
    
    let flags = "g";
    if (!caseSensitive) flags += "i";
    
    let regex: RegExp;
    if (useRegex) {
      try {
        regex = new RegExp(pattern, flags);
      } catch(e) {
        alert("正则表达式错误");
        return;
      }
    } else {
      let escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (wholeWord) escaped = `\\b${escaped}\\b`;
      regex = new RegExp(escaped, flags);
    }
    
    lines.forEach((line, i) => {
      let m;
      const re = new RegExp(regex.source, flags);
      while ((m = re.exec(line)) !== null) {
        newMatches.push({ line: i + 1, text: line.trim(), col: m.index });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    });
    
    setMatches(newMatches);
    setMatchCount(newMatches.length);
    setStats({
      totalLines: lines.length,
      matchingLines: new Set(newMatches.map(m => m.line)).size,
      totalChars: text.length,
      totalWords: text.trim() ? text.trim().split(/\s+/).length : 0,
    });
  };

  const handleCopyMatch = (line: number) => {
    const lineText = text.split("\n")[line - 1];
    navigator.clipboard.writeText(lineText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-emerald-500 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">🔍 文本搜索工具</h1>
          <span className="ml-auto text-sm text-emerald-600 font-medium">{matchCount > 0 && `${matchCount} 个匹配`}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Controls */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100 mb-6 space-y-4">
          <div className="flex gap-3">
            <input
              aria-label="搜索关键词或正则表达式"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder={useRegex ? "输入正则表达式..." : "输入要搜索的关键词..."}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-400 outline-none"
            />
            <button
              onClick={doSearch}
              disabled={!pattern.trim()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> 搜索
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="rounded accent-emerald-600" />
              区分大小写
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={wholeWord} onChange={e => setWholeWord(e.target.checked)} className="rounded accent-emerald-600" />
              全词匹配
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} className="rounded accent-emerald-600" />
              使用正则表达式
            </label>
          </div>
        </div>

        {/* Text Input */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
              <span className="text-sm font-medium text-gray-600">输入文本</span>
              <button onClick={() => { setText(""); setMatches([]); setMatchCount(0); }} aria-label="清空文本" className="text-gray-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              aria-label="输入文本"
              className="w-full h-64 p-4 resize-none outline-none text-sm font-mono bg-gray-50"
              placeholder="在此粘贴要搜索的文本..."
            />
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><LineChart className="w-4 h-4 text-emerald-500" /> 统计信息</h3>
            {stats ? (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "总行数", value: stats.totalLines },
                  { label: "匹配行数", value: stats.matchingLines },
                  { label: "总字符数", value: stats.totalChars.toLocaleString() },
                  { label: "总词数", value: stats.totalWords.toLocaleString() },
                  { label: "匹配总数", value: matchCount },
                  { label: "文本大小", value: (new Blob([text]).size / 1024).toFixed(1) + " KB" },
                ].map((s, i) => (
                  <div key={i} className="bg-emerald-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-emerald-700">{s.value}</div>
                    <div className="text-xs text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 text-center py-12">执行搜索查看统计信息</p>
            )}
          </div>
        </div>

        {/* Results */}
        {matchCount > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-50 border-b">
              <span className="text-sm font-medium text-emerald-700">搜索结果 — {matchCount} 条匹配</span>
              <button onClick={() => navigator.clipboard.writeText(matches.map(m => m.text).join("\n"))} className="text-emerald-600 hover:text-emerald-800 text-sm flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" /> 复制所有结果
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y">
              {matches.map((m, i) => (
                <div key={i} className="px-4 py-2 hover:bg-emerald-50 cursor-pointer group" onClick={() => handleCopyMatch(m.line)}>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono">行 {m.line}</span>
                    <span>列 {m.col}</span>
                  </div>
                  <div className="text-sm font-mono mt-0.5 truncate">{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!matchCount && text && (
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">点击"搜索"开始查找匹配文本</p>
          </div>
        )}
      </div>
    </div>
  );
}
