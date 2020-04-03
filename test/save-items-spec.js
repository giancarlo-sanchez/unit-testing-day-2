const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = ['Cat 3', 'Cat 2'];
    const newItem = 'Cat 1';
    const result = saveItems(items, newItem);
    expect(result).to.contain(newItem);
  });

  it('makes sure the result and the original are different', () => {
    const items = ['Cat 3', 'Cat 2'];
    const result = saveItems(items, 'Cat 1');
    expect(result).to.not.equal(items);
  });
});
