"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { ArrowLeft, Copy, RefreshCw, Shield, Eye, EyeOff, Check, X } from "lucide-react";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generate = useCallback(() => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);

    // Calculate strength
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (length >= 20) score++;
    if (includeUpper && includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    setStrength(Math.min(score, 5));
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthLabel = ["极弱", "弱", "一般", "强", "极强"][strength] || "极弱";
  const strengthColor = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"][strength];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <span className="ml-4 badge-vip">VIP</span>
          <h1 className="ml-3 text-xl font-bold">高级密码生成器</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Password Display */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6 text-center">
            <div className="text-white text-2xl md:text-3xl font-mono font-bold break-all mb-3 min-h-[3rem]">
              {password || "点击下方生成按钮"}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={generate}
                className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg hover:bg-white/30 transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> 生成新密码
              </button>
              {password && (
                <button
                  onClick={copyPassword}
                  className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg hover:bg-white/30 transition flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "已复制!" : "复制"}
                </button>
              )}
            </div>
          </div>

          {/* Strength Indicator */}
          {password && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">密码强度</span>
                <span className="text-sm font-bold" style={{ color: strengthColor }}>{strengthLabel}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <div
                    key={bar}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      bar <= strength ? "duration-500" : ""
                    }`}
                    style={{
                      backgroundColor: bar <= strength ? strengthColor : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">密码长度</label>
                <span className="text-sm font-bold text-indigo-600">{length}</span>
              </div>
              <input
                type="range"
                min={4}
                max={64}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "大写字母 (A-Z)", checked: includeUpper, setter: setIncludeUpper },
                { label: "小写字母 (a-z)", checked: includeLower, setter: setIncludeLower },
                { label: "数字 (0-9)", checked: includeNumbers, setter: setIncludeNumbers },
                { label: "特殊符号 (!@#)", checked: includeSymbols, setter: setIncludeSymbols },
              ].map((opt, i) => (
                <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                  <input
                    type="checkbox"
                    checked={opt.checked}
                    onChange={(e) => opt.setter(e.target.checked)}
                    className="w-5 h-5 rounded accent-indigo-600"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> 安全提示
            </h3>
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <p>• 密码在浏览器本地生成，不会上传到任何服务器</p>
              <p>• 建议使用16位以上的密码</p>
              <p>• 不同网站使用不同的密码</p>
              <p>• 定期更换重要账户的密码</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
