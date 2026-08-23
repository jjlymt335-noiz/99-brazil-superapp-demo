# 99 Brazil Home Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publicly publish a polished, clickable 99 Brazil multi-service home-page prototype with Chinese reviewer guidance.

**Architecture:** A dependency-light Vite static site separates immutable product content, small pure state helpers, DOM interaction orchestration, and responsive presentation. GitHub Actions publishes the production build to GitHub Pages, while Node tests cover state transitions and Playwright smoke checks cover the rendered experience.

**Tech Stack:** HTML5, CSS, JavaScript ES modules, Vite, Node test runner, Playwright, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-23-99-brazil-home-demo-design.md`

## Global Constraints

- Primary service shortcuts remain fixed; predictive content is auxiliary and appears below core modules.
- No production API, personal-data collection, real booking, payment, or lending action.
- Portuguese product copy and Chinese reviewer annotations.
- Static hosting with responsive mobile and desktop layouts.
- Respect visible focus and reduced-motion preferences.
- Only create or modify files for this demo and its documentation.

---

### Task 1: Static application foundation and state model

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `src/model.js`
- Create: `tests/model.test.js`

**Interfaces:**
- Produces: `createInitialState(): AppState`, `reduce(state, action): AppState`, and `getActivePanel(state): string | null`.
- `AppState` contains `activeTab`, `activePanel`, and `suggestionVisible`.

- [ ] **Step 1: Write failing state tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, reduce } from '../src/model.js';

test('suggestion can be dismissed without changing the main navigation', () => {
  const next = reduce(createInitialState(), { type: 'dismiss-suggestion' });
  assert.equal(next.suggestionVisible, false);
  assert.equal(next.activeTab, 'home');
});

test('opening a service preserves fixed home state', () => {
  const next = reduce(createInitialState(), { type: 'open-panel', panel: 'rides' });
  assert.equal(next.activePanel, 'rides');
  assert.equal(next.activeTab, 'home');
});
```

- [ ] **Step 2: Run `node --test tests/model.test.js` and verify the missing-module failure**
- [ ] **Step 3: Implement immutable state transitions in `src/model.js`**
- [ ] **Step 4: Run `node --test tests/model.test.js` and verify all tests pass**
- [ ] **Step 5: Configure Vite scripts for development, build, test, and preview**
- [ ] **Step 6: Commit with `git commit -m "chore: set up 99 Brazil demo"`**

### Task 2: Home-page semantic structure and product copy

**Files:**
- Create: `index.html`
- Create: `src/content.js`
- Create: `src/main.js`
- Test: `tests/model.test.js`

**Interfaces:**
- Consumes: state helpers from `src/model.js`.
- Produces: DOM hooks `[data-action]`, `[data-service]`, `[data-panel]`, and `render(state)`.

- [ ] **Step 1: Add a failing content test asserting the stable service order**

```js
test('core services keep the specified stable order', async () => {
  const { services } = await import('../src/content.js');
  assert.deepEqual(services.map(({ id }) => id), [
    'rides', 'food', 'delivery', 'pay', 'moto', 'freight', 'pix', 'all'
  ]);
});
```

- [ ] **Step 2: Run the test and verify the missing content-module failure**
- [ ] **Step 3: Define Portuguese service, order, benefit, sheet, and navigation copy in `src/content.js`**
- [ ] **Step 4: Build semantic home, reviewer narrative, sheet, toast, and navigation markup in `index.html`**
- [ ] **Step 5: Implement delegated clicks, keyboard-safe sheet behavior, state rendering, and session-only suggestion dismissal in `src/main.js`**
- [ ] **Step 6: Run `npm test` and verify all tests pass**
- [ ] **Step 7: Commit with `git commit -m "feat: add multi-service home interactions"`**

### Task 3: Responsive visual system and motion

**Files:**
- Create: `src/styles.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: semantic class names from `index.html`.
- Produces: responsive desktop narrative, mobile application layout, bottom sheets, focus styles, and reduced-motion behavior.

- [ ] **Step 1: Add base tokens for 99 yellow, charcoal, cream, green, spacing, type, radius, and shadows**
- [ ] **Step 2: Style the desktop story panel and phone frame at widths of 900px and above**
- [ ] **Step 3: Style the mobile header, fixed service grid, active trip, benefit strip, optional suggestion, and bottom navigation**
- [ ] **Step 4: Style sheets, toast feedback, hover, active, focus-visible, and reduced-motion states**
- [ ] **Step 5: Run `npm run build` and verify a successful production build**
- [ ] **Step 6: Commit with `git commit -m "feat: style responsive 99 Brazil prototype"`**

### Task 4: Browser validation and deployment automation

**Files:**
- Create: `tests/demo.spec.js`
- Create: `playwright.config.js`
- Modify: `package.json`
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: production UI and Vite scripts.
- Produces: `npm run test:e2e`, production build artifact, and GitHub Pages workflow.

- [ ] **Step 1: Add Playwright smoke checks for stable entry order, service sheet opening, address sheet, navigation, and suggestion dismissal**
- [ ] **Step 2: Run the smoke checks against a local Vite server and correct any failures**
- [ ] **Step 3: Capture desktop and mobile screenshots and visually inspect hierarchy, clipping, and tap targets**
- [ ] **Step 4: Add a GitHub Pages workflow using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`**
- [ ] **Step 5: Document the public demo, local commands, interaction checklist, and product rationale in `README.md`**
- [ ] **Step 6: Run `npm test`, `npm run build`, and `npm run test:e2e` from a clean install**
- [ ] **Step 7: Commit with `git commit -m "test: verify and prepare public demo"`**

### Task 5: Public release and handoff

**Files:**
- Modify: `README.md` with the final public URL if required.

**Interfaces:**
- Consumes: verified Git repository and GitHub authentication.
- Produces: public GitHub repository and reachable GitHub Pages URL.

- [ ] **Step 1: Create the public `99-brazil-superapp-demo` GitHub repository**
- [ ] **Step 2: Configure the Vite base path for the final repository name and rebuild**
- [ ] **Step 3: Push the main branch and enable GitHub Pages with GitHub Actions as the build source**
- [ ] **Step 4: Wait for the deployment workflow and open the public URL**
- [ ] **Step 5: Re-run the browser smoke path against the public URL**
- [ ] **Step 6: Report the public URL, repository, verification result, and revised four-module PRD copy**

