
module.exports = {
   //... some other config here
   devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.CI_PROJECT_NAME + '/'
    : '/',
     pwa: {
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
};
