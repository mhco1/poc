import { c_pipe } from './pipe'
import { c_objectRecursive } from './tools'

// const pipe: {
//     transform: { meet: Function; transform: Function; },
// } = c_pipe();

const pipe = c_pipe();
const objectRecursive = c_objectRecursive();

let exp = null;

const test = {
    math: {
        sum: {
            _pipe: {
                name: 'sum',
                path: 'my',
                fn: (a: any, b: any) => console.log(a + b),
            }
        },
        mult: {
            _pipe: {
                name: 'mult',
                path: 'my',
                fn: (a: any, b: any) => console.log(a * b),
            }
        }
    },

    str: {
        split: {
            _pipe: {
                name: 'split',
                path: 'my',
                fn: (a: any) => console.log(a.split(''))
            }
        }
    },

    end: {
        _pipe: {
            name:'end',
            isEnd: true,
            fn: ()=>console.log('end')
        }
    }
}

objectRecursive(test, [pipe.transform]);
exp = pipe.get();

export { exp }