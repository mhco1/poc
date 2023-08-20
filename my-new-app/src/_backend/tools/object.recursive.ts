import _ from 'lodash'

export const c_objectRecursive = () => {

    const c_alias = () => {
        const This: {
            save: object,
            obj: any,
            value: string
        } = {
            obj: {},
            value: "",
            save: {}
        };

        return {
            ini: (obj: object) => This.save = obj,
            deep: (deepPath: string[]) => {
                const arr = [...deepPath];
                This.obj = This.save;
                This.value = arr.pop();
                arr.map(el => This.obj = This.obj[el]);
            },
            value: {
                new: (value: any) => This.obj[This.value] = value,
                get: () => This.obj[This.value],
            },
            deb: () => This,
        }
    }

    const c_loop = () => {
        const This: {
            current: string[],
            arr: string[][],
        } = {
            arr: [],
            current: [],
        };

        const convert = (o: object, df: string[]) =>
            Object.keys(o).map(el => [...df, el]);

        return {
            ini: (obj: object) => {
                This.arr = convert(obj, []);
            },
            add: (obj: object) => This.arr.push(...convert(obj, This.current)),
            next: () => typeof (This.current = This.arr.shift()) !== 'undefined',
            get: () => This.current,
            deb: () => This,
        }
    }

    return (obj: object, callback: { meet: Function, transform: Function }[]) => {
        const res = { ...obj };
        const loop = c_loop();
        const alias = c_alias();
        loop.ini(res);
        alias.ini(res);

        while (loop.next()) {
            alias.deep(loop.get());
            const value = alias.value.get();

            callback.forEach(el => {
                const { meet, transform } = el;

                if (meet(value)) {
                    const newValue = transform(value);
                    typeof newValue !== 'undefined' && alias.value.new(newValue);
                } else if (_.isPlainObject(value)) loop.add(value);
            })
        }

        return res
    }
}