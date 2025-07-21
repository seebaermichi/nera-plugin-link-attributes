# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
