# 웹 검색 기록: 설치 모드 분리

## 요청

- 날짜: 2026-06-02
- 사용자 요청: 플랫폼에는 사용 모드와 개선 모드가 있으므로 사용자용 설치와 개발자용 설치를 따로 구현하기.
- 작업 모드: `governance`

## 검색 쿼리

- `Python packaging editable install development dependencies official docs pip pyproject optional dependencies`
- `pip install editable local project development official docs`
- `npm ci omit dev dependencies production install official docs`
- `Vercel Next.js deploy dependencies devDependencies production install official docs`

## 확인한 자료

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| pip Local project installs | 공식 문서 | local project install은 regular install과 editable install로 나뉘며, editable install은 development installation에 적합하다 | `user`는 regular install, `developer`는 editable install로 설계 |
| Python Packaging User Guide: pyproject.toml | 공식 문서 | project dependencies와 optional dependencies 구조 | 설치 모드 registry에서 Python dependency 정책을 명시 |
| npm Docs: npm ci/npm install | 공식 문서 | lockfile 기반 clean install, `--omit=dev`, dev dependency omit 동작 | user/developer Node 설치 정책 분리 |
| Vercel Docs: Next.js on Vercel | 공식 문서 | Next.js 프로젝트의 Vercel 배포 경로 | workspace-monitor user install/배포 설명에 반영 |

## 약한 자료 처리

- Reddit/일반 Q&A는 검색 결과에 있었지만 이번 변경의 근거로 사용하지 않았다.
- 공식 문서와 기존 설치 감사 규칙만 사용했다.

## 계획 영향

- 기존 `work_mode`를 확장하지 않고 별도 `install_mode` registry를 만들었다.
- 설치 명령을 문서화하는 것과 실제 설치 실행을 분리했다.
- 실제 설치가 발생하면 기존 `_ops/workflows/58-installation-record.md`를 따르도록 했다.

## 불확실성

- Next.js는 빌드 시 dev tooling이 필요할 수 있으므로 user install에서도 source build는 `npm ci && npm run build`로 두고, runtime-only pruning은 별도 확인 후 수행하도록 했다.
- 이 변경은 설치 프로필과 검증 CLI를 만든 것이며, 실제 dependency 설치는 수행하지 않았다.

## 공개 판단 요약

사용자용 설치와 개발자용 설치는 작업 모드가 아니라 환경 준비 모드다. 따라서 `install_mode`를 별도 source-of-truth로 두고, 사용자는 최소 regular/runtime 경로를, 개선자는 editable/dev/test/governance 경로를 사용하게 한다.
