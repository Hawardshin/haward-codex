# 작업 계획: pnpm workspace migration

## 범위

- 루트 workspace를 pnpm 기준으로 만든다.
- `workspace-monitor`, `platform-desktop-app`, `presentation-agent`를 `pnpm@10.34.1`로 고정한다.
- 기존 `package-lock.json` 기반 검증/설치 명령을 현재 실행 경로에서는 pnpm 명령으로 교체한다.
- Tauri/Vercel/README/install-mode registry가 npm 명령을 계속 안내하지 않게 한다.

## 패키지 매니저 선택

| 옵션 | 장점 | 리스크 | 결정 |
| --- | --- | --- | --- |
| npm 유지 | 현재 lockfile과 명령 유지, 전환 비용 낮음 | monorepo lockfile 분산, 중복 설치, 사용자가 요구한 방향과 불일치 | rejected |
| pnpm workspace | 루트 lockfile, workspace 필터, 빠른 설치/엄격한 dependency 경계 | lockfile 전환과 스크립트 수정 필요 | selected |

## pnpm 버전

- 선택: `pnpm@10.34.1`
- 이유: 현재 Node `v21.7.1`; pnpm 11 공식 호환표는 Node 22+ 기준이고 `pnpm@10.34.1`은 `node >=18.12`로 확인됨.

## 구현 순서

1. 요구사항/스펙/설치 감사 초안 작성.
2. 루트 `package.json`, `pnpm-workspace.yaml` 추가.
3. 각 Node 프로젝트 `packageManager` 고정과 npm 호출 스크립트 교체.
4. `pnpm-lock.yaml` 생성, npm lockfile 제거.
5. pnpm 기반 테스트/check/build/customer bundle 검증.
6. 설치 감사/평가/요약 기록 갱신 후 commit/push.

