# ORION GitHub AI Analyst

`github-analyst.html` is a privacy-first repository analyst for `Satyajit-432/life-os-student-dashboard`.

## What it does

- Reads public repository metadata directly from GitHub's REST API.
- Shows recent commits, open issues, open pull requests, and releases.
- Produces a transparent health score from those signals.
- Highlights engineering risks and recommends the next delivery steps.
- Keeps credentials out of browser JavaScript.

GitHub documents the REST API as a way to build analytics dashboards and integrations: https://docs.github.com/en/rest/about-the-rest-api/about-the-rest-api

## AI-provider boundary

The current analyst is deterministic and explainable. It is intentionally not pretending to call an unavailable GPT-6 model.

A future server-side adapter can send a sanitized repository snapshot to an available AI provider for natural-language code review. Never put a private model/API key in this static page.

## Why this is useful

This turns the repository itself into a portfolio feature: the project can inspect its own delivery signals and explain what should happen next, rather than only displaying counters.
