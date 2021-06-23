// 各环境配置
const config = {
  development: {
  },
  test: {
  },
  production: {
  }
}
export default config[
  process.env.REACT_APP_RUNENV || process.env.NODE_ENV || 'production'
]

export const basename = ''
