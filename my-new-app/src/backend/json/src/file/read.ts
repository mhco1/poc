const Path = require('path');
const Fs = require("fs-extra");
const Type = require('../../type');
const Conf = Fs.readJsonSync(Path.resolve(__dirname + 'src/backend/conf.json'));

export const _pipe = {
    name: "start",
    path: "",
    isEnd: false,
    context: { ...Conf.json, type: Type },
    fn: (c: any) => () => {
        const path = Path.resolve(__dirname + c.path);
        c.file = Fs.readJsonSync(path, { throws: false }) || JSON.parse(c.default);
        return
    }
}