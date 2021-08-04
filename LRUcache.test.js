const LRUcache = require('./LRUcache');
test('LRUcache', () => {
    expect(LRUcache("B", "dataA")).toBe("B");
});