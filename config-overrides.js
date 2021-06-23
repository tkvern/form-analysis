const ProgressPlugin = require('webpack').ProgressPlugin
const ProgressBar = require('progress')
const path = require('path')
const chalk = require('chalk')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addPostcssPlugins,
  addDecoratorsLegacy,
  addWebpackPlugin,
} = require('customize-cra')
const postcss = require('./postcss.config')[0]
const postcss2 = require('./postcss.config')[1]
const postcssPlugin = Object.keys(postcss).map((key) =>
  require(key)(postcss[key])
)
const postcssPlugin2 = Object.keys(postcss2).map((key) =>
  require(key)(postcss2[key])
)
function BuildProgressPlugin() {
  const bar = new ProgressBar(
    `  [:bar] ${chalk.bold(':percent')} ${chalk.yellow(':etas')} (${chalk.dim(
      ':msg'
    )})`,
    {
      total: 100,
      complete: '=',
      incomplete: ' ',
      width: 25,
    }
  )
  return new ProgressPlugin(function(percent, msg) {
    if (percent === 1) msg = 'completed'
    bar.update(percent, { msg: msg })
    if (percent === 1) bar.terminate()
  })
}
const publicPathPlugin = (config, env) => {
  const REACT_APP_RUNENV = process.env.REACT_APP_RUNENV
  if (env !== 'development') {
    const paths = require('react-scripts/config/paths')
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
  }

  config.output = {
    ...config.output,
    publicPath: '/',
  }
  config.devtool = REACT_APP_RUNENV === 'production' ? 'none' : 'source-map'
  return config
}
module.exports = {
  webpack: override(
    // 重写输出配置
    publicPathPlugin,
    // 动态按需加载antd 组件
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true,
    }),
    // 配置主题
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#1890ff',
      },
    }),
    addPostcssPlugins(postcssPlugin),
    addPostcssPlugins(postcssPlugin2),
    addDecoratorsLegacy(),
    // 增加编译时进度条显示
    addWebpackPlugin(new BuildProgressPlugin())
  ),
}
