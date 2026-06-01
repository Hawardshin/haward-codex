# View Mode와 Access Control 참고

## 요약

현재 구현한 `view_mode`는 화면 렌즈다. 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 선택해 정보량과 섹션을 조절하지만, 실제 인증/인가를 구현하지 않는다.

## 참고 출처

| 출처 | 접근일 | 신뢰도 | 요점 | 한계 |
| --- | --- | --- | --- | --- |
| OWASP Authorization Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | 2026-06-02 | 높음 | 최소 권한, 기본 거부, 모든 요청 권한 검증, authorization test가 필요하다. | 웹 애플리케이션 권한 설계 일반 지침이며 현재 static monitor에 직접 구현된 것은 아니다. |
| NIST Role Based Access Control, https://csrc.nist.gov/Projects/Role-Based-Access-Control | 2026-06-02 | 중간 | RBAC는 역할과 권한 모델의 표준적 어휘를 제공한다. | NIST 페이지가 archived 상태라 최신 제품 구현 지침으로 사용하면 안 된다. |
| Next.js Proxy file convention, https://nextjs.org/docs/app/api-reference/file-conventions/proxy | 2026-06-02 | 높음 | Next.js 16 계열에서 request boundary 관련 file convention은 `proxy` 용어를 사용한다. | 현재 Workspace Monitor는 static export 중심이라 인증 구현과는 별개다. |

## 적용 원칙

- `view_mode=user`: stable output과 readable history 중심.
- `view_mode=developer`: 구현, 요구사항, 스펙, 테스트, 에이전트 인벤토리 중심.
- `view_mode=superadmin_developer`: 저장소 소유자/플랫폼 개선자 전체 운영 화면. 현재 기본값.
- client-side hiding은 보안 경계가 아니다.
- public/multi-user 배포에서는 collector filtering, server route/authz, snapshot redaction, authorization tests가 필요하다.

## 후속 후보

- public snapshot profile과 internal snapshot profile 분리.
- role-to-section matrix를 Next.js 또는 desktop shell routing과 연결.
- admin 권한 테스트 템플릿 추가.
