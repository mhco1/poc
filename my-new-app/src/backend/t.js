const c_objectRecursive = () => {
  const isObject = o => typeof o === "object" && !Array.isArray(o)

  const c_alias = obj => {
    const This = {
      res: structuredClone(obj),
      obj: {},
      value: ""
    }

    return {
      deep: deepPath => {
        const arr = [...deepPath]
        This.obj = This.res
        This.value = arr.pop()
        arr.forEach(el => (This.obj = This.obj[el]))
      },
      value: {
        new: value => (This.obj[This.value] = value),
        get: () => This.obj[This.value]
      },
      res: () => This.res,
      deb: () => This
    }
  }

  const c_loop = obj => {
    const convert = (o, df) => Object.keys(o).map(el => [...df, el])

    const This = {
      arr: convert(obj, []),
      current: []
    }

    return {
      add: obj => This.arr.push(...convert(obj, This.current)),
      next: () => typeof (This.current = This.arr.shift()) !== "undefined",
      get: () => This.current,
      deb: () => This
    }
  }

  return (obj, callback) => {
    const loop = c_loop(obj)
    const alias = c_alias(obj)

    while (loop.next()) {
      alias.deep(loop.get())
      const value = alias.value.get()

      callback.forEach(el => {
        const { meet, transform } = el

        if (meet(value)) {
          const newValue = transform(value)
          typeof newValue !== "undefined" && alias.value.new(newValue)
        } else if (isObject(value)) loop.add(value)
      })
    }

    return alias.res()
  }
}

module.exports = () => {

  global.c_objectRecursive = c_objectRecursive;

  global.objectRecursive = c_objectRecursive();

  global.aaa = {
    a: 1, b: { c: 2 }, d: '3'
  };

  global.callback = {
    meet: (v) => typeof v === 'number',
    transform: (v) => v * 2
  };
}