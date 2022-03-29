/**
 * file: Webpack Common File
 * date: 2020-07-21
 * author: Frank
 * lastModify: Frank 2020-07-21
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.tsx'),
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src/'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
            },
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|pdf|eot|ttf|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'static/[hash][ext][query]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 20kb
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.CEM),
        }),

        new webpack.ProgressPlugin({ percentBy: 'entries' }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                enabled: true,
                files: './src/**/*.{tsx,ts,js,jsx}',
            },
            logger: {
                devServer: false,
                infrastructure: 'console',
                issues: 'console',
            },
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
        moduleIds: 'size',
        usedExports: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        pathinfo: false,
    },
};
