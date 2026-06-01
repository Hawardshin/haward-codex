# 요구사항 검토: Workspace Health 사용성/유지보수성

## 검토 결과

- 상태: accepted
- 관련 요구사항: `REQ-WS-033`
- 관련 요청: `UR-2026-06-01-017`

## 검토

- 사용성 측면에서는 기본 출력이 사람이 읽기 쉬워야 하고, command 목록이 상대 경로 중심으로 보여야 한다.
- 유지보수 측면에서는 자동화가 깨지지 않도록 `--json` 출력이 순수 JSON이어야 한다.
- 범주 필터는 전체 check를 매번 실행하지 않고 `governance`, `projects`, `tools`, `frontend` 같은 단위로 빠르게 좁히는 장치다.

## 검증 기준

- `--list`가 category와 상대 경로를 보여준다.
- `--list --json`과 `--json`이 valid JSON이어야 한다.
- `--category governance --json`이 governance 검사만 실행해야 한다.
