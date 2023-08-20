export default (c: any) => (idx: number) => {
    c.update = true;
    c.file.data[idx].active = false;
    return
}