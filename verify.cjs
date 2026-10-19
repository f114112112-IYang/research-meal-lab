const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const context = { module: { exports: {} } };
vm.runInNewContext(script, context);
const { STORES, DEMO_STORES, isOpen, combinations, choose, taiwanTime } = context.module.exports;
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS ' + name); }
const base = { mode: 'micro', budget: 180, area: 'all', onlyOpen: true, excludeIssue: true, excludeUnknown: false, day: 1, minute: 720 };
test('Taiwan time is independent of host time zone', () => {
  const time = taiwanTime(new Date('2026-10-18T23:30:00Z'));
  assert.equal(time.day, 1); assert.equal(time.minute, 450);
});
test('Opening boundary included, lunch closing boundary excluded', () => {
  const store = STORES.find(s => s.id === 'magua');
  assert.equal(isOpen(store, 1, 660), true);
  assert.equal(isOpen(store, 1, 840), false);
  assert.equal(isOpen(store, 1, 900), false);
  assert.equal(isOpen(store, 1, 1020), true);
  assert.equal(isOpen(store, 6, 720), false);
});
test('Unknown hours remain unknown and are not recommended as open', () => {
  const unknown = STORES.find(s => !s.hours);
  assert.equal(isOpen(unknown, 1, 720), null);
  assert.equal(combinations(STORES, { ...base, mode: 'eco', budget: 1000 }).some(c => c.main.store.id === unknown.id), false);
});
test('Overnight hours carry into next day correctly', () => {
  const overnight = { hours: { days: [1], slots: [['22:00', '02:00']] } };
  assert.equal(isOpen(overnight, 1, 1380), true);
  assert.equal(isOpen(overnight, 2, 60), true);
  assert.equal(isOpen(overnight, 1, 60), false);
  assert.equal(isOpen(overnight, 2, 120), false);
});
test('Micro mode includes one main and one drink within combined budget', () => {
  const pool = combinations(STORES, base);
  assert.ok(pool.length > 0);
  assert.ok(pool.every(c => c.main.store.type === 'main' && c.drink.store.type === 'drink' && c.total <= 180));
});
test('ECO mode is a main only and the 85+35 micro pairing fits', () => {
  assert.ok(combinations(STORES, { ...base, mode: 'eco', budget: 120 }).every(c => !c.drink && c.total <= 120));
  assert.ok(combinations(STORES, { ...base, budget: 120 }).some(c => c.total === 120));
});
test('Luxury mode upgrades the main and still respects total budget', () => {
  const pool = combinations(STORES, { ...base, mode: 'luxury', budget: 400 });
  assert.ok(pool.length > 0);
  assert.ok(pool.every(c => c.main.item.price >= 180 && c.drink && c.total <= 400));
});
test('Strict unknown-food-safety exclusion produces empty real results', () => {
  assert.equal(combinations(STORES, { ...base, budget: 2000, excludeUnknown: true }).length, 0);
});
test('Fictional violation fixtures excluded and allowed only when requested', () => {
  const safe = combinations(DEMO_STORES, { ...base, mode: 'eco' });
  assert.ok(safe.every(c => c.main.store.safety !== 'issue'));
  const allowed = combinations(DEMO_STORES, { ...base, mode: 'eco', excludeIssue: false });
  assert.ok(allowed.some(c => c.main.store.safety === 'issue'));
});
test('No hidden fallback on impossible budget, area or late-night conditions', () => {
  assert.equal(combinations(STORES, { ...base, budget: 30 }).length, 0);
  assert.equal(combinations(STORES, { ...base, area: 'gate' }).length, 0);
  assert.equal(combinations(STORES, { ...base, minute: 180 }).length, 0);
});
test('Reroll avoids immediately repeating when alternatives exist', () => {
  const pool = combinations(STORES, base);
  for (let i = 0; i < 40; i++) assert.notEqual(choose(pool, pool[0].key, [], false).key, pool[0].key);
});
test('Recent history preference falls back without relaxing hard filters', () => {
  const pool = combinations(DEMO_STORES, base);
  const selected = choose(pool, '', ['demo-ok'], true);
  assert.ok(selected.usedRecentFallback);
  assert.ok(selected.total <= base.budget);
});
test('All modes and weekly slots preserve hard constraints', () => {
  for (const stores of [STORES, DEMO_STORES]) for (const mode of ['eco', 'micro', 'luxury'])
    for (let day = 0; day < 7; day++) for (const minute of [0, 360, 720, 840, 1080, 1260, 1380])
      for (const budget of [30, 120, 180, 400]) for (const excludeUnknown of [false, true]) {
        const f = { ...base, mode, day, minute, budget, excludeUnknown };
        for (const c of combinations(stores, f)) {
          assert.ok(c.total <= budget);
          for (const part of [c.main, c.drink].filter(Boolean)) {
            assert.equal(isOpen(part.store, day, minute), true);
            assert.notEqual(part.store.safety, 'issue');
            if (excludeUnknown) assert.notEqual(part.store.safety, 'unknown');
          }
        }
      }
});
assert.equal((html.match(/<script>/g) || []).length, 1);
assert.ok(!html.includes('<script src='));
console.log(`\n${checks} groups passed. Single HTML, no external JavaScript dependencies.`);
