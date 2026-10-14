"""
Fallback Python HTTP Server for UK Investment Platform Advisor
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8070
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        url = f"http://127.0.0.1:{PORT}"
        print(f"================================================================")
        print(f"  UK Investment Platform Advisor (ISA, SIPP & Trading Accounts)  ")
        print(f"  Serving locally on: {url}")
        print(f"================================================================\n")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == '__main__':
    run()
