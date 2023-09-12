const Fs = require("fs-extra");

export default (c: any) => (/*arguments*/) => {
    if (c.update) {
        Fs.outputJsonSync(c.path.database, c.file);
        c.update = false;
    };
    return
}