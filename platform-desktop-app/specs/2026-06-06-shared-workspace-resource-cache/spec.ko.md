# Shared Workspace Resource Cache 스펙

## 목표

Desktop Runtime의 `desktop`과 `source` resident surface가 같은 native workspace warmup/source catalog prepare를 중복 실행하지 않게 해 탭 이동과 초기 resident prewarm의 CPU/I/O 비용을 줄인다.

## 범위

- `MonitorShell.tsx`에 module-level shared request cache와 in-flight dedupe를 추가한다.
- `warmWorkspaceOsResources`는 `warmWorkspaceOsResourcesShared`를 통해 native command를 호출한다.
- `prepareWorkspaceOsResources`는 `prepareWorkspaceOsResourcesShared`를 통해 native command와 fallback command를 호출한다.
- product feature registry와 readiness/tool-studio tests에 resident resource sharing 계약을 추가한다.

## 비범위

- Rust command schema 변경.
- source editor UX 변경.
- runtime state store 전면 분리.
- 새 dependency 설치.

## 수용 기준

- 동일 key의 workspace warmup/prepare 요청은 in-flight promise를 공유한다.
- non-force 요청은 짧은 TTL 안에서 cached result를 재사용한다.
- force refresh는 cache를 우회한다.
- fallback `list_workspace_text_files` 동작은 유지된다.
- full check와 `package:internal`이 통과한다.
