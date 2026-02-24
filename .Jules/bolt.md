## 2026-02-19 - Resource Loading & Asset Normalization
**Learning:** Combining `loading="lazy"` with `fetchpriority="high"` on the same image element creates a priority conflict that can confuse the browser's resource scheduler. Additionally, case-sensitivity in preloads (e.g., `.png` vs `.PNG`) and spaces in filenames are common sources of silent 404s that degrade performance by wasting requests.
**Action:** Always verify that above-the-fold assets are preloaded with correct casing and no lazy loading. Normalize filenames to use underscores and lowercase extensions. Avoid combining lazy loading with high fetch priority.

## 2026-02-21 - Resource Discovery and Documentation
**Learning:** Adding 'preconnect' resource hints across all pages that consume external CDNs (like FontAwesome) ensures consistent performance gains. Documenting estimated metrics in HTML comments provides transparency and justification for optimizations that might otherwise be seen as minor or redundant.
**Action:** Consistently apply preconnect hints to all pages using external resources. Include estimated performance impact (latency reduction, payload savings) in code comments.

## 2025-05-14 - Optimized Search & Filtering via Indexed Metadata
**Learning:** Performing multiple DOM queries (querySelectorAll, querySelector, textContent) and string operations inside high-frequency events (input/change) creates significant UI lag as the number of elements grows. Synchronizing multiple filter inputs without a unified state management function leads to inconsistent UI states.
**Action:** Pre-calculate an index of searchable metadata on DOMContentLoaded and use a debounced, unified filtering function to minimize main-thread blocking and ensure UI consistency.
