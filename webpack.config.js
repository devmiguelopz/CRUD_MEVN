const {VueLoaderPlugin} = require ('vue-loader')
module.exports = {
  entry: './src/app/index.js',
  output: {
    path: `${__dirname}/src/public/js`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: 'vue-loader',
        test: /\.vue$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin()
  ]
}