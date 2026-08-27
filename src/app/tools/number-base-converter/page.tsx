"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, SwapRight, Binary } from "lucide-react";

export default function NumberBaseConverterPage() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [results, setResults] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState("");

  const bases = [2, 8, 10, 16];
  const baseNames: Record<number, string> = { 2: "二进制", 8: "八进制", 10: "十进制", 16: "十六进制" };
  const baseLabels: Record<number, string> = { 2: "BIN", 8: "OCT", 10: "DEC", 16: "HEX" };

  useEffect(() => {
    if (!input.trim()) { setResults({}); return; }
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) { setResults({}); return; }
      const newResults: Record<number, string> = {};
      for (const b of bases) {
        newResults[b] = decimal.toString(b).toUpperCase();
      }
      setResults(newResults);
    } catch { setResults({}); }
  }, [input, fromBase]);

  const copyResult = async (text: string, key: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-green-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">🔢 进制转换器</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr_auto] gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
            <label className="block text-sm font-medium text-gray-600 mb-2">输入数字</label>
            <input aria-label="输入数字" value={input} onChange={e => setInput(e.target.value)} placeholder="输入数字..." className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-400 outline-none text-lg font-mono bg-gray-50" />
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 w-full md:w-48">
            <label className="block text-sm font-medium text-gray-600 mb-2">输入进制</label>
            <select aria-label="选择进制" value={fromBase} onChange={e => setFromBase(+e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-400 outline-none text-lg font-mono bg-gray-50">
              {bases.map(b => <option key={b} value={b}>{baseNames[b]} ({baseLabels[b]})</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(results).map(([key, val]) => {
            const b = +key;
            if (!val) return null;
            return (
              <div key={b} className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition ${b === toBase ? "ring-2 ring-green-400" : "border-gray-100"}`}>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${b === toBase ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{baseLabels[b]}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setFromBase(b); }} className="text-xs text-green-500 hover:text-green-700 font-medium">设为输入</button>
                    <button onClick={() => setToBase(b)} className={`px-2 py-1 rounded text-xs font-medium ${b === toBase ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>{b === toBase ? "目标 ✓" : "设为目标"}</button>
                    <button aria-label="复制结果" onClick={() => copyResult(val, b)} className="text-gray-600 hover:text-green-500 transition">{copied === b ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
                  </div>
                </div>
                <div className="px-5 pb-4"><code className="text-base font-mono text-gray-800 break-all bg-gray-50 rounded-lg px-3 py-2 block">{val}</code></div>
              </div>
            );
          })}
        </div>

        {input && Object.keys(results).length === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600">无法解析，请检查输入是否正确</div>
        )}

        {!input && (
          <div className="text-center py-12 text-green-300"><Binary className="w-16 h-16 mx-auto mb-3" /><p>输入一个数字开始转换</p></div>
        )}
      </div>
    </div>
  );
}
