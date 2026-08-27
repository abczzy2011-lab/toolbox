"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, Trash2, Bold, Italic, Heading, List, Link as LinkIcon, Image as ImageIcon, Code, Quote } from "lucide-react";

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState("# 欢迎使用 Markdown 编辑器\n\n这是 **粗体** 和 *斜体* 的示例。\n\n- 列表项 1\n- 列表项 2\n\n> 这是一段引用\n\n```\ncode block\n```\n\n[链接](https://example.com)\n\n![图片](https://via.placeholder.com/150)");
  const [active, setActive] = useState(false);

  const renderMarkdown = (md: string): string => {
    let html = md
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      // Bold & Italic
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Blockquote
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-indigo-400 pl-4 my-2 text-gray-600 italic">$1</blockquote>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 my-2 overflow-x-auto text-sm font-mono"><code>$1</code></pre>')
      // Inline code
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-sm font-mono">$1</code>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Images
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="my-2 max-w-full rounded-lg" />')
      // Unordered lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
    return html;
  };

  const insertFormat = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdown.substring(start, end);
    const newText = markdown.substring(0, start) + before + selected + after + markdown.substring(end);
    setMarkdown(newText);
    setActive(true);
    setTimeout(() => setActive(false), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-full mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <ArrowLeft className="w-5 h-5 mr-1" />
            返回首页
          </Link>
          <span className="ml-4 badge-vip">VIP</span>
          <h1 className="ml-3 text-xl font-bold">Markdown 编辑器</h1>
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] flex flex-col">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-2 flex flex-wrap gap-1">
          {[
            { icon: <Heading className="w-4 h-4" />, label: "标题", action: () => insertFormat("## ") },
            { icon: <Bold className="w-4 h-4" />, label: "粗体", action: () => insertFormat("**", "**") },
            { icon: <Italic className="w-4 h-4" />, label: "斜体", action: () => insertFormat("*", "*") },
            { icon: <Quote className="w-4 h-4" />, label: "引用", action: () => insertFormat("> ") },
            { icon: <List className="w-4 h-4" />, label: "列表", action: () => insertFormat("- ") },
            { icon: <LinkIcon className="w-4 h-4" />, label: "链接", action: () => insertFormat("[", "](url)") },
            { icon: <ImageIcon className="w-4 h-4" />, label: "图片", action: () => insertFormat("![alt](", ")") },
            { icon: <Code className="w-4 h-4" />, label: "代码块", action: () => insertFormat("```\n", "\n```") },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              aria-label={btn.label}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300"
            >
              {btn.icon}
            </button>
          ))}
          <div className="flex-1" />
          <button onClick={() => setMarkdown("")} aria-label="清空内容" className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-500 transition">
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(markdown)}
            aria-label="复制代码"
            className="p-2 rounded-lg hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Editors */}
        <div className="flex-1 grid md:grid-cols-2 gap-0">
          <div className="flex flex-col">
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300">
              Markdown 源码
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              aria-label="Markdown 编辑器"
              className="flex-1 p-4 resize-none outline-none font-mono text-sm bg-white dark:bg-gray-800"
              spellCheck={false}
              placeholder="在此输入 Markdown 内容..."
            />
          </div>
          <div className="flex flex-col border-l dark:border-gray-700">
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300">
              实时预览
            </div>
            <div
              className="flex-1 p-4 overflow-y-auto text-sm bg-white dark:bg-gray-800"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
