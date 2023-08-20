export default (c: any) => (idx: number) => {
    c.update = true;
    c.file.data[0].item[idx].active = false;
    return;
}