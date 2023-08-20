// type lib = { [key: string]: { [key: string]: any } }
type lib = { [key: string]: any }

export const create = ({ _ }: { _: lib }) => {
    const exp = {

        meet(value: any) {
            return ((_.isPlainObject(value)) && (Object.hasOwn(value, '_pipe')))
        },

        transform(value: { _pipe: Function }) {
            return exp.bind(value._pipe)
        },

        obj: {
            a: 1,
            b: {
                c: 2,
                d: {
                    _pipe: (d: any) => d,
                },
            },

            e: {
                _pipe: (e: any) => e,
            },
        },

        bind: (fn: Function) => () => fn,
    }

    return exp
}

// main.refresh()
// { meetTransform, test } = main.code.exp
// debugger; res = meetTransform(test.obj,test.meet,test.transform)