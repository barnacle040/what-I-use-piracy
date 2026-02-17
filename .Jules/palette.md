## 2025-05-14 - [Robust Event Listeners for Dynamic UI]
**Learning:** In static websites where UI elements might be removed or not yet added to all pages, JavaScript initialization code should use optional chaining or presence checks before attaching event listeners. A single missing element can cause a `TypeError` that halts all subsequent script execution, breaking unrelated features like search or navigation.
**Action:** Use `document.getElementById('id')?.addEventListener(...)` or similar guards for all DOM lookups in initialization scripts.

## 2025-05-14 - [A11y Initial State]
**Learning:** Accessibility attributes like `aria-pressed` or `aria-label` should be present in the initial HTML or set immediately on page load, not just updated in response to user interaction. This ensures screen reader users have the correct context from their first encounter with the element.
**Action:** Always include initial ARIA states in the HTML for interactive elements.

## 2025-05-15 - [Descriptive Labels for Icon Buttons]
**Learning:** Icon-only buttons, especially those used for toggling sections or accordions, are completely non-descriptive to screen reader users if they only contain symbols like "+" or "−". Providing a descriptive `aria-label` that includes the section name significantly improves the navigability of the page.
**Action:** Always provide descriptive `aria-label` attributes for icon-only buttons, ensuring they include the name of the content they control.
