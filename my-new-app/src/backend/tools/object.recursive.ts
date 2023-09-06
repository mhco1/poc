type t_callback = { meet: Function, transform: Function }
type t_Object = { [key: string]: any };
type t_path = [string[], any];

export const c_objectRecursive = (/*defaults*/) => {
    const This = {
        /*object this*/
    }

    const res: any = <t_o extends t_Object>(obj: t_o, callback: t_callback[]) => {
        const paths: t_path[] = fn.convert.toPath(obj, callback);
        return fn.convert.toObject(paths);
    }

    const fn: t_Object = res.fn = {};
    res.deb = This;

    // code to constructor

    fn.callback = <t_v, t_c extends t_callback>(value: t_v, callback: t_c[]) => {
        let el: t_callback;
        while (el = callback.shift()) {
            const { meet, transform } = el;
            if (!!meet(value)) {
                const _value = transform(value);
                if (typeof _value !== 'undefined') return [true, _value]
                return [true, value]
            }
        }

        return [false, value]
    };

    fn.convert = {
        toPath<t_o extends t_Object>(obj: t_o, callback: t_callback[]) {
            const arrObj: [string[], t_Object][] = [[[], obj]];
            const paths: [string[], t_Object][] = [];

            let el;
            while (el = arrObj.shift()) {
                const [past, _obj] = el;
                Object.keys(_obj).forEach(key => {
                    const [isMeet, value] = fn.callback(_obj[key], [...callback]);
                    const path: [string[], t_Object] = [[...past, key], value];

                    if (isMeet) {
                        paths.push(path);
                    } else {
                        arrObj.push(path);
                    }
                })
            }

            return paths;
        },

        toObject<t_p extends t_path>(paths: t_p[]) {
            const res: t_Object = {};
            let el;
            while (el = paths.shift()) {
                const [path, value] = el;
                const last = path.pop();
                let ref = res;
                let key;
                while (key = path.shift()) {
                    if (typeof ref[key] === 'undefined') {
                        ref[key] = {};
                    }

                    ref = ref[key];
                }
                ref[last] = value;
            }

            return res
        }
    }

    return res
}