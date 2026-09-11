Feature: Angular target
  As a consumer of @contentveda/ui
  I want to know the Angular target exists

  Scenario: Banner mock
    Given I mount the "Banner" Angular component with:
      | title  | Summer Collection 2026            |
    Then it should render without any page errors
    And the component should have no accessibility violations
