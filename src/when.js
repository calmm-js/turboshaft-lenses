import * as C from './closure'
import {Identity, Select} from './algebras'

const WhenIdentity = C.fn2(function when(x, i) {
  return this.$1(x, i) ? this.$2.$(x, i) : x
})

const WhenSelect = C.fn2(function when(x, i) {
  return this.$1(x, i) ? this.$2.$(x, i) : undefined
})

const WhenGeneric = C.fn3(function when(x, i) {
  return this.$1(x, i) ? this.$2.$(x, i) : this.$3(x)
})

export const when = C.fn1(function when(F, xi2yF) {
  return F === Identity
    ? WhenIdentity(this.$1, xi2yF)
    : F === Select
      ? WhenSelect(this.$1, xi2yF)
      : WhenGeneric(this.$1, xi2yF, F.of)
})
