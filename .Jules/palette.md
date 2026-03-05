## 2025-05-15 - [Theme and Favorites Persistence]
**Learning:** Micro-UX enhancements like theme toggles or "favorites" must be both functional (persisted via `localStorage`) and visually integrated into the site's design system. Adding raw buttons to the `<body>` root can disrupt the visual hierarchy and feel "tacked on."
**Action:** When adding global UI controls, prioritize integrating them into existing layout containers (like headers or navigation bars) and refactor repeated UI update logic into reusable functions to maintain code quality.
