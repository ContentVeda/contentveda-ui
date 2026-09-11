const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { bundleReactHarness, bundleSvelteHarness, bundleVueHarness, bundleSolidHarness, bundleAngularHarness } = require('./bundle');

// Converts Gherkin's kebab-case attribute table (image-url, is-loading, ...)
// into camelCase JS prop values for the React/Svelte targets, parsing
// JSON-looking values (config="{...}", items="[...]") and booleans/numbers
// the same way a real consumer's JSX/template props would be typed.
function attrsToProps(attrs) {
  const props = {};
  for (const [key, raw] of Object.entries(attrs)) {
    const camelKey = key.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
    const trimmed = raw.trim();
    let value = raw;
    if (trimmed === 'true') value = true;
    else if (trimmed === 'false') value = false;
    else if (/^-?\d+(\.\d+)?$/.test(trimmed)) value = Number(trimmed);
    else if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        value = JSON.parse(trimmed);
      } catch {
        // leave as raw string
      }
    }
    props[camelKey] = value;
  }
  return props;
}

class ContentVedaWorld extends World {
  constructor(options) {
    super(options);
    this.page = null;
    this.pageErrors = [];
    this.consoleErrors = [];
    this.mountTarget = 'webcomponent';
  }

  // Mounts a <tag attr="..."> web component into the harness page by
  // injecting its compiled module script + component-scoped CSS, then
  // creating the element with the given attributes. Waits for the custom
  // element to upgrade (connectedCallback run) before returning.
  async mountComponent(tag, pascalName, attrs) {
    this.mountTarget = 'webcomponent';
    const baseUrl = this.parameters.baseUrl;

    await this.page.goto(`${baseUrl}/tests/bdd/harness.html`, { waitUntil: 'load' });

    await this.page.evaluate(
      async ({ tag, pascalName, attrs, baseUrl }) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${baseUrl}/dist/styles/components/${pascalName}.css`;
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.type = 'module';
        script.src = `${baseUrl}/dist/webcomponent/dist/${pascalName}.js`;
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load ${pascalName}.js`));
        });

        await customElements.whenDefined(tag);

        const el = document.createElement(tag);
        el.id = 'subject';
        for (const [name, value] of Object.entries(attrs)) {
          el.setAttribute(name, value);
        }
        document.getElementById('mount').appendChild(el);
      },
      { tag, pascalName, attrs, baseUrl }
    );

    // Let attributeChangedCallback/connectedCallback settle and any RAF-deferred
    // layout (e.g. the canvas resize follow-up) run at least once.
    await this.page.waitForTimeout(300);
  }

  async _mountFrameworkHarness(frameworkName, pascalName, attrs, bundlerFn) {
    this.mountTarget = frameworkName;
    const baseUrl = this.parameters.baseUrl;
    const props = attrsToProps(attrs);

    await this.page.goto(`${baseUrl}/tests/bdd/harness.html`, { waitUntil: 'load' });

    const bundlePath = await bundlerFn(pascalName, props);

    await this.page.evaluate(
      ({ bundlePath, baseUrl, pascalName }) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${baseUrl}/dist/styles/components/${pascalName}.css`;
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.type = 'module';
        script.src = bundlePath;
        document.head.appendChild(script);

        return new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load harness module for ${pascalName}`));
        });
      },
      { bundlePath, baseUrl, pascalName }
    );

    await this.page.waitForTimeout(300);
  }

  async mountReactComponent(pascalName, attrs) {
    await this._mountFrameworkHarness('react', pascalName, attrs, bundleReactHarness);
  }

  async mountSvelteComponent(pascalName, attrs) {
    await this._mountFrameworkHarness('svelte', pascalName, attrs, bundleSvelteHarness);
  }

  async mountVueComponent(pascalName, attrs) {
    await this._mountFrameworkHarness('vue', pascalName, attrs, bundleVueHarness);
  }

  async mountSolidComponent(pascalName, attrs) {
    await this._mountFrameworkHarness('solid', pascalName, attrs, bundleSolidHarness);
  }

  async mountAngularComponent(pascalName, attrs) {
    await this._mountFrameworkHarness('angular', pascalName, attrs, bundleAngularHarness);
  }

  subject() {
    return this.mountTarget === 'webcomponent' ? this.page.locator('#subject') : this.page.locator('#mount > *').first();
  }
}

setWorldConstructor(ContentVedaWorld);
