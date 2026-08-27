"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Smile, Search, Heart, ThumbsUp, Laugh, Star, Flame, Bird } from "lucide-react";

const categories = [
  { name: "笑脸", icon: Smile as any, emojis: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😊","😇","🥰","😍","🤩","😘"] },
  { name: "手势", icon: ThumbsUp as any, emojis: ["👋","🤚","🖐️","✋","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👍","👎","✊","👊","👏","🙌","🫶","👐","🤝","🙏","💪"] },
  { name: "爱心", icon: Heart as any, emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟"] },
  { name: "庆祝", icon: Star as any, emojis: ["🎉","🎊","🎈","🎁","🎀","🎂","🍰","🧁","🎄","🎆","🎇","✨","🌟","⭐","🔥","💫","🎵","🎶","🎤","🎧"] },
  { name: "自然", icon: Flame as any, emojis: ["🌞","🌝","🌡️","☀️","🌤️","⛅","☁️","🌦️","🌧️","⛈️","🌩️","🌨️","❄️","⛄","🌬️","💨","🌪️","🌫️","🌊","💧","💦","🌈"] },
  { name: "食物", icon: Laugh as any, emojis: ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🥦","🌽","🥕","🥔","🥐","🍞","🥖","🍔","🍟","🍕","🌮","🥗","🍝","🍜","🍰","🎂","🍮","🍬","🍫","🍿","🍩","🍪"] },
  { name: "动物", icon: Bird as any, emojis: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🐤","🦆","🦅","🦉","🐺","🐴","🦄","🐝","🦋","🐌","🐞","🐢","🐍","🐙","🦑","🦈","🐊","🐘","🦏","🐪","🐫","🦒","🐂","🐑","🐕","🐈","🐇","🦝","🦔"] },
  { name: "更多", icon: Smile as any, emojis: ["😉","😌","😋","😜","😝","🤤","😴","🥶","🥵","😵","🤯","🥳","😎","🤓","😐","😏","😒","🤥","😔","😷","🤒","🤢","😡","😤","😱","😭","😢","😥","😰","😓","😩","🥱","😣","😞","😖","💀","👻","🤖","💩","👾","🤡","👽"] },
];

export default function EmojiPickerPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(-1);

  const filtered = search
    ? categories.map(c => ({ ...c, emojis: c.emojis.filter(e => e.includes(search) || c.name.includes(search)) })).filter(c => c.emojis.length > 0)
    : activeCategory >= 0
      ? categories.map((c, i) => i === activeCategory ? c : { ...c, emojis: [] })
      : categories;

  const handleCopy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setSelected(emoji);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggleFavorite = (emoji: string) => {
    setFavorites(prev => prev.includes(emoji) ? prev.filter(f => f !== emoji) : [...prev, emoji]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-orange-500 transition"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-xl font-bold text-gray-800">🎭 Emoji 表情大全</h1>
          {favorites.length > 0 && <span className="ml-auto text-sm text-orange-500 font-medium">⭐ {favorites.length}</span>}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <input aria-label="搜索 Emoji" value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索 Emoji..." className="w-full px-5 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 outline-none mb-6 shadow-sm" />
        
        {favorites.length > 0 && (
          <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
            <div className="text-sm font-semibold text-gray-600 mb-2">⭐ 我的收藏</div>
            <div className="flex flex-wrap gap-2">
              {favorites.map((f, i) => (
                <button key={i} onClick={() => handleCopy(f)} className="text-2xl w-10 h-10 rounded-lg hover:bg-orange-50 transition flex items-center justify-center relative group">{f}
                  <button onClick={e => { e.stopPropagation(); toggleFavorite(f); }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 text-white rounded-full opacity-60 hover:opacity-100 active:opacity-100 transition text-[9px]" aria-label="取消收藏">×</button>
                </button>
              ))}
            </div>
          </div>
        )}

        {!search && (
          <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
            <div className="text-sm font-semibold text-gray-600 mb-2">快速收藏</div>
            <div className="flex flex-wrap gap-2">
              {["❤️","🔥","👍","😂","🎉","💯","✨","🙏","💪","🤩"].map(e => (
                <button key={e} onClick={() => toggleFavorite(e)} className={`text-xl w-10 h-10 rounded-lg hover:bg-orange-50 transition flex items-center justify-center ${favorites.includes(e) ? "bg-orange-100 ring-2 ring-orange-300" : ""}`}>{e}</button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {(search ? filtered : categories).map((cat, ci) => (
            <button key={ci} onClick={() => setActiveCategory(activeCategory === ci ? -1 : ci)} className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border border-orange-100 whitespace-nowrap text-sm font-medium transition ${activeCategory === ci ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-orange-50"}`}>
              {React.createElement(cat.icon as any, { className: "w-4 h-4 text-orange-500" })}
              {cat.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">没有找到 😢</div>
        ) : filtered.map((cat, ci) => (
          <div key={ci} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              {React.createElement(cat.icon as any, { className: "w-5 h-5 text-orange-500" })}
              <h3 className="font-semibold text-gray-700">{cat.name}</h3>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-1 bg-white rounded-2xl p-3 shadow-sm border border-orange-100">
              {cat.emojis.map((emoji, ei) => (
                <button key={ei} onClick={() => handleCopy(emoji)} onDoubleClick={() => toggleFavorite(emoji)} className={`text-2xl w-full aspect-square rounded-lg hover:bg-orange-50 hover:scale-125 transition-all flex items-center justify-center duration-150 ${selected === emoji ? "bg-orange-100 scale-110" : ""}`}>{emoji}</button>
              ))}
            </div>
          </div>
        ))}

        {copied && selected && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg animate-bounce z-50">
            <span className="text-lg mr-2">{selected}</span>已复制!
          </div>
        )}
      </div>
    </div>
  );
}
