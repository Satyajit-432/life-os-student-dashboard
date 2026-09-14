# Architecture

## Current design

Life OS is a static client-side application:

- `index.html` contains the semantic UI.
- `styles.css` provides responsive presentation.
- `app.js` owns application state and interactions.
- `localStorage` persists the current task list and study total.

## Data flow

1. The page loads and reads the saved state.
2. User actions update the in-memory state.
3. `save()` writes the state to local storage.
4. `render()` updates visible counters and tasks.

## Design goal

Keep the first version simple enough to understand without a framework. Future features should be added as small, reviewable changes.