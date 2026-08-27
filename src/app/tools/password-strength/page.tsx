"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Shield, Eye, EyeOff, Check, X as XIcon, Lock, Unlock } from "lucide-react";

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);

  const analyze = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (pw.length >= 16) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    if (pw.length >= 20) s += 0.5;
    setScore(Math.min(s, 10));
  };

  useState(() => analyze(password));

  const getLevel = (s: number) => {
    if (s < 3) return { label: "极弱", color: "#ef4444", bg: "bg-red-500", icon: <Unlock className="w-5 h-5" />, tip: "太短或太简单，极易被破解" };
    if (s < 5) return { label: "弱", color: "#f97316", bg: "bg-orange-500", icon: <Lock className="w-5 h-5" />, tip: "可以加强，建议添加大小写和特殊字符" };
    if (s < 7) return { label: "一般", color: "#eab308", bg: "bg-yellow-500", icon: <Lock className="w-5 h-5" />, tip: "还行但不够安全，建议增加长度和复杂度" };
    if (s < 9) return { label: "强", color: "#22c55e", bg: "bg-green-500", icon: <Lock className="w-5 h-5" />, tip: "不错的密码，安全性较高" };
    return { label: "极强", color: "#10b981", bg: "bg-emerald-600", icon: <Shield className="w-5 h-5" />, tip: "非常强大的密码！" };
  };

  const criteria = [
    { check: password.length >= 8, text: "至少8个字符" },
    { check: password.length >= 12, text: "至少12个字符" },
    { check: password.length >= 16, text: "至少16个字符" },
    { check: /[a-z]/.test(password), text: "包含小写字母" },
    { check: /[A-Z]/.test(password), text: "包含大写字母" },
    { check: /[0-9]/.test(password), text: "包含数字" },
    { check: /[^a-zA-Z0-9]/.test(password), text: "包含特殊字符" },
  ];

  const level = getLevel(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-red-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">🔐 密码强度检测器</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 mb-6">
          <div className="flex gap-3">
            <input
              aria-label="输入密码"
              type={show ? "text" : "password"}
              value={password}
              onChange={e => { setPassword(e.target.value); analyze(e.target.value); }}
              placeholder="输入密码进行检测..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-400 outline-none text-lg"
            />
            <button onClick={() => setShow(!show)} aria-label="切换密码可见性" className="p-3 rounded-xl border-2 border-red-200 hover:bg-red-50 transition text-gray-600">
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Score Display */}
        {password && (
          <div className="mb-6">
            <div className={`rounded-2xl p-6 shadow-sm border ${level.label === "极弱" ? "border-red-200 bg-red-50" : level.label === "弱" ? "border-orange-200 bg-orange-50" : level.label === "一般" ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}>
              <div className="flex items-center gap-4 mb-3">
                <div style={{ color: level.color }}>{level.icon}</div>
                <div>
                  <div className="text-2xl font-black" style={{ color: level.color }}>{level.label}</div>
                  <div className="text-sm opacity-70">{level.tip}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-black" style={{ color: level.color }}>{Math.round(score)}</div>
                  <div className="text-xs text-gray-600">/ 10 分</div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score * 10}%`, backgroundColor: level.color }} />
              </div>
            </div>
          </div>
        )}

        {/* Criteria */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h3 className="font-semibold text-gray-700 mb-4">检查项</h3>
          <div className="space-y-3">
            {criteria.map((c, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition ${c.check ? "bg-green-50" : "bg-gray-50"}`}>
                {c.check ? <Check className="w-5 h-5 text-green-500" /> : <XIcon className="w-5 h-5 text-gray-300" />}
                <span className={`text-sm ${c.check ? "text-green-700 font-medium" : "text-gray-600"}`}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-semibold text-blue-800 mb-2">💡 密码安全建议</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 使用至少12个字符的长度</li>
            <li>• 混合使用大小写字母、数字和符号</li>
            <li>• 不同网站使用不同的密码</li>
            <li>• 避免使用个人信息（生日、姓名）</li>
            <li>• 定期更换重要账户的密码</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
