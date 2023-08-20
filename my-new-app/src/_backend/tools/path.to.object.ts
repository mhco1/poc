import _ from 'lodash'

type t_obj = { [key: string]: t_obj };

export const c_pathToObject = () => {

    /*code to constructor...*/

    return <v extends t_obj>(path: string, value: v) => {
        const res: t_obj = {}
        const arr = path.split('.').filter( el => el.length > 0);
        let alias = res
        arr.map((el, idx) => {
            const key = _.camelCase(el);

            if (idx == arr.length - 1 && typeof value !== 'undefined') {
                alias[key] = value;
                return
            }

            alias[key] = {};
            alias = alias[key];
        })
        return res
    }
}