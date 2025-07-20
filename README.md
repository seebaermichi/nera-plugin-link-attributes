# @nera-static/plugin-link-attributes

A plugin for the [Nera](https://github.com/seebaermichi/nera) static site generator that automatically adds attributes to external links (e.g. `target="_blank"` and `rel="noopener noreferrer"`). Ensures external links are secure, accessible, and SEO-friendly.

## ✨ Features

- Automatically adds attributes to links starting with `http` or `www`
- Prevents overwriting existing attributes
- Uses a safe and structured HTML parser (Cheerio)
- Configuration via `config/link-attributes.yaml`
- Lightweight and zero-runtime overhead
- Full compatibility with Nera v4.1.0+

## 🚀 Installation

Install the plugin in your Nera project:

```bash
npm install @nera-static/plugin-link-attributes
```

Then publish the default configuration:

```bash
npx @nera-static/plugin-link-attributes run publish-config
```

This creates:

```
config/
└── link-attributes.yaml
```

Nera will automatically detect the plugin and apply the transformations during the build.

## ⚙️ Configuration

Configure link behavior via `config/link-attributes.yaml`:

```yaml
attributes:
  - target="_blank"
  - rel="noopener noreferrer"
```

### Attribute notes

- `target="_blank"`: Opens external links in a new tab.
- `rel="noopener noreferrer"`: Improves security and prevents referrer leakage.
- You can define any valid HTML attributes (e.g., `class="external"`, `aria-label="..."`).

The plugin will not overwrite existing attributes on links.

## 🧩 Usage

No usage setup required – all external links in rendered HTML will be automatically processed during the build. Internal links are left untouched.

### Before

```html
<a href="https://example.com">Example</a>
```

### After

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Example</a>
```

## 🧪 Development

```bash
npm install
npm test
npm run lint
```

Tests use [Vitest](https://vitest.dev) and validate:

- Attributes are added only to external links
- Internal or malformed links are ignored
- Existing attributes are preserved
- Output HTML remains valid and clean

## 🧑‍💻 Author

Michael Becker
[https://github.com/seebaermichi](https://github.com/seebaermichi)

## 🔗 Links

- [Plugin Repository](https://github.com/seebaermichi/nera-plugin-link-attributes)
- [NPM Package](https://www.npmjs.com/package/@nera-static/plugin-link-attributes)
- [Nera Static Site Generator](https://github.com/seebaermichi/nera)

## 🧩 Compatibility

- **Nera**: v4.1.0+
- **Node.js**: >= 18
- **Plugin API**: Uses `getMetaData()` for HTML transformation

## 📦 License

MIT
