import { BASE_URL } from "../helpers/const";

export const analyseDomainsPageSelectors = {
  guidePopup: ".intro-popup-content",
  guideHintPopup: ".guide-hint",
  whatsNewPopupBlock: ".features-guide-drawer__custom",
  limitsLockBlock: ".limits-lock-page",
  closeButton: ".close-btn",
  nextButton: ".se-button-2.next",
  blueButton: ".se-button-2_color-blue",
  arrowButton: ".se-button-2__arrow",
  competitorSearchButton: ".competitor-search__button",
  whatsNewPopupCloseButton: ".el-drawer__close-btn",
  regionSelectButton: ".region-select__button",
  loginButton: ".right-menu__btn a[href^='/login.html']",
  signupButton: ".right-menu__btn [href^='/sign_up.html']",
  modeDropdown: ".mode-dropdown.home-search__mode",
  competitorSearchInput: ".competitor-search__input div input",
  regionSelect: ".competitor-search__region-select",
  dropdown: ".se-dropdown-slot__menu",
  dropdownItem: ".se-dropdown-slot__menu .se-dropdown-slot__item",
  usedAnalysingAttempts: ".limit-line-box__value",
  maxAnalysingAttempts: ".limit-line-box__max",
};

export const analyseDomainsValues = {
  analyseDomainsPage: "/research.competitor.html/start",
  guideStepsToReadQty: 2,
  maxAnalysingAttempts: 3,
};

export const domainsList = [
  "cagematch.net",
  "apple.com",
  "www.asos.com",
  "bosch-home.com",
  "stackoverflow.co",
  "www.w3schools.com",
  "developer.mozilla.org",
  "hm.com",
  "wikipedia.org",
  "nationalgeographic.com",
  "docs.cypress.io",
  "app.letsdeel.com",
  "datatracker.ietf.org",
  "pinterest.com",
  "rezka.ag",
  "aws.amazon.com",
  "shikimori.one",
  "context.reverso.net",
  "semdoc.dp.ua",
  "liki24.com",
]; // is optional to add more

export const countriesList = [
  "Belarus",
  "Ukraine",
  "Russia",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Canada",
  "Spain",
  "Latvia",
  "USA",
  "Australia",
  "Denmark",
  "Belgium",
  "Japan",
  "Finland",
  "Norway",
  "Sweden",
  "Ireland",
  "New Zealand",
  "Austria",
  "Poland",
  "Greece",
  "Israel",
  "Hungary",
  "Bulgaria",
  "Switzerland",
  "Brazil",
  "India",
  "Liechtenstein",
  "Luxembourg",
  "Moldova",
  "Romania",
  "Slovakia",
  "Czechia",
  "Estonia",
  "Albania",
]; // is optional to add more

export class AnalyseDomaints {
  visitAnalyseDomainsPage() {
    cy.visit(`${BASE_URL}${analyseDomainsValues.analyseDomainsPage}`);
  }

  clickPopupButton(popupSelector, buttonSelector, isCloseBtn) {
    cy.get(popupSelector).find(buttonSelector).as("buttonToClick");

    cy.get("@buttonToClick").should("exist");
    if (!isCloseBtn) {
      cy.get("@buttonToClick").should("be.enabled");
    }
    cy.get("@buttonToClick").click();
  }

  changeInputValue(inputSelector, textToType) {
    cy.get(inputSelector)
      .should("exist")
      .and("be.enabled")
      .clear()
      .should("be.empty")
      .type(textToType)
      .should("have.value", textToType);
  }

  changeCountryDropdownValue(itemValue) {
    cy.get(analyseDomainsPageSelectors.regionSelect)
      .find(analyseDomainsPageSelectors.arrowButton)
      .should("exist")
      .click();

    cy.get(analyseDomainsPageSelectors.regionSelect)
      .find(analyseDomainsPageSelectors.dropdown)
      .should("exist");

    cy.get(analyseDomainsPageSelectors.regionSelect)
      .find(analyseDomainsPageSelectors.dropdownItem)
      .contains(itemValue)
      .should("exist")
      .click();
  }

  clickCompetitorSearchButton() {
    cy.get(analyseDomainsPageSelectors.competitorSearchButton)
      .should("exist")
      .and("be.enabled")
      .click();
  }

  checkAnalysingLimit(currentAttempts) {
    cy.get(analyseDomainsPageSelectors.maxAnalysingAttempts)
      .should("exist")
      .and("have.text", analyseDomainsValues.maxAnalysingAttempts);

    cy.get(analyseDomainsPageSelectors.usedAnalysingAttempts)
      .should("exist")
      .and("have.text", currentAttempts);

    if (analyseDomainsValues.maxAnalysingAttempts === currentAttempts) {
      cy.get(analyseDomainsPageSelectors.usedAnalysingAttempts).should(
        "have.text",
        analyseDomainsValues.maxAnalysingAttempts
      );
    }
  }
}
