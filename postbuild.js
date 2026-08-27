/**
 * postbuild.js - 修复 Next.js Turbopack 的 HTML 输出问题
 * 1. charSet="utf-8" → charset="utf-8" (Next.js Turbopack 渲染 bug)
 * 2. 移除重复的 viewport meta 标签
 */
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "out");

function fixHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      fixHTMLFiles(full);
    } else if (file.endsWith(".html")) {
      let content = fs.readFileSync(full, "utf8");
      // 修复 charSet → charset（普通属性形式）
      content = content.replace(/charSet="utf-8"/g, 'charset="utf-8"');
      // 修复 JSON 转义形式 {"charSet":"utf-8"}
      content = content.replace(/\\?\{"charSet":"utf-8"\\?}/g, '{"charset":"utf-8"}');
      content = content.replace(/{"charSet":"utf-8"}/g, '{"charset":"utf-8"}');
      // 也处理其他可能的转义变体
      content = content.replace(/\\"charSet\\":"/g, '\\"charset\\":');
      content = content.replace(/charSet":/g, 'charset":');
      content = content.replace(/\\?\{"charSet":"/g, '{"charset":');
      content = content.replace(/{"charSet":"/g, '{"charset":');
      // 修复 JSON payload 中的 charSet（React Flight stream）
      content = content.replace(/"charSet":"utf-8"/g, '"charset":"utf-8"');
      content = content.replace(/\\"charSet\\":\\"utf-8\\"/g, '\\"charset\\":\\"utf-8\\"');
      content = content.replace(/\\?\\"charSet\\":\\?\\"utf-8\\?\\?/g, '\\"charset\\":\\"utf-8"');
      // 移除重复的 viewport
      const viewportRegex = /<meta name="viewport"[^>]*>/g;
      const matches = content.match(viewportRegex);
      if (matches && matches.length > 1) {
        content = content.replace(viewportRegex, matches[0]);
      }
      fs.writeFileSync(full, content, "utf8");
    }
  }
}

if (fs.existsSync(OUT_DIR)) {
  fixHTMLFiles(OUT_DIR);
  console.log("✅ postbuild: HTML 文件已修复 (charset + viewport)");
} else {
  console.log("⚠️  postbuild: out/ 目录不存在，跳过");
}
