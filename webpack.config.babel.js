// Webpack v3 configuration
// author: Andras Csizmadia
// see: https://webpack.js.org/configuration/
/* eslint-disable import/no-extraneous-dependencies */
import {resolve} from 'path';
import webpack from 'webpack';

const config = {
  mode: 'production',
  target: 'web',
  devtool: 'nosources-source-map',
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', resolve(__dirname, 'src')],
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  entry: {
    main: resolve(__dirname, 'src/index.js'),
  },
  plugins: [
    new webpack.BannerPlugin({banner: '@vpmedia/phaser Copyright (c) 2022-present Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu) ' + new Date()}),
  ],
};

const configUmd = Object.assign({}, config, {
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'phaser.js',
    library: {
      name: 'Phaser',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
});

const configCommonjs = Object.assign({}, config, {
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'phaser.cjs',
    library: {
      name: 'Phaser',
      type: 'commonjs',
    },
  },
});

export default [ configUmd, configCommonjs ];
