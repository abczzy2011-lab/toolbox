"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Check, RefreshCw, Type, FileText, List } from "lucide-react";

const loremWords = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","laborum"];

function genParagraph(): string {
  const count = 15 + Math.floor(Math.random() * 20);
  const words = Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

export default function LoremGeneratorPage() {
  const [mode, setMode] = useState<"words"|"sentences"|"paragraphs">("sentences");
  const [count, setCount] = useState(3);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    switch (mode) {
      case "words": setResult(Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]).join(" ")); break;
      case "sentences": setResult(Array.from({ length: count }, genParagraph).join("\n\n")); break;
      case "paragraphs": setResult(Array.from({ length: count }, genParagraph).join("\n\n")); break;
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-cyan-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">📝 随机文本生成器</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-cyan-100 p-6 mb-6 space-y-5">
          <div className="flex gap-2">
            {(["words", "sentences", "paragraphs"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 py-3 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 ${mode === m ? "bg-cyan-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                {m === "words" && <Type className="w-4 h-4" />}
                {m === "sentences" && <FileText className="w-4 h-4" />}
                {m === "paragraphs" && <List className="w-4 h-4" />}
                {m === "words" ? "单词" : m === "sentences" ? "句子" : "段落"}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">数量</span>
              <span className="text-lg font-bold text-cyan-600">{count}</span>
            </div>
            <input aria-label="文本段落数量" type="range" min={1} max={50} value={count} onChange={e => setCount(+e.target.value)} className="w-full accent-cyan-600" />
          </div>

          <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4" />生成随机文本</button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-cyan-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b">
              <span className="text-sm font-medium text-gray-600">生成结果</span>
              <button onClick={copyResult} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${copied ? "bg-green-100 text-green-700" : "bg-gray-100 hover:bg-gray-200"}`}>
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "已复制" : "复制"}
              </button>
            </div>
            <pre className="p-5 text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{result}</pre>
          </div>
        )}

        {!result && (
          <div className="text-center py-12 text-cyan-300">
            <Type className="w-12 h-12 mx-auto mb-3" />
            <p>点击"生成"按钮创建占位文本</p>
          </div>
        )}
      </div>
    </div>
  );
}
