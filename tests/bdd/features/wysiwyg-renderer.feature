Feature: WysiwygRenderer
  As a consumer of @contentveda/ui
  I want the WysiwygRenderer web component to safely render rich HTML content
  So that CMS-authored content displays with scoped typography

  Scenario: Renders semantic HTML content
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <h2>Premium Editorial Layout</h2><p>Some <strong>bold</strong> and <em>italic</em> text.</p> |
    Then it should render without any page errors
    And the component should contain a visible "h2" element
    And the component text should include "Premium Editorial Layout"
    And it should contain 1 elements matching "strong"
    And it should contain 1 elements matching "em"
    And the component should have no accessibility violations

  Scenario: Renders a social embed placeholder without throwing
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="youtube" data-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></div> |
    Then it should render without any page errors

  Scenario Outline: Plain media tags render as-is with no processing needed
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <markup> |
    Then it should render without any page errors
    And it should contain 1 elements matching "<selector>"

    Examples:
      | markup                                                              | selector                                    |
      | <img src="https://example.com/photo.jpg" alt="A photo" />           | img[src='https://example.com/photo.jpg']    |
      | <video src="https://example.com/clip.mp4" controls></video>         | video[src='https://example.com/clip.mp4']   |
      | <audio src="https://example.com/track.mp3" controls></audio>        | audio[src='https://example.com/track.mp3']  |

  Scenario: Renders a YouTube embed as a playable iframe (watch URL and short youtu.be URL both resolve)
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="youtube" data-url="https://youtu.be/dQw4w9WgXcQ"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "iframe"
    And attribute "src" on "iframe" should contain "youtube.com/embed/dQw4w9WgXcQ"

  Scenario: Renders a Vimeo embed as a playable iframe
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="vimeo" data-url="https://vimeo.com/76979871"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "iframe"
    And attribute "src" on "iframe" should contain "player.vimeo.com/video/76979871"

  Scenario: Renders an X/Twitter embed as a tweet blockquote
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="x" data-url="https://x.com/NASA/status/1684947936109961216"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "blockquote.twitter-tweet"
    And attribute "href" on "blockquote.twitter-tweet a" should contain "x.com/NASA"

  Scenario: Renders an Instagram embed as a permalink blockquote
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="instagram" data-url="https://www.instagram.com/p/C1AbCdEfGhI/"></div> |
    Then it should render without any page errors
    # Selector is attribute-based, not ".instagram-media" class-based: Instagram's
    # own real embed.js (loaded from a CDN once network access allows it to)
    # relabels the class to "instagram-media-registered" once it processes the
    # element, and that can race this assertion depending on network timing.
    # data-instgrm-permalink survives that relabeling either way.
    And it should contain 1 elements matching "[data-instgrm-permalink]"
    And attribute "data-instgrm-permalink" on "[data-instgrm-permalink]" should contain "instagram.com/p/C1AbCdEfGhI"

  Scenario: Renders a Facebook embed as an fb-post XFBML div
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="facebook" data-url="https://www.facebook.com/ContentVeda/posts/12345"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "div.fb-post"
    And attribute "data-href" on "div.fb-post" should contain "facebook.com/ContentVeda"

  Scenario: Renders a LinkedIn embed as an iframe with the post URL rewritten to the embed feed form
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="linkedin" data-url="https://www.linkedin.com/posts/company_update-123"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "iframe"
    And attribute "src" on "iframe" should contain "/embed/feed/update/"

  Scenario: An unsupported/unembeddable video falls back to a plain link instead of a blank box
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="youtube" data-url="https://www.youtube.com/not-a-real-path"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "a"
    And the component text should include "View Video on YouTube"

  Scenario: Renders a math formula as typeset KaTeX output, not raw LaTeX text
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <code class="cv-math-formula" data-formula="E = mc^2">E = mc^2</code> |
    Then it should render without any page errors
    # KaTeX is lazy-loaded from a CDN at render time, so this waits/retries
    # (unlike the immediate "it should contain N elements" count check)
    # rather than asserting the instant the mount promise resolves.
    And the component should contain a visible ".katex" element

  Scenario: A math formula whose LaTeX contains angle-bracket comparisons still renders as one formula, not broken markup
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <code class="cv-math-formula" data-formula="a \\lt b \\text{ and } c \\gt d">a &lt; b</code> |
    Then it should render without any page errors
    And the component should contain a visible ".katex" element
    And it should contain 0 elements matching "script"

  Scenario Outline: Renders every supported ContentVeda widget placeholder as its custom element
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-widget" data-widget="<widget_value>"></div> |
    Then it should render without any page errors
    And it should contain 1 elements matching "<widget_selector>"

    Examples:
      | widget_value | widget_selector  |
      | banner        | cv-banner        |
      | grid-banner   | cv-grid-banner   |
      | media-grid    | cv-media-grid    |
      | slider        | cv-slider        |

  Scenario: A widget type not present in widgetData is left unrendered, others in widgetData still render
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-widget" data-widget="banner"></div><div class="cv-widget" data-widget="slider"></div> |
      | widget-data  | {"banner":{}}                                                                                          |
    Then it should render without any page errors
    And it should contain 1 elements matching "cv-banner"
    And it should contain 0 elements matching "cv-slider"

  Scenario: A resized social embed keeps its author-set width instead of snapping back to full width
    Given I mount the "cv-wysiwyg-renderer" component as "WysiwygRenderer" with:
      | html-content | <div class="cv-social-embed" data-platform="youtube" data-url="https://youtu.be/dQw4w9WgXcQ" style="width: 480px; max-width: 480px;"></div> |
    Then it should render without any page errors
    And attribute "style" on "div.cv-social-embed" should contain "480px"
