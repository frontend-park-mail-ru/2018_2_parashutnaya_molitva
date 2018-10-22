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
                test: /\.js$/,
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader},
                    { loader: "css-loader" }
                ]
            },
        ]
    },
    plugins : [
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
