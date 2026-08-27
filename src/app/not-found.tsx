import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Search className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-2">页面不存在</h2>
        <p className="text-gray-600 mb-6">抱歉，您访问的工具页面可能已被移动或删除。</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </div>
  );
}
