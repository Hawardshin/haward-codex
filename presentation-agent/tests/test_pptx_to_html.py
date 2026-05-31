from __future__ import annotations

import tempfile
import unittest
import zipfile
from pathlib import Path

from presentation_agent.pptx_to_html import convert_pptx_to_html, extract_slide_texts


SLIDE_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
       xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:sp>
        <p:txBody>
          <a:p><a:r><a:t>{title}</a:t></a:r></a:p>
          <a:p><a:r><a:t>{body}</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>
"""


def make_minimal_pptx(path: Path) -> None:
    with zipfile.ZipFile(path, "w") as archive:
        archive.writestr("ppt/slides/slide2.xml", SLIDE_XML.format(title="Second", body="Later point"))
        archive.writestr("ppt/slides/slide1.xml", SLIDE_XML.format(title="First", body="Opening point"))


class PptxToHtmlTests(unittest.TestCase):
    def test_extracts_slides_in_numeric_order(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            pptx_path = Path(temp_dir) / "sample.pptx"
            make_minimal_pptx(pptx_path)

            slides = extract_slide_texts(pptx_path)

            self.assertEqual([["First", "Opening point"], ["Second", "Later point"]], slides)

    def test_converts_to_html(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            pptx_path = Path(temp_dir) / "sample.pptx"
            output_path = Path(temp_dir) / "sample.html"
            make_minimal_pptx(pptx_path)

            convert_pptx_to_html(pptx_path, output_path, title="Demo")

            html_text = output_path.read_text(encoding="utf-8")
            self.assertIn("<title>Demo</title>", html_text)
            self.assertIn("<h1>First</h1>", html_text)
            self.assertIn("<p>Later point</p>", html_text)


if __name__ == "__main__":
    unittest.main()

