const LRUcache = require('./LRUcache');
test('LRUcache', () => {
    expect(LRUcache("A")).toBe("A");
});