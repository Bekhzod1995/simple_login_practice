const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/polyfill');

module.exports = {
    entry: ['@babel/polyfill', './react/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './react/index.html'
        })
    ]
};
