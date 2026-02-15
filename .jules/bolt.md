## 2025-02-15 - [Mismatched Asset Names & Redundant Preloads]
**Learning:** In static sites with many images, inconsistent naming (case-sensitivity and spaces) leads to silent 404s that waste network resources. Preloading below-the-fold assets also negatively impacts LCP.
**Action:** Always verify asset filenames against their references and prioritize preloads only for above-the-fold content.
