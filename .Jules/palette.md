## 2025-05-14 - [Robust Event Listeners for Dynamic UI]
**Learning:** In static websites where UI elements might be removed or not yet added to all pages, JavaScript initialization code should use optional chaining or presence checks before attaching event listeners. A single missing element can cause a `TypeError` that halts all subsequent script execution, breaking unrelated features like search or navigation.
**Action:** Use `document.getElementById('id')?.addEventListener(...)` or similar guards for all DOM lookups in initialization scripts.

## 2025-05-14 - [A11y Initial State]
**Learning:** Accessibility attributes like `aria-pressed` or `aria-label` should be present in the initial HTML or set immediately on page load, not just updated in response to user interaction. This ensures screen reader users have the correct context from their first encounter with the element.
**Action:** Always include initial ARIA states in the HTML for interactive elements.

## 2025-05-15 - [Keyboard Shortcut Discoverability]
**Learning:** Keyboard shortcuts are powerful but often "hidden" features. Providing a dedicated visual guide (Shortcuts Panel) that can be toggled via a universal convention (the `?` key) significantly improves accessibility and discoverability for power users without cluttering the main UI.
**Action:** Implement a `?` key listener that avoids triggering in text inputs and provides a guide (integrated as a standard section to reuse existing styles) listing all available shortcuts.

## 2025-05-16 - [Universal Tooltips via ARIA]
**Learning:** For repositories with numerous repeated interactive elements (like Copy/Favorite buttons), implementing tooltips using CSS `attr(aria-label)` is significantly more maintainable and lightweight than adding manual `data-tooltip` attributes. It leverages existing accessibility data as a source of truth for UI hints.
**Action:** Use CSS `[aria-label]:hover:after { content: attr(aria-label); }` (with appropriate selectors) to provide automatic tooltips for accessible icon-only buttons.
