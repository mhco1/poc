const Path = require('path');
import { c_objectRecursive } from 'tools/object.recursive'
import * as src from '~/json/src'
import types from '~/json/types'
import conf from '~/conf.json'

type t_value = { default: Function };

export const c_json = (/*defaults*/) => {
    type t_Object = { [key: string]: any };
    type t_res = { (): t_Object, deb: t_Object, fn: t_Object };

    let res;

    const This: t_Object = {
        ...conf.json,
        types,
    }

    const fn = {};

    const objectRecursive = c_objectRecursive()

    const callback = {
        insertContext: {
            meet: (value: t_value) => typeof value.default !== 'undefined',
            transform: (value: t_value) => value.default(This),
        }
    }

    const pathKeys = Object.keys(This.path).filter(el => el !== 'root');
    const pathRoot = typeof This.path.root === 'undefined' ? __dirname : This.path.root;
    let k;
    while (k = pathKeys.shift()) {
        This.path[k] = Path.resolve(pathRoot, This.path[k])
    }

    res = (() => ({

        ...objectRecursive(src, [callback.insertContext])

    })) as t_res;

    res.deb = This;
    res.fn = fn;

    return res
}