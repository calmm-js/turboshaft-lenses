import * as S from './staged'
import {toOptic} from './toOptic'
import {Identity} from './algebras'
import {Call, invoke} from './common'

export const modify = S.staged_x_xy_yz(
  toOptic,
  (o, xi2y) => o.$(Identity, Call(xi2y)),
  invoke
)
