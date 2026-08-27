"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Download, Upload, Table as TableIcon, Trash2, Check, Plus } from "lucide-react";

export default function CsvToolPage() {
  const [rawCsv, setRawCsv] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[][]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const parseCsv = (csv: string) => {
    try {
      const lines = csv.trim().split("\n");
      if (lines.length === 0) return;
      
      const parseLine = (line: string): string[] => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (line[i] === "," && !inQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += line[i];
          }
        }
        result.push(current.trim());
        return result;
      };

      const parsed = lines.map(parseLine);
      setHeaders(parsed[0]);
      setRows(parsed.slice(1).filter(r => r.some(c => c)));
      setError("");
    } catch (e) {
      setError("CSV 解析失败，请检查格式");
    }
  };

  const handleParse = () => {
    parseCsv(rawCsv);
  };

  const copyAll = () => {
    const output = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const exportCsv = () => {
    const output = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const addColumn = () => {
    const name = prompt("输入列名:");
    if (!name) return;
    setHeaders([...headers, name]);
    setRows(rows.map(r => [...r, ""]));
  };

  const addRow = () => {
    setRows([...rows, Array(headers.length).fill("")]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-sky-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">📊 CSV 数据处理</h1>
          <span className="ml-auto text-sm text-sky-600 font-medium">{rows.length} 行 × {headers.length} 列</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Raw Input */}
        {!headers.length ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-100">
            <label className="block text-sm font-medium text-gray-600 mb-2">粘贴 CSV 数据</label>
            <textarea

              aria-label="输入CSV数据"
              value={rawCsv}
              onChange={e => setRawCsv(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none resize-none h-48 font-mono text-sm"
              placeholder={"姓名,年龄,城市\n张三,25,北京\n李四,30,上海"}
            />
            <button
              onClick={handleParse}
              disabled={!rawCsv.trim()}
              className="mt-4 w-full py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              <TableIcon className="w-4 h-4" /> 解析 CSV
            </button>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex gap-3 mb-4 flex-wrap">
              <button onClick={addColumn} className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition flex items-center gap-1"><Plus className="w-4 h-4" />加列</button>
              <button onClick={addRow} className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition flex items-center gap-1"><Plus className="w-4 h-4" />加行</button>
              <button onClick={copyAll} className="px-4 py-2 bg-purple-500 text-white rounded-xl text-sm font-medium hover:bg-purple-600 transition flex items-center gap-1">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? "已复制" : "复制"}</button>
              <button onClick={exportCsv} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-medium hover:bg-sky-700 transition flex items-center gap-1"><Download className="w-4 h-4" /> 导出CSV</button>
              <button onClick={() => { setHeaders([]); setRows([]); setRawCsv(""); }} className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition flex items-center gap-1"><Trash2 className="w-4 h-4" /> 清空</button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
              <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-sky-600 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left w-12">#</th>
                      {headers.map((h, i) => (
                        <th key={i} className="px-4 py-2 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={ri} className={`border-b border-sky-50 ${ri % 2 === 0 ? "bg-white" : "bg-sky-50"}`}>
                        <td className="px-4 py-2 text-xs text-gray-600 font-mono">{ri + 1}</td>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-2">
                            <input
                              aria-label={"行 " + (ri + 1) + " 列 " + (ci + 1)}
                              value={cell}
                              onChange={e => {
                                const newRows = rows.map(r => [...r]);
                                newRows[ri][ci] = e.target.value;
                                setRows(newRows);
                              }}
                              className="w-full bg-transparent outline-none focus:bg-white rounded px-1 py-0.5"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {error && <div className="mt-3 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
}
