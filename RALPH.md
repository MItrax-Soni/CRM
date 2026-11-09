# Ralph Loop Autonomous Iteration Protocol

This repository implements the **Ralph Loop** pattern for continuous autonomous problem solving, iterative development, and automated self-healing.

## Core Loop Lifecycle
```mermaid
flowchart TD
    A["1. Intake & Requirements Analysis"] --> B["2. Task Decomposition (.ralph/tasks.json)"]
    B --> C["3. Execute Discrete Step"]
    C --> D["4. Automated Verification (npm run build)"]
    D -->|Failure / Errors| E["5. Self-Healing & Root-Cause Fix"]
    E --> C
    D -->|Success| F["6. Update State & Telemetry"]
    F --> G{"All Tasks Completed?"}
    G -->|No| C
    G -->|Yes| H["7. Final Review & Clean Commit"]
```

## Ralph Loop Rules for Agents
1. **Never Assume — Always Verify**: After modifying any code, execute `npm run build` immediately.
2. **Context Preservation**: Update `.ralph/tasks.json` at each iteration so progress is never lost across context resets.
3. **Strict Design Token Adherence**: Keep all components aligned with Stitch design tokens (`tailwind.config.js`).
4. **Single-Responsibility Iterations**: Make focused, atomic commits rather than massive monolithic changes.

## Verification Commands
- Build & Typecheck: `npm run build`
- Preview Server: `npm run preview -- --port 4173`
- Development Server: `npm run dev`

