export default (c: any) => (/*arguments*/) => {
    c.update = true;
    c.file = JSON.parse(c.default);
    return
}