import * as S from './staged'
import {Always, invoke} from './common'
import {Identity} from './algebras'
import {toOptic} from './toOptic'

export const set = S.staged_x_xy_yz(
  toOptic,
  (o, v) => o.$(Identity, Always(v)),
  invoke
)
