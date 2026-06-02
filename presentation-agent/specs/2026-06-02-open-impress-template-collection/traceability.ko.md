# 추적성: 공개 Impress 템플릿 수집과 HTML 참조화

| 요구사항 | 구현/산출물 | 검증 |
| --- | --- | --- |
| `REQ-PA-001` | `open-impress-template-downloads.json`, research/source notes | registry JSON 검증 |
| `REQ-PA-002` | collection policy 기반 수집 대상 제한, LibreTemplates raw 제외 | source notes, evaluation |
| `REQ-PA-003` | HTML 참조 페이지와 conversion README의 변환 한계 명시 | browser smoke, README 확인 |
| `REQ-PA-016` | `.otp` 119개, 썸네일 119개, HTML 119개, gallery | file count, unit/browser tests |

## 주요 파일

- `presentation-agent/src/presentation_agent/open_template_collector.py`
- `presentation-agent/tests/test_open_template_collector.py`
- `presentation-agent/tests/browser/html-deck.spec.ts`
- `presentation-agent/data/reference-index/open-impress-template-downloads.json`
- `presentation-agent/artifacts/html/open-impress-template-gallery.html`
- `presentation-agent/data/assets/raw/open-impress-templates/files/`
- `presentation-agent/data/conversions/html/open-impress-templates/`
