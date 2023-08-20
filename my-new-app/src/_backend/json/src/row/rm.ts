export const _rm = {
    _pipe: {
        name: "del",
        path: "record",
        isEnd: false,
        /*context: undefined,*/
        fn: (c: any) => (idx: number) => {
            c.update = true;
            c.file.data[0].item[idx].active = false;
            return;
        }
    }
}