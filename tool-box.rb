# frozen_string_literal: true

class ToolBox < Formula
  desc "Offline web-based toolkit with 27 utilities"
  homepage "https://github.com/abczzy2011-lab/toolbox"
  url "https://github.com/abczzy2011-lab/toolbox/releases/download/v1.0.0/toolbox.zip"
  sha256 "8f15c60510a5135a6aa28a75369e5abdb4b5123d9cdeb42c2e0b33c0c9540093"
  license "MIT"

  def install
    libexec.install Dir["*"]
    chmod 0755, libexec/"tool-box"
    bin.write_exec_script libexec/"tool-box"
  end
end
