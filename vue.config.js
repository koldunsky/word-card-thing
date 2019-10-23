module.exports = {
  lintOnSave: false,
  pwa: {
    name: `L's D`,
    themeColor: '#2F4F4F',
    msTileColor: '#2F4F4F',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: Date.now()
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: './src/sw.js',
    //   swDest: 'service-worker.js'
    // }
  }
}
