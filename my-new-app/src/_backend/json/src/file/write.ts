const Fs = require("fs-extra");

export const write = {
    _pipe: {
        name: "end",
        path: "",
        isEnd: true,
        /*context: undefined,*/
        fn: (c: any) => (/*arguments*/) => {
            if (c.update) {
                Fs.outputJsonSync(c.path, c.file);
                c.update = false;
            };
            return
        }
    }
}