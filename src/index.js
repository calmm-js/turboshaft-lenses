import * as C from './closure'

const copyToFrom = (ys, k, xs, i, j) => {
  while (i < j) ys[k++] = xs[i++]
  return ys
}

const indexGet = (i, x) => {
  if (null == x) return undefined
  const n = x.length
  return n >> 0 === n && i < n ? x[i] : undefined
}

const indexSet = (i, xs) => x => {
  let n = 0
  if (null == xs || ((n = xs.length), n >> 0 !== n) || n < 0) {
    n = 0
    xs = ''
  }
  if (undefined !== x) {
    const m = Math.max(i + 1, n)
    const ys = Array(m)
    for (let j = 0; j < m; ++j) ys[j] = xs[j]
    ys[i] = x
    return ys
  } else {
    if (n <= i) return copyToFrom(Array(n), 0, xs, 0, n)
    const ys = Array(n - 1)
    for (let j = 0; j < i; ++j) ys[j] = xs[j]
    for (let j = i + 1; j < n; ++j) ys[j - 1] = xs[j]
    return ys
  }
}

const IndexGeneric = C.fn3(function index(x, _) {
  const p = this.$1
  return this.$2.map(indexSet(p, x), this.$3.$(indexGet(p, x), p))
})

export const index = C.fn1(function index(F, xi2yF) {
  return IndexGeneric(this.$1, F, xi2yF)
})
