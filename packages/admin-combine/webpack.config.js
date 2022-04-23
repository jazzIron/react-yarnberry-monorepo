const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 파일도 빈칸을 없애는 압축
const childProcess = require('child_process'); // command 명령어 사용가능
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 이전 빌드내용 삭제 플러그인
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 여러 css파일을 하나의 css 파일로 병합
const HtmlWebpackPlugin = require('html-webpack-plugin'); //  HTML 파일 생성을 단순화
const TerserPlugin = require('terser-webpack-plugin'); // console.log 제거 옵션

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    // 확장자를 순서대로 해석
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimization: {
    minimizer:
      mode === 'production'
        ? [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ], // 순서 중요함, 뒤에서 부터 실행
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|svg|ico)$/i,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]', // hash 처리(캐시)
          limit: 20000, // 2kb 최대
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')},
        Author: ${childProcess.execSync('git config user.name')}
      `,
    }),
    //css 파일과 js파일을 각각 html파일의 link태그, script태그로 추가
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify:
        // 디버깅쉽게 하기위해 production 환경에서만 설정
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석제거
            }
          : false,
    }),
    // dist Folder delete
    new CleanWebpackPlugin({
      banner: `build time : ${new Date().toLocaleTimeString()}`,
      cleanStaleWebpackAssets: false,
    }),
    // javascript css 뽑기(개발환경에는 필요가없음)
    // loader 설정이 추가로 필요함
    ...(process.env.NODE_ENV === 'production'
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].css',
          }),
        ]
      : []),
  ],
};
