# 웹 검색 기록: View Mode Selection

## 검색 일시

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 관련 요청: `UR-2026-06-02-016`

## 검색어

- `admin dashboard user mode developer mode super admin RBAC best practices official documentation`
- `Next.js admin dashboard role based access control official docs middleware`
- `NIST RBAC roles admin super admin least privilege guidance`
- `OWASP access control admin interface least privilege guidance`
- `OWASP Authorization Cheat Sheet least privilege deny by default every request`
- `NIST role based access control RBAC project official`
- `Next.js Proxy file convention official docs authorization`

## 확인한 강한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| OWASP Authorization Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | security guidance | 최소 권한, 기본 거부, 모든 요청 권한 검증, authorization test 필요성을 확인했다. | `view_mode`는 UI lens일 뿐 보안 경계가 아니며, public/multi-user 배포는 collector/server/authz에서 강제해야 한다고 문서화했다. |
| NIST Role Based Access Control, https://csrc.nist.gov/Projects/Role-Based-Access-Control | standard/reference | 역할 기반 접근 제어가 대규모 시스템의 security administration 복잡도를 낮추기 위한 모델임을 확인했다. 단, NIST 페이지는 archived 상태라 최신 운영 지침이 아니라 모델 참고로만 사용했다. | `user`, `developer`, `superadmin_developer`의 역할/권한 어휘를 `view_mode` registry의 출발점으로 사용했다. |
| Next.js Proxy file convention, https://nextjs.org/docs/app/api-reference/file-conventions/proxy | official docs | Next.js의 request boundary 파일 convention과 middleware에서 proxy로 바뀐 최신 용어를 확인했다. | 현재는 static monitor UI lens만 구현하고, future authenticated deployment에서는 server/request boundary를 별도 설계해야 한다고 기록했다. |

## 약한 출처 또는 보조 신호

- Reddit/커뮤니티 글은 Next.js proxy 관련 혼란과 사용 경험 신호로만 봤다. 구현 근거로 직접 사용하지 않았다.
- 제3자 RBAC 요약 글은 공식 출처와 중복되어 채택하지 않았다.
- Wikipedia는 출처 seed로만 유효하고 이번 결정에는 사용하지 않았다.

## 계획 반영 인사이트

- 사용자 보기와 개발자 보기는 설치 차이가 아니라 화면/운영 관점 차이이므로 `install_mode`에 넣지 않는다.
- 작업 평가 강도를 바꾸는 것도 아니므로 `work_mode`에 넣지 않는다.
- 새 `view_mode` 레지스트리와 검증기를 만든다.
- 현재 기본값은 사용자 요청에 맞춰 `superadmin_developer`로 둔다.
- client-side hiding은 보안 경계가 아니므로 public 배포 전에 snapshot filtering 또는 server authz 설계가 필요하다고 명시한다.

## 남은 불확실성

- 실제 multi-user 인증/인가, 계정 모델, 권한 행렬은 아직 구현하지 않았다.
- public snapshot redaction 정책은 별도 후속 작업으로 설계해야 한다.
