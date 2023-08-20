export default (c: any) => (...arr: []) => {
    arr.forEach((arg: string[]) => {
        if (!Array.isArray(arg))
            throw Error("The arguments need to be a array");

        const [name, type] = arg;
        const index = c.file.data.length;
        const obj = {
            name, type, index, item: [],
            active: true,
            ...c.type[type].col,
        };
    
        c.update = true;
        c.file.col[name] = index;
        c.file.data.push(obj);
        return
    })
}