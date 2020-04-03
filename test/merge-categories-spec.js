const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');
const assert = require('assert');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          <!-- Content here -->
        </ul>
      </div>
    `;

    it("should return no <li>s for no categories", () => {
      //arrange
      const category = [];
      //act
      let test = mergeCategories(template, category, 'li');
      //assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<ul>');
      expect(test).to.contain('</ul>');
      expect(test).to.not.contain('<li>');
      expect(test).to.not.contain('<!-- Content here -->');
    });

    it("should return a single <li> for one category", () => {
      //arrange
      const category = ['school']
      //act
     let test = mergeCategories(template, category, 'li');
    //assert
    expect(test).to.contain('<div>');
    expect(test).to.contain('</div>');
    expect(test).to.contain('<ul>');
    expect(test).to.contain('</ul>');
    expect(test).to.contain('<li>school</li>')
    expect(test).to.not.contain('<!-- Content here -->');
    });

    it("should return an <li> for each category", () => {
      //arrange
      const category = ['school','work','joy'];
      //act
      let test = mergeCategories(template, category, 'li');
      //assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<ul>');
      expect(test).to.contain('</ul>');
      expect(test).to.contain('<li>school</li><li>work</li><li>joy</li>');
      expect(test).to.not.contain('<!-- Content here -->');

    });
  });

  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          <!-- Content here -->
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      const category = [];
      //act
      let test = mergeCategories(template, category, 'option');

      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<select>');
      expect(test).to.contain('</select>');
      expect(test).to.not.contain('<option>');
      expect(test).to.not.contain('</option>');
    });

    it("should return a single <option> for one category", () => {
      const category = ['school']
      //act
     let test = mergeCategories(template, category, 'option');
    //assert
    expect(test).to.contain('<option>school</option>');
    expect(test).to.contain('<div>');
    expect(test).to.contain('</div>');
    expect(test).to.contain('<select>');
    expect(test).to.contain('</select>');
    });

    it("should return an <option> for each category", () => {
      //arrange
      const category = ['school','work','joy'];
      //act
      let test = mergeCategories(template, category, 'option');
      //assert
      expect(test).to.contain('<option>school</option><option>work</option><option>joy</option>')
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<select>');
      expect(test).to.contain('</select>');
    });
  });
});
