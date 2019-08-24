// webpack config
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {attrs: {nonce: '{{ styleNonce }}'}}
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {attrs: {nonce: '{{ styleNonce }}'}}
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
