import * as S from './staged'
import {Call, Id, invoke} from './common'
import {Select} from './algebras'
import {toOptic} from './toOptic'

export const getAs = S.staged_x_xy_yz(
  Call,
  (xi2y, o) => toOptic(o).$(Select, xi2y),
  invoke
)

export const get = S.staged_x_xy(o => toOptic(o).$(Select, Id), invoke)
