type t_data = any[];
type t_col = { item: { value: any }[], type: string };

export const _add = {
    _pipe: {
        name: "new",
        path: "record",
        isEnd: false,
        /*context: undefined,*/
        fn: (c: any) => (...arr: []) => {
            // if (!Array.isArray(arr))
            //     throw Error("The arguments need to be a array")

            arr.forEach((data: t_data) => {
                c.update = true;
                c.file.data.forEach((col: t_col, idx: number) => {
                    const value = typeof data[idx] !== 'undefined' ? data[idx] : null;
                    const index = col.item.length;
                    const item = c.file.data[idx].item;
                    const type = col.type;
                    const obj = {
                        value, index,
                        ...c.type[type].row
                    };

                    if (type === 'name' && value === null)
                        throw Error('name not defined');

                    item.push(obj);
                    return
                });
            })
        }
    }
}