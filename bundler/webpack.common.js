const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

const pages = [
    'home',
    'about',
    'donate',
    'inventory',
    'staff',
    'volunteer',
    'events',
]

module.exports = {
    entry: {
        index: './src/index.js',
        ...pages.reduce((acc, page) => ({ ...acc, [page]: `./src/Pages/${page}/${page}.js` }), {}),
    },
    output: {
        filename: 'bundle.[contenthash].[name].js',
        path: path.resolve(__dirname,'dist')
    },
    target: 'web',
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new MiniCSSExtractPlugin(),
        //index is entry point that pages depend on
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
        }),     
        //map each page to a html file
        ...pages.map(
            page => new HtmlWebpackPlugin({
                template: `./src/Pages/${page}/${page}.html`,
                filename: `${page}.html`,
                chunks: [`${page}`, 'index'],
            })
        ),
    ],
    module: {
        rules: [
            { //JS
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            { //CSS
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                ],
            },
            { //Images
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                }],
            },
            { //Txt
                test: /\.txt$/i,
                use: 'raw-loader',
            },
        ],
    },           
};
