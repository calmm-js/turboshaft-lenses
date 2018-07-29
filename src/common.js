import * as C from './closure'

export const Always = C.fn1(function always(_x, _i) {
  return this.$1
})

export const Call = C.fn1(function call(x, i) {
  return this.$1(x, i)
})

export const Id = C.constant(function id(x, _i) {
  return x
})

export const Unto = C.fn1(function unto0(x, _i) {
  return undefined === x ? this.$1 : x
})

export const invoke = (c, s) => c.$(s, undefined)
