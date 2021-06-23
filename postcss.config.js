module.exports = [
  {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    },
    'postcss-aspect-ratio-mini': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // (Number) The width of the viewport.
      viewportHeight: 667, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines', '.antd'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      exclude: /(\/|\\)(src)(\/|\\)/
    },
    'postcss-write-svg': { utf8: false },
    'postcss-viewport-units': {
      filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1
    },
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false
      }
    }
  },
  {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    },
    'postcss-aspect-ratio-mini': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines', '.antd'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 2, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    },
    'postcss-write-svg': { utf8: false },
    'postcss-viewport-units': {
      filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1
    },
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    }
  }
]
