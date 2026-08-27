"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Clock, Globe, Plus, Trash2, Sun, Moon } from "lucide-react";

interface TimeEntry {
  id: string;
  timezone: string;
  label: string;
}

const timezones = [
  { value: "Asia/Shanghai", label: "上海 (UTC+8)" },
  { value: "Asia/Hong_Kong", label: "香港 (UTC+8)" },
  { value: "Asia/Tokyo", label: "东京 (UTC+9)" },
  { value: "Asia/Singapore", label: "新加坡 (UTC+8)" },
  { value: "Australia/Sydney", label: "悉尼 (UTC+10/11)" },
  { value: "Asia/Seoul", label: "首尔 (UTC+9)" },
  { value: "Europe/London", label: "伦敦 (UTC+0/+1)" },
  { value: "Europe/Paris", label: "巴黎 (UTC+1/+2)" },
  { value: "Europe/Berlin", label: "柏林 (UTC+1/+2)" },
  { value: "America/New_York", label: "纽约 (UTC-5/-4)" },
  { value: "America/Chicago", label: "芝加哥 (UTC-6/-5)" },
  { value: "America/Los_Angeles", label: "洛杉矶 (UTC-8/-7)" },
  { value: "America/Denver", label: "丹佛 (UTC-7/-6)" },
  { value: "America/Anchorage", label: "安克雷奇 (UTC-9/-8)" },
  { value: "Pacific/Auckland", label: "奥克兰 (UTC+12/+13)" },
  { value: "Asia/Dubai", label: "迪拜 (UTC+4)" },
  { value: "Asia/Kolkata", label: "印度 (UTC+5:30)" },
  { value: "Asia/Bangkok", label: "曼谷 (UTC+7)" },
];

export default function TimezonePage() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: "1", timezone: "Asia/Shanghai", label: "上海" },
    { id: "2", timezone: "America/New_York", label: "纽约" },
    { id: "3", timezone: "Europe/London", label: "伦敦" },
  ]);
  const [showAdd, setShowAdd] = useState(false);

  const getTime = (tz: string) => {
    return new Date().toLocaleString("zh-CN", { timeZone: tz });
  };

  const getHour = (tz: string) => {
    return new Date().toLocaleTimeString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const isNight = (tz: string) => {
    const hour = parseInt(getHour(tz).split(":")[0]);
    return hour < 6 || hour >= 19;
  };

  const addEntry = (tz: string, label: string) => {
    if (!tz || !label.trim()) return;
    setEntries([...entries, { id: Date.now().toString(), timezone: tz, label: label.trim() }]);
    setShowAdd(false);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <span className="ml-4 badge-vip">VIP</span>
          <h1 className="ml-3 text-xl font-bold">时区转换器</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Time Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 relative group">
              <button
                onClick={() => removeEntry(entry.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                {isNight(entry.timezone) ? (
                  <Moon className="w-5 h-5 text-indigo-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500" />
                )}
                <h3 className="font-bold">{entry.label}</h3>
              </div>
              <div className="text-3xl font-mono font-bold text-gray-800 dark:text-gray-200 mb-1">
                {getHour(entry.timezone)}
              </div>
              <div className="text-xs text-gray-600">
                {getTime(entry.timezone)}
              </div>
              <div className="text-xs text-gray-600 mt-1 font-mono">
                {entry.timezone}
              </div>
            </div>
          ))}
        </div>

        {/* Add City */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> 添加城市
          </h3>
          <div className="flex gap-3">
            <select
              aria-label="选择城市时区"
              onChange={(e) => {
                const tz = e.target.value;
                const found = timezones.find(t => t.value === tz);
                if (found) {
                  addEntry(tz, found.label.split(" ")[0]);
                }
              }}
              className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
              defaultValue=""
            >
              <option value="" disabled>选择时区...</option>
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        {entries.length >= 2 && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" /> 时区对比
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2 px-3 text-gray-600">城市</th>
                    <th className="text-left py-2 px-3 text-gray-600">时间</th>
                    <th className="text-left py-2 px-3 text-gray-600">日期</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b dark:border-gray-700 last:border-0">
                      <td className="py-2 px-3 font-medium">{entry.label}</td>
                      <td className="py-2 px-3 font-mono">{getHour(entry.timezone)}</td>
                      <td className="py-2 px-3 text-gray-600">
                        {new Date().toLocaleDateString("zh-CN", { timeZone: entry.timezone, month: "long", day: "numeric", weekday: "long" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
