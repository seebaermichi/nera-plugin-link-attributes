import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { getMetaData } from '../index.js'

let cwd
let originalCwd

// The plugin reads config from process.cwd(). Running these in the repo picks
// up the package's *own* config/link-attributes.yaml — a file no consumer ever
// has, since the shipped config is documentation and is never merged into a
// site. That is precisely why the old suite was green while the plugin crashed
// for real users. Every test here starts from an empty temp cwd and opts in.
beforeEach(() => {
    originalCwd = process.cwd()
    cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'nera-link-attributes-'))
    process.chdir(cwd)
})

afterEach(() => {
    process.chdir(originalCwd)
    fs.rmSync(cwd, { recursive: true, force: true })
})

const writeConfig = (yaml) => {
    fs.mkdirSync(path.join(cwd, 'config'), { recursive: true })
    fs.writeFileSync(path.join(cwd, 'config/link-attributes.yaml'), yaml, 'utf-8')
}

const defaultConfig = () =>
    writeConfig('attributes:\n  - target="_blank"\n  - rel="noopener noreferrer"\n')

describe('getMetaData', () => {
    it('adds target="_blank" to external links', () => {
        defaultConfig()

        const result = getMetaData({
            pagesData: [
                {
                    content:
                        '<p>Visit <a href="http://example.com">Example</a></p>',
                    meta: { title: 'Example' },
                },
                {
                    content: '<a href="https://neraproject.dev">Nera</a>',
                    meta: { title: 'Nera' },
                },
                {
                    content: '<a href="/internal-page">Internal</a>',
                    meta: { title: 'Internal' },
                },
            ],
        })

        expect(result[0].content).toContain('target="_blank"')
        expect(result[1].content).toContain('target="_blank"')
        expect(result[2].content).not.toContain('target="_blank"')
    })

    it('does not overwrite existing attributes on external links', () => {
        defaultConfig()

        const result = getMetaData({
            pagesData: [
                {
                    content:
                        '<a href="http://example.com" target="_self">Custom Target</a>',
                    meta: {},
                },
                {
                    content:
                        '<a href="https://example.org" target="_blank">Already Blank</a>',
                    meta: {},
                },
            ],
        })

        expect(result[0].content).toContain('target="_self"')
        expect(result[1].content).toContain('target="_blank"')

        const targetAttrCount = (result[0].content.match(/target=/g) || [])
            .length
        expect(targetAttrCount).toBe(1)
    })

    it('adds attribute to www. links', () => {
        defaultConfig()

        const result = getMetaData({
            pagesData: [{ content: '<a href="www.example.com">WWW</a>', meta: {} }],
        })

        expect(result[0].content).toContain('target="_blank"')
    })

    it('applies every configured attribute', () => {
        defaultConfig()

        const result = getMetaData({
            pagesData: [
                { content: '<a href="https://example.com">Ext</a>', meta: {} },
            ],
        })

        expect(result[0].content).toContain('target="_blank"')
        expect(result[0].content).toContain('rel="noopener noreferrer"')
    })

    // Regression: getConfig returns {} for a missing file, so the old
    // `if (!config)` guard never fired and execution reached
    // `config.attributes.forEach` with attributes undefined. It only threw
    // once a page actually contained an external link, so it presented as
    // intermittent — a site worked until someone added an outbound link.
    describe('with no config/link-attributes.yaml present', () => {
        it('does not throw on a page containing an external link', () => {
            const pagesData = [
                {
                    content: '<p><a href="https://example.com">Ext</a></p>',
                    meta: { title: 'Ext' },
                },
            ]

            expect(() => getMetaData({ pagesData })).not.toThrow()
        })

        it('returns the pages unchanged', () => {
            const content = '<p><a href="https://example.com">Ext</a></p>'
            const pagesData = [{ content, meta: { title: 'Ext' } }]

            const result = getMetaData({ pagesData })

            expect(result).toHaveLength(1)
            expect(result[0].content).toBe(content)
            expect(result[0].meta).toEqual({ title: 'Ext' })
        })
    })

    it('passes pages through when attributes is an empty list', () => {
        writeConfig('attributes: []\n')

        const content = '<a href="https://example.com">Ext</a>'
        const result = getMetaData({ pagesData: [{ content, meta: {} }] })

        expect(result[0].content).toBe(content)
    })

    it('passes pages through when the config has no attributes key', () => {
        writeConfig('something_else: true\n')

        const content = '<a href="https://example.com">Ext</a>'
        const result = getMetaData({ pagesData: [{ content, meta: {} }] })

        expect(result[0].content).toBe(content)
    })

    // Regression: `attr.split('=')` dropped everything after the first `=`, so
    // a value containing `=` (a query string, a `data-*` payload) was silently
    // truncated — `data-track="src=nav&type=ext"` became `data-track="src"`.
    // Splitting on the first `=` only keeps the whole value intact.
    it('preserves attribute values that contain "="', () => {
        writeConfig(
            'attributes:\n' +
                '  - data-track="src=nav&type=ext"\n' +
                '  - aria-label="opens = external"\n'
        )

        const result = getMetaData({
            pagesData: [
                { content: '<a href="https://example.com">Ext</a>', meta: {} },
            ],
        })

        // `=` in the value is preserved; cheerio correctly HTML-escapes the `&`.
        expect(result[0].content).toContain('data-track="src=nav&amp;type=ext"')
        expect(result[0].content).toContain('aria-label="opens = external"')
    })

    it('picks up config edits without a restart', () => {
        writeConfig('attributes:\n  - rel="nofollow"\n')

        const result = getMetaData({
            pagesData: [
                { content: '<a href="https://example.com">Ext</a>', meta: {} },
            ],
        })

        expect(result[0].content).toContain('rel="nofollow"')
        expect(result[0].content).not.toContain('target="_blank"')
    })
})
