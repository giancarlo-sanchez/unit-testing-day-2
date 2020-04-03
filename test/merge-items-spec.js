const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
  <table>
    <tbody>
      {{#each items}}
        <tr>
          <td>{{ add @index 1 }}</td>
          <td>{{ title }}</td>
          <td>{{ category }}</td>
          <td>
            {{#if isComplete}}
            {{else}}
              <form method="POST" action="/items/{{ add @index 1 }}">
                <button class="pure-button">Complete</button>
              </form>
            {{/if}}
          </td>
        </tr>
      {{/each}}
    </tbody>
  </table>
`;
  it("should return no <tr>s and no <td>s for no items", () => {
    //Arrange
    let items = [];
    //Act
    let mergedItems = mergeItems(template,items);
    //Assert
    expect(mergedItems).to.contain('<table>','</table>','<tbody>','</tbody>');
    expect(mergedItems).to.not.contain('<tr>','</tr>','<td>','</td>');
    expect(mergedItems).to.not.contain("<!-- Content here -->");
  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    //Arrange
    let items = [{title: 'Title 1', category: 'Category 1'}];
    //Act
    let mergedItems = mergeItems(template,items);

    //Assert
    expect(mergedItems).to.contain('<table>','</table>','<tbody>','</tbody>');
    expect(mergedItems).to.contain('<tr>','</tr>');
    expect(mergedItems).to.contain('<td>Title 1</td>');
    expect(mergedItems).to.contain('<td>Category 1</td>');
    expect(mergedItems).to.contain('<form method="POST" action="/items/1">');
    expect(mergedItems).to.not.contain("<!-- Content here -->");
  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    //Arrange
    let items = [
      {title: 'Title 1', category: 'Category 1',isComplete: true},
    {title: 'Title 2', category: 'Category 2', isComplete: false}
  ];
    //Act
    let mergedItems = mergeItems(template,items);

    //Assert
    expect(mergedItems).to.contain('<table>','</table>','<tbody>','</tbody>');
    expect(mergedItems).to.contain('<tr>','</tr>');
    expect(mergedItems).to.contain('<td>Title 1</td>');
    expect(mergedItems).to.contain('<td>Category 1</td>');
    expect(mergedItems).to.not.contain('<form method="POST" action="/items/1">');
    expect(mergedItems).to.not.contain("<!-- Content here -->");
  });

  it("should return three <tr>s for three items", () => {
    //Arrange
    let items = [
      {title: 'Title 1', category: 'Category 1'},
      {title: 'Title 2', category: 'Category 2'},
      {title: 'Title 3', category: 'Category 3'}
  ];
    //Act
    let mergedItems = mergeItems(template,items);
    //Assert
    expect(mergedItems).to.contain('<table>','</table>','<tbody>','</tbody>');
    expect(mergedItems).to.contain('<tr>','</tr>');
    expect(mergedItems).to.contain('<td>Title 1</td>');
    expect(mergedItems).to.contain('<td>Category 1</td>');
    expect(mergedItems).to.contain('<form method="POST" action="/items/1">');
    expect(mergedItems).to.contain('<td>Title 2</td>');
    expect(mergedItems).to.contain('<td>Category 2</td>');
    expect(mergedItems).to.contain('<form method="POST" action="/items/2">');
    expect(mergedItems).to.contain('<td>Title 3</td>');
    expect(mergedItems).to.contain('<td>Category 3</td>');
    expect(mergedItems).to.contain('<form method="POST" action="/items/3">');
  expect(mergedItems).to.not.contain("<!-- Content here -->");
  });
});
