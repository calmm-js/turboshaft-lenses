import * as C from './closure'
import * as S from './staged'
import {Select} from './algebras'
import {invoke} from './common'
import {toOptic} from './toOptic'

const ForEach = C.fn1(function forEach(x, i) {
  this.$1(x, i)
})

export const forEach = S.staged_x_xy_yz(
  ForEach,
  (xi2u, o) => toOptic(o).$(Select, xi2u),
  invoke
)
