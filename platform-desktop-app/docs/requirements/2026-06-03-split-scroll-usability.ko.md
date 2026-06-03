# 요구사항: Split Scroll Usability

## 배경

사용자는 스크롤할 때 화면 분할이 잘 되어야 실제 사용자가 편하게 쓸 수 있다고 지적했다. 데스크톱 앱에서는 하나의 긴 웹 페이지처럼 전체가 밀리는 방식보다, Explorer, editor, terminal output, settings content 같은 작업 pane이 독립적으로 스크롤되어야 한다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| PDA-REQ-059 | 파일/코드 화면은 좌측 Explorer와 우측 editor pane이 같은 shell 안에서 독립적으로 스크롤되어야 한다. | must | Browser smoke, CSS split-scroll token check |
| PDA-REQ-060 | 다중 CLI 터미널은 drawer 전체가 밀리지 않고 session list, selected output, terminal event rail이 각각 스크롤되어야 한다. | must | Browser terminal smoke, readiness token check |
| PDA-REQ-061 | 설정 dialog는 header와 tab list가 유지되고 settings content pane만 스크롤되어야 한다. | should | Browser settings smoke |
| PDA-REQ-062 | 주요 scroll pane은 keyboard focus를 받을 수 있어야 한다. | should | `tabIndex={0}` source/readiness check |
| PDA-REQ-063 | 작은 화면에서는 고정 split height가 내용을 숨기지 않도록 page flow로 풀려야 한다. | should | responsive CSS check |
| PDA-REQ-064 | 최상위 desktop app shell, activity rail, viewport가 중첩 `100vh`/고정 `min-height`로 내부 pane 스크롤 접근을 가리면 안 된다. | must | `check-scroll-containers.mjs`, Browser smoke |

## 비범위

- 사용자가 직접 드래그하는 resizable splitter.
- 가상화된 대형 파일 목록.
- packaged app real workspace smoke.
