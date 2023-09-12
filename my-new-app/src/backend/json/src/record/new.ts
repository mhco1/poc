type t_data = any[];
// type t_col = { item: { value: any }[], type: string };

export default (c: any) => (...arr: []) => {
    c.update = true;
    let data: t_data;
    while (data = arr.shift()) {
        const dataCol = [...c.file.data];
        let i = 0;
        let col;
        while (col = dataCol.shift()) {
            const value = typeof data[i] !== 'undefined' ? data[i] : null;
            const index = col.item.length;
            const item = c.file.data[i].item;
            const type = col.type;
            const obj = {
                value, index,
                ...c.types[type].row
            };

            if (type === 'name' && value === null)
                throw Error('name not defined');

            item.push(obj);
            i++;
        }
    }
}