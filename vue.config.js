module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'KOLENKI',
    short_name: 'KOLENKI',
    description: '',
    themeColor: '#2a7e70',
    msTileColor: '#39ac99',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    orientation: 'portrait',
    assetsVersion: Date.now(),
    manifestOptions: {
      background_color: '#ffffff',
      display: 'standalone',
      start_url: 'https://kolenki.app',
      icons: [
        {
          src: `./img/icons/apple-touch-icon.png?v=${Date.now()}`,
          sizes: '180x180',
          type: 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
