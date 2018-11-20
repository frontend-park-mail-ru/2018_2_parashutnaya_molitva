const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const conf = {
    entry: {
        application: './public/js/application.js'
    },
    output: {
        path: path.resolve(__dirname + '/public/dist/'),
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
            // {
            //     test: /\.css$/,
            //     use: [
            //         {loader: MiniCssExtractPlugin.loader},
            //         {loader: "css-loader"}
            //     ]
            // },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {loader: 'less-loader'}
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
    conf.devtool = isProduction ? false : 'eval-source-map';
    return conf
};
