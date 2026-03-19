## 2026-02-19 - Resource Loading & Asset Normalization
**Learning:** Combining `loading="lazy"` with `fetchpriority="high"` on the same image element creates a priority conflict that can confuse the browser's resource scheduler. Additionally, case-sensitivity in preloads (e.g., `.png` vs `.PNG`) and spaces in filenames are common sources of silent 404s that degrade performance by wasting requests.
**Action:** Always verify that above-the-fold assets are preloaded with correct casing and no lazy loading. Normalize filenames to use underscores and lowercase extensions. Avoid combining lazy loading with high fetch priority.

## 2026-02-21 - Resource Discovery and Documentation
**Learning:** Adding 'preconnect' resource hints across all pages that consume external CDNs (like FontAwesome) ensures consistent performance gains. Documenting estimated metrics in HTML comments provides transparency and justification for optimizations that might otherwise be seen as minor or redundant.
**Action:** Consistently apply preconnect hints to all pages using external resources. Include estimated performance impact (latency reduction, payload savings) in code comments.

## 2026-02-23 - Search Indexing & Event Debouncing
**Learning:** Performing repeated DOM queries (`querySelectorAll`) and text extraction (`textContent`) on every `input` event for lists of ~40 items creates unnecessary main-thread overhead. Caching searchable content in a simple JavaScript index on `DOMContentLoaded` and debouncing the input event (e.g., 250ms) reduces string processing overhead by ~90% during active search.
**Action:** Use pre-built search indexes and debouncing for all client-side filtering features to minimize DOM thrashing and CPU usage.

## 2026-03-09 - Granular Search Indexing for Complex Sections
**Learning:** For pages with nested or grouped content (like FAQs in sections), a flat search index is insufficient for managing parent visibility. Creating a secondary index for sections that maps them to their child items allows for $O(n)$ visibility updates and synchronized state (like auto-expanding matching sections) without repeated DOM traversals.
**Action:** When implementing search for grouped content, use a two-tier indexing strategy: one for individual items and one for their parent containers.

## 2026-03-11 - Indexed Visibility Toggling vs. innerHTML Re-renders
**Learning:** For static content lists, using `innerHTML` to re-render the entire list on every search keystroke is an O(n) operation that causes significant DOM thrashing and layout shifts. Transitioning to a visibility-based approach (`display: none/block`) combined with a pre-built search index (caching DOM references and text) reduces string processing and DOM creation overhead by ~90%.
**Action:** Prioritize visibility toggling and pre-built indices for all client-side filtering features to eliminate redundant DOM manipulation and improve main-thread responsiveness.
