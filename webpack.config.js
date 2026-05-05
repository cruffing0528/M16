import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const isProduction = process.env.NODE_ENV === "production";
const isProduction = "production";

const config = {
    entry: {
        employees: "./src/employees.jsx",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        // Add webpack plugins here if needed
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minSize: 0,
                },
            },
        },
    },
    devtool: 'source-map'
};

export default function () {
    if (isProduction) {
        config.mode = "production";
    }
    else {
        config.mode = "development";
    }
    return config;
}