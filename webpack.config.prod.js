const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "src/index.html",
    filename: "../index.html"
});

process.env.NODE_ENV = "production";

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
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
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
        ]
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/client/static'),
        publicPath: "./static/"
    },
    plugins: [
        new BundleAnalyzerPlugin.BundleAnalyzerPlugin({analyzerMode: "static"}),
        htmlWebpackPlugin,
        new MiniCssExtractPlugin({filename: 'style.css', chunkFilename: '[name].style.css'})
    ]
};