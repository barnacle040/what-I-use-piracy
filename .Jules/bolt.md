## 2026-02-19 - Resource Loading & Asset Normalization
**Learning:** Combining `loading="lazy"` with `fetchpriority="high"` on the same image element creates a priority conflict that can confuse the browser's resource scheduler. Additionally, case-sensitivity in preloads (e.g., `.png` vs `.PNG`) and spaces in filenames are common sources of silent 404s that degrade performance by wasting requests.
**Action:** Always verify that above-the-fold assets are preloaded with correct casing and no lazy loading. Normalize filenames to use underscores and lowercase extensions. Avoid combining lazy loading with high fetch priority.

## 2026-02-21 - Resource Discovery and Documentation
**Learning:** Adding 'preconnect' resource hints across all pages that consume external CDNs (like FontAwesome) ensures consistent performance gains. Documenting estimated metrics in HTML comments provides transparency and justification for optimizations that might otherwise be seen as minor or redundant.
**Action:** Consistently apply preconnect hints to all pages using external resources. Include estimated performance impact (latency reduction, payload savings) in code comments.

## 2026-02-25 - Search Performance Optimization
**Learning:** Iterating over the DOM to read 'textContent' and toggle styles on every keystroke causes significant CPU overhead and DOM thrashing, especially on pages with many sections. Pre-caching text content in a search index and debouncing the input handler significantly improves responsiveness.
**Action:** Implement debounced search handlers (250ms) and use a pre-built 'searchIndex' of lowercased content for all search features. Use the 'input' event instead of 'keyup' for better reliability.
