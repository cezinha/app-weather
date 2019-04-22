
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {  
                        cacheDirectory: true  
                    }                    
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {  
                test: /\.(css|scss)$/,  
                use: ['style-loader', 'css-loader', 'sass-loader']  
            },
            {  
                test: /\.(png|jpg)$/,  
                use: {  
                    loader: 'file-loader',  
                    options: {  
                        name: '[name].[ext]',  
                        outputPath: 'images/'
                    }  
                }  
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'font/'
                    }
                }]
            }
        ]
    },
    watch: true,
    plugins: [
        new HtmlWebPackPlugin({
            title: "Weather App",
            template: path.resolve(__dirname, 'src', 'index.html')
        })
    ]
};