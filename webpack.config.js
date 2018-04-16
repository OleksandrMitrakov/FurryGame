const path = require("path");

module.exports = {
    entry: ["./js/app.js"],

    output: {
        filename: "out.js",
        path: path.resolve(__dirname, "js")
    },

    devServer: {
      inline: true,
      contentBase: './',
      port: 3001
    },

    devtool: "source-map",
    watch: true,
    mode: 'development',

    module: {
        rules: [

            // JS
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-2', 'react']
                    }
                }
            }
        ]
    }
};