'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var I = require('infestines');

var copyName = process.env.NODE_ENV === 'production' ? function (x) {
  return x;
} : function (to, from) {
  return I.defineNameU(to, from.name);
};

var mkC = function mkC($, Con) {
  return I.inherit(copyName(Con, $), Object, { $: $ });
};

function constant($) {
  var C = mkC($, function Constant() {});
  return new C();
}

var c1 = function c1($) {
  return mkC($, function Fn1($1) {
    this.$1 = $1;
  });
};

function fn1($) {
  var C = c1($);
  return copyName(function ($1) {
    return new C($1);
  }, $);
}

var c2 = function c2($) {
  return mkC($, function Fn2($1, $2) {
    this.$1 = $1;
    this.$2 = $2;
  });
};

function fn2($) {
  var C = c2($);
  return copyName(function ($1, $2) {
    return new C($1, $2);
  }, $);
}

var c3 = function c3($) {
  return mkC($, function Fn3($1, $2, $3) {
    this.$1 = $1;
    this.$2 = $2;
    this.$3 = $3;
  });
};

function fn3($) {
  var C = c3($);
  return copyName(function ($1, $2, $3) {
    return new C($1, $2, $3);
  }, $);
}

var identity = /*#__PURE__*/constant(function identity(F, xi2yF) {
  return xi2yF;
});

var copyToFrom = function copyToFrom(ys, k, xs, i, j) {
  while (i < j) {
    ys[k++] = xs[i++];
  }return ys;
};

var indexGet = function indexGet(i, x) {
  if (null == x) return undefined;
  var n = x.length;
  return n >> 0 === n && i < n ? x[i] : undefined;
};

var indexSet = function indexSet(i, xs) {
  return function (x) {
    var n = 0;
    if (null == xs || (n = xs.length, n >> 0 !== n) || n < 0) {
      n = 0;
      xs = '';
    }
    if (undefined !== x) {
      var m = Math.max(i + 1, n);
      var ys = Array(m);
      for (var j = 0; j < m; ++j) {
        ys[j] = xs[j];
      }ys[i] = x;
      return ys;
    } else {
      if (n <= i) return copyToFrom(Array(n), 0, xs, 0, n);
      var _ys = Array(n - 1);
      for (var _j = 0; _j < i; ++_j) {
        _ys[_j] = xs[_j];
      }for (var _j2 = i + 1; _j2 < n; ++_j2) {
        _ys[_j2 - 1] = xs[_j2];
      }return _ys;
    }
  };
};

var IndexGeneric = /*#__PURE__*/fn3(function index(x, _) {
  var p = this.$1;
  return this.$2.map(indexSet(p, x), this.$3.$(indexGet(p, x), p));
});

var index = /*#__PURE__*/fn1(function index(F, xi2yF) {
  return IndexGeneric(this.$1, F, xi2yF);
});

var o = /*#__PURE__*/fn2(function o(F, zk2wF) {
  return this.$1.$(F, this.$2.$(F, zk2wF));
});

function Applicative(map, of, ap) {
  if (!this) return new Applicative(map, of, ap);
  this.map = map;
  this.of = of;
  this.ap = ap;
}

var Monad = /*#__PURE__*/I.inherit(function Monad(map, of, ap, chain) {
  if (!this) return new Monad(map, of, ap, chain);
  Applicative.call(this, map, of, ap);
  this.chain = chain;
}, Applicative);

var ConstantWith = function ConstantWith(ap, empty) {
  return Applicative(I.sndU, I.always(empty), ap);
};

var Identity = /*#__PURE__*/Monad(I.applyU, I.id, I.applyU, I.applyU);

var Select = /*#__PURE__*/ConstantWith(function (l, r) {
  return undefined !== l ? l : r;
});

var Sum = /*#__PURE__*/ConstantWith(function (x, y) {
  return x + y;
}, 0);

var propGet = function propGet(p, x) {
  return null != x ? x[p] : undefined;
};

// TODO: This is slow
function propSet(p, x, y) {
  var r = Object.assign({}, x);
  if (undefined === y) {
    delete r[p];
  } else {
    r[p] = y;
  }
  return r;
}

var PropSelect = /*#__PURE__*/fn2(function prop(x, _) {
  var p = this.$1;
  return this.$2.$(propGet(p, x), p);
});

var PropIdentity = /*#__PURE__*/fn2(function prop(x, _) {
  var p = this.$1;
  return propSet(p, x, this.$2.$(propGet(p, x), p));
});

var PropGeneric = /*#__PURE__*/fn3(function prop(x, _) {
  var p = this.$1;
  return this.$3(function (y) {
    return propSet(p, x, y);
  }, this.$2.$(propGet(p, x), p));
});

var prop = /*#__PURE__*/fn1(function prop(F, xi2yF) {
  return F === Identity ? PropIdentity(this.$1, xi2yF) : F === Select ? PropSelect(this.$1, xi2yF) : PropGeneric(this.$1, xi2yF, F.map);
});

var Always = /*#__PURE__*/fn1(function always(_x, _i) {
  return this.$1;
});

var Call = /*#__PURE__*/fn1(function call(x, i) {
  return this.$1(x, i);
});

var Id = /*#__PURE__*/constant(function id(x, _i) {
  return x;
});

var Unto = /*#__PURE__*/fn1(function unto0(x, _i) {
  return undefined === x ? this.$1 : x;
});

var invoke = function invoke(c, s) {
  return c.$(s, undefined);
};

var ReaderSelect = /*#__PURE__*/fn2(function reader(x, i) {
  return this.$2.$(this.$1(x, i), i);
});

var ReaderGeneric = /*#__PURE__*/fn3(function reader(x, i) {
  return this.$3(I.always(x), this.$2.$(this.$1(x, i), i));
});

var reader = /*#__PURE__*/fn1(function reader(F, xi2yF) {
  return F === Identity ? Id : F === Select ? ReaderSelect(this.$1, xi2yF) : ReaderGeneric(this.$1, xi2yF, F.map);
});

function toOptic(x) {
  switch (typeof x) {
    case 'string':
      return prop(x);
    case 'number':
      return index(x);
    case 'object':
      {
        if (Array.isArray(x)) {
          var n = x.length;
          if (n === 0) {
            return identity;
          } else {
            var r = toOptic(x[--n]);
            while (n) {
              r = o(toOptic(x[--n]), r);
            }return r;
          }
        } else {
          return x;
        }
      }
    default:
      return reader(x);
  }
}

var consExcept = function consExcept(skip) {
  return function (t) {
    return function (h) {
      return skip !== h ? [h, t] : t;
    };
  };
};

var pushTo = function pushTo(n, xs) {
  while (consExcept !== n) {
    xs.push(n[0]);
    n = n[1];
  }
  return xs;
};

var consTo = function consTo(n) {
  return pushTo(n, []).reverse();
};

var ElemsIdentity = /*#__PURE__*/fn2(function elems(xs, n) {
  if (null != xs && (n = xs.length, n >> 0 === n && 0 < n)) {
    var xi2y = this.$1;
    var skip = this.$2;
    var ys = Array(n);
    var j = 0;
    var same = true;
    for (var i = 0; i < n; ++i) {
      var x = xs[i];
      var y = xi2y.$(x, i);
      if (skip !== y) {
        ys[j++] = y;
        if (same) same = x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
    }
    if (j !== n) {
      ys.length = j;
      return ys;
    } else if (same) {
      return xs;
    } else {
      return ys;
    }
  } else {
    return xs;
  }
});

var ElemsSelect = /*#__PURE__*/fn1(function elems(xs, n) {
  if (null != xs && (n = xs.length, n >> 0 === n && 0 < n)) {
    var xi2y = this.$1;
    for (var i = 0; i < n; ++i) {
      var y = xi2y.$(xs[i], i);
      if (undefined !== y) return y;
    }
  }
});

var ElemsGeneric = /*#__PURE__*/fn2(function elems(xs, _) {
  var _$ = this.$1,
      map = _$.map,
      ap = _$.ap,
      of = _$.of;

  if (null == xs) return of(xs);
  var n = xs.length;
  if (n >> 0 !== n || n < 0) return of(xs);
  var xsA = of(consExcept);
  var xi2yF = this.$2;
  if (map === I.sndU) {
    for (var i = 0; i < n; ++i) {
      xsA = ap(xsA, xi2yF.$(xs[i], i));
    }return xsA;
  } else {
    var cons = consExcept(undefined /*skip*/);
    for (var _i = 0; _i < n; ++_i) {
      xsA = ap(map(cons, xsA), xi2yF.$(xs[_i], _i));
    }return map(consTo, xsA);
  }
});

var elems = /*#__PURE__*/constant(function elems(F, xi2yF) {
  return F === Identity ? ElemsIdentity(xi2yF) : F === Select ? ElemsSelect(xi2yF) : ElemsGeneric(F, xi2yF);
});

var WhenIdentity = /*#__PURE__*/fn2(function when(x, i) {
  return this.$1(x, i) ? this.$2.$(x, i) : x;
});

var WhenSelect = /*#__PURE__*/fn2(function when(x, i) {
  return this.$1(x, i) ? this.$2.$(x, i) : undefined;
});

var WhenGeneric = /*#__PURE__*/fn3(function when(x, i) {
  return this.$1(x, i) ? this.$2.$(x, i) : this.$3(x);
});

var when = /*#__PURE__*/fn1(function when(F, xi2yF) {
  return F === Identity ? WhenIdentity(this.$1, xi2yF) : F === Select ? WhenSelect(this.$1, xi2yF) : WhenGeneric(this.$1, xi2yF, F.of);
});

var staged_x_xy = function staged_x_xy(fx, fxy) {
  return function staged(x, y) {
    x = fx(x);
    if (arguments.length < 2) return function staged(y) {
      return fxy(x, y);
    };
    return fxy(x, y);
  };
};

var staged_x_xy_yz = function staged_x_xy_yz(fx, fxy, fyz) {
  return function staged(x, y, z) {
    x = fx(x);
    if (arguments.length < 2) return function staged(y, z) {
      y = fxy(x, y);
      if (arguments.length < 2) return function staged(z) {
        return fyz(y, z);
      };
      return fyz(y, z);
    };
    y = fxy(x, y);
    if (arguments.length < 3) return function staged(z) {
      return fyz(y, z);
    };
    return fyz(y, z);
  };
};

var ForEach = /*#__PURE__*/fn1(function forEach(x, i) {
  this.$1(x, i);
});

var forEach = /*#__PURE__*/staged_x_xy_yz(ForEach, function (xi2u, o) {
  return toOptic(o).$(Select, xi2u);
}, invoke);

var Foldl = /*#__PURE__*/fn2(function foldl(x, i) {
  this.$2 = this.$1(this.$2, x, i);
});

var foldl = /*#__PURE__*/I.curry(function foldl(axi2a, a, o, s) {
  var r = Foldl(axi2a, a);
  toOptic(o).$(Select, r).$(s, undefined);
  return r.$2;
});

var getAs = /*#__PURE__*/staged_x_xy_yz(Call, function (xi2y, o) {
  return toOptic(o).$(Select, xi2y);
}, invoke);

var get = /*#__PURE__*/staged_x_xy(function (o) {
  return toOptic(o).$(Select, Id);
}, invoke);

var modify = /*#__PURE__*/staged_x_xy_yz(toOptic, function (o, xi2y) {
  return o.$(Identity, Call(xi2y));
}, invoke);

var set = /*#__PURE__*/staged_x_xy_yz(toOptic, function (o, v) {
  return o.$(Identity, Always(v));
}, invoke);

var Unto0 = /*#__PURE__*/Unto(0);

var sum = /*#__PURE__*/staged_x_xy(function (o) {
  return toOptic(o).$(Sum, Unto0);
}, invoke);

exports.toOptic = toOptic;
exports.elems = elems;
exports.when = when;
exports.forEach = forEach;
exports.foldl = foldl;
exports.get = get;
exports.getAs = getAs;
exports.modify = modify;
exports.set = set;
exports.sum = sum;
