const LRUcache = require('./LRUcache');
test('LRUcache', () => {
    expect(LRUcache(9, 10)).toBe(9);
});