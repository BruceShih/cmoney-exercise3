const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval-source-map',
  },
  devServer: {
    port: '5500',
  },
});
