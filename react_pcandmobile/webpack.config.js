let webpack = require("webpack")
let Ext = require("extract-text-webpack-plugin")
let Hwp = require("html-webpack-plugin")
const extractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist/",
        filename: "app.js",
        publicPath: ""
    },
    devtool: "source-map",
    devServer: {
        contentBase: __dirname + "/dist/",
        port: 8002,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: Ext.extract("css-loader")
            },
            {
                test: /\.less$/,
                loader: Ext.extract("css-loader!less-loader")
            },
            // {
            //     test:/\.(css|less)/,
            //     use:extractTextWebpackPlugin.extract({
            //         fallback:"style-loader",  // 转为 Node 风格代码 
            //         use:[
            //             'css-loader',  // 变成JS 模块
            //             {
            //                 loader:"postcss-loader",   // 编译CSS
            //                 options:{
            //                     plugins:function(){
            //                         return [
            //                             require("cssgrace"),    // 美化CSS 代码 
            //                             require('postcss-px2rem-exclude')(
            //                                 {
            //                                     remUnit:100,
            //                                     exclude:/antd/i,  // 排除 antd-mobile不需要进行 rem 转换 
            //                                 }
            //                             ), // px 转 rem 
            //                             require("autoprefixer")  // 自动补全 
            //                         ]
            //                     }
            //                 }
            //             },
            //             "less-loader"
            //         ]
            //     })
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: [                                             //
                        ["import", { libraryName: "antd", style: "css" }]   //需要配置的地方
                    ]                                                    //
                }
            },
            {
                test: /\.(png|svg|gif|jpg|woff|woff2|eot|ttf)\??.*$/,
                use: ["url-loader?limit=8192&name=font/[name].[hash:8].[ext]"]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: "react"
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/js/bundle-manifest.json')
        }),
        new Ext("app.css"),
        new Hwp({
            template: "index.html",
            filename: "index.html",
            inject: true
        })
    ]
}