Feature: RichTextEditor
  As a consumer of @contentveda/ui
  I want the RichTextEditor web component to render its toolbar and editable content
  So that content authors can format text, insert media, and see it reflected immediately

  Scenario: Renders initial content and the configured toolbar
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Hello editor</p>                                      |
      | config          | {"toolbar":["bold","italic","image","video"]}            |
    Then it should render without any page errors
    And the component should contain a visible ".wysiwyg-content" element
    And the component text should include "Hello editor"
    And the component should contain a visible "button[title='Bold']" element
    And the component should contain a visible "button[title='Image']" element
    And the component should have no accessibility violations

  Scenario: The Insert dropdown offers a Video option regardless of toolbar config
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Hello editor</p> |
      | config          | {"toolbar":[]}       |
    When I click the toolbar button titled "Insert Options"
    Then it should render without any page errors
    And the component should contain a visible "button.cv-insert-item:has-text('Video')" element

  Scenario: Inserting an image via the prompt fallback lands in the content
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p>                       |
      | config          | {"toolbar":["image"]}                          |
    And I will answer any prompt dialog with "https://example.com/photo.jpg"
    When I click into the editable content
    And I click the toolbar button titled "Image"
    Then it should render without any page errors
    And it should contain 1 elements matching "img[src='https://example.com/photo.jpg']"

  Scenario: Inserting a video via the prompt fallback lands in the content
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p> |
      | config          | {"toolbar":[]}            |
    And I will answer any prompt dialog with "https://example.com/clip.mp4"
    When I click into the editable content
    And I click the toolbar button titled "Insert Options"
    And I click the button labeled "Video"
    Then it should render without any page errors
    And it should contain 1 elements matching "video[src='https://example.com/clip.mp4']"

  Scenario: Inserting a YouTube URL via the Video menu item produces a social embed, not a <video> tag
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p> |
      | config          | {"toolbar":[]}            |
    And I will answer any prompt dialog with "https://youtu.be/dQw4w9WgXcQ"
    When I click into the editable content
    And I click the toolbar button titled "Insert Options"
    And I click the button labeled "Video"
    Then it should render without any page errors
    And it should contain 1 elements matching "div.cv-social-embed[data-platform='youtube']"
    And attribute "data-url" on "div.cv-social-embed" should contain "dQw4w9WgXcQ"
    And it should contain 0 elements matching "video"

  Scenario: Inserting a Vimeo URL via the Video menu item produces a social embed
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p> |
      | config          | {"toolbar":[]}            |
    And I will answer any prompt dialog with "https://vimeo.com/76979871"
    When I click into the editable content
    And I click the toolbar button titled "Insert Options"
    And I click the button labeled "Video"
    Then it should render without any page errors
    And it should contain 1 elements matching "div.cv-social-embed[data-platform='vimeo']"

  Scenario Outline: Embedding a social post for every supported platform via the Social Media Embed modal
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p>                        |
      | config          | {"toolbar":["social"]}                          |
    When I click into the editable content
    And I click the toolbar button titled "Social Media Embed"
    And I select "<platform_label>" from the "Platform" dropdown
    And I fill the "Social Link URL" field with "<url>"
    And I click the button labeled "Embed Post"
    Then it should render without any page errors
    And it should contain 1 elements matching "div.cv-social-embed[data-platform='<platform_value>']"
    And attribute "data-url" on "div.cv-social-embed" should contain "<url_fragment>"

    Examples:
      | platform_label | platform_value | url                                                | url_fragment  |
      | YouTube         | youtube         | https://www.youtube.com/watch?v=dQw4w9WgXcQ        | dQw4w9WgXcQ   |
      | Vimeo           | vimeo           | https://vimeo.com/76979871                         | 76979871      |
      | X (Twitter)     | x               | https://x.com/NASA/status/1684947936109961216      | NASA          |
      | Instagram       | instagram       | https://www.instagram.com/p/C1AbCdEfGhI/           | instagram.com |
      | Facebook        | facebook        | https://www.facebook.com/ContentVeda/posts/12345   | facebook.com  |
      | LinkedIn        | linkedin        | https://www.linkedin.com/posts/company_update-123  | linkedin.com  |

  Scenario: Inserting a math formula wraps it in a canonical, escaped placeholder
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p> |
      | config          | {"toolbar":[]}            |
    And I will answer any prompt dialog with "E = mc^2 & <b>bold</b>"
    When I click into the editable content
    And I click the toolbar button titled "Formula"
    Then it should render without any page errors
    And it should contain 1 elements matching "code.cv-math-formula"
    And attribute "data-formula" on "code.cv-math-formula" should contain "E = mc^2"
    And the saved content should not include "<b>bold</b>"

  Scenario Outline: Inserting every supported UI widget via the Add UI Widget modal
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p>       |
      | config          | {"toolbar":["addWidget"]}      |
    When I click into the editable content
    And I click the toolbar button titled "Add UI Widget"
    And I select "<widget_label>" from the "Select ContentVeda Widget" dropdown
    And I click the button labeled "Insert Widget"
    Then it should render without any page errors
    And it should contain 1 elements matching "div.cv-widget[data-widget='<widget_value>']"

    Examples:
      | widget_label           | widget_value |
      | Banner Component        | banner       |
      | Grid Banner Component    | grid-banner  |
      | Media Grid Component     | media-grid   |
      | Slider Carousel          | slider       |

  Scenario: Inserting a hyperlink via the Link modal
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p>  |
      | config          | {"toolbar":["link"]}      |
    When I click into the editable content
    And I click the toolbar button titled "Link"
    And I fill the "Hyperlink URL" field with "https://contentveda.com"
    And I click the button labeled "Insert Link"
    Then it should render without any page errors
    And it should contain 1 elements matching "a[href='https://contentveda.com']"

  Scenario: Inserting a call-to-action button via the Insert Button modal
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p> |
      | config          | {"toolbar":[]}            |
    When I click into the editable content
    And I click the toolbar button titled "Insert Options"
    And I click the button labeled "Button"
    And I fill the "Target URL" field with "https://contentveda.com/pricing"
    And I click the button labeled "Insert"
    Then it should render without any page errors
    And it should contain 1 elements matching "a.cv-btn[href='https://contentveda.com/pricing']"

  Scenario: Inserting a table via the Table modal
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p>   |
      | config          | {"toolbar":["table"]}      |
    When I click into the editable content
    And I click the toolbar button titled "Table"
    And I click the button labeled "Insert Table"
    Then it should render without any page errors
    And it should contain 1 elements matching "table"
    And it should contain 3 elements matching "table tbody tr"

  Scenario: Inserting a checklist
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start typing here</p> |
      | config          | {"toolbar":[]}            |
    When I click into the editable content
    And I click the toolbar button titled "Task List"
    Then it should render without any page errors
    And it should contain 1 elements matching "ul.task-list"
    And it should contain 1 elements matching "ul.task-list input[type='checkbox']"

  Scenario: Toggling between visual and source view never shows both panes at once
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Hello editor</p>     |
      | config          | {"toolbar":["source"]}  |
    Then exactly one of the visual editor or the source view should be visible
    When I click the toolbar button titled "View HTML Source Code"
    Then exactly one of the visual editor or the source view should be visible
    And the component should contain a visible "textarea" element
    When I click the toolbar button titled "View HTML Source Code"
    Then exactly one of the visual editor or the source view should be visible
    And the component should contain a visible ".wysiwyg-content" element

  Scenario: Resizing an inserted image persists its width into the saved content
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start</p><img src="https://example.com/photo.jpg" alt="resizable" style="width: 300px;" /> |
      | config          | {"toolbar":[]}                                                                                  |
    When I click into the editable content
    And I click on "img[alt='resizable']"
    And I drag the resize handle right by 120px and down by 60px
    Then it should render without any page errors
    And the saved content should include "img"
    But the saved content should not include "cv-resizing-selected"

  Scenario: Resizing a social embed persists its width for the renderer to honor
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Start</p><div class="cv-social-embed" data-platform="youtube" data-url="https://youtu.be/dQw4w9WgXcQ" contenteditable="false" style="width: 400px;">[Embedded YOUTUBE Post: https://youtu.be/dQw4w9WgXcQ]</div> |
      | config          | {"toolbar":[]}                                                                                                                                                                                                     |
    When I click into the editable content
    And I click on "div.cv-social-embed"
    And I drag the resize handle right by 100px and down by 0px
    Then it should render without any page errors
    And the saved content should include "width: 500px"

  Scenario: Applying highlight or text color does not freeze the editor or break insert modals
    Given I mount the "cv-rich-text-editor" component as "RichTextEditor" with:
      | initial-content | <p>Color test line</p>                               |
      | config          | {"toolbar":["foreColor","backColor","table","link"]} |
    When I click into the editable content
    And I apply the "Highlight" color "#ffeb3b"
    Then it should render without any page errors
    And attribute "contenteditable" on ".wysiwyg-content" should contain "true"
    When I click the toolbar button titled "Table"
    Then the component should contain a visible ".fixed.inset-0" element
    When I click the button labeled "Cancel"
    Then the component should not contain a ".fixed.inset-0" element
    When I apply the "Text" color "#ff0000"
    Then it should render without any page errors
    And attribute "contenteditable" on ".wysiwyg-content" should contain "true"
    When I click the toolbar button titled "Table"
    And I click the button labeled "Insert Table"
    Then it should render without any page errors
    And it should contain 1 elements matching "table"

