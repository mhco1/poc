const Path = require('path');
const Webpack = require('webpack');
const Shell = require('shelljs');
const Repl = require('node:repl');
const Fs = require('fs');
const Conf = require('../config/backend/webpack.main.config');

const compiler = Webpack(Conf);

__dirname = global.__dirname = Shell.pwd().stdout;

const path = {
    compiler: Path.resolve(__dirname, 'dist/main'),
    cti: Path.resolve(__dirname, 'src/backend'),
    dist: Path.resolve(__dirname, 'dist'),
}

const log = {
    register: {
        error: (type, content) => {
            const data = new Date().toISOString();
            const log = {
                data, type, content
            }
            const logStr = JSON.stringify(log, null, 2);

            Fs.appendFile('log.json', logStr, (err) => {
                if (err) {
                    console.error('Error while writing to log file:', err);
                }
            });
        }
    },

    stats: (stats) => {
        console.log(stats.toString({
            chunks: false,  // disable chunk information
            colors: true   // enable colorful output
        }), "\n");
    }
}

const middleware = {
    compiler(err, stats) {
        const info = stats.toJson();
        const statsError =
            stats.hasErrors() ?
                'error' :
                stats.hasWarnings() ?
                    'warning' :
                    false;
        let module = null;

        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        log.stats(stats);

        if (statsError) {
            log.register.error(statsError, info.errors);
            return
        }

        delete require.cache[require.resolve(path.compiler)];

        module = require(path.compiler);
        Object.assign(repl.server.context, module);
    },

    refresh() {
        Shell.exec('cti clean ' + path.cti);
        Shell.exec('cti create ' + path.cti);
    },

    repl: {
        exit() {
            Shell.rm('-r', path.dist);
            Shell.exec('cti clean ' + path.cti);
        }
    },
};

const repl = {
    server: Repl.start(),
}

repl.server.context.code = null;
repl.server.context.refresh = () => {
    middleware.refresh();
    compiler.run(middleware.compiler)
};

repl.server.on('exit', middleware.repl.exit);
