# @nera-static/plugin-link-attributes

A plugin for the [Nera](https://github.com/seebaermichi/nera) static site generator that automatically adds attributes to external links (e.g. `target="_blank"` and `rel="noopener noreferrer"`). Ensures external links are secure and SEO-friendly.

## ✨ Features

-   Automatically adds attributes to links starting with `http` or `www`
-   Prevents overwriting existing attributes
-   Uses a safe and structured HTML parser (Cheerio)
-   Configuration via `link-attributes.yaml`
-   Lightweight and zero-runtime

## 🚀 Installation

Install the plugin in your Nera project:

```bash
npm install @nera-static/plugin-link-attributes
```

Then copy the default configuration into your project:

```bash
npx @nera-static/plugin-link-attributes run publish-config
```

This creates a file at:

```
config/
└── link-attributes.yaml
```

Nera will automatically detect the plugin and apply the transformations during the build.

## ⚙️ Configuration

Example `config/link-attributes.yaml`:

```yaml
attributes:
    - target="_blank"
    - rel="noopener noreferrer"
```

-   `target="_blank"`: Opens external links in a new tab.
-   `rel="noopener noreferrer"`: Prevents security vulnerabilities and hides referrer.
-   You can add any other valid HTML attributes like `class="external"` or `aria-label="..."`.

The plugin will not overwrite existing attributes on links.

## 🧪 Development

```bash
npm install
npm test
```

Tests use [Vitest](https://vitest.dev) and validate that:

-   Attributes are added only to external links
-   Existing attributes are preserved
-   Invalid or internal links are skipped

## 🧑‍💻 Author

Michael Becker  
[https://github.com/seebaermichi](https://github.com/seebaermichi)

## 🔗 Links

-   [Plugin Repository](https://github.com/seebaermichi/nera-plugin-link-attributes)
-   [NPM Package](https://www.npmjs.com/package/@nera-static/plugin-link-attributes)
-   [Nera Static Site Generator](https://github.com/seebaermichi/nera)

## 📦 License

MIT
