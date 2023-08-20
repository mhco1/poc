const Path = require('path');
const Fs = require("fs-extra");

export default (c: any) => () => {
    const path = Path.resolve(__dirname + c.path);
    c.file = Fs.readJsonSync(path, { throws: false }) || JSON.parse(c.default);
    return
}