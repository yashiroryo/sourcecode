const input = require('./input');
test('input function', () => {
    expect(input("B", "dataA")).toBe("B");
});