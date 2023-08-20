type t_lib = { [k: string]: Function };
type t_pill = { name: string, fn: Function, arg: [] }[];

export const c_add = ({
    context, setContext, view, pill, pipe
}: {
    context: object, setContext: Function , view: object, pill: t_pill, pipe: t_lib,
}) => {

    /*code to constructor...*/

    return (name: string, fn: Function) => <g>(...arg: g[]) => {
        const obj = { name, fn, arg };

        pill.push(obj);
        return view
    }
}