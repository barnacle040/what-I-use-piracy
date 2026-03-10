## 2025-05-14 - [Robust Event Listeners for Dynamic UI]
**Learning:** In static websites where UI elements might be removed or not yet added to all pages, JavaScript initialization code should use optional chaining or presence checks before attaching event listeners. A single missing element can cause a `TypeError` that halts all subsequent script execution, breaking unrelated features like search or navigation.
**Action:** Use `document.getElementById('id')?.addEventListener(...)` or similar guards for all DOM lookups in initialization scripts.

## 2025-05-14 - [A11y Initial State]
**Learning:** Accessibility attributes like `aria-pressed` or `aria-label` should be present in the initial HTML or set immediately on page load, not just updated in response to user interaction. This ensures screen reader users have the correct context from their first encounter with the element.
**Action:** Always include initial ARIA states in the HTML for interactive elements.

## 2025-05-15 - [Keyboard Shortcut Discoverability]
**Learning:** Keyboard shortcuts are powerful but often "hidden" features. Providing a dedicated visual guide (Shortcuts Panel) that can be toggled via a universal convention (the `?` key) significantly improves accessibility and discoverability for power users without cluttering the main UI.
**Action:** Implement a `?` key listener that avoids triggering in text inputs and provides a guide (integrated as a standard section to reuse existing styles) listing all available shortcuts.

## 2026-02-26 - [Dynamic Search Interaction in FAQs]
**Learning:** Adding search to an FAQ page significantly improves user experience, especially when it automatically expands matching sections and provides a real-time result count announced by screen readers (`aria-live`). This makes "hidden" content instantly discoverable and accessible.
**Action:** Implement search logic that not only filters items but also manages parent section states (expanding them to show matches) and provides clear accessibility feedback through live regions.

## 2026-05-15 - [Non-Destructive Feedback & Layout Preservation]
**Learning:** UX feedback mechanisms and search filtering must be non-destructive. Using `textContent` for "Copied!" messages can accidentally delete icon elements within buttons. Similarly, forcing `display: flex` during search filtering can break elements that rely on `inline-block` or other layout modes.
**Action:** Use `innerHTML` to restore original UI states including icons. When toggling visibility for search, use `element.style.display = ''` to allow the element to revert to its natural CSS-defined display property.
