import _ from 'lodash';
import { c_pathToObject } from '../../tools';

type t_lib = { [k: string]: Function };
type t_value = {
    _pipe: { name: string, path: string, fn: Function, isEnd: boolean | undefined }
};

export const c_transform = ({
    view, pill, pipe
}: {
    view: object, pill: string[], pipe: t_lib
}) => {

    /*code to constructor...*/

    return {
        meet(value: t_value) {
            return ((_.isPlainObject(value)) && (Object.hasOwn(value, '_pipe')))
        },

        transform(value: t_value) {
            const pathToObject = c_pathToObject();
            const { name, path, fn, isEnd } = value._pipe;
            const bind = pipe.add(name, fn);
            const bindEnd = isEnd ? pipe.run(bind) : bind;
            const pathObj = pathToObject(`${path || ''}.${name}`, bindEnd);
            _.merge(view, pathObj);
        }
    }
}
