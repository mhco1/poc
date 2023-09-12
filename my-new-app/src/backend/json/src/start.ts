const Path = require('path');
const Fs = require("fs-extra");

export default (c: any) => () => {
    c.file = Fs.readJsonSync(c.path.database, { throws: false })

    if (typeof c.file === 'undefined') {
        c.file = JSON.parse(c.default);
        c.update = true;
    }

    c.file = Fs.readJsonSync(c.path.database, { throws: false }) || JSON.parse(c.default);
    return
}