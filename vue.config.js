module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'KOLENKI',
    short_name: `KOLENKI`,
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
      start_url: 'https://word-card-thing.netlify.com'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}
