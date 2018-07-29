import * as I from 'infestines'

import * as C from './closure'
import {Identity, Select} from './algebras'
import {Id} from './common'

const ReaderSelect = C.fn2(function reader(x, i) {
  return this.$2.$(this.$1(x, i), i)
})

const ReaderGeneric = C.fn3(function reader(x, i) {
  return this.$3(I.always(x), this.$2.$(this.$1(x, i), i))
})

export const reader = C.fn1(function reader(F, xi2yF) {
  return F === Identity
    ? Id
    : F === Select
      ? ReaderSelect(this.$1, xi2yF)
      : ReaderGeneric(this.$1, xi2yF, F.map)
})
