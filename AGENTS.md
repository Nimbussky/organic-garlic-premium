# AI Avengers — Free Multi-Agent Team (Adopt in 2 minutes)

> A free, always-on team of AI sub-agents that runs from a single command.
> Any IDE, any agent, any project. No API keys to configure, no install.

---

## What this is

A dispatcher that launches **multiple free AI agents in parallel** on any task
(content, code review, research, SEO, translation, boilerplate). It combines
**Groq + Mistral** (free cloud APIs) with **your local opencode free models**
(Mimo, DeepSeek, Ling, Laguna, Nemotron, North) so work is fast, safe and
token-cheap. Keys live in `.env` only — never in code or logs.

---

## How ANY agent learns to use it (read this section)

If you are an AI coding agent (Claude Code, Gemini, Copilot, Cursor,
Windsurf, opencode, Continue), here is your interface. **When a task is
heavy, multi-part, or parallelizable, or when told "use AI Avengers", do
this:**

1. Write the task to a `.txt`/`.md` file. **Include ALL context the agents
   need** (file paths, code snippets, data) — free agents cannot read your
   filesystem or your repo.
2. Run the dispatcher (see command below). Output lands in a Markdown file.
3. Read that file, act as QA lead, and integrate only the valid parts.

### The one command

```
python C:\Users\SSD\Desktop\AI_Orchestrator\free_ai_worker.py <task.txt> --out <result.md> [options]
```

Shortcut (from any folder/IDE terminal):

```
C:\Users\SSD\Desktop\AI_Orchestrator\avengers.bat <task.txt> --out <result.md> [options]
```

### Options

| Option | What it does |
|---|---|
| *(default)* | Smart fallback chain: Groq → Mistral → opencode free models |
| `--parallel N` | Run N agents simultaneously on the same task |
| `--team` | Full pipeline: PM plans → parallel Devs build → QA reviews |
| `--team --parallel 2` | Team mode with 2 devs per chunk |
| `--provider <name>` | Force one agent (groq, mistral, opencode-mimo, ...) |
| `--out <file>` | Save result to a file |

### Rules every agent must follow

- Never copy API keys into task files, logs, or output. Keys stay in
  `C:\Users\SSD\Desktop\AI_Orchestrator\.env`.
- Free agents cannot browse your repo — **embed needed context in the task file**.
- Agents are generative: you (the orchestrator) review and integrate their output.
- If all agents fail, continue with your own reasoning — never stall the user.
- One dispatcher call per parallel round; reuse results across the session.

---

## Available agents (21 registered, 8 verified working)

| Agent name | Source | Key needed |
|---|---|---|
| `groq` | Groq cloud (Llama-3.3-70B) | ✅ already in `.env` |
| `mistral` | Mistral cloud | ✅ already in `.env` |
| `opencode-mimo` | your PC (Mimo v2.5 free) | none |
| `opencode-deepseek` | your PC (DeepSeek v4 flash free) | none |
| `opencode-ling` | your PC (Ling 3.0 flash free) | none |
| `opencode-laguna` | your PC (Laguna S 2.1 free) | none |
| `opencode-nemotron` | your PC (Nemotron 3 ultra free) | none |
| `opencode-north` | your PC (North mini code free) | none |
| `gemini`, `glm`, `kimi`, `cerebras`, `ollama`, `openrouter`, `nvidia`, `cloudflare`, `github`, `huggingface`, `opencode`, `opencode-cli`, `pollinations` | backup chain | some keys stale |

---

## Adopting this into YOUR project (any IDE)

### For opencode / Claude Code / Cursor agents
Copy this file into your repo as `AGENTS.md` (or `.cursorrules`, `CLAUDE.md`)
— or reference it. Then say: *"use AI Avengers for this"* and the agent will
dispatch parallel free agents per the rules above.

### For the user (no IDE, plain terminal)
```
cd C:\Users\SSD\Desktop\AI_Orchestrator
avengers.bat tasks\my_task.txt --out result.md --parallel 3
```

### File-drop mode (fully automatic)
Drop a task file into `C:\Users\SSD\Desktop\AI_Orchestrator\swarm\1_PM_Inbox\`.
The watchdog auto-runs PM → Dev → QA and writes to `5_Finished_Product\`.

---

## Proving it works

```
C:\Users\SSD\Desktop\AI_Orchestrator\avengers.bat tasks\garlic_about.txt --out test.md --parallel 3
```
You'll see `[Done] Output saved to test.md` with 2–3 agent responses inside.
