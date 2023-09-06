type t_callback = { meet: Function, transform: Function }[]

export const c_objectRecursive = () => {

    const isObject = (o: any) => (typeof o === 'object' && !Array.isArray(o))

    const c_alias = (obj: { [key: string]: any }) => {
        const This: {
            res: object,
            obj: any,
            value: string
        } = {
            res: structuredClone(obj),
            obj: {},
            value: "",
        };

        return {
            deep: (deepPath: string[]) => {
                const arr = [...deepPath];
                This.obj = This.res;
                This.value = arr.pop();
                arr.forEach(el => This.obj = This.obj[el]);
            },
            value: {
                new: (value: any) => This.obj[This.value] = value,
                get: () => This.obj[This.value],
            },
            res: () => This.res,
            deb: () => This,
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
            alias.deep(loop.get());
            const value = alias.value.get();

            callback.forEach(el => {
                const { meet, transform } = el;

                if (meet(value)) {
                    const newValue = transform(value);
                    typeof newValue !== 'undefined' && alias.value.new(newValue);
                } else if (isObject(value)) loop.add(value);
            })
        }

        return alias.res()
    }
}