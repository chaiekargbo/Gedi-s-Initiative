const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common,
    {
        mode: 'development',
        devServer: {
            static: {
                directory: path.join(__dirname, '../src'),
            },
            liveReload: true,
            hot: true,
            port: 9000,
            historyApiFallback: true,

        },
    },
);