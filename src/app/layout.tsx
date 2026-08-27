import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "万能工具箱 - 免费在线工具 | 计算器·转换器·文本处理·编码工具",
  description: "万能工具箱提供免费在线工具：计算器、单位转换、文本处理、颜色选择器、Base64编解码、URL编解码等。全部免费使用，无需注册登录。",
  keywords: "在线工具,免费工具,计算器,单位转换,文本处理,颜色选择器,Base64,URL编码,工具箱",
  authors: [{ name: "万能工具箱" }],
  openGraph: {
    title: "万能工具箱 - 免费在线工具平台",
    description: "27款免费在线工具，全部免费使用，无需注册登录",
    type: "website",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  metadataBase: new URL("http://localhost:8899"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="万能工具箱" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}