import _ from 'lodash';
import * as _src from '../pipe/src';

type t_src = { [k: string]: Function };

export const c_pipe = (): { [k: string]: any } => {

    const This: {
        view: object,
        pill: object[],
        pipe: t_src
    } = {
        view: {},
        pill: [],
        pipe: { ..._src }
    }

    _.forIn({ ...This.pipe }, (value: Function, key: string) => {
        const newKey = key.split('_')[1];
        This.pipe[newKey] = value(This);
        delete This.pipe[key];
    })

    return {
        ...This.pipe,
        get: () => This.view,
        deb: () => This,
    }
}