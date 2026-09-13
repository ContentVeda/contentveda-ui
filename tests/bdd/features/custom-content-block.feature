Feature: CustomContentBlock
  As a consumer of @contentveda/ui
  I want the CustomContentBlock web component to render site-owner-defined custom
  content types (Strapi-style), matching the shape contentveda-public-api's
  PageService.resolvePage produces for a PageFloorEntry.kind === "custom" block
  So that pages using custom content types render correctly, not just built-in widgets

  Scenario: Renders generic field data for a standalone custom type (collection kind)
    Given I mount the "cv-custom-content-block" component as "CustomContentBlock" with:
      | content-type      | promoCard                                                                                          |
      | content-type-kind | collection                                                                                         |
      | entries            | [{"id":"1","name":"Diwali Promo","data":{"headline":"Festival Sale","discount":20}},{"id":"2","name":"Winter Promo","data":{"headline":"Winter Sale","discount":10}}] |
    Then it should render without any page errors
    And the component text should include "Diwali Promo"
    And the component text should include "Festival Sale"
    And the component text should include "Winter Promo"
    And the component should have no accessibility violations

  Scenario: Renders a base-widget-typed block's media and text overlays
    Given I mount the "cv-custom-content-block" component as "CustomContentBlock" with:
      | content-type       | heroPromo                                                                       |
      | content-type-kind  | single                                                                          |
      | media               | {"type":"image","url":"/assets/img/placeholder-08.svg"}                        |
      | text-overlays       | [{"id":"t1","type":"title","text":"Custom Hero Title"},{"id":"t2","type":"subtitle","text":"Custom Hero Subtitle"}] |
    Then it should render without any page errors
    And the component text should include "Custom Hero Title"
    And the component text should include "Custom Hero Subtitle"
    And the component should have no accessibility violations
