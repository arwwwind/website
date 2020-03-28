const withSass = require('@zeit/next-sass');
const withPurgeCss = require('next-purgecss');
const withPWA = require('next-pwa');
const compose = require('next-compose');

module.exports = compose([
  [
    withPWA,
    {
      pwa: {
        dest: 'public'
      }
    }
  ],
  [withSass],
  [
    withPurgeCss,
    {
      purgeCssPaths: ['pages/**/*', 'components/**/*', 'hoc/**/*']
    }
  ]
])
