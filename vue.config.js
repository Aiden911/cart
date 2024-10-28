const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/cart/' : '/',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'Shopping Cart'  // 您的網站標題
        return args
      })
  }
})