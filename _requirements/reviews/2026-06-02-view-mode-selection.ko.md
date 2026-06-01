# 요구사항 검토: View Mode Selection

## 검토 대상

- `REQ-WS-061`
- `REQ-WM-011`

## 검토 결과

- 상태: 승인
- 이유: 사용자 보기와 개발자 보기의 차이는 설치 범위가 아니라 화면/운영 관점의 차이다. 기존 `install_mode`와 `work_mode`에 섞지 않고 새 `view_mode`로 분리하는 것이 유지보수성이 높다.

## 근거

- OWASP Authorization Cheat Sheet는 최소 권한과 기본 거부를 권장하므로 public/multi-user 배포에서는 단순 UI 숨김이 아니라 실제 권한 강제가 필요하다.
- NIST RBAC는 역할과 권한을 모델링하는 기준 용어를 제공한다.
- Next.js는 future route/request boundary 설계 시 server-side 경계를 둘 수 있으나, 이번 변경은 인증 구현이 아니라 static monitor의 view lens 도입이다.

## 수용 조건

- `view-mode-registry.json`이 자기 설명 설정 계약을 만족한다.
- `check-view-modes`가 `user`, `developer`, `superadmin_developer`와 현재 기본값을 검증한다.
- Workspace Monitor가 snapshot의 `viewModeCatalog`를 읽어 상단에서 모드를 선택할 수 있다.
- 문서에는 client-side hiding이 보안 경계가 아니라는 점이 명시되어 있다.
