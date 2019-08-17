const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const globSync = require('glob').sync;
const webpack = require('webpack');
const path = require('path');

module.exports = (env, options) => {
    return {
        entry: ['./src/index.js'],
        devServer: {
            port: 3000,
            contentBase: './dist',
        },
        devtool: options.mode === 'production' ? false : 'inline-source-map',
        performance: {
            hints: false,
        },
        node: {
            fs: 'empty',
        },
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    exclude: /(old_src)/,
                    use: [
                        options.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [require('precss'), require('autoprefixer')];
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    exclude: /(old_src)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'img/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(html)$/,
                    exclude: /(old_src)/,
                    use: {
                        loader: 'html-srcsets-loader',
                        options: {
                            attrs: [':src', ':srcset'],
                        },
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components|old_src)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/style.[contenthash].css',
            }),
            new CleanWebpackPlugin(),
            ...globSync('src/**/*.html').map(fileName => {
                return new HtmlWebpackPlugin({
                    template: fileName,
                    inject: 'body',
                    filename: fileName.replace('src/', ''),
                });
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                Util: 'exports-loader?Util!bootstrap/js/dist/util',
                Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            }),
        ],
        optimization: {
            minimizer: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        map: false,
                    },
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true,
                }),
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                }),
            ],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
    };
};
