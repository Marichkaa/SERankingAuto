Feature: Check domains with not logged in user

    I want to check domains with not logged in user

    @focus
    Scenario: Checking domains with not logged in user
        Given I visit the Reserch Competitor page
        And I check the the Competitive Research popup
        And I click the Learn more button
        And I check the the Guide No.1 popup
        And I go through the Guide No.1
        And I check that the user is not logged in
        When I analyse random domain at random country for the first time
        And I check the the Guide No.2 popup
        And I go through the Guide No.2
        And I close the What's new popup
        And I check that analysing attempt counted
        And I analyse random domains at random countries maximum available number of times
        And I analyse random domain at random country one more time
        Then I check that the Site analyse block elements are not exists
        And I check that Create first project block exists
        And I check that Login button exists
        And I check that Try for free button exists
