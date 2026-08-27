"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Heart, Scale, Ruler } from "lucide-react";

export default function BmiCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"metric"|"imperial">("metric");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;
    
    let bmi: number;
    if (unit === "metric") {
      bmi = w / ((h / 100) ** 2);
    } else {
      bmi = (w / (h * h)) * 703;
    }
    setResult(parseFloat(bmi.toFixed(1)));
  };

  const getStatus = (bmi?: number): { label: string; color: string; bg: string; desc: string } | null => {
    if (bmi === undefined || bmi === null) return null;
    if (bmi < 18.5) return { label: "偏瘦", color: "#3b82f6", bg: "bg-blue-50 border-blue-200", desc: "BMI过低，建议适当增加营养摄入" };
    if (bmi < 24) return { label: "正常", color: "#10b981", bg: "bg-green-50 border-green-200", desc: "恭喜！您的体重在健康范围内" };
    if (bmi < 28) return { label: "偏胖", color: "#f59e0b", bg: "bg-amber-50 border-amber-200", desc: "体重稍重，建议适当运动控制饮食" };
    return { label: "肥胖", color: "#ef4444", bg: "bg-red-50 border-red-200", desc: "体重超标较多，建议咨询医生制定减肥计划" };
  };

  // Ideal BMI range
  const h = height ? parseFloat(height) : 0;
  const idealWeight = unit === "metric" 
    ? h ? `${((18.5 * (h/100)**2)).toFixed(1)}-${(24 * (h/100)**2).toFixed(1)} kg` : "-" 
    : h ? `${((18.5 * h * h / 703)).toFixed(1)}-${(24 * h * h / 703).toFixed(1)} lbs` : "-";

  const status = result !== null ? getStatus(result) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-pink-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">❤️ BMI 计算器</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 mb-6 space-y-5">
          {/* Unit Toggle */}
          <div className="flex gap-2">
            <button onClick={() => setUnit("metric")} className={`flex-1 py-3 rounded-xl font-medium text-sm transition ${unit === "metric" ? "bg-pink-600 text-white" : "bg-gray-50 text-gray-600"}`}>公制 (kg/cm)</button>
            <button onClick={() => setUnit("imperial")} className={`flex-1 py-3 rounded-xl font-medium text-sm transition ${unit === "imperial" ? "bg-pink-600 text-white" : "bg-gray-50 text-gray-600"}`}>英制 (lb/inch)</button>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"><Scale className="w-4 h-4" />体重 ({unit === "metric" ? "kg" : "lbs"})</label>
            <input aria-label="体重" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === "metric" ? "例如: 65" : "例如: 143"} className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none text-lg" />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"><Ruler className="w-4 h-4" />身高 ({unit === "metric" ? "cm" : "inch"})</label>
            <input aria-label="身高" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={unit === "metric" ? "例如: 170" : "例如: 67"} className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none text-lg" />
          </div>

          <button onClick={calculate} disabled={!weight || !height} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" />计算 BMI
          </button>
        </div>

        {/* Result */}
        {status && (
          <div className={`rounded-2xl p-6 shadow-sm border mb-6 ${status.bg}`}>
            <div className="text-center mb-4">
              <div className="text-5xl font-black mb-1" style={{ color: status.color }}>{result}</div>
              <div className="text-lg font-semibold" style={{ color: status.color }}>{status.label}</div>
            </div>
            <p className="text-sm text-center opacity-80">{status.desc}</p>
            <div className="mt-4 text-center text-xs opacity-60">理想体重范围: {idealWeight}</div>
          </div>
        )}

        {/* BMI Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b text-sm font-semibold text-gray-600">BMI 分类标准</div>
          <div className="divide-y">
            {[
              { min: 0, max: 18.5, label: "偏瘦", color: "bg-blue-400" },
              { min: 18.5, max: 24, label: "正常", color: "bg-green-500" },
              { min: 24, max: 28, label: "偏胖", color: "bg-amber-400" },
              { min: 28, max: 999, label: "肥胖", color: "bg-red-500" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <div className={`w-3 h-3 rounded-full ${r.color}`} />
                <span className="font-medium flex-1">{r.label}</span>
                <span className="text-sm text-gray-600 font-mono">{r.max < 999 ? `${r.min} ~ ${r.max}` : `≥ ${r.min}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
