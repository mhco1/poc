const Path = require('path');
const Webpack = require('webpack');
const Shell = require('shelljs');

const conf = require('../config/backend/webpack.main.config');

const compiler = Webpack(conf);
const fs = require('fs');

const registerError = (type, content) => {
    const data = new Date().toISOString();
    const log = {
        data, type, content
    }
    const logStr = JSON.stringify(log, null, 2);

    fs.appendFile('log.json', logStr, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

const logStats = (stats) => {
    console.log(stats.toString({
        chunks: false,  // disable chunk information
        colors: true   // enable colorful output
    }),"\n");
}

const callback = {
    compiler(err, stats) {
        const path = Path.resolve(__dirname, 'dist/main');
        const info = stats.toJson();
        const statsError =
            stats.hasErrors() ?
                'error' :
                stats.hasWarnings() ?
                    'warning' :
                    false;

        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        logStats(stats);

        if (statsError) {
            registerError(statsError, info.errors);
            return
        }

        delete require.cache[require.resolve(path)];
        Object.assign(main, require(path))
    }
};

const main = {
    refresh() {
        compiler.run(callback.compiler)
    }
}

__dirname = Shell.pwd().stdout;

module.exports = main;
