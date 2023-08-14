import _ from 'lodash';
import { c_pathToObject } from '../../tools';

type t_lib = { [k: string]: Function };
type t_pill = { name: string, fn: Function, arg: [] }[];
type t_value = {
    _pipe: { name: string, path: string, fn: Function, isEnd: boolean | undefined, context: object, },
};

export const c_transform = ({
    context, setContext, view, pill, pipe
}: {
    context: object, setContext: Function, view: object, pill: t_pill, pipe: t_lib,
}) => {

    /*code to constructor...*/

    return {
        meet(value: t_value) {
            return ((_.isPlainObject(value)) && (Object.hasOwn(value, '_pipe')))
        },

        transform(value: t_value) {
            const pathToObject = c_pathToObject();
            const { name, fn, isEnd, context } = value._pipe;
            const path = value._pipe.path ? value._pipe.path + '.' : '';
            const bind = pipe.add(name, fn(context));
            const bindEnd = isEnd ? pipe.run(bind) : bind;
            const pathObj = pathToObject(path + name, bindEnd);
            if (context) setContext(context);
            _.merge(view, pathObj);
        }
    }
}
