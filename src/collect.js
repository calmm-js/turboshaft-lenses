import * as C from './closure'
import * as S from './staged'
import {Select} from './algebras'
import {invoke} from './common'
import {toOptic} from './toOptic'

const Collect = C.fn1(function collect(x, _i) {
  if (undefined !== x) this.$1.push(x)
})

export const collect = S.staged_x_xy(toOptic, (o, s) => {
  const r = Collect([])
  invoke(o.$(Select, r), s)
  return r.$1
})
