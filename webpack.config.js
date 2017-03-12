// webpack 호출 (es6부터 import 사용)
var webpack = require('webpack');

// 다음의 객체를 모듈로 내보냄을 의미
// webpack에서 해당 모듈을 호출하여 설정으로 사용함
module.exports = {

    // webpack의 주요 기능인 script 병합이 최초 이루어지는 root file 지정
    // 지정된 파일의 require부터 재귀호출하여 연결된 script들을 모두 병합한다
    entry: ['react-hot-loader/patch', './src/index.js'],

    // 병합된 script 파일이 생성되는 경로 및 파일명
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    
    // 개발서버 설정
    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        // index 파일의 위치
        contentBase: __dirname + '/public/'
    },

    // 지정된 loader를 통해 script 파일을 변환한다
    // 이 경우는 es2015와 react 문법을 javascript로 변환하는 것
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ['react-hot-loader/babel']
                }
            }
        ]
    },
    
    // webpack의 plugin을 호출
    // 하단에서는 auto-reload를 위한 plugin을 호출하고 있음
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};