Feature: Recipe Collection Display

  As a user
  I want to see a collection of recipes displayed on the page
  So that I can browse and select a recipe to view or prepare

  Background:
    Given the database contains the following recipes:
      | id | name           | description          |
      | 1  | Spaghetti      | A classic Italian dish |
      | 2  | Pancakes       | Fluffy breakfast pancakes |
      | 3  | Caesar Salad   | Fresh salad with Caesar dressing |

  Scenario: Display a list of recipes
    When I navigate to the recipe collection page
    Then I should see a list of recipes displayed
    And each recipe should show its name and description

  Scenario: No recipes available
    Given the database contains no recipes
    When I navigate to the recipe collection page
    Then I should see a message saying "No recipes available"
