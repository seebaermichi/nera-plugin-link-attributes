# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2026-07-23

### Fixed

-   **attribute values containing `=` are no longer truncated.** The parser
    split each entry on **every** `=` (`attr.split('=')`) and kept only the
    first two fields, so a value with a query string or `data-*` payload lost
    everything after its first `=` —
    `data-track="src=nav&type=ext"` became `data-track="src"`. It now splits on
    the first `=` only, so the whole value is preserved. Attributes whose value
    contains no `=` (including both shipped defaults) are unaffected

### Documentation

-   added a `## 🤝 Contributing` section linking the Nera contributing guide
-   Development section now uses `npx vitest run` and notes that `npm test` is
    watch mode
-   Compatibility now states the `@nera-static/plugin-utils` range (`^1.2.0`)

## [2.1.0] - 2026-07-20

### Added

-   `--force` flag on `nera-link-attributes`, to replace an existing
    `config/link-attributes.yaml` with a fresh copy of the shipped defaults.
    Without it the command still skips, as before, and now says so

### Fixed

-   **no longer crashes the build when `config/link-attributes.yaml` is
    absent.** The guard was `if (!config)`, but `getConfig` returns `{}` for a
    missing file, so it never fired and execution reached
    `config.attributes.forEach` with `attributes` undefined —
    `TypeError: Cannot read properties of undefined (reading 'forEach')`. It
    only threw once a page actually contained an external link, so it looked
    intermittent: a site built fine until someone added an outbound link.
    Pages now pass through unchanged when no attributes are configured, which
    is what the dead guard had always intended

### Changed

-   configuration is read inside `getMetaData` rather than at module load, so
    edits to `config/link-attributes.yaml` take effect without a restart
-   `@nera-static/plugin-utils` range raised from `^1.0.3` to `^1.2.0`, in line
    with the rest of the plugin fleet
-   **`engines.node` corrected from `>=18` to `>=20.18.1`.** This is not a drop
    of Node 18 support — it documents that support has not existed in practice.
    `cheerio` is a runtime dependency here, and every current cheerio 1.x pulls
    in an `undici` that needs a global `File` (Node 20+), so on Node 18 the
    plugin fails to load with `ReferenceError: File is not defined`. Nera
    catches that and continues, so the build *succeeds* with external links
    left unprocessed — a silent wrong result rather than an error. Verified on
    Node 18.20.8. Pinning cheerio does not avoid it: `cheerio@1.1.0` fails
    identically despite advertising `>=18.17`

### Documentation

-   publishing the config is now documented as **optional**, and the README no
    longer implies the build depends on it
-   fixed an invalid `npx` invocation; the command is `npx nera-link-attributes`

## [2.0.4] - 2025-07-21

### Fixed

-   🐛 Fixed runtime error due to missing `cheerio` dependency in consuming projects

### Changed

-   🔧 Moved `cheerio` from `devDependencies` to `dependencies` in `package.json` to ensure it's available at runtime

## [2.0.3] - 2025-07-21

### Added

-   Do not wrapp html, head and body around html automatically

### Changed

-   cheerio load

### Fixed

-   unwanted html head and body around html if not present

## [2.0.2] - 2025-07-21

### Added

-   config directory to files

### Changed

-   package.json files property

### Fixed

-   command to publish config file

## [2.0.1] - 2025-07-19

### Added

-   Complete CHANGELOG.md with full version history
-   Enhanced package.json keywords for better discoverability
-   Compatibility section in README.md

### Changed

-   Updated tests to use `getMetaData` instead of `getAppData`
-   Improved documentation structure and clarity
-   Enhanced development and deployment information

### Fixed

-   Corrected plugin API usage from `getAppData` to `getMetaData`
-   All tests now pass with the correct API

### Technical

-   Full compatibility with Nera v4.1.0+ plugin architecture
-   Optimized for parallel plugin loading performance
-   Enhanced test coverage and reliability

## [2.0.0] - 2025-07-19

### Breaking Changes

-   Updated for compatibility with Nera v4.0.0+
-   Requires Node.js >= 18
-   Migrated from `getAppData` to `getMetaData` API

### Added

-   Support for Nera's enhanced plugin architecture
-   Improved error handling and logging compatibility
-   Full compatibility with Nera's parallel plugin loading

### Changed

-   Updated dependencies to latest versions
-   Enhanced test coverage and reliability
-   Improved documentation and development setup

### Technical

-   Compatible with Nera's new plugin data merging system
-   Uses `getMetaData()` for processing page content
-   Enhanced development tooling with Husky and ESLint

## [1.x] - Previous Versions

### Features

-   External link attribute modification (target="\_blank", rel="noopener", etc.)
-   Cheerio-based HTML parsing and manipulation
-   Configurable attribute injection via YAML
-   Support for HTTP and www. link detection

### Configuration

-   YAML-based configuration system
-   Flexible attribute definition
-   Automatic config publishing utility
-   Integration with Nera plugin system

[2.0.1]: https://github.com/seebaermichi/nera-plugin-link-attributes/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/seebaermichi/nera-plugin-link-attributes/compare/v1.0.0...v2.0.0
