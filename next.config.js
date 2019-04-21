const withSass = require('@zeit/next-sass')
const withPurgeCss = require('next-purgecss')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass(
  withPurgeCss({
    purgeCssPaths: ['pages/**/*', 'components/**/*', 'hoc/**/*']
  })
))
