export const _pipe = {
    name: "new",
    path: "field",
    isEnd: false,
    /*context: undefined,*/
    fn: (c: any) => (...arr: []) => {
        arr.forEach((arg: any[2]) => {
            if (!Array.isArray(arg))
                throw Error("The arguments need to be a array")
            const [name, type] = arr
        })
    }
}