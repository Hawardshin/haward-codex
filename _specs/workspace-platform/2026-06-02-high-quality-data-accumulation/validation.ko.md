# 고품질 데이터 축적 원칙 검증

## 명령

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/governance/philosophy-traceability.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
python3 _tools/docs-audit/src/docs_audit.py --check
python3 _tools/naming-audit/src/naming_audit.py --check
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/workspace-platform-philosophy.ko.json presentation-agent/artifacts/html/workspace-platform-philosophy.html
PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests
cd presentation-agent && npm run test:browser
PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-high-quality-data-accumulation-grounding.json
PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-high-quality-data-accumulation-omission.json
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-high-quality-data-accumulation-evaluation-input.json
```
