type t_lib = { [k: string]: Function };
type t_pill = { name: string, fn: Function, arg: [] }[];

export const c_run = ({
    context, setContext, view, pill, pipe
}: {
    context: object, setContext: Function , view: object, pill: t_pill, pipe: t_lib,
}) => {

    const log = (status: boolean) => ({ name }: { name: string }) => {
        const op: {
            log: 'log' | 'error',
            msg: 'success' | 'wrong'
        } = {
            log: status ? 'log' : 'error',
            msg: status ? 'success' : 'wrong',
        };


        console[op.log]('process', name, ':', op.msg);
    };

    /*code to constructor...*/

    return (bind: Function) => (callback = log(true), err = log(false), ...arg: []) => {
        const newPromise = () => new Promise(promise).then(_callback).catch(err);

        const promise = (resolve: Function, reject: Function) => {
            const obj = pill.shift();
            const { name, fn, arg } = obj;

            try {
                fn(...arg);
            } catch (err) {
                reject(err)
            }

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