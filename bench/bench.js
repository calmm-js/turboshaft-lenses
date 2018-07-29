'use strict'

const I = require('infestines')
const R = require('ramda')
const m = require('most')

const L = require('partial.lenses')
const T = require('../dist/turboshaft-lenses.js')

const ignore = () => {}
const inc = x => x + 1
const add = (x, y) => x + y

const xyzn = {x: {y: {z: 1}}}
const xs100 = Array(100).fill(1)
const xs1000000 = Array(1000000).fill(1)
const xs1000 = Array(1000).fill(1)
const xsss100 = Array(100).fill([[1]])
const xssss100 = Array(100).fill([[[0, 1], [2, 3]], [[4, 5, 6], [7, 8, 9]]])

const T_e_e_e_e = T.toOptic([T.elems, T.elems, T.elems, T.elems])
const L_e_e_e_e = L.toFunction([L.elems, L.elems, L.elems, L.elems])

const T_x = T.toOptic('x')
const L_x = L.toFunction('x')
const T_get_x = T.get(T_x)
const L_get_x = L.get(L_x)
const T_xyz = T.toOptic(['x', 'y', 'z'])
const T_get_xyz = T.get(T_xyz)
const L_xyz = L.toFunction(['x', 'y', 'z'])
const L_get_xyz = L.get(L_xyz)

const propGet = (p, x) => (null != x ? x[p] : undefined)

const benchmarks = [
  [
    () => L.get('x', xyzn),
    () => L.get(L_x, xyzn),
    () => L_get_x(xyzn),
    () => T.get('x', xyzn),
    () => T.get(T_x, xyzn),
    () => T_get_x(xyzn),
    () => propGet('x', xyzn)
  ],
  [
    () => L.get(L_xyz, xyzn),
    () => L.get(['x', 'y', 'z'], xyzn),
    () => L_get_xyz(xyzn),
    () => T.get(T_xyz, xyzn),
    () => T.get(['x', 'y', 'z'], xyzn),
    () => T_get_xyz(xyzn),
    () => propGet('z', propGet('y', propGet('x', xyzn)))
  ],
  [
    () => xs100.map(inc),
    () => T.modify(T.elems, inc, xs100),
    () => L.modify(T.elems, inc, xs100)
  ],
  [
    () => xs1000.map(inc),
    () => T.modify(T.elems, inc, xs1000),
    () => L.modify(T.elems, inc, xs1000)
  ],
  [
    () => xs1000000.map(inc),
    () => T.modify(T.elems, inc, xs1000000),
    () => L.modify(T.elems, inc, xs1000000)
  ],
  [
    () => xs1000000.reduce(add, 0),
    () => T.sum(T.elems, xs1000000),
    () => L.sum(L.elems, xs1000000),
    () => T.foldl(add, 0, T.elems, xs1000000),
    () => L.foldl(add, 0, L.elems, xs1000000),
    [
      d => m.reduce(add, 0, m.from(xs1000000)).then(() => d.resolve()),
      {defer: true}
    ]
  ],
  [
    () => xs100.reduce(add, 0),
    () => T.sum(T.elems, xs100),
    () => L.sum(L.elems, xs100),
    () => T.foldl(add, 0, T.elems, xs100),
    () => L.foldl(add, 0, L.elems, xs100),
    [
      d => m.reduce(add, 0, m.from(xs100)).then(() => d.resolve()),
      {defer: true}
    ]
  ],
  [
    () =>
      xssss100.reduce(
        (s, xsss) =>
          xsss.reduce(
            (s, xss) => xss.reduce((s, xs) => xs.reduce(add, s), s),
            s
          ),
        0
      ),
    () => T.sum(T_e_e_e_e, xssss100),
    () => L.sum(L_e_e_e_e, xssss100),
    () => T.foldl(add, 0, T_e_e_e_e, xsss100),
    () => L.foldl(add, 0, L_e_e_e_e, xsss100),
    [
      d =>
        m
          .reduce(
            add,
            0,
            m.chain(m.from, m.chain(m.from, m.chain(m.from, m.from(xssss100))))
          )
          .then(() => d.resolve()),
      {defer: true}
    ]
  ],
  [
    () => T.getAs(x => (x > 3 ? x : undefined), T.elems, xs1000),
    () => T.get([T.elems, T.when(x => x > 3)], xs1000),
    () => L.selectAs(x => (x > 3 ? x : undefined), L.elems, xs1000)
  ],
  [
    () => T.getAs(x => (x > 3 ? x : undefined), T_e_e_e_e, xssss100),
    () => T.get([T_e_e_e_e, T.when(x => x > 3)], xssss100),
    () => L.selectAs(x => (x > 3 ? x : undefined), L_e_e_e_e, xssss100)
  ],
  [
    () =>
      L.sum(
        [L.elems, x => x + 1, x => x * 2, L.when(x => x % 2 === 0)],
        xs1000
      ),
    () =>
      T.sum(
        [T.elems, x => x + 1, x => x * 2, T.when(x => x % 2 === 0)],
        xs1000
      ),
    () =>
      T.foldl(
        add,
        0,
        [T.elems, x => x + 1, x => x * 2, T.when(x => x % 2 === 0)],
        xs1000
      ),
    () =>
      xs1000
        .map(x => x + 1)
        .map(x => x * 2)
        .filter(x => x % 2 === 0)
        .reduce((s, x) => s + x, 0),
    () => {
      const xs = xs1000
      let s = 0
      for (let i = 0, n = xs.length; i < n; ++i) {
        let x = xs[i]
        x = x + 1
        x = x * 2
        if (x % 2 === 0) s = s + x
      }
      return s
    }
  ],
  [
    () =>
      T.forEach(
        ignore,
        [
          T.elems,
          T.when(I.id),
          T.elems,
          T.when(I.id),
          T.elems,
          T.elems,
          T.when(I.id)
        ],
        xssss100
      ),
    () =>
      L.forEach(
        ignore,
        [
          L.elems,
          L.when(I.id),
          L.elems,
          L.when(I.id),
          L.elems,
          L.elems,
          L.when(I.id)
        ],
        xssss100
      )
  ],
  [
    () =>
      T.modify(
        [
          T.elems,
          T.when(I.id),
          T.elems,
          T.elems,
          T.when(I.id),
          T.elems,
          T.when(I.id)
        ],
        inc,
        xssss100
      ),
    () =>
      L.modify(
        [
          L.elems,
          L.when(I.id),
          L.elems,
          L.elems,
          L.when(I.id),
          L.elems,
          L.when(I.id)
        ],
        inc,
        xssss100
      )
  ]
]

const {sprintf} = require('sprintf-js')

const Benchmark = require('benchmark')
Benchmark.options.maxTime = Number(process.argv[2]) || Benchmark.options.maxTime

function runBenchmarks(i) {
  if (benchmarks.length <= i) return

  const bs = benchmarks[i]
  global.gc()
  const s = new Benchmark.Suite()
  bs.forEach(b => {
    b = b instanceof Array ? b : [b]
    const fn = b[0]
    const options = b[1] || {}
    const text = fn
      .toString()
      .replace(/([^({}[,>])\n/g, '$1;')
      .replace(/[ \n]+/g, ' ')
      .replace(/ ([.}\])])/g, '$1')
      .replace(/([([{]) /g, '$1')
      .replace(/;([.}\])])/g, '$1')
      .replace(/^(\(\)|d) => /, '')
      .replace(/\.then\(\(\) => d\.resolve\(\)\)$/, '')
    s.add(text, Object.assign({fn, note: ''}, options))
  })
  s.on('complete', function() {
    const bs = I.seq(
      this,
      R.values,
      R.filter(R.is(Benchmark)),
      R.sortBy(T.get('hz')),
      R.reverse
    )
    const fastest = bs[0]
    bs.forEach(b => {
      console.log(
        sprintf(
          '%14s/s %8.2f   %s%s%s',
          Math.round(b.hz).toLocaleString(),
          fastest.hz / b.hz,
          b.name,
          b.options.note && ' -- ',
          b.options.note
        )
      )
    })
    console.log()
    runBenchmarks(i + 1)
  })
  s.run({async: true})
}

runBenchmarks(0)
