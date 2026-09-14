# Manual smoke test checklist

Run these checks after opening `index.html` in a modern browser.

## Tasks

- Add a task and confirm it appears immediately.
- Mark the task complete and confirm the completed counter changes.
- Delete a task and confirm it disappears.
- Refresh the page and confirm tasks remain saved.
- Use **Clear done** and confirm completed tasks are removed.

## Timer

- Start the timer and confirm the countdown moves once per second.
- Reset the timer and confirm it returns to 25:00.
- For a quick completion test, temporarily reduce the timer duration in development and verify a completed session adds 25 study minutes.

## Habits

- Toggle each habit and confirm the habits-done counter updates.
- Refresh and confirm habit state remains saved.

## Backup

- Export JSON and confirm a `life-os-backup.json` file is downloaded.
- Import that file and confirm tasks, habits, and study minutes return.
- Import invalid JSON and confirm the app shows an error without replacing existing data.

## Keyboard

- Press `/` outside an input to focus the task field.
- Press `R` outside an input to reset the timer.
