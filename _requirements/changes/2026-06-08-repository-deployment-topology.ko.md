# 요구사항 변경: 저장소/배포 토폴로지

## 변경

기존 “프로젝트는 Git으로 분리한다” 원칙에 “배포 가능한 desktop app은 자기 저장소에서 릴리스한다”는 배포 경계를 추가한다.

## 근거

루트 workspace가 여러 submodule, shared policy, cross-project history를 함께 가지면 portfolio tracking에는 좋지만 public app packaging, signing, updater, customer snapshot review에는 부담이 커진다.

## 신규 요구사항

- 앱 릴리스 루트는 `platform-desktop-app` 저장소다.
- 루트 workspace는 control plane이다.
- 고객용 snapshot은 raw cross-project history를 번들하지 않는다.
- 프로젝트별 히스토리는 프로젝트 저장소 로컬을 우선한다.
- 별도 `workspace-history-ledger`는 future migration 후보로 둔다.
