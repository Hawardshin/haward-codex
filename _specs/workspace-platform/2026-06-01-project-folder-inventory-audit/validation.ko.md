# 프로젝트 폴더 인벤토리 감사 검증

## 예정 검증

- `python3 -m unittest discover -s _tools/structure-audit/tests`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/projects/root-structure-policy.json`
- core config contract check
- memory bootstrap check
- workspace monitor collect/test/check/build
- workspace index, task board 생성
- hallucination grounding check
- work evaluator check

## 현재 상태

- 중간 검증에서 structure-audit 단위 테스트 6개 통과
- 중간 검증에서 현재 저장소 구조는 gap/warning 없이 clean
- 최종 검증에서 `structure-audit` 단위 테스트 6개 통과
- 최종 검증에서 structure audit는 `clean`, gap/warning 없음
- `root-structure-policy.json`과 core shared settings config contract 통과
- memory bootstrap check 통과
- workspace monitor `npm test`, `npm run check`, `npm run build` 통과
- `git diff --check` 통과
