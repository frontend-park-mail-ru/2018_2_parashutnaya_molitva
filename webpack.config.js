const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');

const conf = {
    optimization: {
        minimizer : [],
    },
    entry: {
        application: './public/js/application.js'
    },
    output: {
        path: path.resolve(__dirname + '/public/dist/'),
    },
    resolve: {
        alias : {
            Styles: path.resolve(__dirname, 'public/css/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.xml$/,
                use: [
                    {
                        loader: 'fest-webpack-loader'
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {loader: 'less-loader', options: {
                            sourceMap: true, path
                        }}
                ]
            },
        ]
    },
    plugins: [
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'public/js/sw.js'),
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ]
};


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const definePlugin = new webpack.DefinePlugin({
        PRODUCTION: isProduction,
    });

    if (isProduction) {
        conf.optimization.minimizer.push(
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}))
    }

    conf.plugins.push(definePlugin);

    conf.devtool = isProduction ? false : 'eval-source-map';
    return conf
};
