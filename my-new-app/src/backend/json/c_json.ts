import * as src from './src'
import { c_objectRecursive } from 'tools/object.recursive'
import conf from '~/conf.json'

export const c_json = (/*defaults*/) => {
    const This = {
        ...conf.json
    }

    const objectRecursive = c_objectRecursive();

    const callback = {
        insertContext: {
            meet: (value: any) => typeof value.default !== 'undefined',
            transform: (value: any) => value.default(This),
        }
    }

    debugger

    const res = objectRecursive(src, [callback.insertContext]);

    return {
        deb: () => This,
        ...res,
    }
}