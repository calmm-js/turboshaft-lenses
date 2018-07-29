import * as I from 'infestines'

import * as C from './closure'
import {Select} from './algebras'
import {toOptic} from './toOptic'
import {invoke} from './common'

const Foldl = C.fn2(function foldl(x, i) {
  this.$1 = this.$2(this.$1, x, i)
})

export const foldl = I.curry(function foldl(axi2a, a, o, s) {
  const r = Foldl(a, axi2a)
  invoke(toOptic(o).$(Select, r), s)
  return r.$1
})
