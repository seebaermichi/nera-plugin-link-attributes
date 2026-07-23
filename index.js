import path from 'path'
import { load } from 'cheerio'
import { getConfig } from '@nera-static/plugin-utils'

function addAttributesToLinks(content, attributes) {
    const $ = load(content, null, false)

    $('a[href^="http"], a[href^="www"]').each((_, el) => {
        const $el = $(el)

        attributes.forEach((attr) => {
            // Split on the first `=` only. A value may itself contain `=` — a
            // query string, a `data-*` payload — and a plain `split('=')` drops
            // everything after the first one, silently corrupting the value.
            const eq = attr.indexOf('=')
            const name = eq === -1 ? attr : attr.slice(0, eq)
            const value = eq === -1 ? undefined : attr.slice(eq + 1)
            if (!$el.attr(name)) {
                $el.attr(name, value?.replace(/^"|"$/g, '') ?? true)
            }
        })
    })

    return $.html()
}

export function getMetaData(data) {
    // Config is read here rather than at module load so edits take effect
    // without a restart, and so tests can point at a temporary cwd.
    const config = getConfig(
        path.resolve(process.cwd(), 'config/link-attributes.yaml')
    )

    // `getConfig` returns {} for a missing file, so a plain `!config` check is
    // always false. Without a configured attribute list there is nothing to
    // add, so pass the pages through untouched rather than crashing.
    if (!config.attributes?.length) {
        return data.pagesData
    }

    return data.pagesData.map(({ content, meta }) => {
        return {
            content: addAttributesToLinks(content, config.attributes),
            meta,
        }
    })
}
