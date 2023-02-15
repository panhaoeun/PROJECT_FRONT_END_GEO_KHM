const Dotenv = require('dotenv-webpack');
const envPath = function() {
    return (!process.env.NODE_ENV || (process.env.NODE_ENV === 'development')) ?
        './.env' :
        `./.env.${process.env.NODE_ENV}`;
}
const dotenvArgs = {
    expand: true,
    path: envPath()
};

module.exports = {
   //... some other config here
   devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
    configureWebpack: {
        plugins: [
            new Dotenv(dotenvArgs)
        ]
    }
};
