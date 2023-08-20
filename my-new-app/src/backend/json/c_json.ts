import * as src from './src'
import { c_objectRecursive } from '@tools/object.recursive'
import conf from '@backend/conf.json'

export const c_json = (/*defaults*/) => {
    debugger

    const This = {
        ...conf.json
    }

    const objectRecursive = c_objectRecursive();

    const callback = {
        insertContext: {
            meet: (value: any) => typeof value === 'function',
            transform: (value: any) => value(This),
        }
    }

    const res = objectRecursive(src, [callback.insertContext]);

    debugger

    return {
        deb: () => This,
        ...res,
    }
}