import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps";

import {
  checkElementState,
  getRandomArrayItem,
} from "../../helpers/commonFunctions";
import {
  analyseDomainsPageSelectors,
  analyseDomainsValues,
  domainsList,
  countriesList,
  AnalyseDomaints,
} from "../../classes/analyseDomainsPage";

const analyseDomains = new AnalyseDomaints();

Given("I visit the Reserch Competitor page", () => {
  analyseDomains.visitAnalyseDomainsPage();
});

And("I check the the Competitive Research popup", () => {
  checkElementState(analyseDomainsPageSelectors.guidePopup, "exist"); //check if the popup with guide exists
});

And("I click the Learn more button", () => {
  analyseDomains.clickPopupButton(
    analyseDomainsPageSelectors.guidePopup,
    analyseDomainsPageSelectors.blueButton
  ); //know more button check and click it
});

And("I check the the Guide No.1 popup", () => {
  checkElementState(analyseDomainsPageSelectors.guideHintPopup, "exist"); //check if the popup with hint exists
});

And("I go through the Guide No.1", () => {
  analyseDomains.clickPopupButton(
    analyseDomainsPageSelectors.guideHintPopup,
    analyseDomainsPageSelectors.nextButton
  ); //start work button check and click it
});

And("I check that the user is not logged in", () => {
  checkElementState(analyseDomainsPageSelectors.loginButton, "exist"); //check that login button exists
});

When("I analyse random domain at random country for the first time", () => {
  let randomDomain = getRandomArrayItem(domainsList); //random domain from the array with domains
  let randomCountry = getRandomArrayItem(countriesList); //random country from the array with countries

  analyseDomains.changeInputValue(
    analyseDomainsPageSelectors.competitorSearchInput,
    randomDomain
  );
  analyseDomains.changeCountryDropdownValue(randomCountry);

  analyseDomains.clickCompetitorSearchButton();
});

And("I check the the Guide No.2 popup", () => {
  checkElementState(analyseDomainsPageSelectors.guideHintPopup, "exist"); //check if the popup with hint exists
});

And("I go through the Guide No.2", () => {
  Cypress._.times(analyseDomainsValues.guideStepsToReadQty, () => {
    //start work button check and click it for sertain amount of times
    analyseDomains.clickPopupButton(
      analyseDomainsPageSelectors.guideHintPopup,
      analyseDomainsPageSelectors.nextButton
    );
  });
  analyseDomains.clickPopupButton(
    analyseDomainsPageSelectors.guideHintPopup,
    analyseDomainsPageSelectors.closeButton,
    true
  ); //close button check and click it
});

And("I close the What's new popup", () => {
  checkElementState(analyseDomainsPageSelectors.whatsNewPopupBlock, "exist"); //check if the popup with hint exists

  analyseDomains.clickPopupButton(
    analyseDomainsPageSelectors.whatsNewPopupBlock,
    analyseDomainsPageSelectors.whatsNewPopupCloseButton
  ); //check the close button at popup and click it

  checkElementState(
    analyseDomainsPageSelectors.whatsNewPopupBlock,
    "not.exist"
  ); //check if the What's new popup isn't exist
});

And("I check that analysing attempt counted", () => {
  analyseDomains.checkAnalysingLimit(1); //check if the analyse attempt counted
});

And(
  "I analyse random domains at random countries maximum available number of times",
  () => {
    Cypress._.times(analyseDomainsValues.maxAnalysingAttempts - 1, (i) => {
      let randomDomain = getRandomArrayItem(domainsList); //random domain from the array with domains
      let randomCountry = getRandomArrayItem(countriesList); //random country from the array with countries

      analyseDomains.changeInputValue(
        analyseDomainsPageSelectors.competitorSearchInput,
        randomDomain
      );
      analyseDomains.changeCountryDropdownValue(randomCountry);

      analyseDomains.clickCompetitorSearchButton();

      checkElementState(
        analyseDomainsPageSelectors.whatsNewPopupBlock,
        "not.exist"
      ); //check if the What's new popup isn't exist

      analyseDomains.checkAnalysingLimit(i + 2); //check the analyse attempts, starting from the second attempt
    });
  }
);

And("I analyse random domain at random country one more time", () => {
  let randomDomain = getRandomArrayItem(domainsList); //random domain from the array with domains
  let randomCountry = getRandomArrayItem(countriesList); //random country from the array with countries

  analyseDomains.changeInputValue(
    analyseDomainsPageSelectors.competitorSearchInput,
    randomDomain
  );
  analyseDomains.changeCountryDropdownValue(randomCountry);

  analyseDomains.clickCompetitorSearchButton();
});

Then("I check that the Site analyse block elements are not exists", () => {
  checkElementState(analyseDomainsPageSelectors.modeDropdown, "not.exist"); //check the mode picking dropdown

  checkElementState(
    analyseDomainsPageSelectors.regionSelectButton,
    "not.exist"
  ); //check the region selecting button

  checkElementState(
    analyseDomainsPageSelectors.competitorSearchInput,
    "not.exist"
  ); //check the domaimn input

  checkElementState(
    analyseDomainsPageSelectors.competitorSearchButton,
    "not.exist"
  ); //check the mode picking button
});

And("I check that Create first project block exists", () => {
  checkElementState(analyseDomainsPageSelectors.limitsLockBlock, "exist"); //check the mode picking button
});

And("I check that Login button exists", () => {
  checkElementState(analyseDomainsPageSelectors.loginButton, "exist"); //check that login button exists
});

And("I check that Try for free button exists", () => {
  checkElementState(analyseDomainsPageSelectors.signupButton, "exist");
  //check that signup button exists
});
