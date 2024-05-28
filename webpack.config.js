const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './js/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: './bundle.js'
    },
    module:{},
    plugins:[
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
    ],
    devtool:'source-map',
    devServer:{
        port:3000,
        open:true,
        hot: true
    },
    mode:'development'
}