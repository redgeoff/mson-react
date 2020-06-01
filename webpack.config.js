const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    msonreact: './src/bundle.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // Note: not working, but may be a useful approach in the future
  // externals: {
  //   // 'material-ui': '@material-ui',
  //   'material-ui': /@material-ui.*/,
  //   mson: /^mson$/i
  // }
};
