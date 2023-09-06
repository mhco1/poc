import { c_objectRecursive } from 'tools/object.recursive'
import * as src from '~/json/src'
import conf from '~/conf.json'

type t_value = { default: Function };

export const c_json = (/*defaults*/) => {
    type t_Object = { [key: string]: any };
    type t_res = { (): t_Object, deb: t_Object, fn: t_Object };

    let res;

    const This = {
        ...conf.json
    }

    const fn = {};

    const objectRecursive = c_objectRecursive()

    const callback = {
        insertContext: {
            meet: (value: t_value) => typeof value.default !== 'undefined',
            transform: (value: t_value) => value.default(This),
        }
    }

    res = (() => ({

        ...objectRecursive(src, [callback.insertContext])

    })) as t_res;

    res.deb = This;
    res.fn = fn;

    return res
}