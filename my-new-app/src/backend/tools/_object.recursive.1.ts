type t_callback = { meet: Function, transform: Function }[]

export const c_objectRecursive = () => {

    const isObject = (o: any) => (typeof o === 'object' && !Array.isArray(o))

    const c_alias = (obj: { [key: string]: any }) => {
        const This: {
            obj: { [key: string]: any },
            res: { [key: string]: any },
            ref: {
                path: string[],
                value: any,
                father: { [key: string]: any },
                // res: { [key: string]: any },
            }
        } = {
            obj,
            res: {},
            ref: {
                path: [],
                value: null,
                father: {},
                // res: {},
            }
        }

        /*code to constructor...*/

        return {
            deb: () => This,
            path: {
                set: (path: string[]) => {
                    let res = This.res;
                    This.ref.value = This.obj;
                    // const acc = {
                    //     obj: This.obj,
                    //     res: This.res,
                    // };

                    (This.ref.path = [...path])
                        .forEach((el: string, idx: number, arr: string[]) => {
                            const is = {
                                middle: (idx < arr.length - 2),
                                last: (idx === arr.length - 1),
                                beforeLast: (idx === arr.length - 2),
                            }

                            if (is.middle) {
                                if (typeof res[el] === 'undefined') (res[el] = {});

                                res = res[el];
                                This.ref.value = This.ref.value[el];
                            }
                            if (is.beforeLast) {
                                This.ref.father = res[el];
                                This.ref.value = This.ref.value[el];
                            };
                            if (is.last) { This.ref.value = This.ref.value[el] };
                        })
                }
            },
            value: {
                set: (value: any) => This.ref.father[This.ref.path.slice(-1)[0]] = value,

                get: () => This.ref.value
            },
            res: () => This.res,
        }
    }

    const c_loop = (obj: object) => {
        const convert = (o: object, df: string[]) =>
            Object.keys(o).map(el => [...df, el]);

        const This: {
            current: string[],
            arr: string[][],
        } = {
            arr: convert(obj, []),
            current: [],
        };

        return {
            add: (obj: object) => This.arr.push(...convert(obj, This.current)),
            next: () => typeof (This.current = This.arr.shift()) !== 'undefined',
            get: () => This.current,
            deb: () => This,
        }
    }

    return (obj: object, callback: t_callback) => {
        const loop = c_loop(obj);
        const alias = c_alias(obj);

        while (loop.next()) {
            alias.path.set(loop.get());
            const value = alias.value.get();

            callback.forEach(el => {
                const { meet, transform } = el;

                if (meet(value)) {
                    const newValue = transform(value);
                    typeof newValue !== 'undefined' && alias.value.set(newValue);
                } else if (isObject(value)) loop.add(value);
            })
        }

        return alias.res()
    }
}