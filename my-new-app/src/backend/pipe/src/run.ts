type t_lib = { [k: string]: Function };

export const c_run = ({
    view, pill, pipe
}: {
    view: object, pill: { name: string, fn: Function, arg: [] }[], pipe: t_lib,
}) => {

    const log = ({ name }: { name: string }) => console.log('log:', name, 'ok');
    /*code to constructor...*/

    return (bind: Function) => (callback = log, err = console.error, ...arg: []) => {
        const newPromise = () => new Promise(promise).then(_callback).catch((...arg) => err(...arg));

        const promise = (resolve: Function, reject: Function) => {
            const obj = pill.shift();
            const { name, fn, arg } = obj;

            fn(...arg);
            resolve(obj);
            return
        };

        const _callback = (obj: { name: string }) => {
            callback(obj);

            if (pill.length > 0) newPromise();
            return
        };

        bind(...arg);
        newPromise();
    }
}