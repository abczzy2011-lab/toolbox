# frozen_string_literal: true

class ToolBox < Formula
  desc "Offline web-based toolkit with 27 utilities"
  homepage "https://github.com/abczzy2011-lab/toolbox"
  url "https://github.com/abczzy2011-lab/toolbox/releases/download/v1.0.0/toolbox.zip"
  version "1.0.0"
  sha256 "7199a609b0ff5ee8d24e52c6050f29f6a282b9cd8288d65adec5f6b9dc3edbdb"
  license "MIT"

  depends_on "python@3"

  def install
    prefix.install Dir["*"]
    libexec.mkdir
    libexec.install prefix/"tool-box"
    bin.write_exec_script libexec/"tool-box"
  end

  service do
    run [HOMEBREW_PREFIX/"opt/tool-box/bin/tool-box", "serve", "--no-browser"]
    keep_alive true
    working_dir HOMEBREW_PREFIX/"opt/tool-box"
    run_type "Interactive"
  end

  def caveats
    <<~CAVEATS
      ToolBox installed!
      Start:  brew services start tool-box
      Visit:  http://localhost:8899
      Mobile: tool-box ip
      Stop:   brew services stop tool-box
    CAVEATS
  end

  test do
    system formula.bin/"tool-box", "ip"
    output = shell_output("#{bin}/tool-box ip")
    assert_match(%r{http://[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:\d+}, output)
  end
end