# 작업 계획: desktop project management platform

## 목표

데스크톱 앱의 프로젝트 탭을 Git 작업공간 기반 프로젝트 관리 허브로 구현하고, Ollama/툴/에이전트 운영은 분리 플랫폼/고급 기능으로 유지한다.

## 실행 순서

1. 공식 문서 검색 기록을 남긴다.
2. 제품 분리 registry에 프로젝트 포트폴리오/마일스톤 산출물을 추가한다.
3. snapshot 타입과 collector에 project management model을 추가한다.
4. customer snapshot에서 내부 프로젝트 세부 정보를 제거한다.
5. 프로젝트 관리 패널을 만들고 projects section에 연결한다.
6. tests/readiness를 보강한다.
7. collector/check/test/build/platform check/Browser smoke를 실행한다.
8. omission/resource/evaluation 기록과 최종 검증을 남긴다.

## 의존성

- 이전 product split 구현: `platform-desktop-app/specs/2026-06-08-workspace-tracker-product-split/`
- 프로젝트 registry: `_ops/projects/registry.json`
- workspace monitor snapshot pipeline

## 비범위

- 실제 remote repository 생성
- CLI 설치 자동화
- Ollama/provider/cloud runtime 변경
