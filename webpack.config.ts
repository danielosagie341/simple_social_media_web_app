module.exports = {
  // ... other configurations
  module: {
    rules: [
      // ... other rules
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
