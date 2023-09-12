export default (c: any) => (...arr: []) => {
    let el: [string, string];
    while (el = arr.shift()) {
        const [name, type] = el;
        const index = c.file.data.length;
        const obj = {
            name, type, index, item: [],
            active: true,
            ...c.types[type].col,
        };

        c.update = true;
        c.file.col[name] = index;
        c.file.data.push(obj);
    }
}