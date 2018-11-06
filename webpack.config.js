const path = require('path');

const conf = {
    entry: {
        application: './public/js/application.js'
    },
    output: {
        filename: 'application.js',
        path: path.resolve(__dirname, 'public/dist'),
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
        ]
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    conf.devtool = isProduction ? false : 'eval-source-map';
    return conf
};