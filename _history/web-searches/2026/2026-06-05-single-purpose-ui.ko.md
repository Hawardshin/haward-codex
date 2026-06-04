# 웹 검색 기록: Single Purpose UI

## 요청 요약

- 사용자의 인지 한계를 고려해 UI 기능 하나가 한 가지 일만 하도록 Workspace Monitor 홈을 정리한다.

## 검색어

- `Nielsen Norman Group cognitive load user interface one task at a time progressive disclosure`
- `W3C cognitive accessibility design clear purpose controls user interface`
- `WCAG clear labels instructions user interface controls purpose official`
- `site:w3.org/WAI cognitive accessibility clear purpose controls user interface`
- `site:w3.org/WAI Making Content Usable for People with Cognitive and Learning Disabilities clear purpose controls`

## 확인한 출처

- W3C WAI, Cognitive Accessibility Design Pattern: Clearly Identify Controls and Their Use: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p05-clear-controls/
- W3C WAI, Cognitive Accessibility Design Pattern: Make the Purpose of Your Page Clear: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p01-clear-purpose/
- W3C WAI, Understanding Success Criterion 3.3.2: Labels or Instructions: https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
- W3C WAI, Labeling Controls: https://www.w3.org/WAI/tutorials/forms/labels/
- W3C WAI, Cognitive Accessibility at W3C: https://www.w3.org/WAI/cognitive/

## 적용 인사이트

- 컨트롤은 사용자가 수행할 수 있는 task와 control의 용도를 명확히 알아볼 수 있어야 한다.
- 화면/페이지의 목적은 제목과 signpost로 명확해야 하며, 기억과 주의가 약한 사용자에게 특히 중요하다.
- label과 instruction은 control의 목적과 사용자가 해야 할 입력/선택을 드러내야 한다.
- 따라서 Workspace Monitor 홈에서는 버튼과 disclosure panel이 상태/결정/지표/기록/설정을 한 번에 섞지 않도록 한 패널 한 역할, 핵심 기능 탭 한 CTA로 바꾼다.

## 제외하거나 약하게 본 출처

- 일반 UX 블로그와 위키류 progressive disclosure 설명은 방향성 참고로만 보고, 구현 기준은 W3C/WAI 출처를 우선했다.

## 불확실성

- W3C 자료는 접근성/인지 부하 원칙을 제시하지만, Workspace Monitor의 구체 정보구조는 로컬 UI 검증과 사용자 피드백으로 계속 조정해야 한다.
