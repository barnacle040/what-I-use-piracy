# Bolt's Journal - Critical Learnings

## 2025-05-15 - DOM Persistence vs. Re-rendering for Search
**Learning:** In pages with many repeated elements (like game cards), destroying and recreating the DOM on every keystroke in a search bar leads to significant main-thread jank and loses state (like scroll position or focus).
**Action:** Use a "render once, toggle visibility" approach by building a search index on load and using `display: none` / `display: ''` for filtering.

## 2025-05-15 - Safe Display Reset
**Learning:** Setting `element.style.display = 'block'` to show an element can break layouts if the element was originally `inline-block`, `flex`, or `grid`.
**Action:** Use `element.style.display = ''` to remove the inline override and allow the element to return to its CSS-defined display property.
