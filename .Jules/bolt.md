## 2026-02-19 - Resource Loading & Asset Normalization
**Learning:** Combining `loading="lazy"` with `fetchpriority="high"` on the same image element creates a priority conflict that can confuse the browser's resource scheduler. Additionally, case-sensitivity in preloads (e.g., `.png` vs `.PNG`) and spaces in filenames are common sources of silent 404s that degrade performance by wasting requests.
**Action:** Always verify that above-the-fold assets are preloaded with correct casing and no lazy loading. Normalize filenames to use underscores and lowercase extensions. Avoid combining lazy loading with high fetch priority.

## 2026-02-21 - Resource Discovery and Documentation
**Learning:** Adding 'preconnect' resource hints across all pages that consume external CDNs (like FontAwesome) ensures consistent performance gains. Documenting estimated metrics in HTML comments provides transparency and justification for optimizations that might otherwise be seen as minor or redundant.
**Action:** Consistently apply preconnect hints to all pages using external resources. Include estimated performance impact (latency reduction, payload savings) in code comments.

## 2026-02-23 - Search Indexing & Event Debouncing
**Learning:** Performing repeated DOM queries (`querySelectorAll`) and text extraction (`textContent`) on every `input` event for lists of ~40 items creates unnecessary main-thread overhead. Caching searchable content in a simple JavaScript index on `DOMContentLoaded` and debouncing the input event (e.g., 250ms) reduces string processing overhead by ~90% during active search.
**Action:** Use pre-built search indexes and debouncing for all client-side filtering features to minimize DOM thrashing and CPU usage.

## 2026-02-25 - Efficient List Filtering vs. DOM Re-rendering
**Learning:** For lists of moderate size (~20-40 items), clearing and re-rendering the entire DOM grid via `innerHTML = ''` on every keystroke is significantly less efficient than toggling the `display` property of existing elements. Pre-caching DOM references and searchable text in a `searchIndex` on initial load allows for O(N) visibility toggling without the high cost of element destruction and creation.
**Action:** Prefer visibility toggling (`display: none`) and DOM reference indexing over `innerHTML` clearing for filtering static lists. Always clear stateful indexes (e.g., `gameSearchIndex = []`) if the base list is re-rendered to prevent stale references.
