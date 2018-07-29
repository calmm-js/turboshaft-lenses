import * as I from 'infestines'

const copyName =
  process.env.NODE_ENV === 'production'
    ? x => x
    : (to, from) => I.defineNameU(to, from.name)

const mkC = ($, Con) => I.inherit(copyName(Con, $), Object, {$})

export function constant($) {
  const C = mkC($, function Constant() {})
  return new C()
}

const c1 = $ =>
  mkC($, function Fn1($1) {
    this.$1 = $1
  })

export function fn1($) {
  const C = c1($)
  return copyName($1 => new C($1), $)
}

const c2 = $ =>
  mkC($, function Fn2($1, $2) {
    this.$1 = $1
    this.$2 = $2
  })

export function fn2($) {
  const C = c2($)
  return copyName(($1, $2) => new C($1, $2), $)
}

const c3 = $ =>
  mkC($, function Fn3($1, $2, $3) {
    this.$1 = $1
    this.$2 = $2
    this.$3 = $3
  })

export function fn3($) {
  const C = c3($)
  return copyName(($1, $2, $3) => new C($1, $2, $3), $)
}
