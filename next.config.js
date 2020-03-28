const withSass = require('@zeit/next-sass');
const withPurgeCss = require('next-purgecss');
const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');
const compose = require('next-compose');

// module.exports = withPWA(
//   withCSS(
//     withSass(
//       withPurgeCss({
//         purgeCssPaths: ['pages/**/*', 'components/**/*', 'hoc/**/*']
//       })
//     )
//   )
// );

module.exports = compose([
  [
    withPWA,
    {
      pwa: {
        dest: 'public'
      }
    }
  ],
  [
    withSass
  ]
]);
