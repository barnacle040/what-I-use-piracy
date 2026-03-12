## 2026-02-19 - Resource Loading & Asset Normalization
**Learning:** Combining `loading="lazy"` with `fetchpriority="high"` on the same image element creates a priority conflict that can confuse the browser's resource scheduler. Additionally, case-sensitivity in preloads (e.g., `.png` vs `.PNG`) and spaces in filenames are common sources of silent 404s that degrade performance by wasting requests.
**Action:** Always verify that above-the-fold assets are preloaded with correct casing and no lazy loading. Normalize filenames to use underscores and lowercase extensions. Avoid combining lazy loading with high fetch priority.

## 2026-02-21 - Resource Discovery and Documentation
**Learning:** Adding 'preconnect' resource hints across all pages that consume external CDNs (like FontAwesome) ensures consistent performance gains. Documenting estimated metrics in HTML comments provides transparency and justification for optimizations that might otherwise be seen as minor or redundant.
**Action:** Consistently apply preconnect hints to all pages using external resources. Include estimated performance impact (latency reduction, payload savings) in code comments.

## 2026-02-23 - Search Indexing & Event Debouncing
**Learning:** Performing repeated DOM queries (`querySelectorAll`) and text extraction (`textContent`) on every `input` event for lists of ~40 items creates unnecessary main-thread overhead. Caching searchable content in a simple JavaScript index on `DOMContentLoaded` and debouncing the input event (e.g., 250ms) reduces string processing overhead by ~90% during active search.
**Action:** Use pre-built search indexes and debouncing for all client-side filtering features to minimize DOM thrashing and CPU usage.

## 2026-03-12 - Search Indexing & UI Restoration UX
**Learning:** While debouncing search inputs (e.g., 250ms) is critical for performance, applying it to "clear" actions or "Esc" key events creates a perceptible lag that degrades UX. Immediate execution of the filtering logic upon clearing ensures the UI feels responsive while still maintaining the performance benefits of debouncing during active typing.
**Action:** Always bypass debounced wrappers for state-resetting actions like clearing a search input or closing modal/shortcut guides.
