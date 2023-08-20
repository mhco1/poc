export const reset = {
    _pipe: {
        name: "reset",
        path: "",
        isEnd: false,
        /*context: undefined,*/
        fn: (c: any) => (/*arguments*/) => {
            c.update = true;
            c.file = JSON.parse(c.default);
            return
        }
    }
}