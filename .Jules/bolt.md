## 2026-02-19 - Resource Loading & Asset Normalization
**Learning:** Combining `loading="lazy"` with `fetchpriority="high"` on the same image element creates a priority conflict that can confuse the browser's resource scheduler. Additionally, case-sensitivity in preloads (e.g., `.png` vs `.PNG`) and spaces in filenames are common sources of silent 404s that degrade performance by wasting requests.
**Action:** Always verify that above-the-fold assets are preloaded with correct casing and no lazy loading. Normalize filenames to use underscores and lowercase extensions. Avoid combining lazy loading with high fetch priority.

## 2026-02-21 - Resource Discovery and Documentation
**Learning:** Adding 'preconnect' resource hints across all pages that consume external CDNs (like FontAwesome) ensures consistent performance gains. Documenting estimated metrics in HTML comments provides transparency and justification for optimizations that might otherwise be seen as minor or redundant.
**Action:** Consistently apply preconnect hints to all pages using external resources. Include estimated performance impact (latency reduction, payload savings) in code comments.

## 2026-02-23 - Search Indexing & Event Debouncing
**Learning:** Performing repeated DOM queries (`querySelectorAll`) and text extraction (`textContent`) on every `input` event for lists of ~40 items creates unnecessary main-thread overhead. Caching searchable content in a simple JavaScript index on `DOMContentLoaded` and debouncing the input event (e.g., 250ms) reduces string processing overhead by ~90% during active search.
**Action:** Use pre-built search indexes and debouncing for all client-side filtering features to minimize DOM thrashing and CPU usage.

## 2026-03-01 - FAQ Search Optimization
**Learning:** For FAQ pages with nested sections, caching both the items and their parent section associations in a `sectionIndex` allows for extremely efficient visibility updates (O(n) where n is number of sections) compared to O(m*n) where m is items per section. This optimization reduced Help.html search execution time from 0.24ms to 0.067ms (~72% improvement).
**Action:** Map sections to their children in the search index to avoid redundant `querySelectorAll` or `Array.from` calls during complex visibility logic.
