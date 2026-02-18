## 2024-05-15 - [Image Optimization Patterns & Anti-patterns]
**Learning:** Combining 'fetchpriority=high' and 'loading=lazy' on the same image element causes priority conflicts in the browser's preload scanner. Above-the-fold critical assets (like LCP candidates) should use only high fetchpriority, while below-the-fold assets should use lazy loading without preloads. Additionally, `decoding="async"` is an effective way to offload image decoding from the main thread in image-heavy static pages.
**Action:** Always audit `loading` and `fetchpriority` attributes together. Ensure LCP candidates are not lazy-loaded. Apply `decoding="async"` to all non-critical images.

## 2024-05-15 - [Case Sensitivity and Filename Sanity]
**Learning:** In this static repository, filename references are case-sensitive and fragile. Spaces in filenames (e.g., 'pirate ship.png') lead to encoding issues and 404s when referenced as 'pirate_ship.png' or in preloads.
**Action:** Sanitize filenames to avoid spaces and ensure HTML references match the exact casing of the filesystem (e.g., .PNG vs .png).
