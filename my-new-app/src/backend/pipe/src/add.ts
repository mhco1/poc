type t_lib = { [k: string]: Function };

export const c_add = ({
    view, pill, pipe
}: {
    view: object, pill: object[], pipe: t_lib
}) => {

    /*code to constructor...*/

    return (name: string, fn: Function) => <g>(...arg: g[]) => {
        const obj = { name, fn, arg };

        pill.push(obj);
        return view
    }
}