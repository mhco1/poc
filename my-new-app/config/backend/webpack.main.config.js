const Path = require("path");
const Shell = require('shelljs');

const rules = require('./webpack.rules');

__dirname = Shell.pwd().stdout;

module.exports = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: './src/backend/main.ts',
    // Put your normal webpack config below here

    mode: 'development',

    target: 'node',

    output: {
        filename: 'main.js',
        path: Path.resolve(__dirname, 'dist'),
        library: {
            name: "code",
            type: 'commonjs'
        },
      },

    devServer: {},

    module: {
        rules,
    },

    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    },
}