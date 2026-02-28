## 2026-02-28 - [Accessible Search Feedback]
**Learning:** Real-time search filtering can be disorienting for screen reader users if visibility changes aren't announced. Using an `aria-live="polite"` region to report the number of matches found (including a "No matches found" state) provides critical context without interrupting the user's workflow.
**Action:** Always include a dedicated status element with `role="status"` and `aria-live="polite"` when implementing client-side search filtering.

## 2026-02-28 - [Precise Search Feedback Context]
**Learning:** When a search returns no results, repeating the user's exact query in the "no matches" message (e.g., 'No matches found for "Query"') provides immediate confirmation of what was searched and helps users spot potential typos.
**Action:** Use the original user input string in "no results" feedback messages rather than a lowercased version to preserve user context.
