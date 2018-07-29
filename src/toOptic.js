import {identity} from './identity'
import {index} from './index'
import {o} from './o'
import {prop} from './prop'
import {reader} from './reader'

export function toOptic(x) {
  switch (typeof x) {
    case 'string':
      return prop(x)
    case 'number':
      return index(x)
    case 'object': {
      if (Array.isArray(x)) {
        let n = x.length
        if (n === 0) {
          return identity
        } else {
          let r = toOptic(x[--n])
          while (n) r = o(toOptic(x[--n]), r)
          return r
        }
      } else {
        return x
      }
    }
    default:
      return reader(x)
  }
}
