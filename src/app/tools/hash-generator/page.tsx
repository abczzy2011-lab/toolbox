"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Hash as HashIcon, RefreshCw, ShieldCheck } from "lucide-react";

async function hashText(data: string, algo: AlgorithmIdentifier): Promise<string> {
  const encoded = new TextEncoder().encode(data);
  const buf = await crypto.subtle.digest(algo, encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorPage() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [copiedAlgo, setCopiedAlgo] = useState("");

  const generateAll = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const results: Record<string, string> = {};
      
      // MD5 simulation using SHA-1 for demo (browsers don't support MD5 natively)
      results["SHA-1"] = await hashText(text, "SHA-1");
      results["SHA-256"] = await hashText(text, "SHA-256");
      results["SHA-384"] = await hashText(text, "SHA-384");
      results["SHA-512"] = await hashText(text, "SHA-512");
      
      setHashes(results);
    } catch(e) {
      alert("哈希生成失败");
    }
    setLoading(false);
  };

  const copyHash = async (algo: string, hash: string) => {
    await navigator.clipboard.writeText(hash);
    setCopiedAlgo(algo);
    setTimeout(() => setCopiedAlgo(""), 1500);
  };

  const algoInfo: Record<string, { bits: number; desc: string; color: string }> = {
    "SHA-1": { bits: 160, desc: "已不安全，仅用于历史兼容", color: "red" },
    "SHA-256": { bits: 256, desc: "最广泛使用，安全高效", color: "green" },
    "SHA-384": { bits: 384, desc: "更高的安全性", color: "emerald" },
    "SHA-512": { bits: 512, desc: "最大安全级别", color: "teal" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-purple-500 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">🔐 哈希生成器</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">输入文本</label>
          <textarea
            aria-label="输入要生成哈希的文本"
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none resize-none h-32 font-mono text-sm"
            placeholder="输入要生成哈希的文本..."
          />
          <button
            onClick={generateAll}
            disabled={!text.trim() || loading}
            className="mt-4 w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {loading ? "生成中..." : "生成所有哈希值"}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {Object.entries(hashes).map(([algo, hash]) => {
            const info = algoInfo[algo];
            return (
              <div key={algo} className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b">
                  <div className="flex items-center gap-3">
                    <HashIcon className={`w-5 h-5 ${info.color === 'red' ? 'text-red-500' : 'text-purple-500'}`} />
                    <span className="font-semibold text-gray-800">{algo}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${info.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{info.bits}-bit</span>
                  </div>
                  <span className="text-xs text-gray-600">{info.desc}</span>
                </div>
                <div className="px-5 py-4 flex items-center gap-3">
                  <code className="flex-1 text-sm font-mono break-all text-gray-700">{hash}</code>
                  <button
                    onClick={() => copyHash(algo, hash)}
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-purple-50 text-purple-500 transition"
                  >
                    {copiedAlgo === algo ? <ShieldCheck className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!Object.keys(hashes).length && !loading && (
          <div className="text-center py-12 text-purple-300">
            <HashIcon className="w-16 h-16 mx-auto mb-3" />
            <p>输入文本后点击生成哈希值</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-semibold text-blue-800 mb-2">💡 什么是哈希？</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 哈希是将任意长度的数据转换为固定长度字符串的过程</li>
            <li>• 相同输入永远生成相同输出，不同输入几乎不可能相同</li>
            <li>• 哈希常用于验证文件完整性、密码存储等场景</li>
            <li>• SHA-256 是目前最安全的哈希算法之一</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
