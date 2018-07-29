import * as I from 'infestines'

function Applicative(map, of, ap) {
  if (!this) return new Applicative(map, of, ap)
  this.map = map
  this.of = of
  this.ap = ap
}

const Monad = I.inherit(function Monad(map, of, ap, chain) {
  if (!this) return new Monad(map, of, ap, chain)
  Applicative.call(this, map, of, ap)
  this.chain = chain
}, Applicative)

const ConstantWith = (ap, empty) => Applicative(I.sndU, I.always(empty), ap)

export const Identity = Monad(I.applyU, I.id, I.applyU, I.applyU)

export const Select = ConstantWith((l, r) => (undefined !== l ? l : r))

export const Sum = ConstantWith((x, y) => x + y, 0)
