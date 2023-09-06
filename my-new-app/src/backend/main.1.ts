type t_callback = { meet: Function, transform: Function }[]
// type t_key = [number, ...string[], any];
type t_Object = { [key: string]: any };
type t_key = any[];
type t_keys = t_key[];
type t_value = any[];
type t_values = t_value[];
type t_path = { keys: t_keys, values: t_values };

export const c_objectRecursive = (/*defaults*/) => {

    type t_fn = { [key: string]: any };

    const This: {
        res: {},
        path: t_path,
    } = {
        res: {},
        path: { keys: [], values: [] },
    };
    // 
    // [0,a]
    // [1,b]
    // [2,c]
    // [3,d]
    // 

    const res: any = <t_o>(obj: t_o, callback: t_callback) => {
        // let keys: t_keys = keysList.create(obj);
        This.path.keys = fn.keysList.create(obj);
        let idx = 0;
        while (idx < This.path.keys.length) {
            const k = This.path.keys[idx];
            const id = k[0];
            const past = k.slice(1);
            const val = fn.value.get(obj, past);

            callback.forEach(({ meet }, idx, arr) => {
                if (meet(val)) {
                    // is value
                    fn.value.set(val, id);
                } else {
                    // is object
                    const _obj = fn.value.get(obj, past);
                    fn.keysList.update(_obj,past, id, This.path)
                }
            })

            idx++;
        }
    }

    res.deb = () => This;
    const fn: t_fn = res.deb.fn = {};

    fn.keysList = {
        create<t_o, t_p>(obj: t_o, past: t_p[] = [], start: number = 0) {
            return Object.keys(obj).map((el: string, idx: number) => [start + idx, ...past, el])
        },
        update<t_o, t_p, t_pp extends t_path>(obj: t_o, past: t_p, id: number, path: t_pp) {
            const res: { keys: any[], values: any[] } = { keys: [], values: [] };
            const { keys, values } = path;
            const beforeList = keys.slice(0, id);
            const afterList = keys.slice(id + 1);
            // let newValues: any[] = [];

            beforeList.forEach(el => {
                const _id = el[0];
                if (values[_id]) res.values.push(values[_id])
            })

            afterList.forEach(el => {
                const _id = el[0];
                if (values[_id]) res.values.push([values[_id][0] - 1, values[_id][1]]);
                return el
            })

            res.keys = [...beforeList, ...afterList];
            res.keys = [...res.keys, ...fn.keysList.create(obj, past, res.keys.length)];

            return res;
        },
    }

    fn.value = {
        get<t_o extends t_Object, t_s extends string>(obj: t_o, path: t_s[]) {
            let res = obj;
            path.forEach((k) => { res = res[k] });
            return res
        },
        set<t_v, t_p extends t_path>(value: t_v, id: number, path: t_p) {
            path.values.push([id, value])
        }
    }

    return res
}