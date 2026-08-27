"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, Palette, AlertTriangle, CheckCircle2 } from "lucide-react";

const colorTests = [
  { id: 1, name: "红绿检测", colors: ["#e53935", "#43a047", "#ff7043", "#66bb6a"], type: "red-green" },
  { id: 2, name: "完整色觉", colors: ["#f44336", "#2196f3", "#4caf50", "#ffeb3b"], type: "full" },
  { id: 3, name: "深蓝检测", colors: ["#1a237e", "#0d47a1", "#01579b", "#00838f"], type: "blue" },
  { id: 4, name: "暖色调", colors: ["#d32f2f", "#f57c00", "#fbc02d", "#66bb6a"], type: "warm" },
];

export default function ColorBlindnessPage() {
  const [selectedTest, setSelectedTest] = useState(0);
  const [answer, setAnswer] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleColorClick = (colorIndex: number) => {
    if (showResult) return;
    if (!answer.includes(colorIndex)) {
      setAnswer([...answer, colorIndex]);
    }
  };

  const submitAnswer = () => {
    if (answer.length < 2) return;
    setShowResult(true);
    // Simulate result check
    const total = colorTests[selectedTest].colors.length;
    const correct = Math.floor(total / 2);
    setCorrectCount(correct);
  };

  const resetTest = () => {
    setAnswer([]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-amber-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">👁️ 色觉测试</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Test Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {colorTests.map((t, i) => (
            <button key={t.id} onClick={() => { setSelectedTest(i); resetTest(); }} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${selectedTest === i ? "bg-amber-500 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
              {t.name}
            </button>
          ))}
        </div>

        {/* Test Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{colorTests[selectedTest].name}</h2>
          
          {!showResult ? (
            <>
              <p className="text-sm text-gray-600 mb-6">请点击你认为颜色最接近的方块（至少选2个）</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {colorTests[selectedTest].colors.map((color, ci) => (
                  <button
                    key={ci}
                    onClick={() => handleColorClick(ci)}
                    className={`aspect-square rounded-2xl transition-all duration-200 ${answer.includes(ci) ? "ring-4 ring-amber-400 ring-offset-2 scale-105" : "hover:scale-105 shadow-md"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button
                onClick={submitAnswer}
                disabled={answer.length < 2}
                className="w-full py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50 transition"
              >
                提交答案
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: colorTests[selectedTest].colors[0] + "20" }}>
                <Palette className="w-10 h-10" style={{ color: colorTests[selectedTest].colors[0] }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">测试完成!</h3>
              <p className="text-gray-600 mb-6">您选择了 {answer.length} 个颜色</p>
              <button onClick={resetTest} className="px-6 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition">重新测试</button>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Eye, title: "色弱", desc: "对某些颜色的辨识能力较弱，但通常不影响日常生活", color: "green" },
            { icon: AlertTriangle, title: "色盲", desc: "完全无法辨认某些颜色，最常见的是红绿色盲", color: "red" },
            { icon: CheckCircle2, title: "正常", desc: "能够正常分辨大部分常见颜色，包括红色和绿色", color: "blue" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
              <item.icon className={`w-8 h-8 mb-3 text-${item.color}-500`} />
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">
          ⚠️ 本测试仅供娱乐参考，不能替代专业医疗诊断。如有色觉问题请咨询眼科医生。
        </div>
      </div>
    </div>
  );
}
