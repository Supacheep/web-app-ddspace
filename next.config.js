require('dotenv').config()

const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/antd.less'), 'utf8'),
)

module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (config, { isServer }) => {
      config.plugins.push(new Dotenv({ silent: true }))
      config.module.rules.push({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      })

      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      }
      config.module.rules.push({
        test: /\.css$/,
        exclude: [
          /styles/,
          /node_modules\/swiper/,
          /node_modules\/react-lazy-load-image-component/,
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      })
      return config
    },
    webpack5: false,
  }),
)
