import path from 'path'
import { load } from 'cheerio'
import { getConfig } from '@nera-static/plugin-utils'

const HOST_CONFIG_PATH = path.resolve(
    process.cwd(),
    'config/link-attributes.yaml'
)

const config = getConfig(HOST_CONFIG_PATH)

function addAttributesToLinks(content) {
    const $ = load(content)

    $('a[href^="http"], a[href^="www"]').each((_, el) => {
        const $el = $(el)

        config.attributes.forEach((attr) => {
            const [name, value] = attr.split('=')
            if (!$el.attr(name)) {
                $el.attr(name, value?.replace(/^"|"$/g, '') ?? true)
            }
        })
    })

    return $.html()
}

export function getMetaData(data) {
    if (!config) {
        return data.pagesData
    }

    return data.pagesData.map(({ content, meta }) => {
        return {
            content: addAttributesToLinks(content),
            meta,
        }
    })
}
