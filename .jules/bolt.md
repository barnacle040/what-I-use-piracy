# Bolt's Performance Journal

## 2025-05-15 - Image Loading Priority Conflicts
**Learning:** Combining `fetchpriority="high"` and `loading="lazy"` on the same image element causes a priority conflict. `loading="lazy"` delays the request until the image is near the viewport, which negates the benefit of `fetchpriority="high"` for above-the-fold content (like LCP candidates).
**Action:** Always remove `loading="lazy"` from critical above-the-fold assets that use `fetchpriority="high"`.

## 2025-05-15 - Case Sensitivity in Preloads
**Learning:** Browser preloads are strictly case-sensitive. Preloading `image.png` when the `<img>` tag uses `image.PNG` (or vice-versa) results in two separate network requests, wasting bandwidth and delaying the actual rendering of the asset.
**Action:** Ensure the `href` in `<link rel="preload">` exactly matches the `src` in the corresponding element, including casing and file extensions.
