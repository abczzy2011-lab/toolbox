"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, GitCompare, Trash2, AlertCircle, CheckCircle } from "lucide-react";

export default function DiffToolPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffs, setDiffs] = useState<{type: "same"|"add"|"remove", text: string}[]>([]);
  const [stats, setStats] = useState<{added: number; removed: number; unchanged: number}>({ added: 0, removed: 0, unchanged: 0 });

  const doDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    
    // Simple LCS-based diff
    const m = lines1.length;
    const n = lines2.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (lines1[i - 1] === lines2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    
    const result: {type: "same"|"add"|"remove", text: string}[] = [];
    let i = m, j = n, added = 0, removed = 0, unchanged = 0;
    
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
        result.unshift({ type: "same", text: lines1[i - 1] });
        i--; j--; unchanged++;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        result.unshift({ type: "add", text: lines2[j - 1] });
        j--; added++;
      } else {
        result.unshift({ type: "remove", text: lines1[i - 1] });
        i--; removed++;
      }
    }
    
    setDiffs(result);
    setStats({ added, removed, unchanged });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-pink-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">🔀 文本对比工具</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-rose-600 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" />原文</span>
              <button onClick={() => { setText1(""); }} className="text-xs text-gray-600 hover:text-red-500">清空</button>
            </div>
            <textarea

              aria-label="原文"
              value={text1}
              onChange={e => setText1(e.target.value)}
              className="w-full h-40 px-3 py-2 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none resize-none font-mono text-sm bg-rose-50/50"
              placeholder="粘贴原文..."
            />
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />新文</span>
              <button onClick={() => { setText2(""); }} className="text-xs text-gray-600 hover:text-red-500">清空</button>
            </div>
            <textarea
              aria-label="修改后的文本"
              value={text2}
              onChange={e => setText2(e.target.value)}
              className="w-full h-40 px-3 py-2 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none resize-none font-mono text-sm bg-emerald-50/50"
              placeholder="粘贴修改后的文本..."
            />
          </div>
        </div>

        {/* Compare Button */}
        <button
          onClick={doDiff}
          disabled={!text1.trim() && !text2.trim()}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2 mb-6"
        >
          <GitCompare className="w-4 h-4" /> 开始对比
        </button>

        {/* Stats */}
        {stats.added > 0 || stats.removed > 0 ? (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="text-2xl font-bold text-green-600">{stats.added}</div><div className="text-xs text-gray-600">新增行</div></div>
              <div><div className="text-2xl font-bold text-red-600">{stats.removed}</div><div className="text-xs text-gray-600">删除行</div></div>
              <div><div className="text-2xl font-bold text-gray-600">{stats.unchanged}</div><div className="text-xs text-gray-600">未变行</div></div>
            </div>
          </div>
        ) : null}

        {/* Diff Results */}
        {diffs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden max-h-[60vh] overflow-y-auto">
            {diffs.map((d, i) => (
              <div key={i} className={`px-4 py-1.5 text-sm font-mono border-b border-gray-50 ${
                d.type === "add" ? "bg-green-50 text-green-800" :
                d.type === "remove" ? "bg-red-50 text-red-800" :
                "bg-white text-gray-600"
              }`}>
                <span className="inline-block w-6 text-right mr-3 text-gray-300 select-none">
                  {d.type === "add" ? "+" : d.type === "remove" ? "-" : " "}
                </span>
                {d.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
