
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
   //... some other config here
   devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_URL,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
  },
};
