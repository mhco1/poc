import jsonata from "jsonata";
type t_col = { item: { value: any }[], type: string };

export const find = {
    _pipe: {
        name: "find",
        path: "record",
        isEnd: false,
        /*context: undefined,*/
        fn: (c: any) => (col: string, query: string, callback = () => { }) => {
            jsonata(`$[name='${col}'].item[value ~> /${query}/][active=true]`)
                .evaluate(c.file.data)
                .then((res: []) => res.map((el: { index: number }) => c.file.data.map((col: t_col) =>
                    col.item[el.index].value
                )))
                .then(callback)
                .catch(callback)
            return
        }
    }
}