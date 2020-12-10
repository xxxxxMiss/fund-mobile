'use strict'

module.exports = () => {
  const config = (exports = {})
  // config.assets = {
  // devServer: {
  //   debug: true,
  //   autoPort: true,
  // },
  // dynamicLocalIP: false,
  // }
  config.customeConfig = {
    recognizeUrl: 'http://recognize.fkman.vip',
  }
  return config
}
