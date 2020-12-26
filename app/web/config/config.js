import { join, resolve } from 'path'
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin')

const webRoot = resolve(__dirname, '..')

export default {
  extraBabelPlugins: [
    [
      join(webRoot, 'plugins/babel-plugin-style-bind'),
      {
        varName: 'sbx',
        includes: [
          join(webRoot, 'pages/**/*.{jsx,tsx}'),
          join(webRoot, 'layouts/*.{jsx,tsx}'),
        ],
      },
    ],
  ],
  // plugins: [join(webRoot, 'plugins/umi-plugin-register-service-worker.js')],
  ssr: {
    devServerRender: true,
    forceInitial: true,
  },
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    // 为 ''，不然会有两个 /
    publicPath: '',
  },
  // locale: {
  //   default: 'zh-CN',
  //   antd: false,
  //   title: false,
  //   baseNavigator: true,
  //   baseSeparator: '-',
  // },
  // dva: {
  //   immer: true,
  // hmr: false,
  // },
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    '@': webRoot,
    assets: join(webRoot, 'assets'),
    components: join(webRoot, 'components'),
    pages: join(webRoot, 'pages'),
    utils: join(webRoot, 'utils'),
    hooks: join(webRoot, 'hooks'),
  },
  links: [{ rel: 'manifest', href: '/fund.webmanifest' }],
  chainWebpack(config) {
    config.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin)
    // config.plugin('workbox-inject').use(InjectManifest, [
    //   {
    //     swSrc: join(__dirname, '../pwa/service-worker.js'),
    //     swDest: 'sw.js',
    //     exclude: [/\.map$/, /favicon\.ico$/, /^manifest.*\.js?$/],
    //   },
    // ])
    // config.plugin('workbox-gensw').use(GenerateSW, [
    //   {
    //     swDest: 'sw.js',
    //   },
    // ])
    config.plugin('CopyPlugin').use(CopyPlugin, [
      {
        patterns: [
          {
            from: 'pwa/fund.webmanifest',
            context: webRoot,
          },
          {
            from: 'pwa/*.png',
            context: webRoot,
            flatten: true,
          },
        ],
      },
    ])
  },
}
