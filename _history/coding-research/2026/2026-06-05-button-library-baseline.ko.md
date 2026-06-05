# 코딩 리서치: Button Library Baseline

## 기술 스택

- Next.js 16.2.6
- React 19.2.6
- TypeScript 6.0.3
- CSS token 기반 app stylesheet
- 기존 Radix Dropdown/Context primitive

## 공식 문서

- Radix Slot official docs: `https://www.radix-ui.com/primitives/docs/utilities/slot`
- shadcn Button official docs: `https://v3.shadcn.com/docs/components/button`
- Radix Themes Button official docs: `https://www.radix-ui.com/themes/docs/components/button`
- React Aria Button docs: `https://react-spectrum.adobe.com/react-aria/Button.html`

## 언어/런타임 선택

- 옵션 A: TypeScript React component
- 옵션 B: CSS-only class convention
- 선택: TypeScript React component
- 결정 이유: 버튼 variant/size/`asChild`/loading props를 타입으로 제한할 수 있고, 기존 React UI와 테스트에 자연스럽게 연결된다. CSS-only는 빠르지만 새 버튼 생성 시 일관성 강제가 약하다.

## 아키텍처 선택

- 옵션 A: Radix Themes 전체 도입
- 옵션 B: React Aria Button 전체 도입
- 옵션 C: Radix Slot + CVA로 내부 Button primitive 도입
- 선택: 옵션 C
- 결정 이유: 기존 Radix primitive와 맞고, 전체 theme reset 없이 기존 CSS token을 재사용하며, shadcn식 variant 패턴을 작게 도입할 수 있다.

## 폴더 구조 선택

- 옵션 A: `components/ui/Button.tsx`
- 옵션 B: `components/workbench/Button.tsx`
- 선택: `components/ui/Button.tsx`
- 결정 이유: 특정 workbench 소유가 아니라 앱 전역 UI primitive이며, 이후 Input/Select/Toggle 같은 공통 컴포넌트를 같은 계층에 둘 수 있다.

## 참고 오픈소스/실무 패턴

- shadcn Button: CVA variant와 Radix Slot 기반 `asChild`
- Radix Slot: child composition utility
- 기존 코드: `ToolStudioPanel`은 이미 Radix menu primitive를 사용한다.

## 이슈/커뮤니티 신호

- shadcn은 패키지형 컴포넌트 라이브러리라기보다 copy/adapt 패턴이라는 커뮤니티 신호가 있다. 이번 작업은 copy CLI를 쓰지 않고 공식 dependency 조합만 설치한다.
- Radix Slot은 Radix primitive composition에서 널리 쓰이는 공식 utility다.
