const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js', // Ensure this points to the correct file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      vm: require.resolve('vm-browserify'),
      child_process: false, // If you don't need this module
      module: false, // If you don't need this module
      fs: false, // Optionally set fs to false if you don't need it
      path: require.resolve('path-browserify'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify/browser'),
      'fs/promises': false, // Set to false if not used
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      crypto: require.resolve("crypto-browserify"),
      constants: require.resolve("constants-browserify"),
      process: require.resolve("process/browser"),
      readline: false, // You might also set readline to false if you don't need it
      net: false,
      tls: false,
      dns: false,
    },
  },
};
