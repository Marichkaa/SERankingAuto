export const checkElementState = (elementSelector, elementState) => {
  cy.get(elementSelector).should(elementState);
};

export const getRandomArrayItem = (arr) => {
  const arrLength = arr.length;
  const randomIndex = Cypress._.random(0, arr.length - 1);

  return arr[randomIndex];
};
