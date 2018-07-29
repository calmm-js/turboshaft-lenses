import * as S from './staged'
import {Sum} from './algebras'
import {Unto, invoke} from './common'
import {toOptic} from './toOptic'

const Unto0 = Unto(0)

export const sum = S.staged_x_xy(o => toOptic(o).$(Sum, Unto0), invoke)
