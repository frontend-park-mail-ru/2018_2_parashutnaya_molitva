const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const autoprefixer = require('autoprefixer');
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
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({})
                            ],
                            sourceMap: true
                        }
                    },
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


let babelLoader = {
    test: /\.m?js$/,
    exclude: /(node_modules)/,
    include: [
        path.join(__dirname, 'public/js/sw.js'),
        path.join(__dirname, 'public/js')
    ],
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: [],
        },
    }
};


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const definePlugin = new webpack.DefinePlugin({
        PRODUCTION: isProduction,
    });

    if (isProduction) {
        babelLoader.use.options.plugins.push('transform-remove-console');
        conf.optimization.minimizer.push(
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}))
    }

    conf.module.rules.push(babelLoader);

    conf.plugins.push(definePlugin);

    conf.devtool = isProduction ? false : 'eval-source-map';
    return conf
};
