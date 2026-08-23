import test from 'node:test';
import assert from 'node:assert/strict';

import { createInitialState, reduce } from '../src/model.js';
import { copy, services } from '../src/content.js';

test('initial state prioritizes the home tab without an open panel', () => {
  assert.deepEqual(createInitialState(), {
    activeTab: 'home',
    activePanel: null,
    suggestionVisible: true,
  });
});

test('suggestion can be dismissed without changing the main navigation', () => {
  const next = reduce(createInitialState(), { type: 'dismiss-suggestion' });

  assert.equal(next.suggestionVisible, false);
  assert.equal(next.activeTab, 'home');
});

test('opening a service preserves the fixed home navigation', () => {
  const next = reduce(createInitialState(), {
    type: 'open-panel',
    panel: 'rides',
  });

  assert.equal(next.activePanel, 'rides');
  assert.equal(next.activeTab, 'home');
});

test('closing a panel keeps the previous suggestion choice', () => {
  const withoutSuggestion = reduce(createInitialState(), {
    type: 'dismiss-suggestion',
  });
  const withPanel = reduce(withoutSuggestion, {
    type: 'open-panel',
    panel: 'location',
  });

  assert.deepEqual(reduce(withPanel, { type: 'close-panel' }), {
    activeTab: 'home',
    activePanel: null,
    suggestionVisible: false,
  });
});

test('changing tabs closes a temporary panel', () => {
  const withPanel = reduce(createInitialState(), {
    type: 'open-panel',
    panel: 'food',
  });
  const next = reduce(withPanel, { type: 'set-tab', tab: 'activity' });

  assert.equal(next.activeTab, 'activity');
  assert.equal(next.activePanel, null);
});

test('core services keep the specified stable order', () => {
  assert.deepEqual(
    services.map(({ id }) => id),
    ['rides', 'food', 'delivery', 'pay', 'moto', 'freight', 'pix', 'all'],
  );
});

test('every stable service has explicit user-facing copy', () => {
  for (const service of services) {
    assert.ok(service.label.length > 0);
    assert.ok(service.title.length > 0);
    assert.ok(service.description.length > 0);
    assert.ok(service.action.length > 0);
  }
});

test('Portuguese and Chinese demos expose the same service architecture', () => {
  assert.deepEqual(
    copy.pt.services.map(({ id }) => id),
    copy.zh.services.map(({ id }) => id),
  );
});

test('Chinese demo translates every service and core home heading', () => {
  for (const service of copy.zh.services) {
    assert.ok(service.label.length > 0);
    assert.notEqual(service.title, copy.pt.services.find(({ id }) => id === service.id).title);
  }
  assert.equal(copy.zh.ui.homeTitle, '你现在需要什么？');
});
