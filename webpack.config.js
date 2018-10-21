const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const conf = {
    entry: {
        application: './public/js/application.js'
    },
    output: {
        filename: 'application.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
    resolve: {
        modules: ['node_modules'],
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
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
        ]
    },
    plugins : [
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'public/js/sw.js'),
        }),
    ]
};

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    conf.devtool = isProduction ? false : 'eval-source-map';
    return conf
};
