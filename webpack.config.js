const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


// ... your other imports

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    // It is suggested to run both `react-refresh/babel` and the plugin in the `development` mode only,
    // even though both of them have optimisations in place to do nothing in the `production` mode.
    // If you would like to override Webpack's defaults for modes, you can also use the `none` mode -
    // you then will need to set `forceEnable: true` in the plugin's options.
    entry: { index: ['./src/index.tsx'] },
    mode: isDevelopment ? 'development' : 'production',
    output: {
        path: path.join(__dirname, '.build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.tsx', '.css', '.ts'],
        modules: ['node_modules', 'node_modules/@alife'],
    },
    externals: {
        react: 'var window.React',
        'react-dom': 'var window.ReactDOM',
        moment: 'var window.moment',
        '@alife/next': 'var window.Next',
    },
    devServer: {
        stats: {
            chunks: false,
            colors: true,
            modules: false,
        },
        contentBase: [path.join(__dirname, 'demo'), path.join(__dirname, '.build')],
        compress: true,
        host: '0.0.0.0',
        port: 8888,
    },
    module: {
        rules: [
            // ... other rules
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    // ... other loaders
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            // ... other options
                            plugins: [
                                // ... other plugins
                                isDevelopment && require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
                    },
                    'ts-loader',
                ],
            },

        ],
    },
    plugins: [
        // ... other plugins
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.html'),
            inject: false,
            mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        })
    ].filter(Boolean),
    // ... other configuration options
};