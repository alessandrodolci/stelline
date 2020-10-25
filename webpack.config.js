const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfiguration = {
    entry: "./src/index.js",
    output: {
        filename: "main.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]
};

const devConfiguration = {
    ...baseConfiguration,
    mode: "development",
    devServer: {
        port: 3000
    },
    devtool: "source-map"
};

const prodConfiguration = {
    ...baseConfiguration,
    mode: "production",
    devtool: "inline-source-map"
};

module.exports = env => {
    return env === "production" ? prodConfiguration : devConfiguration;
};
