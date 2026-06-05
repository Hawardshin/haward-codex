# 2026-06-06 네이티브 창 크롬 활용 계획

## 목적

사용자의 “네이티브 방식 활용” 지시를 Tauri desktop runtime에서 즉시 검증 가능한 native window chrome 개선으로 구현한다.

## 범위

- main window native titlebar config
- native drag region and no-drag control separation
- readiness/test gates
- browser DOM/CSS verification
- internal package build

## 제외

- macOS vibrancy/AppKit material
- tray/global shortcut/file association
- native Rust UI rewrite

## 검증 게이트

- renderer test
- platform desktop test/check
- browser smoke
- internal package build
