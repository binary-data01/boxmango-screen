const path = require('path')

//http://121.201.93.46:8810/
const host = "http://192.168.55.1:8080/"

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "/screen",
  // 输出文件目录
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  integrity: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  devServer: {
    proxy: {
      "/api": {
        target: host,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      },
      "/media": {
        target: host,
        changeOrigin: true,
        pathRewrite: {
          "^/media": "/media"
        }
      },
      // "/webSocket": {
      //   target: "ws://192.168.31.188:8899",//"ws://192.168.31.48:8899",
      //   ws: true,
      //   changeOrigin: true
      // }
    }
  },
}