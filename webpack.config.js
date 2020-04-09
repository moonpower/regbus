const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry : './routes/index.js',
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    
    devServer:{
        port:3000
     
    },
    module:{
        rules:[
            {
            test: /\.pug$/,
            use:["pug-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './views/index.pug'
        }),
      ]
}

module.exports =(env,argv)=> {
    if(argv.mode === 'development'){}
    if(argv.mode === 'production'){}
    return config;
};