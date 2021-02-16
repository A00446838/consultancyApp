const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: {
        main: './src/index.js',
        'polyfill': '@babel/polyfill'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
    },
    devServer: {
        disableHostCheck: true, //webpack-dev-server/pull/1608
        historyApiFallback: true,
        host: 'localhost',
        port: 8080
    },
    devtool: 'source-map',
    plugins: [
        htmlWebpackPlugin,
        new MiniCssExtractPlugin({ filename: 'style.css' })
    ]
};