const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});
const htmlPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html'
});

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }]
            },
            {
                test: /\.(scss|sass)$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    },
                  // other vue-loader options go here
                    extractCSS: true
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: 'fonts/'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: 'fonts/'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            axios: 'axios',
            Vue: 'vue'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CleanWebpackPlugin(['dist']),
       /*  new FaviconsWebpackPlugin({
            logo: './src/img/logo.png',
            prefix: 'icons/',
            persistentCache: true,
            inject: true,
            background: '#fff',
            title: 'Wathiq api',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                yandex: true,
                windows: true
            }
        }), */
        extractPlugin,
        htmlPlugin
    ]
};