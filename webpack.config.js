const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env, options) {
  const isProduction = options.mode === "production";

  const config = {
    context: path.join(__dirname, "src"),
    entry: {
      script: "./",
      style: "./styles"
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "none" : "source-map",

    resolve: {
      extensions: [".js", ".jsx"/* , ".ts", ".tsx" */]
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        //uncomment if you are going to use typescript
        /* {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
          exclude: /node_modules/,
          options: {
            useCache: true
          }
        }, */
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options:{
                  minimize: isProduction
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: !isProduction,
                  data: '@import "./src/styles/variables.scss";'
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader'
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: "App",
        hash: true,
        template: path.resolve(__dirname, "./index.html")
      }),
      new ExtractTextPlugin('style.css')
    ],

    devServer: {
      contentBase: "./dist"
    }
  };

  return config;
};
