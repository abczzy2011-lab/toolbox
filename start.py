#!/usr/bin/env python3
"""
万能工具箱 - 本地启动器
双击运行即可在浏览器中打开万能工具箱，支持局域网设备访问
"""
import http.server
import socketserver
import webbrowser
import os
import sys
import signal
import mimetypes
import json
import socket
import gzip
import io

HOST = "0.0.0.0"
PORT = 8899
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(SCRIPT_DIR, "out")


def get_local_ip():
    """获取本机局域网 IP 地址"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


LOCAL_IP = get_local_ip()


def print_banner():
    print("=" * 56)
    print("   🛠️  万能工具箱  |  本地版  v1.0")
    print("=" * 56)
    print()
    print("  ✅ 服务已启动！浏览器将自动打开。")
    print()
    print(f"  🖥️  本机地址: http://{LOCAL_IP}:{PORT}")
    print(f"  🌐 本地地址: http://127.0.0.1:{PORT}")
    print(f"  📁 文件目录: {STATIC_DIR}")
    print()
    print("  📌 用手机/平板访问工具箱：")
    print(f"     在浏览器输入 http://{LOCAL_IP}:{PORT}")
    print(f"     或使用工具箱内的「二维码生成器」生成扫码")
    print()
    print("  ⚠️  手机和电脑需在同一 WiFi 网络下")
    print("  ⏹  按 Ctrl+C 可停止服务")
    print("=" * 56)
    print()


def handle_shutdown(signum, frame):
    print("\n\n  ⏹  服务已停止，感谢使用！再见 👋")
    sys.exit(0)


class ToolboxHandler(http.server.SimpleHTTPRequestHandler):
    _gzip_cache = {}
    _compressible = {
        "text/html", "text/css", "text/plain",
        "application/javascript", "application/json",
        "image/svg+xml",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)
        self._gzip = False

    def log_message(self, format, *args):
        pass

    def send_response(self, code, message=None):
        self._gzip = "gzip" in self.headers.get("Accept-Encoding", "")
        super().send_response(code, message)

    def _write_file(self, filepath, status=200):
        """读取文件，gzip 压缩后发送"""
        with open(filepath, "rb") as f:
            raw = f.read()
        ctype = self.guess_type(filepath)
        if ctype == "text/html":
            ctype = "text/html; charset=utf-8"

        can_compress = ctype.split(";")[0].strip() in self._compressible
        is_head = self.command == "HEAD"

        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "public, max-age=86400")
        self.send_header("X-Content-Type-Options", "nosniff")

        if self._gzip and can_compress and not is_head:
            if filepath not in self._gzip_cache:
                buf = io.BytesIO()
                with gzip.GzipFile(fileobj=buf, mode="wb", compresslevel=9) as gz:
                    gz.write(raw)
                self._gzip_cache[filepath] = buf.getvalue()
            compressed = self._gzip_cache[filepath]
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(compressed)))
            self.send_header("Vary", "Accept-Encoding")
            self.end_headers()
            self.wfile.write(compressed)
        else:
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            if not is_head:
                self.wfile.write(raw)

    def do_GET(self):
        # API: 返回本机局域网 IP
        if self.path.startswith("/api/my-ip"):
            data = json.dumps({
                "ip": LOCAL_IP,
                "port": PORT,
                "url": f"http://{LOCAL_IP}:{PORT}"
            }).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return

        mapped_path = self.translate_path(self.path)
        if os.path.isfile(mapped_path):
            self._write_file(mapped_path, 200)
            return

        direct = os.path.join(STATIC_DIR, self.path.lstrip("/"))
        if os.path.isfile(direct):
            self._write_file(direct, 200)
            return

        not_found_path = os.path.join(STATIC_DIR, "_not-found.html")
        if os.path.isfile(not_found_path):
            self._write_file(not_found_path, 404)
            return

        self.send_response(404)
        self.end_headers()

    def translate_path(self, path):
        """
        将 URL 路径映射到本地文件。
        Next.js 静态导出结构：
          /tools/calculator   →  tools/calculator.html
          /tools/calculator/  →  tools/calculator.html
          /                   →  index.html
        """
        path = path.lstrip("/")

        # 空路径（即 /）直接映射到 index.html
        if path == "":
            index_path = os.path.join(STATIC_DIR, "index.html")
            if os.path.isfile(index_path):
                return index_path
            return super().translate_path("/")

        if path.endswith("/"):
            path = path.rstrip("/")
            html_path = path + ".html"
            full_html = os.path.join(STATIC_DIR, html_path)
            if os.path.isfile(full_html):
                return full_html
            return super().translate_path(path + "/")

        full = os.path.join(STATIC_DIR, path)
        if os.path.isfile(full):
            return full

        html_path = path + ".html"
        full_html = os.path.join(STATIC_DIR, html_path)
        if os.path.isfile(full_html):
            return full_html

        return super().translate_path(path)

    def send_head(self):
        result = super().send_head()
        return result

    def guess_type(self, path):
        """为 HTML 文件添加 charset=utf-8，避免中文乱码"""
        ctype = super().guess_type(path)
        if path.endswith(".html") and ctype == "text/html":
            return "text/html; charset=utf-8"
        return ctype

    def end_headers(self):
        # 允许所有来源跨域（方便局域网其他设备访问）
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


def main():
    if not os.path.isdir(STATIC_DIR):
        print("❌ 错误：未找到静态文件目录！")
        print(f"   请确保 'out' 文件夹与 start.py 在同一目录下。")
        print(f"   当前查找路径: {STATIC_DIR}")
        print()
        input("按回车键退出...")
        sys.exit(1)

    signal.signal(signal.SIGINT, handle_shutdown)
    signal.signal(signal.SIGTERM, handle_shutdown)

    # 允许地址复用，防止重启时端口被占用
    socketserver.TCPServer.allow_reuse_address = True
    socketserver.TCPServer.allow_reuse_port = True

    print_banner()

    mimetypes.add_type("text/css", ".css")
    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/html", ".html")
    mimetypes.add_type("image/x-icon", ".ico")
    mimetypes.add_type("image/svg+xml", ".svg")
    mimetypes.add_type("application/json", ".json")

    try:
        httpd = socketserver.TCPServer((HOST, PORT), ToolboxHandler)
    except OSError as e:
        print(f"❌ 端口 {PORT} 已被占用，请关闭其他程序后重试。")
        print(f"   错误: {e}")
        print()
        input("按回车键退出...")
        sys.exit(1)

    url = f"http://127.0.0.1:{PORT}"
    try:
        webbrowser.open(url)
    except Exception:
        pass

    print(f"  🔄 服务运行中，端口 {PORT}...")
    print()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

    print("\n  ⏹  服务已停止。再见！\n")


if __name__ == "__main__":
    main()
