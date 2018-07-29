import * as I from 'infestines'

import * as C from './closure'
import {Identity, Select} from './algebras'

const consExcept = skip => t => h => (skip !== h ? [h, t] : t)

const pushTo = (n, xs) => {
  while (consExcept !== n) {
    xs.push(n[0])
    n = n[1]
  }
  return xs
}

const consTo = n => pushTo(n, []).reverse()

const ElemsIdentity = C.fn2(function elems(xs, n) {
  if (null != xs && ((n = xs.length), n >> 0 === n && 0 < n)) {
    const xi2y = this.$1
    const skip = this.$2
    const ys = Array(n)
    let j = 0
    let same = true
    for (let i = 0; i < n; ++i) {
      const x = xs[i]
      const y = xi2y.$(x, i)
      if (skip !== y) {
        ys[j++] = y
        if (same)
          same =
            (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
      }
    }
    if (j !== n) {
      ys.length = j
      return ys
    } else if (same) {
      return xs
    } else {
      return ys
    }
  } else {
    return xs
  }
})

const ElemsSelect = C.fn1(function elems(xs, n) {
  if (null != xs && ((n = xs.length), n >> 0 === n && 0 < n)) {
    const xi2y = this.$1
    for (let i = 0; i < n; ++i) {
      const y = xi2y.$(xs[i], i)
      if (undefined !== y) return y
    }
  }
})

const ElemsGeneric = C.fn2(function elems(xs, _) {
  const {map, ap, of} = this.$1
  if (null == xs) return of(xs)
  const n = xs.length
  if (n >> 0 !== n || n < 0) return of(xs)
  let xsA = of(consExcept)
  const xi2yF = this.$2
  if (map === I.sndU) {
    for (let i = 0; i < n; ++i) xsA = ap(xsA, xi2yF.$(xs[i], i))
    return xsA
  } else {
    const cons = consExcept(undefined /*skip*/)
    for (let i = 0; i < n; ++i) xsA = ap(map(cons, xsA), xi2yF.$(xs[i], i))
    return map(consTo, xsA)
  }
})

export const elems = C.constant(function elems(F, xi2yF) {
  return F === Identity
    ? ElemsIdentity(xi2yF)
    : F === Select
      ? ElemsSelect(xi2yF)
      : ElemsGeneric(F, xi2yF)
})
