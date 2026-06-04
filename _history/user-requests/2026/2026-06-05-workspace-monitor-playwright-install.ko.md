# 사용자 요청 요약: Workspace Monitor Playwright Install

- 날짜: 2026-06-05
- 요청 요지: 부족한 부분 설치를 진행한다.
- 해석한 설치 범위: 직전 작업에서 부족하다고 확인된 `workspace-monitor` standalone Playwright 검증 환경을 프로젝트 로컬 devDependency로 설치한다.
- 제외한 항목: public signing/notarization credential, updater endpoint/signing key, clean-machine smoke는 단순 설치가 아니라 배포 설정/자격증명/실기기 검증이 필요하므로 자동 설치 대상에서 제외한다.
