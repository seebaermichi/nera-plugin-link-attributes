import { describe, it, expect } from 'vitest'
import { getAppData } from '../index.js'

describe('getAppData', () => {
    it('adds target="_blank" to external links', () => {
        const mockData = {
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
        }

        const result = getAppData(mockData)

        expect(result[0].content).toContain('target="_blank"')
        expect(result[1].content).toContain('target="_blank"')
        expect(result[2].content).not.toContain('target="_blank"')
    })

    it('does not overwrite existing attributes on external links', () => {
        const data = {
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
        }

        const result = getAppData(data)

        // Confirm existing values remain unchanged
        expect(result[0].content).toContain('target="_self"')
        expect(result[1].content).toContain('target="_blank"')

        // Confirm no duplicate target was added
        const targetAttrCount = (result[0].content.match(/target=/g) || [])
            .length
        expect(targetAttrCount).toBe(1)
    })

    it('adds attribute to www. links', () => {
        const data = {
            pagesData: [
                {
                    content: '<a href="www.example.com">WWW</a>',
                    meta: {},
                },
            ],
        }

        const result = getAppData(data)

        expect(result[0].content).toContain('target="_blank"')
    })
})
