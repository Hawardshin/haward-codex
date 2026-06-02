from __future__ import annotations

import tempfile
import unittest
import zipfile
from pathlib import Path

from presentation_agent.open_template_collector import (
    collect_open_impress_templates,
    extract_odf_slide_texts,
    package_odf_template,
)


CONTENT_XML = """<?xml version="1.0" encoding="UTF-8"?>
<office:document-content
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">
  <office:body>
    <office:presentation>
      <draw:page draw:name="page1">
        <text:h>Opening</text:h>
        <text:p>First point</text:p>
      </draw:page>
      <draw:page draw:name="page2">
        <text:h>Evidence</text:h>
        <text:p><text:span>Measured</text:span> improvement</text:p>
      </draw:page>
    </office:presentation>
  </office:body>
</office:document-content>
"""


META_XML = """<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta
  xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <office:meta>
    <dc:title>Test Template</dc:title>
  </office:meta>
</office:document-meta>
"""


class OpenTemplateCollectorTests(unittest.TestCase):
    def make_template(self, root: Path) -> Path:
        template_dir = root / "lo-cft" / "sample-template"
        (template_dir / "META-INF").mkdir(parents=True)
        (template_dir / "Thumbnails").mkdir()
        (template_dir / "mimetype").write_text("application/vnd.oasis.opendocument.presentation-template", encoding="utf-8")
        (template_dir / "content.xml").write_text(CONTENT_XML, encoding="utf-8")
        (template_dir / "meta.xml").write_text(META_XML, encoding="utf-8")
        (template_dir / "META-INF" / "manifest.xml").write_text("<manifest />", encoding="utf-8")
        (template_dir / "Thumbnails" / "thumbnail.png").write_bytes(b"\x89PNG\r\n\x1a\n")
        return template_dir

    def test_extracts_odf_slide_text(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            template_dir = self.make_template(Path(temp_dir))

            slides = extract_odf_slide_texts(template_dir)

            self.assertEqual([["Opening", "First point"], ["Evidence", "Measured improvement"]], slides)

    def test_packages_mimetype_first_and_uncompressed(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            template_dir = self.make_template(root)
            output = root / "out" / "sample.otp"

            package_odf_template(template_dir, output)

            with zipfile.ZipFile(output) as archive:
                self.assertEqual("mimetype", archive.namelist()[0])
                self.assertEqual(zipfile.ZIP_STORED, archive.getinfo("mimetype").compress_type)
                self.assertIn("content.xml", archive.namelist())

    def test_collects_registry_html_and_thumbnail(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self.make_template(root / "source")
            project_root = root / "presentation-agent"

            registry = collect_open_impress_templates(
                root / "source",
                project_root,
                accessed_on="2026-06-02",
                max_records=1,
            )

            record = registry["records"][0]
            self.assertEqual(1, registry["summary"]["record_count"])
            self.assertEqual("Sample Template", record["title"])
            self.assertTrue((project_root / record["local_file"]).exists())
            self.assertTrue((project_root / record["thumbnail"]).exists())
            html_text = (project_root / record["html_file"]).read_text(encoding="utf-8")
            self.assertIn("Sample Template", html_text)
            self.assertIn("Measured improvement", html_text)
            self.assertTrue((project_root / "artifacts" / "html" / "open-impress-template-gallery.html").exists())
            self.assertTrue((project_root / "data" / "reference-index" / "open-impress-template-downloads.json").exists())


if __name__ == "__main__":
    unittest.main()
