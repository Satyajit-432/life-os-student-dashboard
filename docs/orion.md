# ORION Architecture

## Layers

### 1. UI layer
`index.html` and `styles.css` provide the command-center interface. `app.js` handles local interactions and browser storage.

### 2. AI adapter
The UI should call one provider-neutral function rather than embedding provider credentials:

```text
askModel({ messages, model, tools }) -> { text, citations, usage }
```

The implementation belongs on a server or trusted runtime. Never ship a secret API key in browser JavaScript.

### 3. Research layer
Research connectors should return source URLs, titles and extracted facts. The interface should make the source trail visible to the user.

### 4. Knowledge layer
A later version can store notes, project facts and summaries in a small database. User-controlled data should be exportable and deletable.

## Why this is different from a "God Eye"
ORION focuses on useful intelligence rather than surveillance: public information, user-provided files, personal productivity and explicit integrations. The system should always show what connector is active and what information it can access.

## Future model support
The project is model-agnostic. A compatible backend could route requests to a current OpenAI model or another provider. The current browser demo intentionally does not claim to be connected to GPT-6 or any unavailable model.