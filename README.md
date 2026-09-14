# ORION — AI Command Center

ORION is a privacy-first, AI-ready command center built as a learning project. It turns the original Life OS student dashboard into a futuristic workspace for missions, focus sessions, public-source research and future AI integrations.

## Current build
- Command-center UI with responsive layout
- Local task/mission board
- 25-minute focus engine with study tracking
- Local browser persistence
- AI console with safe local demo responses
- Public-intelligence area designed around visible sources
- System page showing integration status
- Provider-neutral AI adapter contract

## AI architecture
The browser UI is deliberately separated from model credentials. A future backend can implement the adapter in `docs/orion.md` and call an approved model API without exposing an API key in client-side code.

## Run
Open `index.html` in a modern browser. No build step is required for the current prototype.

## Roadmap
1. Connect a secure server-side AI provider.
2. Add public web-search connectors with source citations.
3. Add a notes/knowledge store.
4. Add GitHub project intelligence.
5. Add tests and continuous integration.
6. Add optional model selection when supported by the backend.

## Safety boundary
ORION is not a covert-surveillance tool. It should not be used to track people, access private accounts, bypass authentication, or collect personal data without permission.

MIT License.