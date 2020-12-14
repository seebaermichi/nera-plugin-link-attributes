const { getConfig } = require('../plugin-helper')

module.exports = (() => {
    const config = getConfig(`${__dirname}/config/link-attributes.yaml`)

    const setTargetBlank = content => {
        const regex = new RegExp(config.regex, 'gm')

        return content.replace(regex, '$1 ' + config.attributes.join(' '))
    }

    const getMetaData = data => {
        data.pagesData = data.pagesData.map(({ content, meta }) => {
            return {
                content: setTargetBlank(content),
                meta
            }
        })

        return data.pagesData
    }

    return {
        getMetaData
    }
})()
