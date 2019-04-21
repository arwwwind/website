/*eslint-disable */
module.exports = {
  plugins: [
    require('autoprefixer')({
      flexbox: true,
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
/*  eslint-enable */
