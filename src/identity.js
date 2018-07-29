import * as C from './closure'

export const identity = C.constant(function identity(F, xi2yF) {
  return xi2yF
})
