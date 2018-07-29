import * as C from './closure'
import {Identity, Select} from './algebras'

const propGet = (p, x) => (null != x ? x[p] : undefined)

// TODO: This is slow
function propSet(p, x, y) {
  const r = Object.assign({}, x)
  if (undefined === y) {
    delete r[p]
  } else {
    r[p] = y
  }
  return r
}

const PropSelect = C.fn2(function prop(x, _) {
  const p = this.$1
  return this.$2.$(propGet(p, x), p)
})

const PropIdentity = C.fn2(function prop(x, _) {
  const p = this.$1
  return propSet(p, x, this.$2.$(propGet(p, x), p))
})

const PropGeneric = C.fn3(function prop(x, _) {
  const p = this.$1
  return this.$3(y => propSet(p, x, y), this.$2.$(propGet(p, x), p))
})

export const prop = C.fn1(function prop(F, xi2yF) {
  return F === Identity
    ? PropIdentity(this.$1, xi2yF)
    : F === Select
      ? PropSelect(this.$1, xi2yF)
      : PropGeneric(this.$1, xi2yF, F.map)
})
