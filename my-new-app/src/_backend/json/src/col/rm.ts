export const rm = {
    _pipe: {
        name: "rm",
        path: "field",
        isEnd: false,
        /*context: undefined,*/
        fn: (c: any) => (idx: number) => {
            c.update = true;
            c.file.data[idx].active = false;
            return
        }
    }
}