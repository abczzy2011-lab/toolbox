"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Search, Copy, Trash2, Shield, Sparkles } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("gi");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<{match: string; index: number; groups: string[]}[]>([]);
  const [matchCount, setMatchCount] = useState(0);

  const testRegex = () => {
    if (!pattern) return;
    try {
      const regex = new RegExp(pattern, flags);
      const found: typeof results = [];
      let m;
      while ((m = regex.exec(testString)) !== null) {
        found.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
        if (m.index === regex.lastIndex) regex.lastIndex++;
      }
      setResults(found);
      setMatchCount(found.length);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setResults([]);
    }
  };

  // Quick patterns
  const quickPatterns = [
    { name: "邮箱", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { name: "手机号", pattern: "1[3-9]\\d{9}" },
    { name: "IP地址", pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}" },
    { name: "URL", pattern: "https?://[^\\s]+" },
    { name: "HTML标签", pattern: "<[^>]+>" },
    { name: "中文", pattern: "[\\u4e00-\\u9fff]+" },
    { name: "日期 YYYY-MM-DD", pattern: "\\d{4}-\\d{2}-\\d{2}" },
    { name: "密码强度", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-indigo-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">🧪 正则表达式测试器</h1>
          <span className="ml-auto text-sm text-indigo-600 font-medium">{matchCount > 0 && `${matchCount} 个匹配`}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Quick Patterns */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-gray-600 flex items-center gap-1"><Sparkles className="w-3 h-3" />常用:</span>
          {quickPatterns.map(q => (
            <button key={q.name} onClick={() => { setPattern(q.pattern); }} className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition border border-gray-200">
              {q.name}
            </button>
          ))}
        </div>

        {/* Pattern Input */}
        <div className="grid md:grid-cols-[1fr_100px] gap-3 mb-4">
          <div className="flex gap-2">
            <input
              aria-label="正则表达式"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="输入正则表达式..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 outline-none font-mono text-sm"
            />
            <input
              aria-label="正则表达式标志"
              value={flags}
              onChange={e => setFlags(e.target.value)}
              className="px-3 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 outline-none font-mono text-sm w-20 text-center"
            />
          </div>
          <button onClick={testRegex} disabled={!pattern} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> 测试
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">⚠️ {error}</div>
        )}

        {/* Test String */}
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
            <span className="text-sm font-medium text-gray-600">测试文本</span>
            <button onClick={() => { setTestString(""); }} aria-label="清空文本" className="text-gray-600 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <textarea
            value={testString}
            onChange={e => setTestString(e.target.value)}
            aria-label="测试文本"
            className="w-full h-32 p-4 resize-none outline-none text-sm font-mono bg-gray-50"
            placeholder="在此粘贴要测试的文本..."
          />
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {/* Match Count Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">{matchCount}</div>
                <div className="text-xs text-gray-600">匹配总数</div>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 text-center border border-indigo-200">
                <div className="text-2xl font-bold text-indigo-600">{testString.length}</div>
                <div className="text-xs text-gray-600">测试文本长度</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{results.filter(r => r.groups.length > 0).length}</div>
                <div className="text-xs text-gray-600">有捕获组</div>
              </div>
            </div>

            {/* Individual Matches */}
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-300 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold">#{i + 1}</span>
                      <span className="text-xs text-gray-600">位置: 第 {r.index} 个字符</span>
                    </div>
                    <button aria-label="复制匹配结果" onClick={() => navigator.clipboard.writeText(r.match)} className="text-indigo-500 hover:text-indigo-700"><Copy className="w-4 h-4" /></button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm mb-2">
                    <span className="text-gray-600 mr-2">匹配:</span>
                    <span className="text-indigo-600 font-bold">{r.match}</span>
                  </div>
                  {r.groups.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">捕获组:</span>{" "}
                      {r.groups.map((g, gi) => (
                        <span key={gi} className={`inline-block bg-${gi % 3 === 0 ? "blue" : gi % 3 === 1 ? "green" : "purple"}-50 text-${gi % 3 === 0 ? "blue" : gi % 3 === 1 ? "green" : "purple"}-600 px-2 py-0.5 rounded mr-1 mt-1`}>
                          {g || "(空)"}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : matchCount === 0 && pattern && !error && (
          <div className="text-center py-12 text-gray-600">
            <Shield className="w-12 h-12 mx-auto mb-3" />
            <p>没有找到匹配结果</p>
          </div>
        )}
      </div>
    </div>
  );
}
