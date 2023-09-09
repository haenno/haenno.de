(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function Bo(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const ge = {},
  Cn = [],
  ot = () => {},
  Uu = () => !1,
  Wu = /^on[^a-z]/,
  Ci = (e) => Wu.test(e),
  No = (e) => e.startsWith("onUpdate:"),
  Oe = Object.assign,
  Fo = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  qu = Object.prototype.hasOwnProperty,
  le = (e, t) => qu.call(e, t),
  J = Array.isArray,
  Tn = (e) => Ti(e) === "[object Map]",
  Sl = (e) => Ti(e) === "[object Set]",
  Z = (e) => typeof e == "function",
  Ee = (e) => typeof e == "string",
  zo = (e) => typeof e == "symbol",
  ve = (e) => e !== null && typeof e == "object",
  Ll = (e) => ve(e) && Z(e.then) && Z(e.catch),
  Pl = Object.prototype.toString,
  Ti = (e) => Pl.call(e),
  Ku = (e) => Ti(e).slice(8, -1),
  $l = (e) => Ti(e) === "[object Object]",
  Vo = (e) =>
    Ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Yr = Bo(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Oi = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Yu = /-(\w)/g,
  pt = Oi((e) => e.replace(Yu, (t, n) => (n ? n.toUpperCase() : ""))),
  Qu = /\B([A-Z])/g,
  gn = Oi((e) => e.replace(Qu, "-$1").toLowerCase()),
  Ai = Oi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Qi = Oi((e) => (e ? `on${Ai(e)}` : "")),
  pr = (e, t) => !Object.is(e, t),
  Qr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  ei = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  co = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Us;
const uo = () =>
  Us ||
  (Us =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function ln(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        i = Ee(r) ? Zu(r) : ln(r);
      if (i) for (const o in i) t[o] = i[o];
    }
    return t;
  } else {
    if (Ee(e)) return e;
    if (ve(e)) return e;
  }
}
const Ju = /;(?![^(]*\))/g,
  Xu = /:([^]+)/,
  Gu = /\/\*[^]*?\*\//g;
function Zu(e) {
  const t = {};
  return (
    e
      .replace(Gu, "")
      .split(Ju)
      .forEach((n) => {
        if (n) {
          const r = n.split(Xu);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Pe(e) {
  let t = "";
  if (Ee(e)) t = e;
  else if (J(e))
    for (let n = 0; n < e.length; n++) {
      const r = Pe(e[n]);
      r && (t += r + " ");
    }
  else if (ve(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function Il(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ee(t) && (e.class = Pe(t)), n && (e.style = ln(n)), e;
}
const ef =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  tf = Bo(ef);
function Rl(e) {
  return !!e || e === "";
}
const Ie = (e) =>
    Ee(e)
      ? e
      : e == null
      ? ""
      : J(e) || (ve(e) && (e.toString === Pl || !Z(e.toString)))
      ? JSON.stringify(e, jl, 2)
      : String(e),
  jl = (e, t) =>
    t && t.__v_isRef
      ? jl(e, t.value)
      : Tn(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, i]) => ((n[`${r} =>`] = i), n),
            {}
          ),
        }
      : Sl(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ve(t) && !J(t) && !$l(t)
      ? String(t)
      : t;
let qe;
class Ml {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = qe),
      !t && qe && (this.index = (qe.scopes || (qe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = qe;
      try {
        return (qe = this), t();
      } finally {
        qe = n;
      }
    }
  }
  on() {
    qe = this;
  }
  off() {
    qe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i &&
          i !== this &&
          ((this.parent.scopes[this.index] = i), (i.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Dl(e) {
  return new Ml(e);
}
function nf(e, t = qe) {
  t && t.active && t.effects.push(e);
}
function Hl() {
  return qe;
}
function rf(e) {
  qe && qe.cleanups.push(e);
}
const Uo = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Bl = (e) => (e.w & Ut) > 0,
  Nl = (e) => (e.n & Ut) > 0,
  of = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ut;
  },
  sf = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const i = t[r];
        Bl(i) && !Nl(i) ? i.delete(e) : (t[n++] = i),
          (i.w &= ~Ut),
          (i.n &= ~Ut);
      }
      t.length = n;
    }
  },
  ti = new WeakMap();
let Gn = 0,
  Ut = 1;
const fo = 30;
let nt;
const cn = Symbol(""),
  ho = Symbol("");
class Wo {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      nf(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = nt,
      n = Ft;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = nt),
        (nt = this),
        (Ft = !0),
        (Ut = 1 << ++Gn),
        Gn <= fo ? of(this) : Ws(this),
        this.fn()
      );
    } finally {
      Gn <= fo && sf(this),
        (Ut = 1 << --Gn),
        (nt = this.parent),
        (Ft = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    nt === this
      ? (this.deferStop = !0)
      : this.active &&
        (Ws(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ws(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Ft = !0;
const Fl = [];
function zn() {
  Fl.push(Ft), (Ft = !1);
}
function Vn() {
  const e = Fl.pop();
  Ft = e === void 0 ? !0 : e;
}
function Fe(e, t, n) {
  if (Ft && nt) {
    let r = ti.get(e);
    r || ti.set(e, (r = new Map()));
    let i = r.get(n);
    i || r.set(n, (i = Uo())), zl(i);
  }
}
function zl(e, t) {
  let n = !1;
  Gn <= fo ? Nl(e) || ((e.n |= Ut), (n = !Bl(e))) : (n = !e.has(nt)),
    n && (e.add(nt), nt.deps.push(e));
}
function kt(e, t, n, r, i, o) {
  const s = ti.get(e);
  if (!s) return;
  let a = [];
  if (t === "clear") a = [...s.values()];
  else if (n === "length" && J(e)) {
    const l = Number(r);
    s.forEach((c, u) => {
      (u === "length" || u >= l) && a.push(c);
    });
  } else
    switch ((n !== void 0 && a.push(s.get(n)), t)) {
      case "add":
        J(e)
          ? Vo(n) && a.push(s.get("length"))
          : (a.push(s.get(cn)), Tn(e) && a.push(s.get(ho)));
        break;
      case "delete":
        J(e) || (a.push(s.get(cn)), Tn(e) && a.push(s.get(ho)));
        break;
      case "set":
        Tn(e) && a.push(s.get(cn));
        break;
    }
  if (a.length === 1) a[0] && po(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    po(Uo(l));
  }
}
function po(e, t) {
  const n = J(e) ? e : [...e];
  for (const r of n) r.computed && qs(r);
  for (const r of n) r.computed || qs(r);
}
function qs(e, t) {
  (e !== nt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function af(e, t) {
  var n;
  return (n = ti.get(e)) == null ? void 0 : n.get(t);
}
const lf = Bo("__proto__,__v_isRef,__isVue"),
  Vl = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(zo)
  ),
  cf = qo(),
  uf = qo(!1, !0),
  ff = qo(!0),
  Ks = df();
function df() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = ce(this);
        for (let o = 0, s = this.length; o < s; o++) Fe(r, "get", o + "");
        const i = r[t](...n);
        return i === -1 || i === !1 ? r[t](...n.map(ce)) : i;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        zn();
        const r = ce(this)[t].apply(this, n);
        return Vn(), r;
      };
    }),
    e
  );
}
function hf(e) {
  const t = ce(this);
  return Fe(t, "has", e), t.hasOwnProperty(e);
}
function qo(e = !1, t = !1) {
  return function (r, i, o) {
    if (i === "__v_isReactive") return !e;
    if (i === "__v_isReadonly") return e;
    if (i === "__v_isShallow") return t;
    if (i === "__v_raw" && o === (e ? (t ? Sf : Yl) : t ? Kl : ql).get(r))
      return r;
    const s = J(r);
    if (!e) {
      if (s && le(Ks, i)) return Reflect.get(Ks, i, o);
      if (i === "hasOwnProperty") return hf;
    }
    const a = Reflect.get(r, i, o);
    return (zo(i) ? Vl.has(i) : lf(i)) || (e || Fe(r, "get", i), t)
      ? a
      : _e(a)
      ? s && Vo(i)
        ? a
        : a.value
      : ve(a)
      ? e
        ? Jl(a)
        : Un(a)
      : a;
  };
}
const pf = Ul(),
  gf = Ul(!0);
function Ul(e = !1) {
  return function (n, r, i, o) {
    let s = n[r];
    if ($n(s) && _e(s) && !_e(i)) return !1;
    if (
      !e &&
      (!ni(i) && !$n(i) && ((s = ce(s)), (i = ce(i))), !J(n) && _e(s) && !_e(i))
    )
      return (s.value = i), !0;
    const a = J(n) && Vo(r) ? Number(r) < n.length : le(n, r),
      l = Reflect.set(n, r, i, o);
    return (
      n === ce(o) && (a ? pr(i, s) && kt(n, "set", r, i) : kt(n, "add", r, i)),
      l
    );
  };
}
function vf(e, t) {
  const n = le(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && kt(e, "delete", t, void 0), r;
}
function mf(e, t) {
  const n = Reflect.has(e, t);
  return (!zo(t) || !Vl.has(t)) && Fe(e, "has", t), n;
}
function yf(e) {
  return Fe(e, "iterate", J(e) ? "length" : cn), Reflect.ownKeys(e);
}
const Wl = { get: cf, set: pf, deleteProperty: vf, has: mf, ownKeys: yf },
  bf = {
    get: ff,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  _f = Oe({}, Wl, { get: uf, set: gf }),
  Ko = (e) => e,
  Si = (e) => Reflect.getPrototypeOf(e);
function Ir(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = ce(e),
    o = ce(t);
  n || (t !== o && Fe(i, "get", t), Fe(i, "get", o));
  const { has: s } = Si(i),
    a = r ? Ko : n ? Jo : gr;
  if (s.call(i, t)) return a(e.get(t));
  if (s.call(i, o)) return a(e.get(o));
  e !== i && e.get(t);
}
function Rr(e, t = !1) {
  const n = this.__v_raw,
    r = ce(n),
    i = ce(e);
  return (
    t || (e !== i && Fe(r, "has", e), Fe(r, "has", i)),
    e === i ? n.has(e) : n.has(e) || n.has(i)
  );
}
function jr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Fe(ce(e), "iterate", cn), Reflect.get(e, "size", e)
  );
}
function Ys(e) {
  e = ce(e);
  const t = ce(this);
  return Si(t).has.call(t, e) || (t.add(e), kt(t, "add", e, e)), this;
}
function Qs(e, t) {
  t = ce(t);
  const n = ce(this),
    { has: r, get: i } = Si(n);
  let o = r.call(n, e);
  o || ((e = ce(e)), (o = r.call(n, e)));
  const s = i.call(n, e);
  return (
    n.set(e, t), o ? pr(t, s) && kt(n, "set", e, t) : kt(n, "add", e, t), this
  );
}
function Js(e) {
  const t = ce(this),
    { has: n, get: r } = Si(t);
  let i = n.call(t, e);
  i || ((e = ce(e)), (i = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return i && kt(t, "delete", e, void 0), o;
}
function Xs() {
  const e = ce(this),
    t = e.size !== 0,
    n = e.clear();
  return t && kt(e, "clear", void 0, void 0), n;
}
function Mr(e, t) {
  return function (r, i) {
    const o = this,
      s = o.__v_raw,
      a = ce(s),
      l = t ? Ko : e ? Jo : gr;
    return (
      !e && Fe(a, "iterate", cn), s.forEach((c, u) => r.call(i, l(c), l(u), o))
    );
  };
}
function Dr(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      o = ce(i),
      s = Tn(o),
      a = e === "entries" || (e === Symbol.iterator && s),
      l = e === "keys" && s,
      c = i[e](...r),
      u = n ? Ko : t ? Jo : gr;
    return (
      !t && Fe(o, "iterate", l ? ho : cn),
      {
        next() {
          const { value: f, done: h } = c.next();
          return h
            ? { value: f, done: h }
            : { value: a ? [u(f[0]), u(f[1])] : u(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function At(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function wf() {
  const e = {
      get(o) {
        return Ir(this, o);
      },
      get size() {
        return jr(this);
      },
      has: Rr,
      add: Ys,
      set: Qs,
      delete: Js,
      clear: Xs,
      forEach: Mr(!1, !1),
    },
    t = {
      get(o) {
        return Ir(this, o, !1, !0);
      },
      get size() {
        return jr(this);
      },
      has: Rr,
      add: Ys,
      set: Qs,
      delete: Js,
      clear: Xs,
      forEach: Mr(!1, !0),
    },
    n = {
      get(o) {
        return Ir(this, o, !0);
      },
      get size() {
        return jr(this, !0);
      },
      has(o) {
        return Rr.call(this, o, !0);
      },
      add: At("add"),
      set: At("set"),
      delete: At("delete"),
      clear: At("clear"),
      forEach: Mr(!0, !1),
    },
    r = {
      get(o) {
        return Ir(this, o, !0, !0);
      },
      get size() {
        return jr(this, !0);
      },
      has(o) {
        return Rr.call(this, o, !0);
      },
      add: At("add"),
      set: At("set"),
      delete: At("delete"),
      clear: At("clear"),
      forEach: Mr(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = Dr(o, !1, !1)),
        (n[o] = Dr(o, !0, !1)),
        (t[o] = Dr(o, !1, !0)),
        (r[o] = Dr(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [xf, kf, Ef, Cf] = wf();
function Yo(e, t) {
  const n = t ? (e ? Cf : Ef) : e ? kf : xf;
  return (r, i, o) =>
    i === "__v_isReactive"
      ? !e
      : i === "__v_isReadonly"
      ? e
      : i === "__v_raw"
      ? r
      : Reflect.get(le(n, i) && i in r ? n : r, i, o);
}
const Tf = { get: Yo(!1, !1) },
  Of = { get: Yo(!1, !0) },
  Af = { get: Yo(!0, !1) },
  ql = new WeakMap(),
  Kl = new WeakMap(),
  Yl = new WeakMap(),
  Sf = new WeakMap();
function Lf(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Pf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Lf(Ku(e));
}
function Un(e) {
  return $n(e) ? e : Qo(e, !1, Wl, Tf, ql);
}
function Ql(e) {
  return Qo(e, !1, _f, Of, Kl);
}
function Jl(e) {
  return Qo(e, !0, bf, Af, Yl);
}
function Qo(e, t, n, r, i) {
  if (!ve(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = i.get(e);
  if (o) return o;
  const s = Pf(e);
  if (s === 0) return e;
  const a = new Proxy(e, s === 2 ? r : n);
  return i.set(e, a), a;
}
function zt(e) {
  return $n(e) ? zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function $n(e) {
  return !!(e && e.__v_isReadonly);
}
function ni(e) {
  return !!(e && e.__v_isShallow);
}
function Xl(e) {
  return zt(e) || $n(e);
}
function ce(e) {
  const t = e && e.__v_raw;
  return t ? ce(t) : e;
}
function Li(e) {
  return ei(e, "__v_skip", !0), e;
}
const gr = (e) => (ve(e) ? Un(e) : e),
  Jo = (e) => (ve(e) ? Jl(e) : e);
function Gl(e) {
  Ft && nt && ((e = ce(e)), zl(e.dep || (e.dep = Uo())));
}
function Zl(e, t) {
  e = ce(e);
  const n = e.dep;
  n && po(n);
}
function _e(e) {
  return !!(e && e.__v_isRef === !0);
}
function bt(e) {
  return ec(e, !1);
}
function $f(e) {
  return ec(e, !0);
}
function ec(e, t) {
  return _e(e) ? e : new If(e, t);
}
class If {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ce(t)),
      (this._value = n ? t : gr(t));
  }
  get value() {
    return Gl(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ni(t) || $n(t);
    (t = n ? t : ce(t)),
      pr(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : gr(t)), Zl(this));
  }
}
function ae(e) {
  return _e(e) ? e.value : e;
}
const Rf = {
  get: (e, t, n) => ae(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const i = e[t];
    return _e(i) && !_e(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function tc(e) {
  return zt(e) ? e : new Proxy(e, Rf);
}
function nc(e) {
  const t = J(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = rc(e, n);
  return t;
}
class jf {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return af(ce(this._object), this._key);
  }
}
class Mf {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function go(e, t, n) {
  return _e(e)
    ? e
    : Z(e)
    ? new Mf(e)
    : ve(e) && arguments.length > 1
    ? rc(e, t, n)
    : bt(e);
}
function rc(e, t, n) {
  const r = e[t];
  return _e(r) ? r : new jf(e, t, n);
}
class Df {
  constructor(t, n, r, i) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Wo(t, () => {
        this._dirty || ((this._dirty = !0), Zl(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ce(this);
    return (
      Gl(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Hf(e, t, n = !1) {
  let r, i;
  const o = Z(e);
  return (
    o ? ((r = e), (i = ot)) : ((r = e.get), (i = e.set)),
    new Df(r, i, o || !i, n)
  );
}
function Vt(e, t, n, r) {
  let i;
  try {
    i = r ? e(...r) : e();
  } catch (o) {
    Pi(o, t, n);
  }
  return i;
}
function st(e, t, n, r) {
  if (Z(e)) {
    const o = Vt(e, t, n, r);
    return (
      o &&
        Ll(o) &&
        o.catch((s) => {
          Pi(s, t, n);
        }),
      o
    );
  }
  const i = [];
  for (let o = 0; o < e.length; o++) i.push(st(e[o], t, n, r));
  return i;
}
function Pi(e, t, n, r = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const s = t.proxy,
      a = n;
    for (; o; ) {
      const c = o.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, s, a) === !1) return;
      }
      o = o.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Vt(l, null, 10, [e, s, a]);
      return;
    }
  }
  Bf(e, n, i, r);
}
function Bf(e, t, n, r = !0) {
  console.error(e);
}
let vr = !1,
  vo = !1;
const Le = [];
let dt = 0;
const On = [];
let wt = null,
  tn = 0;
const ic = Promise.resolve();
let Xo = null;
function $i(e) {
  const t = Xo || ic;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Nf(e) {
  let t = dt + 1,
    n = Le.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    mr(Le[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Go(e) {
  (!Le.length || !Le.includes(e, vr && e.allowRecurse ? dt + 1 : dt)) &&
    (e.id == null ? Le.push(e) : Le.splice(Nf(e.id), 0, e), oc());
}
function oc() {
  !vr && !vo && ((vo = !0), (Xo = ic.then(ac)));
}
function Ff(e) {
  const t = Le.indexOf(e);
  t > dt && Le.splice(t, 1);
}
function zf(e) {
  J(e)
    ? On.push(...e)
    : (!wt || !wt.includes(e, e.allowRecurse ? tn + 1 : tn)) && On.push(e),
    oc();
}
function Gs(e, t = vr ? dt + 1 : 0) {
  for (; t < Le.length; t++) {
    const n = Le[t];
    n && n.pre && (Le.splice(t, 1), t--, n());
  }
}
function sc(e) {
  if (On.length) {
    const t = [...new Set(On)];
    if (((On.length = 0), wt)) {
      wt.push(...t);
      return;
    }
    for (wt = t, wt.sort((n, r) => mr(n) - mr(r)), tn = 0; tn < wt.length; tn++)
      wt[tn]();
    (wt = null), (tn = 0);
  }
}
const mr = (e) => (e.id == null ? 1 / 0 : e.id),
  Vf = (e, t) => {
    const n = mr(e) - mr(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function ac(e) {
  (vo = !1), (vr = !0), Le.sort(Vf);
  const t = ot;
  try {
    for (dt = 0; dt < Le.length; dt++) {
      const n = Le[dt];
      n && n.active !== !1 && Vt(n, null, 14);
    }
  } finally {
    (dt = 0),
      (Le.length = 0),
      sc(),
      (vr = !1),
      (Xo = null),
      (Le.length || On.length) && ac();
  }
}
function Uf(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ge;
  let i = n;
  const o = t.startsWith("update:"),
    s = o && t.slice(7);
  if (s && s in r) {
    const u = `${s === "modelValue" ? "model" : s}Modifiers`,
      { number: f, trim: h } = r[u] || ge;
    h && (i = n.map((g) => (Ee(g) ? g.trim() : g))), f && (i = n.map(co));
  }
  let a,
    l = r[(a = Qi(t))] || r[(a = Qi(pt(t)))];
  !l && o && (l = r[(a = Qi(gn(t)))]), l && st(l, e, 6, i);
  const c = r[a + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), st(c, e, 6, i);
  }
}
function lc(e, t, n = !1) {
  const r = t.emitsCache,
    i = r.get(e);
  if (i !== void 0) return i;
  const o = e.emits;
  let s = {},
    a = !1;
  if (!Z(e)) {
    const l = (c) => {
      const u = lc(c, t, !0);
      u && ((a = !0), Oe(s, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !o && !a
    ? (ve(e) && r.set(e, null), null)
    : (J(o) ? o.forEach((l) => (s[l] = null)) : Oe(s, o),
      ve(e) && r.set(e, s),
      s);
}
function Ii(e, t) {
  return !e || !Ci(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      le(e, t[0].toLowerCase() + t.slice(1)) || le(e, gn(t)) || le(e, t));
}
let Te = null,
  Ri = null;
function ri(e) {
  const t = Te;
  return (Te = e), (Ri = (e && e.type.__scopeId) || null), t;
}
function Wf(e) {
  Ri = e;
}
function qf() {
  Ri = null;
}
const Kf = (e) => ke;
function ke(e, t = Te, n) {
  if (!t || e._n) return e;
  const r = (...i) => {
    r._d && ca(-1);
    const o = ri(t);
    let s;
    try {
      s = e(...i);
    } finally {
      ri(o), r._d && ca(1);
    }
    return s;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Ji(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: i,
    props: o,
    propsOptions: [s],
    slots: a,
    attrs: l,
    emit: c,
    render: u,
    renderCache: f,
    data: h,
    setupState: g,
    ctx: m,
    inheritAttrs: b,
  } = e;
  let y, _;
  const k = ri(e);
  try {
    if (n.shapeFlag & 4) {
      const C = i || r;
      (y = ft(u.call(C, C, f, o, g, h, m))), (_ = l);
    } else {
      const C = t;
      (y = ft(
        C.length > 1 ? C(o, { attrs: l, slots: a, emit: c }) : C(o, null)
      )),
        (_ = t.props ? l : Yf(l));
    }
  } catch (C) {
    (rr.length = 0), Pi(C, e, 1), (y = X(Et));
  }
  let P = y;
  if (_ && b !== !1) {
    const C = Object.keys(_),
      { shapeFlag: I } = P;
    C.length && I & 7 && (s && C.some(No) && (_ = Qf(_, s)), (P = In(P, _)));
  }
  return (
    n.dirs && ((P = In(P)), (P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (P.transition = n.transition),
    (y = P),
    ri(k),
    y
  );
}
const Yf = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Ci(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Qf = (e, t) => {
    const n = {};
    for (const r in e) (!No(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Jf(e, t, n) {
  const { props: r, children: i, component: o } = e,
    { props: s, children: a, patchFlag: l } = t,
    c = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? Zs(r, s, c) : !!s;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (s[h] !== r[h] && !Ii(c, h)) return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable)
      ? !0
      : r === s
      ? !1
      : r
      ? s
        ? Zs(r, s, c)
        : !0
      : !!s;
  return !1;
}
function Zs(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    if (t[o] !== e[o] && !Ii(n, o)) return !0;
  }
  return !1;
}
function Xf({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Gf = (e) => e.__isSuspense;
function Zf(e, t) {
  t && t.pendingBranch
    ? J(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : zf(e);
}
const Hr = {};
function er(e, t, n) {
  return cc(e, t, n);
}
function cc(
  e,
  t,
  { immediate: n, deep: r, flush: i, onTrack: o, onTrigger: s } = ge
) {
  var a;
  const l = Hl() === ((a = Ce) == null ? void 0 : a.scope) ? Ce : null;
  let c,
    u = !1,
    f = !1;
  if (
    (_e(e)
      ? ((c = () => e.value), (u = ni(e)))
      : zt(e)
      ? ((c = () => e), (r = !0))
      : J(e)
      ? ((f = !0),
        (u = e.some((C) => zt(C) || ni(C))),
        (c = () =>
          e.map((C) => {
            if (_e(C)) return C.value;
            if (zt(C)) return an(C);
            if (Z(C)) return Vt(C, l, 2);
          })))
      : Z(e)
      ? t
        ? (c = () => Vt(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return h && h(), st(e, l, 3, [g]);
          })
      : (c = ot),
    t && r)
  ) {
    const C = c;
    c = () => an(C());
  }
  let h,
    g = (C) => {
      h = k.onStop = () => {
        Vt(C, l, 4);
      };
    },
    m;
  if (_r)
    if (
      ((g = ot),
      t ? n && st(t, l, 3, [c(), f ? [] : void 0, g]) : c(),
      i === "sync")
    ) {
      const C = Kd();
      m = C.__watcherHandles || (C.__watcherHandles = []);
    } else return ot;
  let b = f ? new Array(e.length).fill(Hr) : Hr;
  const y = () => {
    if (k.active)
      if (t) {
        const C = k.run();
        (r || u || (f ? C.some((I, D) => pr(I, b[D])) : pr(C, b))) &&
          (h && h(),
          st(t, l, 3, [C, b === Hr ? void 0 : f && b[0] === Hr ? [] : b, g]),
          (b = C));
      } else k.run();
  };
  y.allowRecurse = !!t;
  let _;
  i === "sync"
    ? (_ = y)
    : i === "post"
    ? (_ = () => Me(y, l && l.suspense))
    : ((y.pre = !0), l && (y.id = l.uid), (_ = () => Go(y)));
  const k = new Wo(c, _);
  t
    ? n
      ? y()
      : (b = k.run())
    : i === "post"
    ? Me(k.run.bind(k), l && l.suspense)
    : k.run();
  const P = () => {
    k.stop(), l && l.scope && Fo(l.scope.effects, k);
  };
  return m && m.push(P), P;
}
function ed(e, t, n) {
  const r = this.proxy,
    i = Ee(e) ? (e.includes(".") ? uc(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  Z(t) ? (o = t) : ((o = t.handler), (n = t));
  const s = Ce;
  Rn(this);
  const a = cc(i, o.bind(r), n);
  return s ? Rn(s) : un(), a;
}
function uc(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let i = 0; i < n.length && r; i++) r = r[n[i]];
    return r;
  };
}
function an(e, t) {
  if (!ve(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), _e(e))) an(e.value, t);
  else if (J(e)) for (let n = 0; n < e.length; n++) an(e[n], t);
  else if (Sl(e) || Tn(e))
    e.forEach((n) => {
      an(n, t);
    });
  else if ($l(e)) for (const n in e) an(e[n], t);
  return e;
}
function ii(e, t) {
  const n = Te;
  if (n === null) return e;
  const r = Hi(n) || n.proxy,
    i = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [s, a, l, c = ge] = t[o];
    s &&
      (Z(s) && (s = { mounted: s, updated: s }),
      s.deep && an(a),
      i.push({
        dir: s,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function Jt(e, t, n, r) {
  const i = e.dirs,
    o = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    o && (a.oldValue = o[s].value);
    let l = a.dir[r];
    l && (zn(), st(l, n, 8, [e.el, a, e, t]), Vn());
  }
}
function Ae(e, t) {
  return Z(e) ? (() => Oe({ name: e.name }, t, { setup: e }))() : e;
}
const tr = (e) => !!e.type.__asyncLoader,
  fc = (e) => e.type.__isKeepAlive;
function td(e, t) {
  dc(e, "a", t);
}
function nd(e, t) {
  dc(e, "da", t);
}
function dc(e, t, n = Ce) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let i = n;
      for (; i; ) {
        if (i.isDeactivated) return;
        i = i.parent;
      }
      return e();
    });
  if ((ji(t, r, n), n)) {
    let i = n.parent;
    for (; i && i.parent; )
      fc(i.parent.vnode) && rd(r, t, n, i), (i = i.parent);
  }
}
function rd(e, t, n, r) {
  const i = ji(t, e, r, !0);
  hc(() => {
    Fo(r[t], i);
  }, n);
}
function ji(e, t, n = Ce, r = !1) {
  if (n) {
    const i = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...s) => {
          if (n.isUnmounted) return;
          zn(), Rn(n);
          const a = st(t, n, e, s);
          return un(), Vn(), a;
        });
    return r ? i.unshift(o) : i.push(o), o;
  }
}
const Tt =
    (e) =>
    (t, n = Ce) =>
      (!_r || e === "sp") && ji(e, (...r) => t(...r), n),
  id = Tt("bm"),
  Zo = Tt("m"),
  od = Tt("bu"),
  sd = Tt("u"),
  ad = Tt("bum"),
  hc = Tt("um"),
  ld = Tt("sp"),
  cd = Tt("rtg"),
  ud = Tt("rtc");
function fd(e, t = Ce) {
  ji("ec", e, t);
}
const pc = "components";
function De(e, t) {
  return hd(pc, e, !0, t) || e;
}
const dd = Symbol.for("v-ndc");
function hd(e, t, n = !0, r = !1) {
  const i = Te || Ce;
  if (i) {
    const o = i.type;
    if (e === pc) {
      const a = Ud(o, !1);
      if (a && (a === t || a === pt(t) || a === Ai(pt(t)))) return o;
    }
    const s = ea(i[e] || o[e], t) || ea(i.appContext[e], t);
    return !s && r ? o : s;
  }
}
function ea(e, t) {
  return e && (e[t] || e[pt(t)] || e[Ai(pt(t))]);
}
function oi(e, t, n, r) {
  let i;
  const o = n && n[r];
  if (J(e) || Ee(e)) {
    i = new Array(e.length);
    for (let s = 0, a = e.length; s < a; s++)
      i[s] = t(e[s], s, void 0, o && o[s]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let s = 0; s < e; s++) i[s] = t(s + 1, s, void 0, o && o[s]);
  } else if (ve(e))
    if (e[Symbol.iterator])
      i = Array.from(e, (s, a) => t(s, a, void 0, o && o[a]));
    else {
      const s = Object.keys(e);
      i = new Array(s.length);
      for (let a = 0, l = s.length; a < l; a++) {
        const c = s[a];
        i[a] = t(e[c], c, a, o && o[a]);
      }
    }
  else i = [];
  return n && (n[r] = i), i;
}
function Ke(e, t, n = {}, r, i) {
  if (Te.isCE || (Te.parent && tr(Te.parent) && Te.parent.isCE))
    return t !== "default" && (n.name = t), X("slot", n, r && r());
  let o = e[t];
  o && o._c && (o._d = !1), H();
  const s = o && gc(o(n)),
    a = He(
      me,
      { key: n.key || (s && s.key) || `_${t}` },
      s || (r ? r() : []),
      s && e._ === 1 ? 64 : -2
    );
  return (
    !i && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    a
  );
}
function gc(e) {
  return e.some((t) =>
    ai(t) ? !(t.type === Et || (t.type === me && !gc(t.children))) : !0
  )
    ? e
    : null;
}
const mo = (e) => (e ? (Tc(e) ? Hi(e) || e.proxy : mo(e.parent)) : null),
  nr = Oe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => mo(e.parent),
    $root: (e) => mo(e.root),
    $emit: (e) => e.emit,
    $options: (e) => es(e),
    $forceUpdate: (e) => e.f || (e.f = () => Go(e.update)),
    $nextTick: (e) => e.n || (e.n = $i.bind(e.proxy)),
    $watch: (e) => ed.bind(e),
  }),
  Xi = (e, t) => e !== ge && !e.__isScriptSetup && le(e, t),
  pd = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: i,
        props: o,
        accessCache: s,
        type: a,
        appContext: l,
      } = e;
      let c;
      if (t[0] !== "$") {
        const g = s[t];
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t];
            case 2:
              return i[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Xi(r, t)) return (s[t] = 1), r[t];
          if (i !== ge && le(i, t)) return (s[t] = 2), i[t];
          if ((c = e.propsOptions[0]) && le(c, t)) return (s[t] = 3), o[t];
          if (n !== ge && le(n, t)) return (s[t] = 4), n[t];
          yo && (s[t] = 0);
        }
      }
      const u = nr[t];
      let f, h;
      if (u) return t === "$attrs" && Fe(e, "get", t), u(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== ge && le(n, t)) return (s[t] = 4), n[t];
      if (((h = l.config.globalProperties), le(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: i, ctx: o } = e;
      return Xi(i, t)
        ? ((i[t] = n), !0)
        : r !== ge && le(r, t)
        ? ((r[t] = n), !0)
        : le(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: i,
          propsOptions: o,
        },
      },
      s
    ) {
      let a;
      return (
        !!n[s] ||
        (e !== ge && le(e, s)) ||
        Xi(t, s) ||
        ((a = o[0]) && le(a, s)) ||
        le(r, s) ||
        le(nr, s) ||
        le(i.config.globalProperties, s)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : le(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function gd() {
  return vd().slots;
}
function vd() {
  const e = Nd();
  return e.setupContext || (e.setupContext = Ac(e));
}
function ta(e) {
  return J(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let yo = !0;
function md(e) {
  const t = es(e),
    n = e.proxy,
    r = e.ctx;
  (yo = !1), t.beforeCreate && na(t.beforeCreate, e, "bc");
  const {
    data: i,
    computed: o,
    methods: s,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: g,
    updated: m,
    activated: b,
    deactivated: y,
    beforeDestroy: _,
    beforeUnmount: k,
    destroyed: P,
    unmounted: C,
    render: I,
    renderTracked: D,
    renderTriggered: U,
    errorCaptured: N,
    serverPrefetch: j,
    expose: W,
    inheritAttrs: Y,
    components: se,
    directives: G,
    filters: pe,
  } = t;
  if ((c && yd(c, r, null), s))
    for (const ee in s) {
      const re = s[ee];
      Z(re) && (r[ee] = re.bind(n));
    }
  if (i) {
    const ee = i.call(n, n);
    ve(ee) && (e.data = Un(ee));
  }
  if (((yo = !0), o))
    for (const ee in o) {
      const re = o[ee],
        Se = Z(re) ? re.bind(n, n) : Z(re.get) ? re.get.bind(n, n) : ot,
        ze = !Z(re) && Z(re.set) ? re.set.bind(n) : ot,
        je = ne({ get: Se, set: ze });
      Object.defineProperty(r, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => je.value,
        set: (we) => (je.value = we),
      });
    }
  if (a) for (const ee in a) vc(a[ee], r, n, ee);
  if (l) {
    const ee = Z(l) ? l.call(n) : l;
    Reflect.ownKeys(ee).forEach((re) => {
      Bt(re, ee[re]);
    });
  }
  u && na(u, e, "c");
  function q(ee, re) {
    J(re) ? re.forEach((Se) => ee(Se.bind(n))) : re && ee(re.bind(n));
  }
  if (
    (q(id, f),
    q(Zo, h),
    q(od, g),
    q(sd, m),
    q(td, b),
    q(nd, y),
    q(fd, N),
    q(ud, D),
    q(cd, U),
    q(ad, k),
    q(hc, C),
    q(ld, j),
    J(W))
  )
    if (W.length) {
      const ee = e.exposed || (e.exposed = {});
      W.forEach((re) => {
        Object.defineProperty(ee, re, {
          get: () => n[re],
          set: (Se) => (n[re] = Se),
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === ot && (e.render = I),
    Y != null && (e.inheritAttrs = Y),
    se && (e.components = se),
    G && (e.directives = G);
}
function yd(e, t, n = ot) {
  J(e) && (e = bo(e));
  for (const r in e) {
    const i = e[r];
    let o;
    ve(i)
      ? "default" in i
        ? (o = Re(i.from || r, i.default, !0))
        : (o = Re(i.from || r))
      : (o = Re(i)),
      _e(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (s) => (o.value = s),
          })
        : (t[r] = o);
  }
}
function na(e, t, n) {
  st(J(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function vc(e, t, n, r) {
  const i = r.includes(".") ? uc(n, r) : () => n[r];
  if (Ee(e)) {
    const o = t[e];
    Z(o) && er(i, o);
  } else if (Z(e)) er(i, e.bind(n));
  else if (ve(e))
    if (J(e)) e.forEach((o) => vc(o, t, n, r));
    else {
      const o = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(o) && er(i, o, e);
    }
}
function es(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: i,
      optionsCache: o,
      config: { optionMergeStrategies: s },
    } = e.appContext,
    a = o.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !i.length && !n && !r
      ? (l = t)
      : ((l = {}), i.length && i.forEach((c) => si(l, c, s, !0)), si(l, t, s)),
    ve(t) && o.set(t, l),
    l
  );
}
function si(e, t, n, r = !1) {
  const { mixins: i, extends: o } = t;
  o && si(e, o, n, !0), i && i.forEach((s) => si(e, s, n, !0));
  for (const s in t)
    if (!(r && s === "expose")) {
      const a = bd[s] || (n && n[s]);
      e[s] = a ? a(e[s], t[s]) : t[s];
    }
  return e;
}
const bd = {
  data: ra,
  props: ia,
  emits: ia,
  methods: Zn,
  computed: Zn,
  beforeCreate: $e,
  created: $e,
  beforeMount: $e,
  mounted: $e,
  beforeUpdate: $e,
  updated: $e,
  beforeDestroy: $e,
  beforeUnmount: $e,
  destroyed: $e,
  unmounted: $e,
  activated: $e,
  deactivated: $e,
  errorCaptured: $e,
  serverPrefetch: $e,
  components: Zn,
  directives: Zn,
  watch: wd,
  provide: ra,
  inject: _d,
};
function ra(e, t) {
  return t
    ? e
      ? function () {
          return Oe(
            Z(e) ? e.call(this, this) : e,
            Z(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function _d(e, t) {
  return Zn(bo(e), bo(t));
}
function bo(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function $e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Zn(e, t) {
  return e ? Oe(Object.create(null), e, t) : t;
}
function ia(e, t) {
  return e
    ? J(e) && J(t)
      ? [...new Set([...e, ...t])]
      : Oe(Object.create(null), ta(e), ta(t ?? {}))
    : t;
}
function wd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Oe(Object.create(null), e);
  for (const r in t) n[r] = $e(e[r], t[r]);
  return n;
}
function mc() {
  return {
    app: null,
    config: {
      isNativeTag: Uu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let xd = 0;
function kd(e, t) {
  return function (r, i = null) {
    Z(r) || (r = Oe({}, r)), i != null && !ve(i) && (i = null);
    const o = mc(),
      s = new Set();
    let a = !1;
    const l = (o.app = {
      _uid: xd++,
      _component: r,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Yd,
      get config() {
        return o.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          s.has(c) ||
            (c && Z(c.install)
              ? (s.add(c), c.install(l, ...u))
              : Z(c) && (s.add(c), c(l, ...u))),
          l
        );
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), l;
      },
      component(c, u) {
        return u ? ((o.components[c] = u), l) : o.components[c];
      },
      directive(c, u) {
        return u ? ((o.directives[c] = u), l) : o.directives[c];
      },
      mount(c, u, f) {
        if (!a) {
          const h = X(r, i);
          return (
            (h.appContext = o),
            u && t ? t(h, c) : e(h, c, f),
            (a = !0),
            (l._container = c),
            (c.__vue_app__ = l),
            Hi(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(c, u) {
        return (o.provides[c] = u), l;
      },
      runWithContext(c) {
        yr = l;
        try {
          return c();
        } finally {
          yr = null;
        }
      },
    });
    return l;
  };
}
let yr = null;
function Bt(e, t) {
  if (Ce) {
    let n = Ce.provides;
    const r = Ce.parent && Ce.parent.provides;
    r === n && (n = Ce.provides = Object.create(r)), (n[e] = t);
  }
}
function Re(e, t, n = !1) {
  const r = Ce || Te;
  if (r || yr) {
    const i = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : yr._context.provides;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return n && Z(t) ? t.call(r && r.proxy) : t;
  }
}
function Ed() {
  return !!(Ce || Te || yr);
}
function Cd(e, t, n, r = !1) {
  const i = {},
    o = {};
  ei(o, Di, 1), (e.propsDefaults = Object.create(null)), yc(e, t, i, o);
  for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
  n ? (e.props = r ? i : Ql(i)) : e.type.props ? (e.props = i) : (e.props = o),
    (e.attrs = o);
}
function Td(e, t, n, r) {
  const {
      props: i,
      attrs: o,
      vnode: { patchFlag: s },
    } = e,
    a = ce(i),
    [l] = e.propsOptions;
  let c = !1;
  if ((r || s > 0) && !(s & 16)) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (Ii(e.emitsOptions, h)) continue;
        const g = t[h];
        if (l)
          if (le(o, h)) g !== o[h] && ((o[h] = g), (c = !0));
          else {
            const m = pt(h);
            i[m] = _o(l, a, m, g, e, !1);
          }
        else g !== o[h] && ((o[h] = g), (c = !0));
      }
    }
  } else {
    yc(e, t, i, o) && (c = !0);
    let u;
    for (const f in a)
      (!t || (!le(t, f) && ((u = gn(f)) === f || !le(t, u)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[u] !== void 0) &&
            (i[f] = _o(l, a, f, void 0, e, !0))
          : delete i[f]);
    if (o !== a)
      for (const f in o) (!t || !le(t, f)) && (delete o[f], (c = !0));
  }
  c && kt(e, "set", "$attrs");
}
function yc(e, t, n, r) {
  const [i, o] = e.propsOptions;
  let s = !1,
    a;
  if (t)
    for (let l in t) {
      if (Yr(l)) continue;
      const c = t[l];
      let u;
      i && le(i, (u = pt(l)))
        ? !o || !o.includes(u)
          ? (n[u] = c)
          : ((a || (a = {}))[u] = c)
        : Ii(e.emitsOptions, l) ||
          ((!(l in r) || c !== r[l]) && ((r[l] = c), (s = !0)));
    }
  if (o) {
    const l = ce(n),
      c = a || ge;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = _o(i, l, f, c[f], e, !le(c, f));
    }
  }
  return s;
}
function _o(e, t, n, r, i, o) {
  const s = e[n];
  if (s != null) {
    const a = le(s, "default");
    if (a && r === void 0) {
      const l = s.default;
      if (s.type !== Function && !s.skipFactory && Z(l)) {
        const { propsDefaults: c } = i;
        n in c ? (r = c[n]) : (Rn(i), (r = c[n] = l.call(null, t)), un());
      } else r = l;
    }
    s[0] &&
      (o && !a ? (r = !1) : s[1] && (r === "" || r === gn(n)) && (r = !0));
  }
  return r;
}
function bc(e, t, n = !1) {
  const r = t.propsCache,
    i = r.get(e);
  if (i) return i;
  const o = e.props,
    s = {},
    a = [];
  let l = !1;
  if (!Z(e)) {
    const u = (f) => {
      l = !0;
      const [h, g] = bc(f, t, !0);
      Oe(s, h), g && a.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!o && !l) return ve(e) && r.set(e, Cn), Cn;
  if (J(o))
    for (let u = 0; u < o.length; u++) {
      const f = pt(o[u]);
      oa(f) && (s[f] = ge);
    }
  else if (o)
    for (const u in o) {
      const f = pt(u);
      if (oa(f)) {
        const h = o[u],
          g = (s[f] = J(h) || Z(h) ? { type: h } : Oe({}, h));
        if (g) {
          const m = la(Boolean, g.type),
            b = la(String, g.type);
          (g[0] = m > -1),
            (g[1] = b < 0 || m < b),
            (m > -1 || le(g, "default")) && a.push(f);
        }
      }
    }
  const c = [s, a];
  return ve(e) && r.set(e, c), c;
}
function oa(e) {
  return e[0] !== "$";
}
function sa(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function aa(e, t) {
  return sa(e) === sa(t);
}
function la(e, t) {
  return J(t) ? t.findIndex((n) => aa(n, e)) : Z(t) && aa(t, e) ? 0 : -1;
}
const _c = (e) => e[0] === "_" || e === "$stable",
  ts = (e) => (J(e) ? e.map(ft) : [ft(e)]),
  Od = (e, t, n) => {
    if (t._n) return t;
    const r = ke((...i) => ts(t(...i)), n);
    return (r._c = !1), r;
  },
  wc = (e, t, n) => {
    const r = e._ctx;
    for (const i in e) {
      if (_c(i)) continue;
      const o = e[i];
      if (Z(o)) t[i] = Od(i, o, r);
      else if (o != null) {
        const s = ts(o);
        t[i] = () => s;
      }
    }
  },
  xc = (e, t) => {
    const n = ts(t);
    e.slots.default = () => n;
  },
  Ad = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ce(t)), ei(t, "_", n)) : wc(t, (e.slots = {}));
    } else (e.slots = {}), t && xc(e, t);
    ei(e.slots, Di, 1);
  },
  Sd = (e, t, n) => {
    const { vnode: r, slots: i } = e;
    let o = !0,
      s = ge;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (o = !1)
          : (Oe(i, t), !n && a === 1 && delete i._)
        : ((o = !t.$stable), wc(t, i)),
        (s = t);
    } else t && (xc(e, t), (s = { default: 1 }));
    if (o) for (const a in i) !_c(a) && !(a in s) && delete i[a];
  };
function wo(e, t, n, r, i = !1) {
  if (J(e)) {
    e.forEach((h, g) => wo(h, t && (J(t) ? t[g] : t), n, r, i));
    return;
  }
  if (tr(r) && !i) return;
  const o = r.shapeFlag & 4 ? Hi(r.component) || r.component.proxy : r.el,
    s = i ? null : o,
    { i: a, r: l } = e,
    c = t && t.r,
    u = a.refs === ge ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (c != null &&
      c !== l &&
      (Ee(c)
        ? ((u[c] = null), le(f, c) && (f[c] = null))
        : _e(c) && (c.value = null)),
    Z(l))
  )
    Vt(l, a, 12, [s, u]);
  else {
    const h = Ee(l),
      g = _e(l);
    if (h || g) {
      const m = () => {
        if (e.f) {
          const b = h ? (le(f, l) ? f[l] : u[l]) : l.value;
          i
            ? J(b) && Fo(b, o)
            : J(b)
            ? b.includes(o) || b.push(o)
            : h
            ? ((u[l] = [o]), le(f, l) && (f[l] = u[l]))
            : ((l.value = [o]), e.k && (u[e.k] = l.value));
        } else
          h
            ? ((u[l] = s), le(f, l) && (f[l] = s))
            : g && ((l.value = s), e.k && (u[e.k] = s));
      };
      s ? ((m.id = -1), Me(m, n)) : m();
    }
  }
}
const Me = Zf;
function Ld(e) {
  return Pd(e);
}
function Pd(e, t) {
  const n = uo();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: i,
      patchProp: o,
      createElement: s,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: h,
      setScopeId: g = ot,
      insertStaticContent: m,
    } = e,
    b = (
      d,
      p,
      v,
      w = null,
      E = null,
      T = null,
      M = !1,
      S = null,
      L = !!p.dynamicChildren
    ) => {
      if (d === p) return;
      d && !Kn(d, p) && ((w = x(d)), we(d, E, T, !0), (d = null)),
        p.patchFlag === -2 && ((L = !1), (p.dynamicChildren = null));
      const { type: O, ref: V, shapeFlag: B } = p;
      switch (O) {
        case Mi:
          y(d, p, v, w);
          break;
        case Et:
          _(d, p, v, w);
          break;
        case Gi:
          d == null && k(p, v, w, M);
          break;
        case me:
          se(d, p, v, w, E, T, M, S, L);
          break;
        default:
          B & 1
            ? I(d, p, v, w, E, T, M, S, L)
            : B & 6
            ? G(d, p, v, w, E, T, M, S, L)
            : (B & 64 || B & 128) && O.process(d, p, v, w, E, T, M, S, L, $);
      }
      V != null && E && wo(V, d && d.ref, T, p || d, !p);
    },
    y = (d, p, v, w) => {
      if (d == null) r((p.el = a(p.children)), v, w);
      else {
        const E = (p.el = d.el);
        p.children !== d.children && c(E, p.children);
      }
    },
    _ = (d, p, v, w) => {
      d == null ? r((p.el = l(p.children || "")), v, w) : (p.el = d.el);
    },
    k = (d, p, v, w) => {
      [d.el, d.anchor] = m(d.children, p, v, w, d.el, d.anchor);
    },
    P = ({ el: d, anchor: p }, v, w) => {
      let E;
      for (; d && d !== p; ) (E = h(d)), r(d, v, w), (d = E);
      r(p, v, w);
    },
    C = ({ el: d, anchor: p }) => {
      let v;
      for (; d && d !== p; ) (v = h(d)), i(d), (d = v);
      i(p);
    },
    I = (d, p, v, w, E, T, M, S, L) => {
      (M = M || p.type === "svg"),
        d == null ? D(p, v, w, E, T, M, S, L) : j(d, p, E, T, M, S, L);
    },
    D = (d, p, v, w, E, T, M, S) => {
      let L, O;
      const { type: V, props: B, shapeFlag: z, transition: Q, dirs: te } = d;
      if (
        ((L = d.el = s(d.type, T, B && B.is, B)),
        z & 8
          ? u(L, d.children)
          : z & 16 &&
            N(d.children, L, null, w, E, T && V !== "foreignObject", M, S),
        te && Jt(d, null, w, "created"),
        U(L, d, d.scopeId, M, w),
        B)
      ) {
        for (const ue in B)
          ue !== "value" &&
            !Yr(ue) &&
            o(L, ue, null, B[ue], T, d.children, w, E, ye);
        "value" in B && o(L, "value", null, B.value),
          (O = B.onVnodeBeforeMount) && ut(O, w, d);
      }
      te && Jt(d, null, w, "beforeMount");
      const de = (!E || (E && !E.pendingBranch)) && Q && !Q.persisted;
      de && Q.beforeEnter(L),
        r(L, p, v),
        ((O = B && B.onVnodeMounted) || de || te) &&
          Me(() => {
            O && ut(O, w, d), de && Q.enter(L), te && Jt(d, null, w, "mounted");
          }, E);
    },
    U = (d, p, v, w, E) => {
      if ((v && g(d, v), w)) for (let T = 0; T < w.length; T++) g(d, w[T]);
      if (E) {
        let T = E.subTree;
        if (p === T) {
          const M = E.vnode;
          U(d, M, M.scopeId, M.slotScopeIds, E.parent);
        }
      }
    },
    N = (d, p, v, w, E, T, M, S, L = 0) => {
      for (let O = L; O < d.length; O++) {
        const V = (d[O] = S ? It(d[O]) : ft(d[O]));
        b(null, V, p, v, w, E, T, M, S);
      }
    },
    j = (d, p, v, w, E, T, M) => {
      const S = (p.el = d.el);
      let { patchFlag: L, dynamicChildren: O, dirs: V } = p;
      L |= d.patchFlag & 16;
      const B = d.props || ge,
        z = p.props || ge;
      let Q;
      v && Xt(v, !1),
        (Q = z.onVnodeBeforeUpdate) && ut(Q, v, p, d),
        V && Jt(p, d, v, "beforeUpdate"),
        v && Xt(v, !0);
      const te = E && p.type !== "foreignObject";
      if (
        (O
          ? W(d.dynamicChildren, O, S, v, w, te, T)
          : M || re(d, p, S, null, v, w, te, T, !1),
        L > 0)
      ) {
        if (L & 16) Y(S, p, B, z, v, w, E);
        else if (
          (L & 2 && B.class !== z.class && o(S, "class", null, z.class, E),
          L & 4 && o(S, "style", B.style, z.style, E),
          L & 8)
        ) {
          const de = p.dynamicProps;
          for (let ue = 0; ue < de.length; ue++) {
            const xe = de[ue],
              tt = B[xe],
              yn = z[xe];
            (yn !== tt || xe === "value") &&
              o(S, xe, tt, yn, E, d.children, v, w, ye);
          }
        }
        L & 1 && d.children !== p.children && u(S, p.children);
      } else !M && O == null && Y(S, p, B, z, v, w, E);
      ((Q = z.onVnodeUpdated) || V) &&
        Me(() => {
          Q && ut(Q, v, p, d), V && Jt(p, d, v, "updated");
        }, w);
    },
    W = (d, p, v, w, E, T, M) => {
      for (let S = 0; S < p.length; S++) {
        const L = d[S],
          O = p[S],
          V =
            L.el && (L.type === me || !Kn(L, O) || L.shapeFlag & 70)
              ? f(L.el)
              : v;
        b(L, O, V, null, w, E, T, M, !0);
      }
    },
    Y = (d, p, v, w, E, T, M) => {
      if (v !== w) {
        if (v !== ge)
          for (const S in v)
            !Yr(S) && !(S in w) && o(d, S, v[S], null, M, p.children, E, T, ye);
        for (const S in w) {
          if (Yr(S)) continue;
          const L = w[S],
            O = v[S];
          L !== O && S !== "value" && o(d, S, O, L, M, p.children, E, T, ye);
        }
        "value" in w && o(d, "value", v.value, w.value);
      }
    },
    se = (d, p, v, w, E, T, M, S, L) => {
      const O = (p.el = d ? d.el : a("")),
        V = (p.anchor = d ? d.anchor : a(""));
      let { patchFlag: B, dynamicChildren: z, slotScopeIds: Q } = p;
      Q && (S = S ? S.concat(Q) : Q),
        d == null
          ? (r(O, v, w), r(V, v, w), N(p.children, v, V, E, T, M, S, L))
          : B > 0 && B & 64 && z && d.dynamicChildren
          ? (W(d.dynamicChildren, z, v, E, T, M, S),
            (p.key != null || (E && p === E.subTree)) && kc(d, p, !0))
          : re(d, p, v, V, E, T, M, S, L);
    },
    G = (d, p, v, w, E, T, M, S, L) => {
      (p.slotScopeIds = S),
        d == null
          ? p.shapeFlag & 512
            ? E.ctx.activate(p, v, w, M, L)
            : pe(p, v, w, E, T, M, L)
          : fe(d, p, L);
    },
    pe = (d, p, v, w, E, T, M) => {
      const S = (d.component = Bd(d, w, E));
      if ((fc(d) && (S.ctx.renderer = $), Fd(S), S.asyncDep)) {
        if ((E && E.registerDep(S, q), !d.el)) {
          const L = (S.subTree = X(Et));
          _(null, L, p, v);
        }
        return;
      }
      q(S, d, p, v, E, T, M);
    },
    fe = (d, p, v) => {
      const w = (p.component = d.component);
      if (Jf(d, p, v))
        if (w.asyncDep && !w.asyncResolved) {
          ee(w, p, v);
          return;
        } else (w.next = p), Ff(w.update), w.update();
      else (p.el = d.el), (w.vnode = p);
    },
    q = (d, p, v, w, E, T, M) => {
      const S = () => {
          if (d.isMounted) {
            let { next: V, bu: B, u: z, parent: Q, vnode: te } = d,
              de = V,
              ue;
            Xt(d, !1),
              V ? ((V.el = te.el), ee(d, V, M)) : (V = te),
              B && Qr(B),
              (ue = V.props && V.props.onVnodeBeforeUpdate) && ut(ue, Q, V, te),
              Xt(d, !0);
            const xe = Ji(d),
              tt = d.subTree;
            (d.subTree = xe),
              b(tt, xe, f(tt.el), x(tt), d, E, T),
              (V.el = xe.el),
              de === null && Xf(d, xe.el),
              z && Me(z, E),
              (ue = V.props && V.props.onVnodeUpdated) &&
                Me(() => ut(ue, Q, V, te), E);
          } else {
            let V;
            const { el: B, props: z } = p,
              { bm: Q, m: te, parent: de } = d,
              ue = tr(p);
            if (
              (Xt(d, !1),
              Q && Qr(Q),
              !ue && (V = z && z.onVnodeBeforeMount) && ut(V, de, p),
              Xt(d, !0),
              B && ie)
            ) {
              const xe = () => {
                (d.subTree = Ji(d)), ie(B, d.subTree, d, E, null);
              };
              ue
                ? p.type.__asyncLoader().then(() => !d.isUnmounted && xe())
                : xe();
            } else {
              const xe = (d.subTree = Ji(d));
              b(null, xe, v, w, d, E, T), (p.el = xe.el);
            }
            if ((te && Me(te, E), !ue && (V = z && z.onVnodeMounted))) {
              const xe = p;
              Me(() => ut(V, de, xe), E);
            }
            (p.shapeFlag & 256 ||
              (de && tr(de.vnode) && de.vnode.shapeFlag & 256)) &&
              d.a &&
              Me(d.a, E),
              (d.isMounted = !0),
              (p = v = w = null);
          }
        },
        L = (d.effect = new Wo(S, () => Go(O), d.scope)),
        O = (d.update = () => L.run());
      (O.id = d.uid), Xt(d, !0), O();
    },
    ee = (d, p, v) => {
      p.component = d;
      const w = d.vnode.props;
      (d.vnode = p),
        (d.next = null),
        Td(d, p.props, w, v),
        Sd(d, p.children, v),
        zn(),
        Gs(),
        Vn();
    },
    re = (d, p, v, w, E, T, M, S, L = !1) => {
      const O = d && d.children,
        V = d ? d.shapeFlag : 0,
        B = p.children,
        { patchFlag: z, shapeFlag: Q } = p;
      if (z > 0) {
        if (z & 128) {
          ze(O, B, v, w, E, T, M, S, L);
          return;
        } else if (z & 256) {
          Se(O, B, v, w, E, T, M, S, L);
          return;
        }
      }
      Q & 8
        ? (V & 16 && ye(O, E, T), B !== O && u(v, B))
        : V & 16
        ? Q & 16
          ? ze(O, B, v, w, E, T, M, S, L)
          : ye(O, E, T, !0)
        : (V & 8 && u(v, ""), Q & 16 && N(B, v, w, E, T, M, S, L));
    },
    Se = (d, p, v, w, E, T, M, S, L) => {
      (d = d || Cn), (p = p || Cn);
      const O = d.length,
        V = p.length,
        B = Math.min(O, V);
      let z;
      for (z = 0; z < B; z++) {
        const Q = (p[z] = L ? It(p[z]) : ft(p[z]));
        b(d[z], Q, v, null, E, T, M, S, L);
      }
      O > V ? ye(d, E, T, !0, !1, B) : N(p, v, w, E, T, M, S, L, B);
    },
    ze = (d, p, v, w, E, T, M, S, L) => {
      let O = 0;
      const V = p.length;
      let B = d.length - 1,
        z = V - 1;
      for (; O <= B && O <= z; ) {
        const Q = d[O],
          te = (p[O] = L ? It(p[O]) : ft(p[O]));
        if (Kn(Q, te)) b(Q, te, v, null, E, T, M, S, L);
        else break;
        O++;
      }
      for (; O <= B && O <= z; ) {
        const Q = d[B],
          te = (p[z] = L ? It(p[z]) : ft(p[z]));
        if (Kn(Q, te)) b(Q, te, v, null, E, T, M, S, L);
        else break;
        B--, z--;
      }
      if (O > B) {
        if (O <= z) {
          const Q = z + 1,
            te = Q < V ? p[Q].el : w;
          for (; O <= z; )
            b(null, (p[O] = L ? It(p[O]) : ft(p[O])), v, te, E, T, M, S, L),
              O++;
        }
      } else if (O > z) for (; O <= B; ) we(d[O], E, T, !0), O++;
      else {
        const Q = O,
          te = O,
          de = new Map();
        for (O = te; O <= z; O++) {
          const We = (p[O] = L ? It(p[O]) : ft(p[O]));
          We.key != null && de.set(We.key, O);
        }
        let ue,
          xe = 0;
        const tt = z - te + 1;
        let yn = !1,
          Fs = 0;
        const qn = new Array(tt);
        for (O = 0; O < tt; O++) qn[O] = 0;
        for (O = Q; O <= B; O++) {
          const We = d[O];
          if (xe >= tt) {
            we(We, E, T, !0);
            continue;
          }
          let ct;
          if (We.key != null) ct = de.get(We.key);
          else
            for (ue = te; ue <= z; ue++)
              if (qn[ue - te] === 0 && Kn(We, p[ue])) {
                ct = ue;
                break;
              }
          ct === void 0
            ? we(We, E, T, !0)
            : ((qn[ct - te] = O + 1),
              ct >= Fs ? (Fs = ct) : (yn = !0),
              b(We, p[ct], v, null, E, T, M, S, L),
              xe++);
        }
        const zs = yn ? $d(qn) : Cn;
        for (ue = zs.length - 1, O = tt - 1; O >= 0; O--) {
          const We = te + O,
            ct = p[We],
            Vs = We + 1 < V ? p[We + 1].el : w;
          qn[O] === 0
            ? b(null, ct, v, Vs, E, T, M, S, L)
            : yn && (ue < 0 || O !== zs[ue] ? je(ct, v, Vs, 2) : ue--);
        }
      }
    },
    je = (d, p, v, w, E = null) => {
      const { el: T, type: M, transition: S, children: L, shapeFlag: O } = d;
      if (O & 6) {
        je(d.component.subTree, p, v, w);
        return;
      }
      if (O & 128) {
        d.suspense.move(p, v, w);
        return;
      }
      if (O & 64) {
        M.move(d, p, v, $);
        return;
      }
      if (M === me) {
        r(T, p, v);
        for (let B = 0; B < L.length; B++) je(L[B], p, v, w);
        r(d.anchor, p, v);
        return;
      }
      if (M === Gi) {
        P(d, p, v);
        return;
      }
      if (w !== 2 && O & 1 && S)
        if (w === 0) S.beforeEnter(T), r(T, p, v), Me(() => S.enter(T), E);
        else {
          const { leave: B, delayLeave: z, afterLeave: Q } = S,
            te = () => r(T, p, v),
            de = () => {
              B(T, () => {
                te(), Q && Q();
              });
            };
          z ? z(T, te, de) : de();
        }
      else r(T, p, v);
    },
    we = (d, p, v, w = !1, E = !1) => {
      const {
        type: T,
        props: M,
        ref: S,
        children: L,
        dynamicChildren: O,
        shapeFlag: V,
        patchFlag: B,
        dirs: z,
      } = d;
      if ((S != null && wo(S, null, v, d, !0), V & 256)) {
        p.ctx.deactivate(d);
        return;
      }
      const Q = V & 1 && z,
        te = !tr(d);
      let de;
      if ((te && (de = M && M.onVnodeBeforeUnmount) && ut(de, p, d), V & 6))
        Ue(d.component, v, w);
      else {
        if (V & 128) {
          d.suspense.unmount(v, w);
          return;
        }
        Q && Jt(d, null, p, "beforeUnmount"),
          V & 64
            ? d.type.remove(d, p, v, E, $, w)
            : O && (T !== me || (B > 0 && B & 64))
            ? ye(O, p, v, !1, !0)
            : ((T === me && B & 384) || (!E && V & 16)) && ye(L, p, v),
          w && et(d);
      }
      ((te && (de = M && M.onVnodeUnmounted)) || Q) &&
        Me(() => {
          de && ut(de, p, d), Q && Jt(d, null, p, "unmounted");
        }, v);
    },
    et = (d) => {
      const { type: p, el: v, anchor: w, transition: E } = d;
      if (p === me) {
        Ve(v, w);
        return;
      }
      if (p === Gi) {
        C(d);
        return;
      }
      const T = () => {
        i(v), E && !E.persisted && E.afterLeave && E.afterLeave();
      };
      if (d.shapeFlag & 1 && E && !E.persisted) {
        const { leave: M, delayLeave: S } = E,
          L = () => M(v, T);
        S ? S(d.el, T, L) : L();
      } else T();
    },
    Ve = (d, p) => {
      let v;
      for (; d !== p; ) (v = h(d)), i(d), (d = v);
      i(p);
    },
    Ue = (d, p, v) => {
      const { bum: w, scope: E, update: T, subTree: M, um: S } = d;
      w && Qr(w),
        E.stop(),
        T && ((T.active = !1), we(M, d, p, v)),
        S && Me(S, p),
        Me(() => {
          d.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          d.asyncDep &&
          !d.asyncResolved &&
          d.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    ye = (d, p, v, w = !1, E = !1, T = 0) => {
      for (let M = T; M < d.length; M++) we(d[M], p, v, w, E);
    },
    x = (d) =>
      d.shapeFlag & 6
        ? x(d.component.subTree)
        : d.shapeFlag & 128
        ? d.suspense.next()
        : h(d.anchor || d.el),
    R = (d, p, v) => {
      d == null
        ? p._vnode && we(p._vnode, null, null, !0)
        : b(p._vnode || null, d, p, null, null, null, v),
        Gs(),
        sc(),
        (p._vnode = d);
    },
    $ = {
      p: b,
      um: we,
      m: je,
      r: et,
      mt: pe,
      mc: N,
      pc: re,
      pbc: W,
      n: x,
      o: e,
    };
  let F, ie;
  return t && ([F, ie] = t($)), { render: R, hydrate: F, createApp: kd(R, F) };
}
function Xt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function kc(e, t, n = !1) {
  const r = e.children,
    i = t.children;
  if (J(r) && J(i))
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      let a = i[o];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = i[o] = It(i[o])), (a.el = s.el)),
        n || kc(s, a)),
        a.type === Mi && (a.el = s.el);
    }
}
function $d(e) {
  const t = e.slice(),
    n = [0];
  let r, i, o, s, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (((i = n[n.length - 1]), e[i] < c)) {
        (t[r] = i), n.push(r);
        continue;
      }
      for (o = 0, s = n.length - 1; o < s; )
        (a = (o + s) >> 1), e[n[a]] < c ? (o = a + 1) : (s = a);
      c < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, s = n[o - 1]; o-- > 0; ) (n[o] = s), (s = t[s]);
  return n;
}
const Id = (e) => e.__isTeleport,
  me = Symbol.for("v-fgt"),
  Mi = Symbol.for("v-txt"),
  Et = Symbol.for("v-cmt"),
  Gi = Symbol.for("v-stc"),
  rr = [];
let it = null;
function H(e = !1) {
  rr.push((it = e ? null : []));
}
function Rd() {
  rr.pop(), (it = rr[rr.length - 1] || null);
}
let br = 1;
function ca(e) {
  br += e;
}
function Ec(e) {
  return (
    (e.dynamicChildren = br > 0 ? it || Cn : null),
    Rd(),
    br > 0 && it && it.push(e),
    e
  );
}
function K(e, t, n, r, i, o) {
  return Ec(A(e, t, n, r, i, o, !0));
}
function He(e, t, n, r, i) {
  return Ec(X(e, t, n, r, i, !0));
}
function ai(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Kn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Di = "__vInternal",
  Cc = ({ key: e }) => e ?? null,
  Jr = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? Ee(e) || _e(e) || Z(e)
        ? { i: Te, r: e, k: t, f: !!n }
        : e
      : null
  );
function A(
  e,
  t = null,
  n = null,
  r = 0,
  i = null,
  o = e === me ? 0 : 1,
  s = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Cc(t),
    ref: t && Jr(t),
    scopeId: Ri,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Te,
  };
  return (
    a
      ? (rs(l, n), o & 128 && e.normalize(l))
      : n && (l.shapeFlag |= Ee(n) ? 8 : 16),
    br > 0 &&
      !s &&
      it &&
      (l.patchFlag > 0 || o & 6) &&
      l.patchFlag !== 32 &&
      it.push(l),
    l
  );
}
const X = jd;
function jd(e, t = null, n = null, r = 0, i = null, o = !1) {
  if (((!e || e === dd) && (e = Et), ai(e))) {
    const a = In(e, t, !0);
    return (
      n && rs(a, n),
      br > 0 &&
        !o &&
        it &&
        (a.shapeFlag & 6 ? (it[it.indexOf(e)] = a) : it.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((Wd(e) && (e = e.__vccOpts), t)) {
    t = ns(t);
    let { class: a, style: l } = t;
    a && !Ee(a) && (t.class = Pe(a)),
      ve(l) && (Xl(l) && !J(l) && (l = Oe({}, l)), (t.style = ln(l)));
  }
  const s = Ee(e) ? 1 : Gf(e) ? 128 : Id(e) ? 64 : ve(e) ? 4 : Z(e) ? 2 : 0;
  return A(e, t, n, r, i, s, o, !0);
}
function ns(e) {
  return e ? (Xl(e) || Di in e ? Oe({}, e) : e) : null;
}
function In(e, t, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: s } = e,
    a = t ? Md(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Cc(a),
    ref:
      t && t.ref ? (n && i ? (J(i) ? i.concat(Jr(t)) : [i, Jr(t)]) : Jr(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== me ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && In(e.ssContent),
    ssFallback: e.ssFallback && In(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function xt(e = " ", t = 0) {
  return X(Mi, null, e, t);
}
function be(e = "", t = !1) {
  return t ? (H(), He(Et, null, e)) : X(Et, null, e);
}
function ft(e) {
  return e == null || typeof e == "boolean"
    ? X(Et)
    : J(e)
    ? X(me, null, e.slice())
    : typeof e == "object"
    ? It(e)
    : X(Mi, null, String(e));
}
function It(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : In(e);
}
function rs(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (J(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), rs(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(Di in t)
        ? (t._ctx = Te)
        : i === 3 &&
          Te &&
          (Te.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Z(t)
      ? ((t = { default: t, _ctx: Te }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [xt(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Md(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const i in r)
      if (i === "class")
        t.class !== r.class && (t.class = Pe([t.class, r.class]));
      else if (i === "style") t.style = ln([t.style, r.style]);
      else if (Ci(i)) {
        const o = t[i],
          s = r[i];
        s &&
          o !== s &&
          !(J(o) && o.includes(s)) &&
          (t[i] = o ? [].concat(o, s) : s);
      } else i !== "" && (t[i] = r[i]);
  }
  return t;
}
function ut(e, t, n, r = null) {
  st(e, t, 7, [n, r]);
}
const Dd = mc();
let Hd = 0;
function Bd(e, t, n) {
  const r = e.type,
    i = (t ? t.appContext : e.appContext) || Dd,
    o = {
      uid: Hd++,
      vnode: e,
      type: r,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ml(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: bc(r, i),
      emitsOptions: lc(r, i),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: r.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Uf.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let Ce = null;
const Nd = () => Ce || Te;
let is,
  bn,
  ua = "__VUE_INSTANCE_SETTERS__";
(bn = uo()[ua]) || (bn = uo()[ua] = []),
  bn.push((e) => (Ce = e)),
  (is = (e) => {
    bn.length > 1 ? bn.forEach((t) => t(e)) : bn[0](e);
  });
const Rn = (e) => {
    is(e), e.scope.on();
  },
  un = () => {
    Ce && Ce.scope.off(), is(null);
  };
function Tc(e) {
  return e.vnode.shapeFlag & 4;
}
let _r = !1;
function Fd(e, t = !1) {
  _r = t;
  const { props: n, children: r } = e.vnode,
    i = Tc(e);
  Cd(e, n, i, t), Ad(e, r);
  const o = i ? zd(e, t) : void 0;
  return (_r = !1), o;
}
function zd(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Li(new Proxy(e.ctx, pd)));
  const { setup: r } = n;
  if (r) {
    const i = (e.setupContext = r.length > 1 ? Ac(e) : null);
    Rn(e), zn();
    const o = Vt(r, e, 0, [e.props, i]);
    if ((Vn(), un(), Ll(o))) {
      if ((o.then(un, un), t))
        return o
          .then((s) => {
            fa(e, s, t);
          })
          .catch((s) => {
            Pi(s, e, 0);
          });
      e.asyncDep = o;
    } else fa(e, o, t);
  } else Oc(e, t);
}
function fa(e, t, n) {
  Z(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ve(t) && (e.setupState = tc(t)),
    Oc(e, n);
}
let da;
function Oc(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && da && !r.render) {
      const i = r.template || es(e).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: s } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          c = Oe(Oe({ isCustomElement: o, delimiters: a }, s), l);
        r.render = da(i, c);
      }
    }
    e.render = r.render || ot;
  }
  Rn(e), zn(), md(e), Vn(), un();
}
function Vd(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Fe(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Ac(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Vd(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Hi(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(tc(Li(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in nr) return nr[n](e);
        },
        has(t, n) {
          return n in t || n in nr;
        },
      }))
    );
}
function Ud(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Wd(e) {
  return Z(e) && "__vccOpts" in e;
}
const ne = (e, t) => Hf(e, t, _r);
function Sc(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? ve(t) && !J(t)
      ? ai(t)
        ? X(e, null, [t])
        : X(e, t)
      : X(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && ai(n) && (n = [n]),
      X(e, t, n));
}
const qd = Symbol.for("v-scx"),
  Kd = () => Re(qd),
  Yd = "3.3.4",
  Qd = "http://www.w3.org/2000/svg",
  nn = typeof document < "u" ? document : null,
  ha = nn && nn.createElement("template"),
  Jd = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const i = t
        ? nn.createElementNS(Qd, e)
        : nn.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          i.setAttribute("multiple", r.multiple),
        i
      );
    },
    createText: (e) => nn.createTextNode(e),
    createComment: (e) => nn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => nn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, i, o) {
      const s = n ? n.previousSibling : t.lastChild;
      if (i && (i === o || i.nextSibling))
        for (
          ;
          t.insertBefore(i.cloneNode(!0), n),
            !(i === o || !(i = i.nextSibling));

        );
      else {
        ha.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = ha.content;
        if (r) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        s ? s.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Xd(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Gd(e, t, n) {
  const r = e.style,
    i = Ee(n);
  if (n && !i) {
    if (t && !Ee(t)) for (const o in t) n[o] == null && xo(r, o, "");
    for (const o in n) xo(r, o, n[o]);
  } else {
    const o = r.display;
    i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const pa = /\s*!important$/;
function xo(e, t, n) {
  if (J(n)) n.forEach((r) => xo(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Zd(e, t);
    pa.test(n)
      ? e.setProperty(gn(r), n.replace(pa, ""), "important")
      : (e[r] = n);
  }
}
const ga = ["Webkit", "Moz", "ms"],
  Zi = {};
function Zd(e, t) {
  const n = Zi[t];
  if (n) return n;
  let r = pt(t);
  if (r !== "filter" && r in e) return (Zi[t] = r);
  r = Ai(r);
  for (let i = 0; i < ga.length; i++) {
    const o = ga[i] + r;
    if (o in e) return (Zi[t] = o);
  }
  return t;
}
const va = "http://www.w3.org/1999/xlink";
function eh(e, t, n, r, i) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(va, t.slice(6, t.length))
      : e.setAttributeNS(va, t, n);
  else {
    const o = tf(t);
    n == null || (o && !Rl(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function th(e, t, n, r, i, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    r && s(r, i, o), (e[t] = n ?? "");
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = n;
    const c = a === "OPTION" ? e.getAttribute("value") : e.value,
      u = n ?? "";
    c !== u && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = Rl(n))
      : n == null && c === "string"
      ? ((n = ""), (l = !0))
      : c === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function xn(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function nh(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function rh(e, t, n, r, i = null) {
  const o = e._vei || (e._vei = {}),
    s = o[t];
  if (r && s) s.value = r;
  else {
    const [a, l] = ih(t);
    if (r) {
      const c = (o[t] = ah(r, i));
      xn(e, a, c, l);
    } else s && (nh(e, a, s, l), (o[t] = void 0));
  }
}
const ma = /(?:Once|Passive|Capture)$/;
function ih(e) {
  let t;
  if (ma.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(ma)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : gn(e.slice(2)), t];
}
let eo = 0;
const oh = Promise.resolve(),
  sh = () => eo || (oh.then(() => (eo = 0)), (eo = Date.now()));
function ah(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    st(lh(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = sh()), n;
}
function lh(e, t) {
  if (J(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (i) => !i._stopped && r && r(i))
    );
  } else return t;
}
const ya = /^on[a-z]/,
  ch = (e, t, n, r, i = !1, o, s, a, l) => {
    t === "class"
      ? Xd(e, r, i)
      : t === "style"
      ? Gd(e, n, r)
      : Ci(t)
      ? No(t) || rh(e, t, n, r, s)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : uh(e, t, r, i)
        )
      ? th(e, t, r, o, s, a, l)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        eh(e, t, r, i));
  };
function uh(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && ya.test(t) && Z(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (ya.test(t) && Ee(n))
    ? !1
    : t in e;
}
const ba = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return J(t) ? (n) => Qr(t, n) : t;
};
function fh(e) {
  e.target.composing = !0;
}
function _a(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const ko = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
      e._assign = ba(i);
      const o = r || (i.props && i.props.type === "number");
      xn(e, t ? "change" : "input", (s) => {
        if (s.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), o && (a = co(a)), e._assign(a);
      }),
        n &&
          xn(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (xn(e, "compositionstart", fh),
          xn(e, "compositionend", _a),
          xn(e, "change", _a));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: i } },
      o
    ) {
      if (
        ((e._assign = ba(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((i || e.type === "number") && co(e.value) === t))))
      )
        return;
      const s = t ?? "";
      e.value !== s && (e.value = s);
    },
  },
  dh = ["ctrl", "shift", "alt", "meta"],
  hh = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => dh.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  os =
    (e, t) =>
    (n, ...r) => {
      for (let i = 0; i < t.length; i++) {
        const o = hh[t[i]];
        if (o && o(n, t)) return;
      }
      return e(n, ...r);
    },
  ph = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Lc = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = gn(n.key);
    if (t.some((i) => i === r || ph[i] === r)) return e(n);
  },
  gh = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : Yn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), Yn(e, !0), r.enter(e))
            : r.leave(e, () => {
                Yn(e, !1);
              })
          : Yn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Yn(e, t);
    },
  };
function Yn(e, t) {
  e.style.display = t ? e._vod : "none";
}
const vh = Oe({ patchProp: ch }, Jd);
let wa;
function mh() {
  return wa || (wa = Ld(vh));
}
const yh = (...e) => {
  const t = mh().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const i = bh(r);
      if (!i) return;
      const o = t._component;
      !Z(o) && !o.render && !o.template && (o.template = i.innerHTML),
        (i.innerHTML = "");
      const s = n(i, !1, i instanceof SVGElement);
      return (
        i instanceof Element &&
          (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
        s
      );
    }),
    t
  );
};
function bh(e) {
  return Ee(e) ? document.querySelector(e) : e;
}
var _h = !1;
/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let Pc;
const Bi = (e) => (Pc = e),
  $c = Symbol();
function Eo(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var ir;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(ir || (ir = {}));
function wh() {
  const e = Dl(!0),
    t = e.run(() => bt({}));
  let n = [],
    r = [];
  const i = Li({
    install(o) {
      Bi(i),
        (i._a = o),
        o.provide($c, i),
        (o.config.globalProperties.$pinia = i),
        r.forEach((s) => n.push(s)),
        (r = []);
    },
    use(o) {
      return !this._a && !_h ? r.push(o) : n.push(o), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return i;
}
const Ic = () => {};
function xa(e, t, n, r = Ic) {
  e.push(t);
  const i = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), r());
  };
  return !n && Hl() && rf(i), i;
}
function _n(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const xh = (e) => e();
function Co(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      i = e[n];
    Eo(i) && Eo(r) && e.hasOwnProperty(n) && !_e(r) && !zt(r)
      ? (e[n] = Co(i, r))
      : (e[n] = r);
  }
  return e;
}
const kh = Symbol();
function Eh(e) {
  return !Eo(e) || !e.hasOwnProperty(kh);
}
const { assign: Lt } = Object;
function Ch(e) {
  return !!(_e(e) && e.effect);
}
function Th(e, t, n, r) {
  const { state: i, actions: o, getters: s } = t,
    a = n.state.value[e];
  let l;
  function c() {
    a || (n.state.value[e] = i ? i() : {});
    const u = nc(n.state.value[e]);
    return Lt(
      u,
      o,
      Object.keys(s || {}).reduce(
        (f, h) => (
          (f[h] = Li(
            ne(() => {
              Bi(n);
              const g = n._s.get(e);
              return s[h].call(g, g);
            })
          )),
          f
        ),
        {}
      )
    );
  }
  return (l = Rc(e, c, t, n, r, !0)), l;
}
function Rc(e, t, n = {}, r, i, o) {
  let s;
  const a = Lt({ actions: {} }, n),
    l = { deep: !0 };
  let c,
    u,
    f = [],
    h = [],
    g;
  const m = r.state.value[e];
  !o && !m && (r.state.value[e] = {}), bt({});
  let b;
  function y(N) {
    let j;
    (c = u = !1),
      typeof N == "function"
        ? (N(r.state.value[e]),
          (j = { type: ir.patchFunction, storeId: e, events: g }))
        : (Co(r.state.value[e], N),
          (j = { type: ir.patchObject, payload: N, storeId: e, events: g }));
    const W = (b = Symbol());
    $i().then(() => {
      b === W && (c = !0);
    }),
      (u = !0),
      _n(f, j, r.state.value[e]);
  }
  const _ = o
    ? function () {
        const { state: j } = n,
          W = j ? j() : {};
        this.$patch((Y) => {
          Lt(Y, W);
        });
      }
    : Ic;
  function k() {
    s.stop(), (f = []), (h = []), r._s.delete(e);
  }
  function P(N, j) {
    return function () {
      Bi(r);
      const W = Array.from(arguments),
        Y = [],
        se = [];
      function G(q) {
        Y.push(q);
      }
      function pe(q) {
        se.push(q);
      }
      _n(h, { args: W, name: N, store: I, after: G, onError: pe });
      let fe;
      try {
        fe = j.apply(this && this.$id === e ? this : I, W);
      } catch (q) {
        throw (_n(se, q), q);
      }
      return fe instanceof Promise
        ? fe
            .then((q) => (_n(Y, q), q))
            .catch((q) => (_n(se, q), Promise.reject(q)))
        : (_n(Y, fe), fe);
    };
  }
  const C = {
      _p: r,
      $id: e,
      $onAction: xa.bind(null, h),
      $patch: y,
      $reset: _,
      $subscribe(N, j = {}) {
        const W = xa(f, N, j.detached, () => Y()),
          Y = s.run(() =>
            er(
              () => r.state.value[e],
              (se) => {
                (j.flush === "sync" ? u : c) &&
                  N({ storeId: e, type: ir.direct, events: g }, se);
              },
              Lt({}, l, j)
            )
          );
        return W;
      },
      $dispose: k,
    },
    I = Un(C);
  r._s.set(e, I);
  const D = (r._a && r._a.runWithContext) || xh,
    U = r._e.run(() => ((s = Dl()), D(() => s.run(t))));
  for (const N in U) {
    const j = U[N];
    if ((_e(j) && !Ch(j)) || zt(j))
      o ||
        (m && Eh(j) && (_e(j) ? (j.value = m[N]) : Co(j, m[N])),
        (r.state.value[e][N] = j));
    else if (typeof j == "function") {
      const W = P(N, j);
      (U[N] = W), (a.actions[N] = j);
    }
  }
  return (
    Lt(I, U),
    Lt(ce(I), U),
    Object.defineProperty(I, "$state", {
      get: () => r.state.value[e],
      set: (N) => {
        y((j) => {
          Lt(j, N);
        });
      },
    }),
    r._p.forEach((N) => {
      Lt(
        I,
        s.run(() => N({ store: I, app: r._a, pinia: r, options: a }))
      );
    }),
    m && o && n.hydrate && n.hydrate(I.$state, m),
    (c = !0),
    (u = !0),
    I
  );
}
function jc(e, t, n) {
  let r, i;
  const o = typeof t == "function";
  typeof e == "string" ? ((r = e), (i = o ? n : t)) : ((i = e), (r = e.id));
  function s(a, l) {
    const c = Ed();
    return (
      (a = a || (c ? Re($c, null) : null)),
      a && Bi(a),
      (a = Pc),
      a._s.has(r) || (o ? Rc(r, t, i, a) : Th(r, i, a)),
      a._s.get(r)
    );
  }
  return (s.$id = r), s;
}
const Oh = "/assets/profilepic-4dfe0640.jpg";
/*!
 * vue-router v4.2.4
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const kn = typeof window < "u";
function Ah(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const he = Object.assign;
function to(e, t) {
  const n = {};
  for (const r in t) {
    const i = t[r];
    n[r] = lt(i) ? i.map(e) : e(i);
  }
  return n;
}
const or = () => {},
  lt = Array.isArray,
  Sh = /\/$/,
  Lh = (e) => e.replace(Sh, "");
function no(e, t, n = "/") {
  let r,
    i = {},
    o = "",
    s = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 &&
      ((r = t.slice(0, l)),
      (o = t.slice(l + 1, a > -1 ? a : t.length)),
      (i = e(o))),
    a > -1 && ((r = r || t.slice(0, a)), (s = t.slice(a, t.length))),
    (r = Rh(r ?? t, n)),
    { fullPath: r + (o && "?") + o + s, path: r, query: i, hash: s }
  );
}
function Ph(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ka(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function $h(e, t, n) {
  const r = t.matched.length - 1,
    i = n.matched.length - 1;
  return (
    r > -1 &&
    r === i &&
    jn(t.matched[r], n.matched[i]) &&
    Mc(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function jn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Mc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Ih(e[n], t[n])) return !1;
  return !0;
}
function Ih(e, t) {
  return lt(e) ? Ea(e, t) : lt(t) ? Ea(t, e) : e === t;
}
function Ea(e, t) {
  return lt(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Rh(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    i = r[r.length - 1];
  (i === ".." || i === ".") && r.push("");
  let o = n.length - 1,
    s,
    a;
  for (s = 0; s < r.length; s++)
    if (((a = r[s]), a !== "."))
      if (a === "..") o > 1 && o--;
      else break;
  return (
    n.slice(0, o).join("/") +
    "/" +
    r.slice(s - (s === r.length ? 1 : 0)).join("/")
  );
}
var wr;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(wr || (wr = {}));
var sr;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(sr || (sr = {}));
function jh(e) {
  if (!e)
    if (kn) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Lh(e);
}
const Mh = /^[^#]+#/;
function Dh(e, t) {
  return e.replace(Mh, "#") + t;
}
function Hh(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Ni = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Bh(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      i =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!i) return;
    t = Hh(i, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Ca(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const To = new Map();
function Nh(e, t) {
  To.set(e, t);
}
function Fh(e) {
  const t = To.get(e);
  return To.delete(e), t;
}
let zh = () => location.protocol + "//" + location.host;
function Dc(e, t) {
  const { pathname: n, search: r, hash: i } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let a = i.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = i.slice(a);
    return l[0] !== "/" && (l = "/" + l), ka(l, "");
  }
  return ka(n, e) + r + i;
}
function Vh(e, t, n, r) {
  let i = [],
    o = [],
    s = null;
  const a = ({ state: h }) => {
    const g = Dc(e, location),
      m = n.value,
      b = t.value;
    let y = 0;
    if (h) {
      if (((n.value = g), (t.value = h), s && s === m)) {
        s = null;
        return;
      }
      y = b ? h.position - b.position : 0;
    } else r(g);
    i.forEach((_) => {
      _(n.value, m, {
        delta: y,
        type: wr.pop,
        direction: y ? (y > 0 ? sr.forward : sr.back) : sr.unknown,
      });
    });
  };
  function l() {
    s = n.value;
  }
  function c(h) {
    i.push(h);
    const g = () => {
      const m = i.indexOf(h);
      m > -1 && i.splice(m, 1);
    };
    return o.push(g), g;
  }
  function u() {
    const { history: h } = window;
    h.state && h.replaceState(he({}, h.state, { scroll: Ni() }), "");
  }
  function f() {
    for (const h of o) h();
    (o = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", u);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", u, { passive: !0 }),
    { pauseListeners: l, listen: c, destroy: f }
  );
}
function Ta(e, t, n, r = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: i ? Ni() : null,
  };
}
function Uh(e) {
  const { history: t, location: n } = window,
    r = { value: Dc(e, n) },
    i = { value: t.state };
  i.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(l, c, u) {
    const f = e.indexOf("#"),
      h =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l
          : zh() + e + l;
    try {
      t[u ? "replaceState" : "pushState"](c, "", h), (i.value = c);
    } catch (g) {
      console.error(g), n[u ? "replace" : "assign"](h);
    }
  }
  function s(l, c) {
    const u = he({}, t.state, Ta(i.value.back, l, i.value.forward, !0), c, {
      position: i.value.position,
    });
    o(l, u, !0), (r.value = l);
  }
  function a(l, c) {
    const u = he({}, i.value, t.state, { forward: l, scroll: Ni() });
    o(u.current, u, !0);
    const f = he({}, Ta(r.value, l, null), { position: u.position + 1 }, c);
    o(l, f, !1), (r.value = l);
  }
  return { location: r, state: i, push: a, replace: s };
}
function Wh(e) {
  e = jh(e);
  const t = Uh(e),
    n = Vh(e, t.state, t.location, t.replace);
  function r(o, s = !0) {
    s || n.pauseListeners(), history.go(o);
  }
  const i = he(
    { location: "", base: e, go: r, createHref: Dh.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(i, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(i, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    i
  );
}
function qh(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Hc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const St = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Bc = Symbol("");
var Oa;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Oa || (Oa = {}));
function Mn(e, t) {
  return he(new Error(), { type: e, [Bc]: !0 }, t);
}
function _t(e, t) {
  return e instanceof Error && Bc in e && (t == null || !!(e.type & t));
}
const Aa = "[^/]+?",
  Kh = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Yh = /[.+*?^${}()[\]/\\]/g;
function Qh(e, t) {
  const n = he({}, Kh, t),
    r = [];
  let i = n.start ? "^" : "";
  const o = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (i += "/");
    for (let f = 0; f < c.length; f++) {
      const h = c[f];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        f || (i += "/"), (i += h.value.replace(Yh, "\\$&")), (g += 40);
      else if (h.type === 1) {
        const { value: m, repeatable: b, optional: y, regexp: _ } = h;
        o.push({ name: m, repeatable: b, optional: y });
        const k = _ || Aa;
        if (k !== Aa) {
          g += 10;
          try {
            new RegExp(`(${k})`);
          } catch (C) {
            throw new Error(
              `Invalid custom RegExp for param "${m}" (${k}): ` + C.message
            );
          }
        }
        let P = b ? `((?:${k})(?:/(?:${k}))*)` : `(${k})`;
        f || (P = y && c.length < 2 ? `(?:/${P})` : "/" + P),
          y && (P += "?"),
          (i += P),
          (g += 20),
          y && (g += -8),
          b && (g += -20),
          k === ".*" && (g += -50);
      }
      u.push(g);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (i += "/?"), n.end ? (i += "$") : n.strict && (i += "(?:/|$)");
  const s = new RegExp(i, n.sensitive ? "" : "i");
  function a(c) {
    const u = c.match(s),
      f = {};
    if (!u) return null;
    for (let h = 1; h < u.length; h++) {
      const g = u[h] || "",
        m = o[h - 1];
      f[m.name] = g && m.repeatable ? g.split("/") : g;
    }
    return f;
  }
  function l(c) {
    let u = "",
      f = !1;
    for (const h of e) {
      (!f || !u.endsWith("/")) && (u += "/"), (f = !1);
      for (const g of h)
        if (g.type === 0) u += g.value;
        else if (g.type === 1) {
          const { value: m, repeatable: b, optional: y } = g,
            _ = m in c ? c[m] : "";
          if (lt(_) && !b)
            throw new Error(
              `Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`
            );
          const k = lt(_) ? _.join("/") : _;
          if (!k)
            if (y)
              h.length < 2 &&
                (u.endsWith("/") ? (u = u.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${m}"`);
          u += k;
        }
    }
    return u || "/";
  }
  return { re: s, score: r, keys: o, parse: a, stringify: l };
}
function Jh(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Xh(e, t) {
  let n = 0;
  const r = e.score,
    i = t.score;
  for (; n < r.length && n < i.length; ) {
    const o = Jh(r[n], i[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(i.length - r.length) === 1) {
    if (Sa(r)) return 1;
    if (Sa(i)) return -1;
  }
  return i.length - r.length;
}
function Sa(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Gh = { type: 0, value: "" },
  Zh = /[a-zA-Z0-9_]/;
function ep(e) {
  if (!e) return [[]];
  if (e === "/") return [[Gh]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${c}": ${g}`);
  }
  let n = 0,
    r = n;
  const i = [];
  let o;
  function s() {
    o && i.push(o), (o = []);
  }
  let a = 0,
    l,
    c = "",
    u = "";
  function f() {
    c &&
      (n === 0
        ? o.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (l === "*" || l === "+") &&
            t(
              `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?",
          }))
        : t("Invalid state to consume buffer"),
      (c = ""));
  }
  function h() {
    c += l;
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (c && f(), s()) : l === ":" ? (f(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        l === "("
          ? (n = 2)
          : Zh.test(l)
          ? h()
          : (f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")"
          ? u[u.length - 1] == "\\"
            ? (u = u.slice(0, -1) + l)
            : (n = 3)
          : (u += l);
        break;
      case 3:
        f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--, (u = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), f(), s(), i;
}
function tp(e, t, n) {
  const r = Qh(ep(e.path), n),
    i = he(r, { record: e, parent: t, children: [], alias: [] });
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function np(e, t) {
  const n = [],
    r = new Map();
  t = $a({ strict: !1, end: !0, sensitive: !1 }, t);
  function i(u) {
    return r.get(u);
  }
  function o(u, f, h) {
    const g = !h,
      m = rp(u);
    m.aliasOf = h && h.record;
    const b = $a(t, u),
      y = [m];
    if ("alias" in u) {
      const P = typeof u.alias == "string" ? [u.alias] : u.alias;
      for (const C of P)
        y.push(
          he({}, m, {
            components: h ? h.record.components : m.components,
            path: C,
            aliasOf: h ? h.record : m,
          })
        );
    }
    let _, k;
    for (const P of y) {
      const { path: C } = P;
      if (f && C[0] !== "/") {
        const I = f.record.path,
          D = I[I.length - 1] === "/" ? "" : "/";
        P.path = f.record.path + (C && D + C);
      }
      if (
        ((_ = tp(P, f, b)),
        h
          ? h.alias.push(_)
          : ((k = k || _),
            k !== _ && k.alias.push(_),
            g && u.name && !Pa(_) && s(u.name)),
        m.children)
      ) {
        const I = m.children;
        for (let D = 0; D < I.length; D++) o(I[D], _, h && h.children[D]);
      }
      (h = h || _),
        ((_.record.components && Object.keys(_.record.components).length) ||
          _.record.name ||
          _.record.redirect) &&
          l(_);
    }
    return k
      ? () => {
          s(k);
        }
      : or;
  }
  function s(u) {
    if (Hc(u)) {
      const f = r.get(u);
      f &&
        (r.delete(u),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(s),
        f.alias.forEach(s));
    } else {
      const f = n.indexOf(u);
      f > -1 &&
        (n.splice(f, 1),
        u.record.name && r.delete(u.record.name),
        u.children.forEach(s),
        u.alias.forEach(s));
    }
  }
  function a() {
    return n;
  }
  function l(u) {
    let f = 0;
    for (
      ;
      f < n.length &&
      Xh(u, n[f]) >= 0 &&
      (u.record.path !== n[f].record.path || !Nc(u, n[f]));

    )
      f++;
    n.splice(f, 0, u), u.record.name && !Pa(u) && r.set(u.record.name, u);
  }
  function c(u, f) {
    let h,
      g = {},
      m,
      b;
    if ("name" in u && u.name) {
      if (((h = r.get(u.name)), !h)) throw Mn(1, { location: u });
      (b = h.record.name),
        (g = he(
          La(
            f.params,
            h.keys.filter((k) => !k.optional).map((k) => k.name)
          ),
          u.params &&
            La(
              u.params,
              h.keys.map((k) => k.name)
            )
        )),
        (m = h.stringify(g));
    } else if ("path" in u)
      (m = u.path),
        (h = n.find((k) => k.re.test(m))),
        h && ((g = h.parse(m)), (b = h.record.name));
    else {
      if (((h = f.name ? r.get(f.name) : n.find((k) => k.re.test(f.path))), !h))
        throw Mn(1, { location: u, currentLocation: f });
      (b = h.record.name),
        (g = he({}, f.params, u.params)),
        (m = h.stringify(g));
    }
    const y = [];
    let _ = h;
    for (; _; ) y.unshift(_.record), (_ = _.parent);
    return { name: b, path: m, params: g, matched: y, meta: op(y) };
  }
  return (
    e.forEach((u) => o(u)),
    {
      addRoute: o,
      resolve: c,
      removeRoute: s,
      getRoutes: a,
      getRecordMatcher: i,
    }
  );
}
function La(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function rp(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: ip(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function ip(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Pa(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function op(e) {
  return e.reduce((t, n) => he(t, n.meta), {});
}
function $a(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Nc(e, t) {
  return t.children.some((n) => n === e || Nc(e, n));
}
const Fc = /#/g,
  sp = /&/g,
  ap = /\//g,
  lp = /=/g,
  cp = /\?/g,
  zc = /\+/g,
  up = /%5B/g,
  fp = /%5D/g,
  Vc = /%5E/g,
  dp = /%60/g,
  Uc = /%7B/g,
  hp = /%7C/g,
  Wc = /%7D/g,
  pp = /%20/g;
function ss(e) {
  return encodeURI("" + e)
    .replace(hp, "|")
    .replace(up, "[")
    .replace(fp, "]");
}
function gp(e) {
  return ss(e).replace(Uc, "{").replace(Wc, "}").replace(Vc, "^");
}
function Oo(e) {
  return ss(e)
    .replace(zc, "%2B")
    .replace(pp, "+")
    .replace(Fc, "%23")
    .replace(sp, "%26")
    .replace(dp, "`")
    .replace(Uc, "{")
    .replace(Wc, "}")
    .replace(Vc, "^");
}
function vp(e) {
  return Oo(e).replace(lp, "%3D");
}
function mp(e) {
  return ss(e).replace(Fc, "%23").replace(cp, "%3F");
}
function yp(e) {
  return e == null ? "" : mp(e).replace(ap, "%2F");
}
function li(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function bp(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let i = 0; i < r.length; ++i) {
    const o = r[i].replace(zc, " "),
      s = o.indexOf("="),
      a = li(s < 0 ? o : o.slice(0, s)),
      l = s < 0 ? null : li(o.slice(s + 1));
    if (a in t) {
      let c = t[a];
      lt(c) || (c = t[a] = [c]), c.push(l);
    } else t[a] = l;
  }
  return t;
}
function Ia(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = vp(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (lt(r) ? r.map((o) => o && Oo(o)) : [r && Oo(r)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function _p(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = lt(r)
        ? r.map((i) => (i == null ? null : "" + i))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
const wp = Symbol(""),
  Ra = Symbol(""),
  as = Symbol(""),
  qc = Symbol(""),
  Ao = Symbol("");
function Qn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const i = e.indexOf(r);
        i > -1 && e.splice(i, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Rt(e, t, n, r, i) {
  const o = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
  return () =>
    new Promise((s, a) => {
      const l = (f) => {
          f === !1
            ? a(Mn(4, { from: n, to: t }))
            : f instanceof Error
            ? a(f)
            : qh(f)
            ? a(Mn(2, { from: t, to: f }))
            : (o &&
                r.enterCallbacks[i] === o &&
                typeof f == "function" &&
                o.push(f),
              s());
        },
        c = e.call(r && r.instances[i], t, n, l);
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(l)), u.catch((f) => a(f));
    });
}
function ro(e, t, n, r) {
  const i = [];
  for (const o of e)
    for (const s in o.components) {
      let a = o.components[s];
      if (!(t !== "beforeRouteEnter" && !o.instances[s]))
        if (xp(a)) {
          const c = (a.__vccOpts || a)[t];
          c && i.push(Rt(c, n, r, o, s));
        } else {
          let l = a();
          i.push(() =>
            l.then((c) => {
              if (!c)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${s}" at "${o.path}"`)
                );
              const u = Ah(c) ? c.default : c;
              o.components[s] = u;
              const h = (u.__vccOpts || u)[t];
              return h && Rt(h, n, r, o, s)();
            })
          );
        }
    }
  return i;
}
function xp(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function ja(e) {
  const t = Re(as),
    n = Re(qc),
    r = ne(() => t.resolve(ae(e.to))),
    i = ne(() => {
      const { matched: l } = r.value,
        { length: c } = l,
        u = l[c - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const h = f.findIndex(jn.bind(null, u));
      if (h > -1) return h;
      const g = Ma(l[c - 2]);
      return c > 1 && Ma(u) === g && f[f.length - 1].path !== g
        ? f.findIndex(jn.bind(null, l[c - 2]))
        : h;
    }),
    o = ne(() => i.value > -1 && Tp(n.params, r.value.params)),
    s = ne(
      () =>
        i.value > -1 &&
        i.value === n.matched.length - 1 &&
        Mc(n.params, r.value.params)
    );
  function a(l = {}) {
    return Cp(l)
      ? t[ae(e.replace) ? "replace" : "push"](ae(e.to)).catch(or)
      : Promise.resolve();
  }
  return {
    route: r,
    href: ne(() => r.value.href),
    isActive: o,
    isExactActive: s,
    navigate: a,
  };
}
const kp = Ae({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ja,
    setup(e, { slots: t }) {
      const n = Un(ja(e)),
        { options: r } = Re(as),
        i = ne(() => ({
          [Da(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Da(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Sc(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: i.value,
              },
              o
            );
      };
    },
  }),
  Ep = kp;
function Cp(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Tp(e, t) {
  for (const n in t) {
    const r = t[n],
      i = e[n];
    if (typeof r == "string") {
      if (r !== i) return !1;
    } else if (!lt(i) || i.length !== r.length || r.some((o, s) => o !== i[s]))
      return !1;
  }
  return !0;
}
function Ma(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Da = (e, t, n) => e ?? t ?? n,
  Op = Ae({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Re(Ao),
        i = ne(() => e.route || r.value),
        o = Re(Ra, 0),
        s = ne(() => {
          let c = ae(o);
          const { matched: u } = i.value;
          let f;
          for (; (f = u[c]) && !f.components; ) c++;
          return c;
        }),
        a = ne(() => i.value.matched[s.value]);
      Bt(
        Ra,
        ne(() => s.value + 1)
      ),
        Bt(wp, a),
        Bt(Ao, i);
      const l = bt();
      return (
        er(
          () => [l.value, a.value, e.name],
          ([c, u, f], [h, g, m]) => {
            u &&
              ((u.instances[f] = c),
              g &&
                g !== u &&
                c &&
                c === h &&
                (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards),
                u.updateGuards.size || (u.updateGuards = g.updateGuards))),
              c &&
                u &&
                (!g || !jn(u, g) || !h) &&
                (u.enterCallbacks[f] || []).forEach((b) => b(c));
          },
          { flush: "post" }
        ),
        () => {
          const c = i.value,
            u = e.name,
            f = a.value,
            h = f && f.components[u];
          if (!h) return Ha(n.default, { Component: h, route: c });
          const g = f.props[u],
            m = g
              ? g === !0
                ? c.params
                : typeof g == "function"
                ? g(c)
                : g
              : null,
            y = Sc(
              h,
              he({}, m, t, {
                onVnodeUnmounted: (_) => {
                  _.component.isUnmounted && (f.instances[u] = null);
                },
                ref: l,
              })
            );
          return Ha(n.default, { Component: y, route: c }) || y;
        }
      );
    },
  });
function Ha(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Kc = Op;
function Ap(e) {
  const t = np(e.routes, e),
    n = e.parseQuery || bp,
    r = e.stringifyQuery || Ia,
    i = e.history,
    o = Qn(),
    s = Qn(),
    a = Qn(),
    l = $f(St);
  let c = St;
  kn &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const u = to.bind(null, (x) => "" + x),
    f = to.bind(null, yp),
    h = to.bind(null, li);
  function g(x, R) {
    let $, F;
    return (
      Hc(x) ? (($ = t.getRecordMatcher(x)), (F = R)) : (F = x), t.addRoute(F, $)
    );
  }
  function m(x) {
    const R = t.getRecordMatcher(x);
    R && t.removeRoute(R);
  }
  function b() {
    return t.getRoutes().map((x) => x.record);
  }
  function y(x) {
    return !!t.getRecordMatcher(x);
  }
  function _(x, R) {
    if (((R = he({}, R || l.value)), typeof x == "string")) {
      const v = no(n, x, R.path),
        w = t.resolve({ path: v.path }, R),
        E = i.createHref(v.fullPath);
      return he(v, w, {
        params: h(w.params),
        hash: li(v.hash),
        redirectedFrom: void 0,
        href: E,
      });
    }
    let $;
    if ("path" in x) $ = he({}, x, { path: no(n, x.path, R.path).path });
    else {
      const v = he({}, x.params);
      for (const w in v) v[w] == null && delete v[w];
      ($ = he({}, x, { params: f(v) })), (R.params = f(R.params));
    }
    const F = t.resolve($, R),
      ie = x.hash || "";
    F.params = u(h(F.params));
    const d = Ph(r, he({}, x, { hash: gp(ie), path: F.path })),
      p = i.createHref(d);
    return he(
      { fullPath: d, hash: ie, query: r === Ia ? _p(x.query) : x.query || {} },
      F,
      { redirectedFrom: void 0, href: p }
    );
  }
  function k(x) {
    return typeof x == "string" ? no(n, x, l.value.path) : he({}, x);
  }
  function P(x, R) {
    if (c !== x) return Mn(8, { from: R, to: x });
  }
  function C(x) {
    return U(x);
  }
  function I(x) {
    return C(he(k(x), { replace: !0 }));
  }
  function D(x) {
    const R = x.matched[x.matched.length - 1];
    if (R && R.redirect) {
      const { redirect: $ } = R;
      let F = typeof $ == "function" ? $(x) : $;
      return (
        typeof F == "string" &&
          ((F = F.includes("?") || F.includes("#") ? (F = k(F)) : { path: F }),
          (F.params = {})),
        he(
          { query: x.query, hash: x.hash, params: "path" in F ? {} : x.params },
          F
        )
      );
    }
  }
  function U(x, R) {
    const $ = (c = _(x)),
      F = l.value,
      ie = x.state,
      d = x.force,
      p = x.replace === !0,
      v = D($);
    if (v)
      return U(
        he(k(v), {
          state: typeof v == "object" ? he({}, ie, v.state) : ie,
          force: d,
          replace: p,
        }),
        R || $
      );
    const w = $;
    w.redirectedFrom = R;
    let E;
    return (
      !d && $h(r, F, $) && ((E = Mn(16, { to: w, from: F })), je(F, F, !0, !1)),
      (E ? Promise.resolve(E) : W(w, F))
        .catch((T) => (_t(T) ? (_t(T, 2) ? T : ze(T)) : re(T, w, F)))
        .then((T) => {
          if (T) {
            if (_t(T, 2))
              return U(
                he({ replace: p }, k(T.to), {
                  state: typeof T.to == "object" ? he({}, ie, T.to.state) : ie,
                  force: d,
                }),
                R || w
              );
          } else T = se(w, F, !0, p, ie);
          return Y(w, F, T), T;
        })
    );
  }
  function N(x, R) {
    const $ = P(x, R);
    return $ ? Promise.reject($) : Promise.resolve();
  }
  function j(x) {
    const R = Ve.values().next().value;
    return R && typeof R.runWithContext == "function"
      ? R.runWithContext(x)
      : x();
  }
  function W(x, R) {
    let $;
    const [F, ie, d] = Sp(x, R);
    $ = ro(F.reverse(), "beforeRouteLeave", x, R);
    for (const v of F)
      v.leaveGuards.forEach((w) => {
        $.push(Rt(w, x, R));
      });
    const p = N.bind(null, x, R);
    return (
      $.push(p),
      ye($)
        .then(() => {
          $ = [];
          for (const v of o.list()) $.push(Rt(v, x, R));
          return $.push(p), ye($);
        })
        .then(() => {
          $ = ro(ie, "beforeRouteUpdate", x, R);
          for (const v of ie)
            v.updateGuards.forEach((w) => {
              $.push(Rt(w, x, R));
            });
          return $.push(p), ye($);
        })
        .then(() => {
          $ = [];
          for (const v of d)
            if (v.beforeEnter)
              if (lt(v.beforeEnter))
                for (const w of v.beforeEnter) $.push(Rt(w, x, R));
              else $.push(Rt(v.beforeEnter, x, R));
          return $.push(p), ye($);
        })
        .then(
          () => (
            x.matched.forEach((v) => (v.enterCallbacks = {})),
            ($ = ro(d, "beforeRouteEnter", x, R)),
            $.push(p),
            ye($)
          )
        )
        .then(() => {
          $ = [];
          for (const v of s.list()) $.push(Rt(v, x, R));
          return $.push(p), ye($);
        })
        .catch((v) => (_t(v, 8) ? v : Promise.reject(v)))
    );
  }
  function Y(x, R, $) {
    a.list().forEach((F) => j(() => F(x, R, $)));
  }
  function se(x, R, $, F, ie) {
    const d = P(x, R);
    if (d) return d;
    const p = R === St,
      v = kn ? history.state : {};
    $ &&
      (F || p
        ? i.replace(x.fullPath, he({ scroll: p && v && v.scroll }, ie))
        : i.push(x.fullPath, ie)),
      (l.value = x),
      je(x, R, $, p),
      ze();
  }
  let G;
  function pe() {
    G ||
      (G = i.listen((x, R, $) => {
        if (!Ue.listening) return;
        const F = _(x),
          ie = D(F);
        if (ie) {
          U(he(ie, { replace: !0 }), F).catch(or);
          return;
        }
        c = F;
        const d = l.value;
        kn && Nh(Ca(d.fullPath, $.delta), Ni()),
          W(F, d)
            .catch((p) =>
              _t(p, 12)
                ? p
                : _t(p, 2)
                ? (U(p.to, F)
                    .then((v) => {
                      _t(v, 20) &&
                        !$.delta &&
                        $.type === wr.pop &&
                        i.go(-1, !1);
                    })
                    .catch(or),
                  Promise.reject())
                : ($.delta && i.go(-$.delta, !1), re(p, F, d))
            )
            .then((p) => {
              (p = p || se(F, d, !1)),
                p &&
                  ($.delta && !_t(p, 8)
                    ? i.go(-$.delta, !1)
                    : $.type === wr.pop && _t(p, 20) && i.go(-1, !1)),
                Y(F, d, p);
            })
            .catch(or);
      }));
  }
  let fe = Qn(),
    q = Qn(),
    ee;
  function re(x, R, $) {
    ze(x);
    const F = q.list();
    return (
      F.length ? F.forEach((ie) => ie(x, R, $)) : console.error(x),
      Promise.reject(x)
    );
  }
  function Se() {
    return ee && l.value !== St
      ? Promise.resolve()
      : new Promise((x, R) => {
          fe.add([x, R]);
        });
  }
  function ze(x) {
    return (
      ee ||
        ((ee = !x),
        pe(),
        fe.list().forEach(([R, $]) => (x ? $(x) : R())),
        fe.reset()),
      x
    );
  }
  function je(x, R, $, F) {
    const { scrollBehavior: ie } = e;
    if (!kn || !ie) return Promise.resolve();
    const d =
      (!$ && Fh(Ca(x.fullPath, 0))) ||
      ((F || !$) && history.state && history.state.scroll) ||
      null;
    return $i()
      .then(() => ie(x, R, d))
      .then((p) => p && Bh(p))
      .catch((p) => re(p, x, R));
  }
  const we = (x) => i.go(x);
  let et;
  const Ve = new Set(),
    Ue = {
      currentRoute: l,
      listening: !0,
      addRoute: g,
      removeRoute: m,
      hasRoute: y,
      getRoutes: b,
      resolve: _,
      options: e,
      push: C,
      replace: I,
      go: we,
      back: () => we(-1),
      forward: () => we(1),
      beforeEach: o.add,
      beforeResolve: s.add,
      afterEach: a.add,
      onError: q.add,
      isReady: Se,
      install(x) {
        const R = this;
        x.component("RouterLink", Ep),
          x.component("RouterView", Kc),
          (x.config.globalProperties.$router = R),
          Object.defineProperty(x.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => ae(l),
          }),
          kn &&
            !et &&
            l.value === St &&
            ((et = !0), C(i.location).catch((ie) => {}));
        const $ = {};
        for (const ie in St)
          Object.defineProperty($, ie, {
            get: () => l.value[ie],
            enumerable: !0,
          });
        x.provide(as, R), x.provide(qc, Ql($)), x.provide(Ao, l);
        const F = x.unmount;
        Ve.add(x),
          (x.unmount = function () {
            Ve.delete(x),
              Ve.size < 1 &&
                ((c = St),
                G && G(),
                (G = null),
                (l.value = St),
                (et = !1),
                (ee = !1)),
              F();
          });
      },
    };
  function ye(x) {
    return x.reduce((R, $) => R.then(() => j($)), Promise.resolve());
  }
  return Ue;
}
function Sp(e, t) {
  const n = [],
    r = [],
    i = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let s = 0; s < o; s++) {
    const a = t.matched[s];
    a && (e.matched.find((c) => jn(c, a)) ? r.push(a) : n.push(a));
    const l = e.matched[s];
    l && (t.matched.find((c) => jn(c, l)) || i.push(l));
  }
  return [n, r, i];
}
var Lp = (function () {
    function e(t, n) {
      n === void 0 && (n = []),
        (this._eventType = t),
        (this._eventFunctions = n);
    }
    return (
      (e.prototype.init = function () {
        var t = this;
        this._eventFunctions.forEach(function (n) {
          typeof window < "u" && window.addEventListener(t._eventType, n);
        });
      }),
      e
    );
  })(),
  ci =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (ci =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        ci.apply(this, arguments)
      );
    },
  ui = {
    alwaysOpen: !1,
    activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
    inactiveClasses: "text-gray-500 dark:text-gray-400",
    onOpen: function () {},
    onClose: function () {},
    onToggle: function () {},
  },
  Yc = (function () {
    function e(t, n) {
      t === void 0 && (t = []),
        n === void 0 && (n = ui),
        (this._items = t),
        (this._options = ci(ci({}, ui), n)),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._items.length &&
          this._items.map(function (n) {
            n.active && t.open(n.id),
              n.triggerEl.addEventListener("click", function () {
                t.toggle(n.id);
              });
          });
      }),
      (e.prototype.getItem = function (t) {
        return this._items.filter(function (n) {
          return n.id === t;
        })[0];
      }),
      (e.prototype.open = function (t) {
        var n,
          r,
          i = this,
          o = this.getItem(t);
        this._options.alwaysOpen ||
          this._items.map(function (s) {
            var a, l;
            s !== o &&
              ((a = s.triggerEl.classList).remove.apply(
                a,
                i._options.activeClasses.split(" ")
              ),
              (l = s.triggerEl.classList).add.apply(
                l,
                i._options.inactiveClasses.split(" ")
              ),
              s.targetEl.classList.add("hidden"),
              s.triggerEl.setAttribute("aria-expanded", "false"),
              (s.active = !1),
              s.iconEl && s.iconEl.classList.remove("rotate-180"));
          }),
          (n = o.triggerEl.classList).add.apply(
            n,
            this._options.activeClasses.split(" ")
          ),
          (r = o.triggerEl.classList).remove.apply(
            r,
            this._options.inactiveClasses.split(" ")
          ),
          o.triggerEl.setAttribute("aria-expanded", "true"),
          o.targetEl.classList.remove("hidden"),
          (o.active = !0),
          o.iconEl && o.iconEl.classList.add("rotate-180"),
          this._options.onOpen(this, o);
      }),
      (e.prototype.toggle = function (t) {
        var n = this.getItem(t);
        n.active ? this.close(t) : this.open(t),
          this._options.onToggle(this, n);
      }),
      (e.prototype.close = function (t) {
        var n,
          r,
          i = this.getItem(t);
        (n = i.triggerEl.classList).remove.apply(
          n,
          this._options.activeClasses.split(" ")
        ),
          (r = i.triggerEl.classList).add.apply(
            r,
            this._options.inactiveClasses.split(" ")
          ),
          i.targetEl.classList.add("hidden"),
          i.triggerEl.setAttribute("aria-expanded", "false"),
          (i.active = !1),
          i.iconEl && i.iconEl.classList.remove("rotate-180"),
          this._options.onClose(this, i);
      }),
      e
    );
  })();
function ls() {
  document.querySelectorAll("[data-accordion]").forEach(function (e) {
    var t = e.getAttribute("data-accordion"),
      n = e.getAttribute("data-active-classes"),
      r = e.getAttribute("data-inactive-classes"),
      i = [];
    e.querySelectorAll("[data-accordion-target]").forEach(function (o) {
      if (o.closest("[data-accordion]") === e) {
        var s = {
          id: o.getAttribute("data-accordion-target"),
          triggerEl: o,
          targetEl: document.querySelector(
            o.getAttribute("data-accordion-target")
          ),
          iconEl: o.querySelector("[data-accordion-icon]"),
          active: o.getAttribute("aria-expanded") === "true",
        };
        i.push(s);
      }
    }),
      new Yc(i, {
        alwaysOpen: t === "open",
        activeClasses: n || ui.activeClasses,
        inactiveClasses: r || ui.inactiveClasses,
      });
  });
}
typeof window < "u" && ((window.Accordion = Yc), (window.initAccordions = ls));
var fi =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (fi =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        fi.apply(this, arguments)
      );
    },
  Ba = {
    onCollapse: function () {},
    onExpand: function () {},
    onToggle: function () {},
  },
  Qc = (function () {
    function e(t, n, r) {
      t === void 0 && (t = null),
        n === void 0 && (n = null),
        r === void 0 && (r = Ba),
        (this._targetEl = t),
        (this._triggerEl = n),
        (this._options = fi(fi({}, Ba), r)),
        (this._visible = !1),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._triggerEl &&
          (this._triggerEl.hasAttribute("aria-expanded")
            ? (this._visible =
                this._triggerEl.getAttribute("aria-expanded") === "true")
            : (this._visible = !this._targetEl.classList.contains("hidden")),
          this._triggerEl.addEventListener("click", function () {
            t.toggle();
          }));
      }),
      (e.prototype.collapse = function () {
        this._targetEl.classList.add("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "false"),
          (this._visible = !1),
          this._options.onCollapse(this);
      }),
      (e.prototype.expand = function () {
        this._targetEl.classList.remove("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "true"),
          (this._visible = !0),
          this._options.onExpand(this);
      }),
      (e.prototype.toggle = function () {
        this._visible ? this.collapse() : this.expand(),
          this._options.onToggle(this);
      }),
      e
    );
  })();
function cs() {
  document.querySelectorAll("[data-collapse-toggle]").forEach(function (e) {
    var t = e.getAttribute("data-collapse-toggle"),
      n = document.getElementById(t);
    n
      ? new Qc(n, e)
      : console.error(
          'The target element with id "'.concat(
            t,
            '" does not exist. Please check the data-collapse-toggle attribute.'
          )
        );
  });
}
typeof window < "u" && ((window.Collapse = Qc), (window.initCollapses = cs));
var rn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (rn =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        rn.apply(this, arguments)
      );
    },
  Xr = {
    defaultPosition: 0,
    indicators: {
      items: [],
      activeClasses: "bg-white dark:bg-gray-800",
      inactiveClasses:
        "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
    },
    interval: 3e3,
    onNext: function () {},
    onPrev: function () {},
    onChange: function () {},
  },
  Jc = (function () {
    function e(t, n) {
      t === void 0 && (t = []),
        n === void 0 && (n = Xr),
        (this._items = t),
        (this._options = rn(rn(rn({}, Xr), n), {
          indicators: rn(rn({}, Xr.indicators), n.indicators),
        })),
        (this._activeItem = this.getItem(this._options.defaultPosition)),
        (this._indicators = this._options.indicators.items),
        (this._intervalDuration = this._options.interval),
        (this._intervalInstance = null),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._items.map(function (n) {
          n.el.classList.add(
            "absolute",
            "inset-0",
            "transition-transform",
            "transform"
          );
        }),
          this._getActiveItem()
            ? this.slideTo(this._getActiveItem().position)
            : this.slideTo(0),
          this._indicators.map(function (n, r) {
            n.el.addEventListener("click", function () {
              t.slideTo(r);
            });
          });
      }),
      (e.prototype.getItem = function (t) {
        return this._items[t];
      }),
      (e.prototype.slideTo = function (t) {
        var n = this._items[t],
          r = {
            left:
              n.position === 0
                ? this._items[this._items.length - 1]
                : this._items[n.position - 1],
            middle: n,
            right:
              n.position === this._items.length - 1
                ? this._items[0]
                : this._items[n.position + 1],
          };
        this._rotate(r),
          this._setActiveItem(n),
          this._intervalInstance && (this.pause(), this.cycle()),
          this._options.onChange(this);
      }),
      (e.prototype.next = function () {
        var t = this._getActiveItem(),
          n = null;
        t.position === this._items.length - 1
          ? (n = this._items[0])
          : (n = this._items[t.position + 1]),
          this.slideTo(n.position),
          this._options.onNext(this);
      }),
      (e.prototype.prev = function () {
        var t = this._getActiveItem(),
          n = null;
        t.position === 0
          ? (n = this._items[this._items.length - 1])
          : (n = this._items[t.position - 1]),
          this.slideTo(n.position),
          this._options.onPrev(this);
      }),
      (e.prototype._rotate = function (t) {
        this._items.map(function (n) {
          n.el.classList.add("hidden");
        }),
          t.left.el.classList.remove(
            "-translate-x-full",
            "translate-x-full",
            "translate-x-0",
            "hidden",
            "z-20"
          ),
          t.left.el.classList.add("-translate-x-full", "z-10"),
          t.middle.el.classList.remove(
            "-translate-x-full",
            "translate-x-full",
            "translate-x-0",
            "hidden",
            "z-10"
          ),
          t.middle.el.classList.add("translate-x-0", "z-20"),
          t.right.el.classList.remove(
            "-translate-x-full",
            "translate-x-full",
            "translate-x-0",
            "hidden",
            "z-20"
          ),
          t.right.el.classList.add("translate-x-full", "z-10");
      }),
      (e.prototype.cycle = function () {
        var t = this;
        typeof window < "u" &&
          (this._intervalInstance = window.setInterval(function () {
            t.next();
          }, this._intervalDuration));
      }),
      (e.prototype.pause = function () {
        clearInterval(this._intervalInstance);
      }),
      (e.prototype._getActiveItem = function () {
        return this._activeItem;
      }),
      (e.prototype._setActiveItem = function (t) {
        var n,
          r,
          i = this;
        this._activeItem = t;
        var o = t.position;
        this._indicators.length &&
          (this._indicators.map(function (s) {
            var a, l;
            s.el.setAttribute("aria-current", "false"),
              (a = s.el.classList).remove.apply(
                a,
                i._options.indicators.activeClasses.split(" ")
              ),
              (l = s.el.classList).add.apply(
                l,
                i._options.indicators.inactiveClasses.split(" ")
              );
          }),
          (n = this._indicators[o].el.classList).add.apply(
            n,
            this._options.indicators.activeClasses.split(" ")
          ),
          (r = this._indicators[o].el.classList).remove.apply(
            r,
            this._options.indicators.inactiveClasses.split(" ")
          ),
          this._indicators[o].el.setAttribute("aria-current", "true"));
      }),
      e
    );
  })();
function us() {
  document.querySelectorAll("[data-carousel]").forEach(function (e) {
    var t = e.getAttribute("data-carousel-interval"),
      n = e.getAttribute("data-carousel") === "slide",
      r = [],
      i = 0;
    e.querySelectorAll("[data-carousel-item]").length &&
      Array.from(e.querySelectorAll("[data-carousel-item]")).map(function (
        c,
        u
      ) {
        r.push({ position: u, el: c }),
          c.getAttribute("data-carousel-item") === "active" && (i = u);
      });
    var o = [];
    e.querySelectorAll("[data-carousel-slide-to]").length &&
      Array.from(e.querySelectorAll("[data-carousel-slide-to]")).map(function (
        c
      ) {
        o.push({
          position: parseInt(c.getAttribute("data-carousel-slide-to")),
          el: c,
        });
      });
    var s = new Jc(r, {
      defaultPosition: i,
      indicators: { items: o },
      interval: t || Xr.interval,
    });
    n && s.cycle();
    var a = e.querySelector("[data-carousel-next]"),
      l = e.querySelector("[data-carousel-prev]");
    a &&
      a.addEventListener("click", function () {
        s.next();
      }),
      l &&
        l.addEventListener("click", function () {
          s.prev();
        });
  });
}
typeof window < "u" && ((window.Carousel = Jc), (window.initCarousels = us));
var di =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (di =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        di.apply(this, arguments)
      );
    },
  Na = {
    transition: "transition-opacity",
    duration: 300,
    timing: "ease-out",
    onHide: function () {},
  },
  Xc = (function () {
    function e(t, n, r) {
      t === void 0 && (t = null),
        n === void 0 && (n = null),
        r === void 0 && (r = Na),
        (this._targetEl = t),
        (this._triggerEl = n),
        (this._options = di(di({}, Na), r)),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._triggerEl &&
          this._triggerEl.addEventListener("click", function () {
            t.hide();
          });
      }),
      (e.prototype.hide = function () {
        var t = this;
        this._targetEl.classList.add(
          this._options.transition,
          "duration-".concat(this._options.duration),
          this._options.timing,
          "opacity-0"
        ),
          setTimeout(function () {
            t._targetEl.classList.add("hidden");
          }, this._options.duration),
          this._options.onHide(this, this._targetEl);
      }),
      e
    );
  })();
function fs() {
  document.querySelectorAll("[data-dismiss-target]").forEach(function (e) {
    var t = e.getAttribute("data-dismiss-target"),
      n = document.querySelector(t);
    n
      ? new Xc(n, e)
      : console.error(
          'The dismiss element with id "'.concat(
            t,
            '" does not exist. Please check the data-dismiss-target attribute.'
          )
        );
  });
}
typeof window < "u" && ((window.Dismiss = Xc), (window.initDismisses = fs));
var Be = "top",
  Ge = "bottom",
  Ze = "right",
  Ne = "left",
  ds = "auto",
  Ar = [Be, Ge, Ze, Ne],
  Dn = "start",
  xr = "end",
  Pp = "clippingParents",
  Gc = "viewport",
  Jn = "popper",
  $p = "reference",
  Fa = Ar.reduce(function (e, t) {
    return e.concat([t + "-" + Dn, t + "-" + xr]);
  }, []),
  Zc = [].concat(Ar, [ds]).reduce(function (e, t) {
    return e.concat([t, t + "-" + Dn, t + "-" + xr]);
  }, []),
  Ip = "beforeRead",
  Rp = "read",
  jp = "afterRead",
  Mp = "beforeMain",
  Dp = "main",
  Hp = "afterMain",
  Bp = "beforeWrite",
  Np = "write",
  Fp = "afterWrite",
  zp = [Ip, Rp, jp, Mp, Dp, Hp, Bp, Np, Fp];
function gt(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ye(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function hn(e) {
  var t = Ye(e).Element;
  return e instanceof t || e instanceof Element;
}
function Xe(e) {
  var t = Ye(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function hs(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = Ye(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Vp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
    var r = t.styles[n] || {},
      i = t.attributes[n] || {},
      o = t.elements[n];
    !Xe(o) ||
      !gt(o) ||
      (Object.assign(o.style, r),
      Object.keys(i).forEach(function (s) {
        var a = i[s];
        a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
      }));
  });
}
function Up(e) {
  var t = e.state,
    n = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var i = t.elements[r],
          o = t.attributes[r] || {},
          s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
          a = s.reduce(function (l, c) {
            return (l[c] = ""), l;
          }, {});
        !Xe(i) ||
          !gt(i) ||
          (Object.assign(i.style, a),
          Object.keys(o).forEach(function (l) {
            i.removeAttribute(l);
          }));
      });
    }
  );
}
const Wp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Vp,
  effect: Up,
  requires: ["computeStyles"],
};
function ht(e) {
  return e.split("-")[0];
}
var fn = Math.max,
  hi = Math.min,
  Hn = Math.round;
function So() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function eu() {
  return !/^((?!chrome|android).)*safari/i.test(So());
}
function Bn(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(),
    i = 1,
    o = 1;
  t &&
    Xe(e) &&
    ((i = (e.offsetWidth > 0 && Hn(r.width) / e.offsetWidth) || 1),
    (o = (e.offsetHeight > 0 && Hn(r.height) / e.offsetHeight) || 1));
  var s = hn(e) ? Ye(e) : window,
    a = s.visualViewport,
    l = !eu() && n,
    c = (r.left + (l && a ? a.offsetLeft : 0)) / i,
    u = (r.top + (l && a ? a.offsetTop : 0)) / o,
    f = r.width / i,
    h = r.height / o;
  return {
    width: f,
    height: h,
    top: u,
    right: c + f,
    bottom: u + h,
    left: c,
    x: c,
    y: u,
  };
}
function ps(e) {
  var t = Bn(e),
    n = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
  );
}
function tu(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && hs(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ct(e) {
  return Ye(e).getComputedStyle(e);
}
function qp(e) {
  return ["table", "td", "th"].indexOf(gt(e)) >= 0;
}
function Yt(e) {
  return ((hn(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function Fi(e) {
  return gt(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (hs(e) ? e.host : null) || Yt(e);
}
function za(e) {
  return !Xe(e) || Ct(e).position === "fixed" ? null : e.offsetParent;
}
function Kp(e) {
  var t = /firefox/i.test(So()),
    n = /Trident/i.test(So());
  if (n && Xe(e)) {
    var r = Ct(e);
    if (r.position === "fixed") return null;
  }
  var i = Fi(e);
  for (hs(i) && (i = i.host); Xe(i) && ["html", "body"].indexOf(gt(i)) < 0; ) {
    var o = Ct(i);
    if (
      o.transform !== "none" ||
      o.perspective !== "none" ||
      o.contain === "paint" ||
      ["transform", "perspective"].indexOf(o.willChange) !== -1 ||
      (t && o.willChange === "filter") ||
      (t && o.filter && o.filter !== "none")
    )
      return i;
    i = i.parentNode;
  }
  return null;
}
function Sr(e) {
  for (var t = Ye(e), n = za(e); n && qp(n) && Ct(n).position === "static"; )
    n = za(n);
  return n &&
    (gt(n) === "html" || (gt(n) === "body" && Ct(n).position === "static"))
    ? t
    : n || Kp(e) || t;
}
function gs(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ar(e, t, n) {
  return fn(e, hi(t, n));
}
function Yp(e, t, n) {
  var r = ar(e, t, n);
  return r > n ? n : r;
}
function nu() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function ru(e) {
  return Object.assign({}, nu(), e);
}
function iu(e, t) {
  return t.reduce(function (n, r) {
    return (n[r] = e), n;
  }, {});
}
var Qp = function (t, n) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, n.rects, { placement: n.placement }))
        : t),
    ru(typeof t != "number" ? t : iu(t, Ar))
  );
};
function Jp(e) {
  var t,
    n = e.state,
    r = e.name,
    i = e.options,
    o = n.elements.arrow,
    s = n.modifiersData.popperOffsets,
    a = ht(n.placement),
    l = gs(a),
    c = [Ne, Ze].indexOf(a) >= 0,
    u = c ? "height" : "width";
  if (!(!o || !s)) {
    var f = Qp(i.padding, n),
      h = ps(o),
      g = l === "y" ? Be : Ne,
      m = l === "y" ? Ge : Ze,
      b =
        n.rects.reference[u] + n.rects.reference[l] - s[l] - n.rects.popper[u],
      y = s[l] - n.rects.reference[l],
      _ = Sr(o),
      k = _ ? (l === "y" ? _.clientHeight || 0 : _.clientWidth || 0) : 0,
      P = b / 2 - y / 2,
      C = f[g],
      I = k - h[u] - f[m],
      D = k / 2 - h[u] / 2 + P,
      U = ar(C, D, I),
      N = l;
    n.modifiersData[r] = ((t = {}), (t[N] = U), (t.centerOffset = U - D), t);
  }
}
function Xp(e) {
  var t = e.state,
    n = e.options,
    r = n.element,
    i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null &&
    ((typeof i == "string" && ((i = t.elements.popper.querySelector(i)), !i)) ||
      (tu(t.elements.popper, i) && (t.elements.arrow = i)));
}
const Gp = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Jp,
  effect: Xp,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function Nn(e) {
  return e.split("-")[1];
}
var Zp = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function eg(e, t) {
  var n = e.x,
    r = e.y,
    i = t.devicePixelRatio || 1;
  return { x: Hn(n * i) / i || 0, y: Hn(r * i) / i || 0 };
}
function Va(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    i = e.placement,
    o = e.variation,
    s = e.offsets,
    a = e.position,
    l = e.gpuAcceleration,
    c = e.adaptive,
    u = e.roundOffsets,
    f = e.isFixed,
    h = s.x,
    g = h === void 0 ? 0 : h,
    m = s.y,
    b = m === void 0 ? 0 : m,
    y = typeof u == "function" ? u({ x: g, y: b }) : { x: g, y: b };
  (g = y.x), (b = y.y);
  var _ = s.hasOwnProperty("x"),
    k = s.hasOwnProperty("y"),
    P = Ne,
    C = Be,
    I = window;
  if (c) {
    var D = Sr(n),
      U = "clientHeight",
      N = "clientWidth";
    if (
      (D === Ye(n) &&
        ((D = Yt(n)),
        Ct(D).position !== "static" &&
          a === "absolute" &&
          ((U = "scrollHeight"), (N = "scrollWidth"))),
      (D = D),
      i === Be || ((i === Ne || i === Ze) && o === xr))
    ) {
      C = Ge;
      var j = f && D === I && I.visualViewport ? I.visualViewport.height : D[U];
      (b -= j - r.height), (b *= l ? 1 : -1);
    }
    if (i === Ne || ((i === Be || i === Ge) && o === xr)) {
      P = Ze;
      var W = f && D === I && I.visualViewport ? I.visualViewport.width : D[N];
      (g -= W - r.width), (g *= l ? 1 : -1);
    }
  }
  var Y = Object.assign({ position: a }, c && Zp),
    se = u === !0 ? eg({ x: g, y: b }, Ye(n)) : { x: g, y: b };
  if (((g = se.x), (b = se.y), l)) {
    var G;
    return Object.assign(
      {},
      Y,
      ((G = {}),
      (G[C] = k ? "0" : ""),
      (G[P] = _ ? "0" : ""),
      (G.transform =
        (I.devicePixelRatio || 1) <= 1
          ? "translate(" + g + "px, " + b + "px)"
          : "translate3d(" + g + "px, " + b + "px, 0)"),
      G)
    );
  }
  return Object.assign(
    {},
    Y,
    ((t = {}),
    (t[C] = k ? b + "px" : ""),
    (t[P] = _ ? g + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function tg(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    o = n.adaptive,
    s = o === void 0 ? !0 : o,
    a = n.roundOffsets,
    l = a === void 0 ? !0 : a,
    c = {
      placement: ht(t.placement),
      variation: Nn(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Va(
        Object.assign({}, c, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: s,
          roundOffsets: l,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Va(
          Object.assign({}, c, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
const ng = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: tg,
  data: {},
};
var Br = { passive: !0 };
function rg(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    i = r.scroll,
    o = i === void 0 ? !0 : i,
    s = r.resize,
    a = s === void 0 ? !0 : s,
    l = Ye(t.elements.popper),
    c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    o &&
      c.forEach(function (u) {
        u.addEventListener("scroll", n.update, Br);
      }),
    a && l.addEventListener("resize", n.update, Br),
    function () {
      o &&
        c.forEach(function (u) {
          u.removeEventListener("scroll", n.update, Br);
        }),
        a && l.removeEventListener("resize", n.update, Br);
    }
  );
}
const ig = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: rg,
  data: {},
};
var og = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Gr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return og[t];
  });
}
var sg = { start: "end", end: "start" };
function Ua(e) {
  return e.replace(/start|end/g, function (t) {
    return sg[t];
  });
}
function vs(e) {
  var t = Ye(e),
    n = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function ms(e) {
  return Bn(Yt(e)).left + vs(e).scrollLeft;
}
function ag(e, t) {
  var n = Ye(e),
    r = Yt(e),
    i = n.visualViewport,
    o = r.clientWidth,
    s = r.clientHeight,
    a = 0,
    l = 0;
  if (i) {
    (o = i.width), (s = i.height);
    var c = eu();
    (c || (!c && t === "fixed")) && ((a = i.offsetLeft), (l = i.offsetTop));
  }
  return { width: o, height: s, x: a + ms(e), y: l };
}
function lg(e) {
  var t,
    n = Yt(e),
    r = vs(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    o = fn(
      n.scrollWidth,
      n.clientWidth,
      i ? i.scrollWidth : 0,
      i ? i.clientWidth : 0
    ),
    s = fn(
      n.scrollHeight,
      n.clientHeight,
      i ? i.scrollHeight : 0,
      i ? i.clientHeight : 0
    ),
    a = -r.scrollLeft + ms(e),
    l = -r.scrollTop;
  return (
    Ct(i || n).direction === "rtl" &&
      (a += fn(n.clientWidth, i ? i.clientWidth : 0) - o),
    { width: o, height: s, x: a, y: l }
  );
}
function ys(e) {
  var t = Ct(e),
    n = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function ou(e) {
  return ["html", "body", "#document"].indexOf(gt(e)) >= 0
    ? e.ownerDocument.body
    : Xe(e) && ys(e)
    ? e
    : ou(Fi(e));
}
function lr(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = ou(e),
    i = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    o = Ye(r),
    s = i ? [o].concat(o.visualViewport || [], ys(r) ? r : []) : r,
    a = t.concat(s);
  return i ? a : a.concat(lr(Fi(s)));
}
function Lo(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function cg(e, t) {
  var n = Bn(e, !1, t === "fixed");
  return (
    (n.top = n.top + e.clientTop),
    (n.left = n.left + e.clientLeft),
    (n.bottom = n.top + e.clientHeight),
    (n.right = n.left + e.clientWidth),
    (n.width = e.clientWidth),
    (n.height = e.clientHeight),
    (n.x = n.left),
    (n.y = n.top),
    n
  );
}
function Wa(e, t, n) {
  return t === Gc ? Lo(ag(e, n)) : hn(t) ? cg(t, n) : Lo(lg(Yt(e)));
}
function ug(e) {
  var t = lr(Fi(e)),
    n = ["absolute", "fixed"].indexOf(Ct(e).position) >= 0,
    r = n && Xe(e) ? Sr(e) : e;
  return hn(r)
    ? t.filter(function (i) {
        return hn(i) && tu(i, r) && gt(i) !== "body";
      })
    : [];
}
function fg(e, t, n, r) {
  var i = t === "clippingParents" ? ug(e) : [].concat(t),
    o = [].concat(i, [n]),
    s = o[0],
    a = o.reduce(function (l, c) {
      var u = Wa(e, c, r);
      return (
        (l.top = fn(u.top, l.top)),
        (l.right = hi(u.right, l.right)),
        (l.bottom = hi(u.bottom, l.bottom)),
        (l.left = fn(u.left, l.left)),
        l
      );
    }, Wa(e, s, r));
  return (
    (a.width = a.right - a.left),
    (a.height = a.bottom - a.top),
    (a.x = a.left),
    (a.y = a.top),
    a
  );
}
function su(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    i = r ? ht(r) : null,
    o = r ? Nn(r) : null,
    s = t.x + t.width / 2 - n.width / 2,
    a = t.y + t.height / 2 - n.height / 2,
    l;
  switch (i) {
    case Be:
      l = { x: s, y: t.y - n.height };
      break;
    case Ge:
      l = { x: s, y: t.y + t.height };
      break;
    case Ze:
      l = { x: t.x + t.width, y: a };
      break;
    case Ne:
      l = { x: t.x - n.width, y: a };
      break;
    default:
      l = { x: t.x, y: t.y };
  }
  var c = i ? gs(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (o) {
      case Dn:
        l[c] = l[c] - (t[u] / 2 - n[u] / 2);
        break;
      case xr:
        l[c] = l[c] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return l;
}
function kr(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    i = r === void 0 ? e.placement : r,
    o = n.strategy,
    s = o === void 0 ? e.strategy : o,
    a = n.boundary,
    l = a === void 0 ? Pp : a,
    c = n.rootBoundary,
    u = c === void 0 ? Gc : c,
    f = n.elementContext,
    h = f === void 0 ? Jn : f,
    g = n.altBoundary,
    m = g === void 0 ? !1 : g,
    b = n.padding,
    y = b === void 0 ? 0 : b,
    _ = ru(typeof y != "number" ? y : iu(y, Ar)),
    k = h === Jn ? $p : Jn,
    P = e.rects.popper,
    C = e.elements[m ? k : h],
    I = fg(hn(C) ? C : C.contextElement || Yt(e.elements.popper), l, u, s),
    D = Bn(e.elements.reference),
    U = su({ reference: D, element: P, strategy: "absolute", placement: i }),
    N = Lo(Object.assign({}, P, U)),
    j = h === Jn ? N : D,
    W = {
      top: I.top - j.top + _.top,
      bottom: j.bottom - I.bottom + _.bottom,
      left: I.left - j.left + _.left,
      right: j.right - I.right + _.right,
    },
    Y = e.modifiersData.offset;
  if (h === Jn && Y) {
    var se = Y[i];
    Object.keys(W).forEach(function (G) {
      var pe = [Ze, Ge].indexOf(G) >= 0 ? 1 : -1,
        fe = [Be, Ge].indexOf(G) >= 0 ? "y" : "x";
      W[G] += se[fe] * pe;
    });
  }
  return W;
}
function dg(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    i = n.boundary,
    o = n.rootBoundary,
    s = n.padding,
    a = n.flipVariations,
    l = n.allowedAutoPlacements,
    c = l === void 0 ? Zc : l,
    u = Nn(r),
    f = u
      ? a
        ? Fa
        : Fa.filter(function (m) {
            return Nn(m) === u;
          })
      : Ar,
    h = f.filter(function (m) {
      return c.indexOf(m) >= 0;
    });
  h.length === 0 && (h = f);
  var g = h.reduce(function (m, b) {
    return (
      (m[b] = kr(e, { placement: b, boundary: i, rootBoundary: o, padding: s })[
        ht(b)
      ]),
      m
    );
  }, {});
  return Object.keys(g).sort(function (m, b) {
    return g[m] - g[b];
  });
}
function hg(e) {
  if (ht(e) === ds) return [];
  var t = Gr(e);
  return [Ua(e), t, Ua(t)];
}
function pg(e) {
  var t = e.state,
    n = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var i = n.mainAxis,
        o = i === void 0 ? !0 : i,
        s = n.altAxis,
        a = s === void 0 ? !0 : s,
        l = n.fallbackPlacements,
        c = n.padding,
        u = n.boundary,
        f = n.rootBoundary,
        h = n.altBoundary,
        g = n.flipVariations,
        m = g === void 0 ? !0 : g,
        b = n.allowedAutoPlacements,
        y = t.options.placement,
        _ = ht(y),
        k = _ === y,
        P = l || (k || !m ? [Gr(y)] : hg(y)),
        C = [y].concat(P).reduce(function (Ve, Ue) {
          return Ve.concat(
            ht(Ue) === ds
              ? dg(t, {
                  placement: Ue,
                  boundary: u,
                  rootBoundary: f,
                  padding: c,
                  flipVariations: m,
                  allowedAutoPlacements: b,
                })
              : Ue
          );
        }, []),
        I = t.rects.reference,
        D = t.rects.popper,
        U = new Map(),
        N = !0,
        j = C[0],
        W = 0;
      W < C.length;
      W++
    ) {
      var Y = C[W],
        se = ht(Y),
        G = Nn(Y) === Dn,
        pe = [Be, Ge].indexOf(se) >= 0,
        fe = pe ? "width" : "height",
        q = kr(t, {
          placement: Y,
          boundary: u,
          rootBoundary: f,
          altBoundary: h,
          padding: c,
        }),
        ee = pe ? (G ? Ze : Ne) : G ? Ge : Be;
      I[fe] > D[fe] && (ee = Gr(ee));
      var re = Gr(ee),
        Se = [];
      if (
        (o && Se.push(q[se] <= 0),
        a && Se.push(q[ee] <= 0, q[re] <= 0),
        Se.every(function (Ve) {
          return Ve;
        }))
      ) {
        (j = Y), (N = !1);
        break;
      }
      U.set(Y, Se);
    }
    if (N)
      for (
        var ze = m ? 3 : 1,
          je = function (Ue) {
            var ye = C.find(function (x) {
              var R = U.get(x);
              if (R)
                return R.slice(0, Ue).every(function ($) {
                  return $;
                });
            });
            if (ye) return (j = ye), "break";
          },
          we = ze;
        we > 0;
        we--
      ) {
        var et = je(we);
        if (et === "break") break;
      }
    t.placement !== j &&
      ((t.modifiersData[r]._skip = !0), (t.placement = j), (t.reset = !0));
  }
}
const gg = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: pg,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function qa(e, t, n) {
  return (
    n === void 0 && (n = { x: 0, y: 0 }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x,
    }
  );
}
function Ka(e) {
  return [Be, Ze, Ge, Ne].some(function (t) {
    return e[t] >= 0;
  });
}
function vg(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    o = t.modifiersData.preventOverflow,
    s = kr(t, { elementContext: "reference" }),
    a = kr(t, { altBoundary: !0 }),
    l = qa(s, r),
    c = qa(a, i, o),
    u = Ka(l),
    f = Ka(c);
  (t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": u,
      "data-popper-escaped": f,
    }));
}
const mg = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: vg,
};
function yg(e, t, n) {
  var r = ht(e),
    i = [Ne, Be].indexOf(r) >= 0 ? -1 : 1,
    o = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
    s = o[0],
    a = o[1];
  return (
    (s = s || 0),
    (a = (a || 0) * i),
    [Ne, Ze].indexOf(r) >= 0 ? { x: a, y: s } : { x: s, y: a }
  );
}
function bg(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    i = n.offset,
    o = i === void 0 ? [0, 0] : i,
    s = Zc.reduce(function (u, f) {
      return (u[f] = yg(f, t.rects, o)), u;
    }, {}),
    a = s[t.placement],
    l = a.x,
    c = a.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += l),
    (t.modifiersData.popperOffsets.y += c)),
    (t.modifiersData[r] = s);
}
const _g = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: bg,
};
function wg(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = su({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
const xg = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: wg,
  data: {},
};
function kg(e) {
  return e === "x" ? "y" : "x";
}
function Eg(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    i = n.mainAxis,
    o = i === void 0 ? !0 : i,
    s = n.altAxis,
    a = s === void 0 ? !1 : s,
    l = n.boundary,
    c = n.rootBoundary,
    u = n.altBoundary,
    f = n.padding,
    h = n.tether,
    g = h === void 0 ? !0 : h,
    m = n.tetherOffset,
    b = m === void 0 ? 0 : m,
    y = kr(t, { boundary: l, rootBoundary: c, padding: f, altBoundary: u }),
    _ = ht(t.placement),
    k = Nn(t.placement),
    P = !k,
    C = gs(_),
    I = kg(C),
    D = t.modifiersData.popperOffsets,
    U = t.rects.reference,
    N = t.rects.popper,
    j =
      typeof b == "function"
        ? b(Object.assign({}, t.rects, { placement: t.placement }))
        : b,
    W =
      typeof j == "number"
        ? { mainAxis: j, altAxis: j }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, j),
    Y = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    se = { x: 0, y: 0 };
  if (D) {
    if (o) {
      var G,
        pe = C === "y" ? Be : Ne,
        fe = C === "y" ? Ge : Ze,
        q = C === "y" ? "height" : "width",
        ee = D[C],
        re = ee + y[pe],
        Se = ee - y[fe],
        ze = g ? -N[q] / 2 : 0,
        je = k === Dn ? U[q] : N[q],
        we = k === Dn ? -N[q] : -U[q],
        et = t.elements.arrow,
        Ve = g && et ? ps(et) : { width: 0, height: 0 },
        Ue = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : nu(),
        ye = Ue[pe],
        x = Ue[fe],
        R = ar(0, U[q], Ve[q]),
        $ = P ? U[q] / 2 - ze - R - ye - W.mainAxis : je - R - ye - W.mainAxis,
        F = P ? -U[q] / 2 + ze + R + x + W.mainAxis : we + R + x + W.mainAxis,
        ie = t.elements.arrow && Sr(t.elements.arrow),
        d = ie ? (C === "y" ? ie.clientTop || 0 : ie.clientLeft || 0) : 0,
        p = (G = Y == null ? void 0 : Y[C]) != null ? G : 0,
        v = ee + $ - p - d,
        w = ee + F - p,
        E = ar(g ? hi(re, v) : re, ee, g ? fn(Se, w) : Se);
      (D[C] = E), (se[C] = E - ee);
    }
    if (a) {
      var T,
        M = C === "x" ? Be : Ne,
        S = C === "x" ? Ge : Ze,
        L = D[I],
        O = I === "y" ? "height" : "width",
        V = L + y[M],
        B = L - y[S],
        z = [Be, Ne].indexOf(_) !== -1,
        Q = (T = Y == null ? void 0 : Y[I]) != null ? T : 0,
        te = z ? V : L - U[O] - N[O] - Q + W.altAxis,
        de = z ? L + U[O] + N[O] - Q - W.altAxis : B,
        ue = g && z ? Yp(te, L, de) : ar(g ? te : V, L, g ? de : B);
      (D[I] = ue), (se[I] = ue - L);
    }
    t.modifiersData[r] = se;
  }
}
const Cg = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Eg,
  requiresIfExists: ["offset"],
};
function Tg(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Og(e) {
  return e === Ye(e) || !Xe(e) ? vs(e) : Tg(e);
}
function Ag(e) {
  var t = e.getBoundingClientRect(),
    n = Hn(t.width) / e.offsetWidth || 1,
    r = Hn(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Sg(e, t, n) {
  n === void 0 && (n = !1);
  var r = Xe(t),
    i = Xe(t) && Ag(t),
    o = Yt(t),
    s = Bn(e, i, n),
    a = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (r || (!r && !n)) &&
      ((gt(t) !== "body" || ys(o)) && (a = Og(t)),
      Xe(t)
        ? ((l = Bn(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
        : o && (l.x = ms(o))),
    {
      x: s.left + a.scrollLeft - l.x,
      y: s.top + a.scrollTop - l.y,
      width: s.width,
      height: s.height,
    }
  );
}
function Lg(e) {
  var t = new Map(),
    n = new Set(),
    r = [];
  e.forEach(function (o) {
    t.set(o.name, o);
  });
  function i(o) {
    n.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function (a) {
      if (!n.has(a)) {
        var l = t.get(a);
        l && i(l);
      }
    }),
      r.push(o);
  }
  return (
    e.forEach(function (o) {
      n.has(o.name) || i(o);
    }),
    r
  );
}
function Pg(e) {
  var t = Lg(e);
  return zp.reduce(function (n, r) {
    return n.concat(
      t.filter(function (i) {
        return i.phase === r;
      })
    );
  }, []);
}
function $g(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            (t = void 0), n(e());
          });
        })),
      t
    );
  };
}
function Ig(e) {
  var t = e.reduce(function (n, r) {
    var i = n[r.name];
    return (
      (n[r.name] = i
        ? Object.assign({}, i, r, {
            options: Object.assign({}, i.options, r.options),
            data: Object.assign({}, i.data, r.data),
          })
        : r),
      n
    );
  }, {});
  return Object.keys(t).map(function (n) {
    return t[n];
  });
}
var Ya = { placement: "bottom", modifiers: [], strategy: "absolute" };
function Qa() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Rg(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    i = t.defaultOptions,
    o = i === void 0 ? Ya : i;
  return function (a, l, c) {
    c === void 0 && (c = o);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Ya, o),
        modifiersData: {},
        elements: { reference: a, popper: l },
        attributes: {},
        styles: {},
      },
      f = [],
      h = !1,
      g = {
        state: u,
        setOptions: function (_) {
          var k = typeof _ == "function" ? _(u.options) : _;
          b(),
            (u.options = Object.assign({}, o, u.options, k)),
            (u.scrollParents = {
              reference: hn(a)
                ? lr(a)
                : a.contextElement
                ? lr(a.contextElement)
                : [],
              popper: lr(l),
            });
          var P = Pg(Ig([].concat(r, u.options.modifiers)));
          return (
            (u.orderedModifiers = P.filter(function (C) {
              return C.enabled;
            })),
            m(),
            g.update()
          );
        },
        forceUpdate: function () {
          if (!h) {
            var _ = u.elements,
              k = _.reference,
              P = _.popper;
            if (Qa(k, P)) {
              (u.rects = {
                reference: Sg(k, Sr(P), u.options.strategy === "fixed"),
                popper: ps(P),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (W) {
                  return (u.modifiersData[W.name] = Object.assign({}, W.data));
                });
              for (var C = 0; C < u.orderedModifiers.length; C++) {
                if (u.reset === !0) {
                  (u.reset = !1), (C = -1);
                  continue;
                }
                var I = u.orderedModifiers[C],
                  D = I.fn,
                  U = I.options,
                  N = U === void 0 ? {} : U,
                  j = I.name;
                typeof D == "function" &&
                  (u = D({ state: u, options: N, name: j, instance: g }) || u);
              }
            }
          }
        },
        update: $g(function () {
          return new Promise(function (y) {
            g.forceUpdate(), y(u);
          });
        }),
        destroy: function () {
          b(), (h = !0);
        },
      };
    if (!Qa(a, l)) return g;
    g.setOptions(c).then(function (y) {
      !h && c.onFirstUpdate && c.onFirstUpdate(y);
    });
    function m() {
      u.orderedModifiers.forEach(function (y) {
        var _ = y.name,
          k = y.options,
          P = k === void 0 ? {} : k,
          C = y.effect;
        if (typeof C == "function") {
          var I = C({ state: u, name: _, instance: g, options: P }),
            D = function () {};
          f.push(I || D);
        }
      });
    }
    function b() {
      f.forEach(function (y) {
        return y();
      }),
        (f = []);
    }
    return g;
  };
}
var jg = [ig, xg, ng, Wp, _g, gg, Cg, Gp, mg],
  bs = Rg({ defaultModifiers: jg }),
  jt =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (jt =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        jt.apply(this, arguments)
      );
    },
  Nr =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t, n) {
      if (n || arguments.length === 2)
        for (var r = 0, i = t.length, o; r < i; r++)
          (o || !(r in t)) &&
            (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
      return e.concat(o || Array.prototype.slice.call(t));
    },
  Mt = {
    placement: "bottom",
    triggerType: "click",
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    ignoreClickOutsideClass: !1,
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  au = (function () {
    function e(t, n, r) {
      t === void 0 && (t = null),
        n === void 0 && (n = null),
        r === void 0 && (r = Mt),
        (this._targetEl = t),
        (this._triggerEl = n),
        (this._options = jt(jt({}, Mt), r)),
        (this._popperInstance = this._createPopperInstance()),
        (this._visible = !1),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        this._triggerEl && this._setupEventListeners();
      }),
      (e.prototype._setupEventListeners = function () {
        var t = this,
          n = this._getTriggerEvents();
        this._options.triggerType === "click" &&
          n.showEvents.forEach(function (r) {
            t._triggerEl.addEventListener(r, function () {
              t.toggle();
            });
          }),
          this._options.triggerType === "hover" &&
            (n.showEvents.forEach(function (r) {
              t._triggerEl.addEventListener(r, function () {
                r === "click"
                  ? t.toggle()
                  : setTimeout(function () {
                      t.show();
                    }, t._options.delay);
              }),
                t._targetEl.addEventListener(r, function () {
                  t.show();
                });
            }),
            n.hideEvents.forEach(function (r) {
              t._triggerEl.addEventListener(r, function () {
                setTimeout(function () {
                  t._targetEl.matches(":hover") || t.hide();
                }, t._options.delay);
              }),
                t._targetEl.addEventListener(r, function () {
                  setTimeout(function () {
                    t._triggerEl.matches(":hover") || t.hide();
                  }, t._options.delay);
                });
            }));
      }),
      (e.prototype._createPopperInstance = function () {
        return bs(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [
                  this._options.offsetSkidding,
                  this._options.offsetDistance,
                ],
              },
            },
          ],
        });
      }),
      (e.prototype._setupClickOutsideListener = function () {
        var t = this;
        (this._clickOutsideEventListener = function (n) {
          t._handleClickOutside(n, t._targetEl);
        }),
          document.body.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          );
      }),
      (e.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener(
          "click",
          this._clickOutsideEventListener,
          !0
        );
      }),
      (e.prototype._handleClickOutside = function (t, n) {
        var r = t.target,
          i = this._options.ignoreClickOutsideClass,
          o = !1;
        if (i) {
          var s = document.querySelectorAll(".".concat(i));
          s.forEach(function (a) {
            if (a.contains(r)) {
              o = !0;
              return;
            }
          });
        }
        r !== n &&
          !n.contains(r) &&
          !this._triggerEl.contains(r) &&
          !o &&
          this.isVisible() &&
          this.hide();
      }),
      (e.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "click"],
              hideEvents: ["mouseleave"],
            };
          case "click":
            return { showEvents: ["click"], hideEvents: [] };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return { showEvents: ["click"], hideEvents: [] };
        }
      }),
      (e.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show(),
          this._options.onToggle(this);
      }),
      (e.prototype.isVisible = function () {
        return this._visible;
      }),
      (e.prototype.show = function () {
        this._targetEl.classList.remove("hidden"),
          this._targetEl.classList.add("block"),
          this._popperInstance.setOptions(function (t) {
            return jt(jt({}, t), {
              modifiers: Nr(
                Nr([], t.modifiers, !0),
                [{ name: "eventListeners", enabled: !0 }],
                !1
              ),
            });
          }),
          this._setupClickOutsideListener(),
          this._popperInstance.update(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (e.prototype.hide = function () {
        this._targetEl.classList.remove("block"),
          this._targetEl.classList.add("hidden"),
          this._popperInstance.setOptions(function (t) {
            return jt(jt({}, t), {
              modifiers: Nr(
                Nr([], t.modifiers, !0),
                [{ name: "eventListeners", enabled: !1 }],
                !1
              ),
            });
          }),
          (this._visible = !1),
          this._removeClickOutsideListener(),
          this._options.onHide(this);
      }),
      e
    );
  })();
function _s() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function (e) {
    var t = e.getAttribute("data-dropdown-toggle"),
      n = document.getElementById(t);
    if (n) {
      var r = e.getAttribute("data-dropdown-placement"),
        i = e.getAttribute("data-dropdown-offset-skidding"),
        o = e.getAttribute("data-dropdown-offset-distance"),
        s = e.getAttribute("data-dropdown-trigger"),
        a = e.getAttribute("data-dropdown-delay"),
        l = e.getAttribute("data-dropdown-ignore-click-outside-class");
      new au(n, e, {
        placement: r || Mt.placement,
        triggerType: s || Mt.triggerType,
        offsetSkidding: i ? parseInt(i) : Mt.offsetSkidding,
        offsetDistance: o ? parseInt(o) : Mt.offsetDistance,
        delay: a ? parseInt(a) : Mt.delay,
        ignoreClickOutsideClass: l || Mt.ignoreClickOutsideClass,
      });
    } else console.error('The dropdown element with id "'.concat(t, '" does not exist. Please check the data-dropdown-toggle attribute.'));
  });
}
typeof window < "u" && ((window.Dropdown = au), (window.initDropdowns = _s));
var pi =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (pi =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        pi.apply(this, arguments)
      );
    },
  En = {
    placement: "center",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    backdrop: "dynamic",
    closable: !0,
    onHide: function () {},
    onShow: function () {},
    onToggle: function () {},
  },
  Po = (function () {
    function e(t, n) {
      t === void 0 && (t = null),
        n === void 0 && (n = En),
        (this._targetEl = t),
        (this._options = pi(pi({}, En), n)),
        (this._isHidden = !0),
        (this._backdropEl = null),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._targetEl &&
          this._getPlacementClasses().map(function (n) {
            t._targetEl.classList.add(n);
          });
      }),
      (e.prototype._createBackdrop = function () {
        var t;
        if (this._isHidden) {
          var n = document.createElement("div");
          n.setAttribute("modal-backdrop", ""),
            (t = n.classList).add.apply(
              t,
              this._options.backdropClasses.split(" ")
            ),
            document.querySelector("body").append(n),
            (this._backdropEl = n);
        }
      }),
      (e.prototype._destroyBackdropEl = function () {
        this._isHidden || document.querySelector("[modal-backdrop]").remove();
      }),
      (e.prototype._setupModalCloseEventListeners = function () {
        var t = this;
        this._options.backdrop === "dynamic" &&
          ((this._clickOutsideEventListener = function (n) {
            t._handleOutsideClick(n.target);
          }),
          this._targetEl.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          )),
          (this._keydownEventListener = function (n) {
            n.key === "Escape" && t.hide();
          }),
          document.body.addEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (e.prototype._removeModalCloseEventListeners = function () {
        this._options.backdrop === "dynamic" &&
          this._targetEl.removeEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          ),
          document.body.removeEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (e.prototype._handleOutsideClick = function (t) {
        (t === this._targetEl ||
          (t === this._backdropEl && this.isVisible())) &&
          this.hide();
      }),
      (e.prototype._getPlacementClasses = function () {
        switch (this._options.placement) {
          case "top-left":
            return ["justify-start", "items-start"];
          case "top-center":
            return ["justify-center", "items-start"];
          case "top-right":
            return ["justify-end", "items-start"];
          case "center-left":
            return ["justify-start", "items-center"];
          case "center":
            return ["justify-center", "items-center"];
          case "center-right":
            return ["justify-end", "items-center"];
          case "bottom-left":
            return ["justify-start", "items-end"];
          case "bottom-center":
            return ["justify-center", "items-end"];
          case "bottom-right":
            return ["justify-end", "items-end"];
          default:
            return ["justify-center", "items-center"];
        }
      }),
      (e.prototype.toggle = function () {
        this._isHidden ? this.show() : this.hide(),
          this._options.onToggle(this);
      }),
      (e.prototype.show = function () {
        this.isHidden &&
          (this._targetEl.classList.add("flex"),
          this._targetEl.classList.remove("hidden"),
          this._targetEl.setAttribute("aria-modal", "true"),
          this._targetEl.setAttribute("role", "dialog"),
          this._targetEl.removeAttribute("aria-hidden"),
          this._createBackdrop(),
          (this._isHidden = !1),
          document.body.classList.add("overflow-hidden"),
          this._options.closable && this._setupModalCloseEventListeners(),
          this._options.onShow(this));
      }),
      (e.prototype.hide = function () {
        this.isVisible &&
          (this._targetEl.classList.add("hidden"),
          this._targetEl.classList.remove("flex"),
          this._targetEl.setAttribute("aria-hidden", "true"),
          this._targetEl.removeAttribute("aria-modal"),
          this._targetEl.removeAttribute("role"),
          this._destroyBackdropEl(),
          (this._isHidden = !0),
          document.body.classList.remove("overflow-hidden"),
          this._options.closable && this._removeModalCloseEventListeners(),
          this._options.onHide(this));
      }),
      (e.prototype.isVisible = function () {
        return !this._isHidden;
      }),
      (e.prototype.isHidden = function () {
        return this._isHidden;
      }),
      e
    );
  })(),
  Fr = function (e, t) {
    return t.some(function (n) {
      return n.id === e;
    })
      ? t.find(function (n) {
          return n.id === e;
        })
      : null;
  };
function ws() {
  var e = [];
  document.querySelectorAll("[data-modal-target]").forEach(function (t) {
    var n = t.getAttribute("data-modal-target"),
      r = document.getElementById(n);
    if (r) {
      var i = r.getAttribute("data-modal-placement"),
        o = r.getAttribute("data-modal-backdrop");
      Fr(n, e) ||
        e.push({
          id: n,
          object: new Po(r, {
            placement: i || En.placement,
            backdrop: o || En.backdrop,
          }),
        });
    } else console.error("Modal with id ".concat(n, " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."));
  }),
    document.querySelectorAll("[data-modal-toggle]").forEach(function (t) {
      var n = t.getAttribute("data-modal-toggle"),
        r = document.getElementById(n);
      if (r) {
        var i = r.getAttribute("data-modal-placement"),
          o = r.getAttribute("data-modal-backdrop"),
          s = Fr(n, e);
        s ||
          ((s = {
            id: n,
            object: new Po(r, {
              placement: i || En.placement,
              backdrop: o || En.backdrop,
            }),
          }),
          e.push(s)),
          t.addEventListener("click", function () {
            s.object.toggle();
          });
      } else
        console.error(
          "Modal with id ".concat(
            n,
            " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"
          )
        );
    }),
    document.querySelectorAll("[data-modal-show]").forEach(function (t) {
      var n = t.getAttribute("data-modal-show"),
        r = document.getElementById(n);
      if (r) {
        var i = Fr(n, e);
        i
          ? t.addEventListener("click", function () {
              i.object.isHidden && i.object.show();
            })
          : console.error(
              "Modal with id ".concat(
                n,
                " has not been initialized. Please initialize it using the data-modal-target attribute."
              )
            );
      } else console.error("Modal with id ".concat(n, " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"));
    }),
    document.querySelectorAll("[data-modal-hide]").forEach(function (t) {
      var n = t.getAttribute("data-modal-hide"),
        r = document.getElementById(n);
      if (r) {
        var i = Fr(n, e);
        i
          ? t.addEventListener("click", function () {
              i.object.isVisible && i.object.hide();
            })
          : console.error(
              "Modal with id ".concat(
                n,
                " has not been initialized. Please initialize it using the data-modal-target attribute."
              )
            );
      } else console.error("Modal with id ".concat(n, " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"));
    });
}
typeof window < "u" && ((window.Modal = Po), (window.initModals = ws));
var gi =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (gi =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        gi.apply(this, arguments)
      );
    },
  on = {
    placement: "left",
    bodyScrolling: !1,
    backdrop: !0,
    edge: !1,
    edgeOffset: "bottom-[60px]",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  lu = (function () {
    function e(t, n) {
      t === void 0 && (t = null),
        n === void 0 && (n = on),
        (this._targetEl = t),
        (this._options = gi(gi({}, on), n)),
        (this._visible = !1),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._targetEl &&
          (this._targetEl.setAttribute("aria-hidden", "true"),
          this._targetEl.classList.add("transition-transform")),
          this._getPlacementClasses(this._options.placement).base.map(function (
            n
          ) {
            t._targetEl.classList.add(n);
          }),
          document.addEventListener("keydown", function (n) {
            n.key === "Escape" && t.isVisible() && t.hide();
          });
      }),
      (e.prototype.hide = function () {
        var t = this;
        this._options.edge
          ? (this._getPlacementClasses(
              this._options.placement + "-edge"
            ).active.map(function (n) {
              t._targetEl.classList.remove(n);
            }),
            this._getPlacementClasses(
              this._options.placement + "-edge"
            ).inactive.map(function (n) {
              t._targetEl.classList.add(n);
            }))
          : (this._getPlacementClasses(this._options.placement).active.map(
              function (n) {
                t._targetEl.classList.remove(n);
              }
            ),
            this._getPlacementClasses(this._options.placement).inactive.map(
              function (n) {
                t._targetEl.classList.add(n);
              }
            )),
          this._targetEl.setAttribute("aria-hidden", "true"),
          this._targetEl.removeAttribute("aria-modal"),
          this._targetEl.removeAttribute("role"),
          this._options.bodyScrolling ||
            document.body.classList.remove("overflow-hidden"),
          this._options.backdrop && this._destroyBackdropEl(),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      (e.prototype.show = function () {
        var t = this;
        this._options.edge
          ? (this._getPlacementClasses(
              this._options.placement + "-edge"
            ).active.map(function (n) {
              t._targetEl.classList.add(n);
            }),
            this._getPlacementClasses(
              this._options.placement + "-edge"
            ).inactive.map(function (n) {
              t._targetEl.classList.remove(n);
            }))
          : (this._getPlacementClasses(this._options.placement).active.map(
              function (n) {
                t._targetEl.classList.add(n);
              }
            ),
            this._getPlacementClasses(this._options.placement).inactive.map(
              function (n) {
                t._targetEl.classList.remove(n);
              }
            )),
          this._targetEl.setAttribute("aria-modal", "true"),
          this._targetEl.setAttribute("role", "dialog"),
          this._targetEl.removeAttribute("aria-hidden"),
          this._options.bodyScrolling ||
            document.body.classList.add("overflow-hidden"),
          this._options.backdrop && this._createBackdrop(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (e.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show();
      }),
      (e.prototype._createBackdrop = function () {
        var t,
          n = this;
        if (!this._visible) {
          var r = document.createElement("div");
          r.setAttribute("drawer-backdrop", ""),
            (t = r.classList).add.apply(
              t,
              this._options.backdropClasses.split(" ")
            ),
            document.querySelector("body").append(r),
            r.addEventListener("click", function () {
              n.hide();
            });
        }
      }),
      (e.prototype._destroyBackdropEl = function () {
        this._visible && document.querySelector("[drawer-backdrop]").remove();
      }),
      (e.prototype._getPlacementClasses = function (t) {
        switch (t) {
          case "top":
            return {
              base: ["top-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["-translate-y-full"],
            };
          case "right":
            return {
              base: ["right-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-x-full"],
            };
          case "bottom":
            return {
              base: ["bottom-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full"],
            };
          case "left":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"],
            };
          case "bottom-edge":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full", this._options.edgeOffset],
            };
          default:
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"],
            };
        }
      }),
      (e.prototype.isHidden = function () {
        return !this._visible;
      }),
      (e.prototype.isVisible = function () {
        return this._visible;
      }),
      e
    );
  })(),
  zr = function (e, t) {
    if (
      t.some(function (n) {
        return n.id === e;
      })
    )
      return t.find(function (n) {
        return n.id === e;
      });
  };
function xs() {
  var e = [];
  document.querySelectorAll("[data-drawer-target]").forEach(function (t) {
    var n = t.getAttribute("data-drawer-target"),
      r = document.getElementById(n);
    if (r) {
      var i = t.getAttribute("data-drawer-placement"),
        o = t.getAttribute("data-drawer-body-scrolling"),
        s = t.getAttribute("data-drawer-backdrop"),
        a = t.getAttribute("data-drawer-edge"),
        l = t.getAttribute("data-drawer-edge-offset");
      zr(n, e) ||
        e.push({
          id: n,
          object: new lu(r, {
            placement: i || on.placement,
            bodyScrolling: o ? o === "true" : on.bodyScrolling,
            backdrop: s ? s === "true" : on.backdrop,
            edge: a ? a === "true" : on.edge,
            edgeOffset: l || on.edgeOffset,
          }),
        });
    } else console.error("Drawer with id ".concat(n, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  }),
    document.querySelectorAll("[data-drawer-toggle]").forEach(function (t) {
      var n = t.getAttribute("data-drawer-toggle"),
        r = document.getElementById(n);
      if (r) {
        var i = zr(n, e);
        i
          ? t.addEventListener("click", function () {
              i.object.toggle();
            })
          : console.error(
              "Drawer with id ".concat(
                n,
                " has not been initialized. Please initialize it using the data-drawer-target attribute."
              )
            );
      } else console.error("Drawer with id ".concat(n, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
    }),
    document
      .querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]")
      .forEach(function (t) {
        var n = t.getAttribute("data-drawer-dismiss")
            ? t.getAttribute("data-drawer-dismiss")
            : t.getAttribute("data-drawer-hide"),
          r = document.getElementById(n);
        if (r) {
          var i = zr(n, e);
          i
            ? t.addEventListener("click", function () {
                i.object.hide();
              })
            : console.error(
                "Drawer with id ".concat(
                  n,
                  " has not been initialized. Please initialize it using the data-drawer-target attribute."
                )
              );
        } else console.error("Drawer with id ".concat(n, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"));
      }),
    document.querySelectorAll("[data-drawer-show]").forEach(function (t) {
      var n = t.getAttribute("data-drawer-show"),
        r = document.getElementById(n);
      if (r) {
        var i = zr(n, e);
        i
          ? t.addEventListener("click", function () {
              i.object.show();
            })
          : console.error(
              "Drawer with id ".concat(
                n,
                " has not been initialized. Please initialize it using the data-drawer-target attribute."
              )
            );
      } else console.error("Drawer with id ".concat(n, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
    });
}
typeof window < "u" && ((window.Drawer = lu), (window.initDrawers = xs));
var vi =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (vi =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        vi.apply(this, arguments)
      );
    },
  Ja = {
    defaultTabId: null,
    activeClasses:
      "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
    inactiveClasses:
      "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
    onShow: function () {},
  },
  cu = (function () {
    function e(t, n) {
      t === void 0 && (t = []),
        n === void 0 && (n = Ja),
        (this._items = t),
        (this._activeTab = n ? this.getTab(n.defaultTabId) : null),
        (this._options = vi(vi({}, Ja), n)),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        this._items.length &&
          (this._activeTab || this._setActiveTab(this._items[0]),
          this.show(this._activeTab.id, !0),
          this._items.map(function (n) {
            n.triggerEl.addEventListener("click", function () {
              t.show(n.id);
            });
          }));
      }),
      (e.prototype.getActiveTab = function () {
        return this._activeTab;
      }),
      (e.prototype._setActiveTab = function (t) {
        this._activeTab = t;
      }),
      (e.prototype.getTab = function (t) {
        return this._items.filter(function (n) {
          return n.id === t;
        })[0];
      }),
      (e.prototype.show = function (t, n) {
        var r,
          i,
          o = this;
        n === void 0 && (n = !1);
        var s = this.getTab(t);
        (s === this._activeTab && !n) ||
          (this._items.map(function (a) {
            var l, c;
            a !== s &&
              ((l = a.triggerEl.classList).remove.apply(
                l,
                o._options.activeClasses.split(" ")
              ),
              (c = a.triggerEl.classList).add.apply(
                c,
                o._options.inactiveClasses.split(" ")
              ),
              a.targetEl.classList.add("hidden"),
              a.triggerEl.setAttribute("aria-selected", "false"));
          }),
          (r = s.triggerEl.classList).add.apply(
            r,
            this._options.activeClasses.split(" ")
          ),
          (i = s.triggerEl.classList).remove.apply(
            i,
            this._options.inactiveClasses.split(" ")
          ),
          s.triggerEl.setAttribute("aria-selected", "true"),
          s.targetEl.classList.remove("hidden"),
          this._setActiveTab(s),
          this._options.onShow(this, s));
      }),
      e
    );
  })();
function ks() {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function (e) {
    var t = [],
      n = null;
    e.querySelectorAll('[role="tab"]').forEach(function (r) {
      var i = r.getAttribute("aria-selected") === "true",
        o = {
          id: r.getAttribute("data-tabs-target"),
          triggerEl: r,
          targetEl: document.querySelector(r.getAttribute("data-tabs-target")),
        };
      t.push(o), i && (n = o.id);
    }),
      new cu(t, { defaultTabId: n });
  });
}
typeof window < "u" && ((window.Tabs = cu), (window.initTabs = ks));
var Dt =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Dt =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        Dt.apply(this, arguments)
      );
    },
  Vr =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t, n) {
      if (n || arguments.length === 2)
        for (var r = 0, i = t.length, o; r < i; r++)
          (o || !(r in t)) &&
            (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
      return e.concat(o || Array.prototype.slice.call(t));
    },
  mi = {
    placement: "top",
    triggerType: "hover",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  uu = (function () {
    function e(t, n, r) {
      t === void 0 && (t = null),
        n === void 0 && (n = null),
        r === void 0 && (r = mi),
        (this._targetEl = t),
        (this._triggerEl = n),
        (this._options = Dt(Dt({}, mi), r)),
        (this._popperInstance = this._createPopperInstance()),
        (this._visible = !1),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        this._triggerEl && this._setupEventListeners();
      }),
      (e.prototype._setupEventListeners = function () {
        var t = this,
          n = this._getTriggerEvents();
        n.showEvents.forEach(function (r) {
          t._triggerEl.addEventListener(r, function () {
            t.show();
          });
        }),
          n.hideEvents.forEach(function (r) {
            t._triggerEl.addEventListener(r, function () {
              t.hide();
            });
          });
      }),
      (e.prototype._createPopperInstance = function () {
        return bs(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
        });
      }),
      (e.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"],
            };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
        }
      }),
      (e.prototype._setupKeydownListener = function () {
        var t = this;
        (this._keydownEventListener = function (n) {
          n.key === "Escape" && t.hide();
        }),
          document.body.addEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (e.prototype._removeKeydownListener = function () {
        document.body.removeEventListener(
          "keydown",
          this._keydownEventListener,
          !0
        );
      }),
      (e.prototype._setupClickOutsideListener = function () {
        var t = this;
        (this._clickOutsideEventListener = function (n) {
          t._handleClickOutside(n, t._targetEl);
        }),
          document.body.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          );
      }),
      (e.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener(
          "click",
          this._clickOutsideEventListener,
          !0
        );
      }),
      (e.prototype._handleClickOutside = function (t, n) {
        var r = t.target;
        r !== n &&
          !n.contains(r) &&
          !this._triggerEl.contains(r) &&
          this.isVisible() &&
          this.hide();
      }),
      (e.prototype.isVisible = function () {
        return this._visible;
      }),
      (e.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show();
      }),
      (e.prototype.show = function () {
        this._targetEl.classList.remove("opacity-0", "invisible"),
          this._targetEl.classList.add("opacity-100", "visible"),
          this._popperInstance.setOptions(function (t) {
            return Dt(Dt({}, t), {
              modifiers: Vr(
                Vr([], t.modifiers, !0),
                [{ name: "eventListeners", enabled: !0 }],
                !1
              ),
            });
          }),
          this._setupClickOutsideListener(),
          this._setupKeydownListener(),
          this._popperInstance.update(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (e.prototype.hide = function () {
        this._targetEl.classList.remove("opacity-100", "visible"),
          this._targetEl.classList.add("opacity-0", "invisible"),
          this._popperInstance.setOptions(function (t) {
            return Dt(Dt({}, t), {
              modifiers: Vr(
                Vr([], t.modifiers, !0),
                [{ name: "eventListeners", enabled: !1 }],
                !1
              ),
            });
          }),
          this._removeClickOutsideListener(),
          this._removeKeydownListener(),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      e
    );
  })();
function Es() {
  document.querySelectorAll("[data-tooltip-target]").forEach(function (e) {
    var t = e.getAttribute("data-tooltip-target"),
      n = document.getElementById(t);
    if (n) {
      var r = e.getAttribute("data-tooltip-trigger"),
        i = e.getAttribute("data-tooltip-placement");
      new uu(n, e, {
        placement: i || mi.placement,
        triggerType: r || mi.triggerType,
      });
    } else console.error('The tooltip element with id "'.concat(t, '" does not exist. Please check the data-tooltip-target attribute.'));
  });
}
typeof window < "u" && ((window.Tooltip = uu), (window.initTooltips = Es));
var Ht =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Ht =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        Ht.apply(this, arguments)
      );
    },
  Ur =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t, n) {
      if (n || arguments.length === 2)
        for (var r = 0, i = t.length, o; r < i; r++)
          (o || !(r in t)) &&
            (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
      return e.concat(o || Array.prototype.slice.call(t));
    },
  cr = {
    placement: "top",
    offset: 10,
    triggerType: "hover",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  fu = (function () {
    function e(t, n, r) {
      t === void 0 && (t = null),
        n === void 0 && (n = null),
        r === void 0 && (r = cr),
        (this._targetEl = t),
        (this._triggerEl = n),
        (this._options = Ht(Ht({}, cr), r)),
        (this._popperInstance = this._createPopperInstance()),
        (this._visible = !1),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        this._triggerEl && this._setupEventListeners();
      }),
      (e.prototype._setupEventListeners = function () {
        var t = this,
          n = this._getTriggerEvents();
        n.showEvents.forEach(function (r) {
          t._triggerEl.addEventListener(r, function () {
            t.show();
          }),
            t._targetEl.addEventListener(r, function () {
              t.show();
            });
        }),
          n.hideEvents.forEach(function (r) {
            t._triggerEl.addEventListener(r, function () {
              setTimeout(function () {
                t._targetEl.matches(":hover") || t.hide();
              }, 100);
            }),
              t._targetEl.addEventListener(r, function () {
                setTimeout(function () {
                  t._triggerEl.matches(":hover") || t.hide();
                }, 100);
              });
          });
      }),
      (e.prototype._createPopperInstance = function () {
        return bs(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            { name: "offset", options: { offset: [0, this._options.offset] } },
          ],
        });
      }),
      (e.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"],
            };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
        }
      }),
      (e.prototype._setupKeydownListener = function () {
        var t = this;
        (this._keydownEventListener = function (n) {
          n.key === "Escape" && t.hide();
        }),
          document.body.addEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (e.prototype._removeKeydownListener = function () {
        document.body.removeEventListener(
          "keydown",
          this._keydownEventListener,
          !0
        );
      }),
      (e.prototype._setupClickOutsideListener = function () {
        var t = this;
        (this._clickOutsideEventListener = function (n) {
          t._handleClickOutside(n, t._targetEl);
        }),
          document.body.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          );
      }),
      (e.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener(
          "click",
          this._clickOutsideEventListener,
          !0
        );
      }),
      (e.prototype._handleClickOutside = function (t, n) {
        var r = t.target;
        r !== n &&
          !n.contains(r) &&
          !this._triggerEl.contains(r) &&
          this.isVisible() &&
          this.hide();
      }),
      (e.prototype.isVisible = function () {
        return this._visible;
      }),
      (e.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show(),
          this._options.onToggle(this);
      }),
      (e.prototype.show = function () {
        this._targetEl.classList.remove("opacity-0", "invisible"),
          this._targetEl.classList.add("opacity-100", "visible"),
          this._popperInstance.setOptions(function (t) {
            return Ht(Ht({}, t), {
              modifiers: Ur(
                Ur([], t.modifiers, !0),
                [{ name: "eventListeners", enabled: !0 }],
                !1
              ),
            });
          }),
          this._setupClickOutsideListener(),
          this._setupKeydownListener(),
          this._popperInstance.update(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (e.prototype.hide = function () {
        this._targetEl.classList.remove("opacity-100", "visible"),
          this._targetEl.classList.add("opacity-0", "invisible"),
          this._popperInstance.setOptions(function (t) {
            return Ht(Ht({}, t), {
              modifiers: Ur(
                Ur([], t.modifiers, !0),
                [{ name: "eventListeners", enabled: !1 }],
                !1
              ),
            });
          }),
          this._removeClickOutsideListener(),
          this._removeKeydownListener(),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      e
    );
  })();
function Cs() {
  document.querySelectorAll("[data-popover-target]").forEach(function (e) {
    var t = e.getAttribute("data-popover-target"),
      n = document.getElementById(t);
    if (n) {
      var r = e.getAttribute("data-popover-trigger"),
        i = e.getAttribute("data-popover-placement"),
        o = e.getAttribute("data-popover-offset");
      new fu(n, e, {
        placement: i || cr.placement,
        offset: o ? parseInt(o) : cr.offset,
        triggerType: r || cr.triggerType,
      });
    } else console.error('The popover element with id "'.concat(t, '" does not exist. Please check the data-popover-target attribute.'));
  });
}
typeof window < "u" && ((window.Popover = fu), (window.initPopovers = Cs));
var yi =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (yi =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        yi.apply(this, arguments)
      );
    },
  $o = {
    triggerType: "hover",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  du = (function () {
    function e(t, n, r, i) {
      t === void 0 && (t = null),
        n === void 0 && (n = null),
        r === void 0 && (r = null),
        i === void 0 && (i = $o),
        (this._parentEl = t),
        (this._triggerEl = n),
        (this._targetEl = r),
        (this._options = yi(yi({}, $o), i)),
        (this._visible = !1),
        this._init();
    }
    return (
      (e.prototype._init = function () {
        var t = this;
        if (this._triggerEl) {
          var n = this._getTriggerEventTypes(this._options.triggerType);
          n.showEvents.forEach(function (r) {
            t._triggerEl.addEventListener(r, function () {
              t.show();
            }),
              t._targetEl.addEventListener(r, function () {
                t.show();
              });
          }),
            n.hideEvents.forEach(function (r) {
              t._parentEl.addEventListener(r, function () {
                t._parentEl.matches(":hover") || t.hide();
              });
            });
        }
      }),
      (e.prototype.hide = function () {
        this._targetEl.classList.add("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "false"),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      (e.prototype.show = function () {
        this._targetEl.classList.remove("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "true"),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (e.prototype.toggle = function () {
        this._visible ? this.hide() : this.show();
      }),
      (e.prototype.isHidden = function () {
        return !this._visible;
      }),
      (e.prototype.isVisible = function () {
        return this._visible;
      }),
      (e.prototype._getTriggerEventTypes = function (t) {
        switch (t) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"],
            };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
        }
      }),
      e
    );
  })();
function Ts() {
  document.querySelectorAll("[data-dial-init]").forEach(function (e) {
    var t = e.querySelector("[data-dial-toggle]");
    if (t) {
      var n = t.getAttribute("data-dial-toggle"),
        r = document.getElementById(n);
      if (r) {
        var i = t.getAttribute("data-dial-trigger");
        new du(e, t, r, { triggerType: i || $o.triggerType });
      } else
        console.error(
          "Dial with id ".concat(
            n,
            " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"
          )
        );
    } else console.error("Dial with id ".concat(e.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"));
  });
}
typeof window < "u" && ((window.Dial = du), (window.initDials = Ts));
function Mg() {
  ls(), cs(), us(), fs(), _s(), ws(), xs(), ks(), Es(), Cs(), Ts();
}
typeof window < "u" && (window.initFlowbite = Mg);
var Dg = new Lp("load", [ls, cs, us, fs, _s, ws, xs, ks, Es, Cs, Ts]);
Dg.init();
/*! js-cookie v3.0.5 | MIT */ function Wr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n) e[r] = n[r];
  }
  return e;
}
var Hg = {
  read: function (e) {
    return (
      e[0] === '"' && (e = e.slice(1, -1)),
      e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    );
  },
  write: function (e) {
    return encodeURIComponent(e).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  },
};
function Io(e, t) {
  function n(i, o, s) {
    if (!(typeof document > "u")) {
      (s = Wr({}, t, s)),
        typeof s.expires == "number" &&
          (s.expires = new Date(Date.now() + s.expires * 864e5)),
        s.expires && (s.expires = s.expires.toUTCString()),
        (i = encodeURIComponent(i)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape));
      var a = "";
      for (var l in s)
        s[l] &&
          ((a += "; " + l), s[l] !== !0 && (a += "=" + s[l].split(";")[0]));
      return (document.cookie = i + "=" + e.write(o, i) + a);
    }
  }
  function r(i) {
    if (!(typeof document > "u" || (arguments.length && !i))) {
      for (
        var o = document.cookie ? document.cookie.split("; ") : [],
          s = {},
          a = 0;
        a < o.length;
        a++
      ) {
        var l = o[a].split("="),
          c = l.slice(1).join("=");
        try {
          var u = decodeURIComponent(l[0]);
          if (((s[u] = e.read(c, u)), i === u)) break;
        } catch {}
      }
      return i ? s[i] : s;
    }
  }
  return Object.create(
    {
      set: n,
      get: r,
      remove: function (i, o) {
        n(i, "", Wr({}, o, { expires: -1 }));
      },
      withAttributes: function (i) {
        return Io(this.converter, Wr({}, this.attributes, i));
      },
      withConverter: function (i) {
        return Io(Wr({}, this.converter, i), this.attributes);
      },
    },
    {
      attributes: { value: Object.freeze(t) },
      converter: { value: Object.freeze(e) },
    }
  );
}
var Bg = Io(Hg, { path: "/" });
const Qe = Bg.withAttributes({ sameSite: "strict", secure: !0 }),
  Ng = "https://drf-jwt.tstsrv.de/api/token/",
  Xa = "https://drf-jwt.tstsrv.de/api/token/verify/",
  Fg = "https://drf-jwt.tstsrv.de/api/token/refresh/",
  zg = "https://drf-jwt.tstsrv.de/api/token/blacklist/",
  sn = new Headers();
sn.append("Content-Type", "application/json; charset=UTF-8");
sn.append("Accept", "application/json");
const Nt = jc("userauthstore", {
    state: () => ({
      loginCredentials: [],
      isLoggedIn: !1,
      authToken: "",
      refreshToken: "",
    }),
    getters: {
      userStateIsLoggedIn() {
        return this.isLoggedIn && Lr().getTasks(), this.isLoggedIn;
      },
    },
    actions: {
      async login(e, t) {
        const n = await fetch(Ng, {
          body: JSON.stringify({ username: e, password: t }),
          headers: sn,
          method: "POST",
        });
        if ((console.log(n), n.ok)) {
          const r = await n.json();
          return (
            (this.authToken = r.access),
            Qe.set("authToken", this.authToken),
            (this.refreshToken = r.refresh),
            Qe.set("refreshToken", this.refreshToken),
            (this.isLoggedIn = !0),
            { status: n.status, message: n.statusText }
          );
        } else {
          this.logout();
          const r = await n.json();
          return { status: n.status, message: r.detail };
        }
      },
      async logout() {
        this.isLoggedIn = !1;
        let e = null;
        this.refreshToken && (e = this.refreshToken),
          Qe.get("refreshToken") && (e = Qe.get("refreshToken")),
          e != null &&
            (await fetch(zg, {
              body: JSON.stringify({ refresh: e }),
              headers: sn,
              method: "POST",
            })),
          (this.authToken = ""),
          Qe.remove("authToken"),
          (this.refreshToken = ""),
          Qe.remove("refreshToken");
      },
      async init() {
        (this.isLoggedIn = !1),
          Qe.get("refreshToken") &&
            Qe.get("authToken") &&
            ((this.authToken = Qe.get("authToken")),
            (this.refreshToken = Qe.get("refreshToken")),
            (this.isLoggedIn = !0)),
          this.isLoggedIn === !1 && this.logout();
      },
      async validateTokens() {
        if (this.isLoggedIn) {
          if (
            !(
              await fetch(Xa, {
                body: JSON.stringify({ token: this.refreshToken }),
                headers: sn,
                method: "POST",
              })
            ).ok
          ) {
            console.log("validateTokens: refreshToken is NOT valid"),
              this.logout();
            return;
          }
          if (
            !(
              await fetch(Xa, {
                body: JSON.stringify({ token: this.authToken }),
                headers: sn,
                method: "POST",
              })
            ).ok
          ) {
            const n = await fetch(Fg, {
              body: JSON.stringify({ refresh: this.refreshToken }),
              headers: sn,
              method: "POST",
            });
            if (n.ok) {
              const r = await n.json();
              (this.authToken = r.access),
                Qe.set("authToken", this.authToken),
                (this.refreshToken = r.refresh),
                Qe.set("refreshToken", this.refreshToken);
            } else {
              console.log("validateTokens: access token refresh did NOT work!"),
                this.logout();
              return;
            }
          }
        }
      },
    },
  }),
  Lr = jc("taskstore", {
    state: () => ({ tasks: [], isLoading: !1, name: "Fancy Task Store" }),
    getters: {
      favs() {
        return this.tasks.filter((e) => e.isFav);
      },
      favCount() {
        return this.tasks.reduce((e, t) => (t.isFav ? e + 1 : e), 0);
      },
      totalCount: (e) => e.tasks.length,
    },
    actions: {
      async getTasks() {
        this.isLoading = !0;
        const e = Nt(),
          t = new Headers();
        t.append("Authorization", "Bearer " + e.authToken),
          t.append("Content-Type", "application/json; charset=UTF-8"),
          t.append("Accept", "application/json");
        const r = await (
          await fetch("https://drf-jwt.tstsrv.de/tasks_test_api/task/", {
            headers: t,
          })
        ).json();
        (this.tasks = r), (this.isLoading = !1);
      },
      async addTask(e) {
        this.isLoading = !0;
        const t = Nt(),
          n = new Headers();
        n.append("Authorization", "Bearer " + t.authToken),
          n.append("Content-Type", "application/json"),
          this.tasks.push(e);
        const r = await fetch(
          "https://drf-jwt.tstsrv.de/tasks_test_api/task/",
          { method: "POST", body: JSON.stringify(e), headers: n }
        );
        r.ok || console.log(r.statusText), (this.isLoading = !1);
      },
      async deleteTask(e) {
        this.isLoading = !0;
        const t = Nt(),
          n = new Headers();
        n.append("Authorization", "Bearer " + t.authToken),
          n.append("Content-Type", "application/json"),
          (this.tasks = this.tasks.filter((i) => i.id !== e));
        const r = await fetch(
          "https://drf-jwt.tstsrv.de/tasks_test_api/task/" + e,
          { method: "DELETE", headers: n }
        );
        r.ok || console.log(r.statusText), (this.isLoading = !1);
      },
      async toggleFav(e) {
        this.isLoading = !0;
        const t = Nt(),
          n = new Headers();
        n.append("Authorization", "Bearer " + t.authToken),
          n.append("Content-Type", "application/json");
        const r = this.tasks.find((o) => o.id === e);
        if (r === void 0) {
          this.isLoading = !1;
          return;
        }
        r && (r.isFav = !r.isFav);
        const i = await fetch(
          "https://drf-jwt.tstsrv.de/tasks_test_api/task/" + e + "/",
          {
            method: "PATCH",
            body: JSON.stringify({ isFav: r.isFav }),
            headers: n,
          }
        );
        i.ok || console.log(i.statusText), (this.isLoading = !1);
      },
    },
  }),
  Vg = { props: ["navLink"] },
  Ot = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, i] of t) n[r] = i;
    return n;
  },
  Ug = { class: "flex-1 ml-3 whitespace-nowrap" };
function Wg(e, t, n, r, i, o) {
  const s = De("RouterLink");
  return (
    H(),
    K("li", null, [
      X(
        s,
        {
          class:
            "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group",
          "active-class": "dark:bg-gray-700 bg-gray-200",
          "data-drawer-hide": "nav-and-sidebar",
          "data-drawer-target": "nav-and-sidebar",
          to: n.navLink.target,
        },
        {
          default: ke(() => [
            Ke(e.$slots, "default"),
            A("span", Ug, Ie(n.navLink.text), 1),
            Ke(e.$slots, "hint"),
          ]),
          _: 3,
        },
        8,
        ["to"]
      ),
    ])
  );
}
const Gt = Ot(Vg, [["render", Wg]]);
function qg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "fill-rule": "evenodd",
          d: "M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Kg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "fill-rule": "evenodd",
          d: "M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Yg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "fill-rule": "evenodd",
          d: "M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Qg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "fill-rule": "evenodd",
          d: "M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z",
          "clip-rule": "evenodd",
        }),
      ]
    )
  );
}
function Jg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          d: "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z",
        }),
      ]
    )
  );
}
function Xg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
        }),
      ]
    )
  );
}
function Gg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3",
        }),
      ]
    )
  );
}
function Zg(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
        }),
      ]
    )
  );
}
function ev(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
        }),
      ]
    )
  );
}
function tv(e, t) {
  return (
    H(),
    K(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
      },
      [
        A("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122",
        }),
      ]
    )
  );
}
const nv = { class: "fixed top-0 left-0 z-50 w-14 h-14" },
  rv = {
    "aria-controls": "nav-and-sidebar",
    class:
      "m-1 p-2 text-sm rounded-lg focus:outline-none focus:ring-2 sm:invisible bg-slate-100 text-gray-500 first-letter:hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 shadow",
    "data-drawer-target": "nav-and-sidebar",
    "data-drawer-toggle": "nav-and-sidebar",
    type: "button",
  },
  iv = A("span", { class: "sr-only" }, "Open sidebar", -1),
  ov = {
    id: "nav-and-sidebar",
    "aria-label": "Sidebar",
    class:
      "fixed top-0 left-0 z-40 w-64 h-screen duration-500 transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700",
  },
  sv = { class: "h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800" },
  av = {
    class: "flex justify-end items-center sm:w-64 absolute right-0 px-3 py-3",
  },
  lv = A(
    "div",
    { class: "flex-auto me-3" },
    [
      A("div", { class: "flex ml-2" }, [
        A("img", {
          alt: "haenno profile picture",
          class: "h-11 mr-3 rounded-full",
          src: Oh,
        }),
        A(
          "span",
          {
            class:
              "self-center italic text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-700 dark:text-white",
          },
          "haenno"
        ),
      ]),
    ],
    -1
  ),
  cv = {
    class:
      "text-sm rounded-full focus:ring-4 me-2 bg-gray-200 dark:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600",
  },
  uv = {
    id: "theme-toggle",
    class:
      "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-gray-200 dark:focus:ring-gray-700 focus:outline-none focus:ring-4 rounded-full text-sm p-2.5",
    type: "button",
  },
  fv = { id: "theme-toggle-dark-icon", class: "hidden" },
  dv = { id: "theme-toggle-light-icon", class: "hidden" },
  hv = { class: "absolute top-20 w-56" },
  pv = { class: "space-y-2 font-medium" },
  gv = {
    key: 0,
    class:
      "inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300",
  },
  vv = A(
    "span",
    {
      class:
        "inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300",
    },
    "Pro",
    -1
  ),
  mv = { class: "mt-0 sm:mt-0 sm:ml-64" },
  yv = { class: "flex" },
  bv = { class: "m-auto" },
  _v = {
    class:
      "min-h-min min-w-fit max-w-fit p-5 m-4 shadow-md opacity-85 bg-gray-50 dark:bg-gray-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  wv = Ae({
    __name: "App",
    setup(e) {
      const t = Nt();
      Zo(() => {
        t.init(),
          setInterval(() => {
            t.validateTokens();
          }, 1e4);
      });
      const n = Lr();
      return (r, i) => (
        H(),
        K(
          me,
          null,
          [
            A("header", null, [
              A("nav", nv, [
                A("button", rv, [
                  iv,
                  X(ae(Yg), {
                    "aria-hidden": "true",
                    class: "h-6 w-6 text-gray-500 dark:text-gray-400",
                  }),
                ]),
              ]),
              A("aside", ov, [
                A("div", sv, [
                  A("div", av, [
                    lv,
                    A("div", cv, [
                      A("button", uv, [
                        A("div", fv, [
                          X(ae(Qg), {
                            class: "h-5 w-5 text-gray-500 dark:text-gray-400",
                          }),
                        ]),
                        A("div", dv, [
                          X(ae(Jg), {
                            class: "h-5 w-5 text-gray-500 dark:text-gray-400",
                          }),
                        ]),
                      ]),
                    ]),
                  ]),
                  A("div", hv, [
                    A("ul", pv, [
                      X(
                        Gt,
                        { navLink: { text: "Home", target: "/" } },
                        {
                          default: ke(() => [
                            X(ae(Xg), {
                              "aria-hidden": "true",
                              class:
                                "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                            }),
                          ]),
                          _: 1,
                        }
                      ),
                      X(
                        Gt,
                        { navLink: { text: "About", target: "about" } },
                        {
                          default: ke(() => [
                            X(ae(Zg), {
                              "aria-hidden": "true",
                              class:
                                "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                            }),
                          ]),
                          _: 1,
                        }
                      ),
                      ae(t).userStateIsLoggedIn
                        ? be("", !0)
                        : (H(),
                          He(
                            Gt,
                            {
                              key: 0,
                              navLink: { text: "Login", target: "login" },
                            },
                            {
                              default: ke(() => [
                                X(ae(Kg), {
                                  "aria-hidden": "true",
                                  class:
                                    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                                }),
                              ]),
                              _: 1,
                            }
                          )),
                      ae(t).userStateIsLoggedIn
                        ? (H(),
                          He(
                            Gt,
                            {
                              key: 1,
                              navLink: { text: "Tasks", target: "tasks" },
                            },
                            {
                              hint: ke(() => [
                                ae(t).userStateIsLoggedIn
                                  ? (H(),
                                    K("span", gv, Ie(ae(n).totalCount), 1))
                                  : be("", !0),
                              ]),
                              default: ke(() => [
                                X(ae(tv), {
                                  "aria-hidden": "true",
                                  class:
                                    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                                }),
                              ]),
                              _: 1,
                            }
                          ))
                        : be("", !0),
                      ae(t).userStateIsLoggedIn
                        ? (H(),
                          He(
                            Gt,
                            {
                              key: 2,
                              navLink: { text: "Inbox", target: "inbox" },
                            },
                            {
                              hint: ke(() => [vv]),
                              default: ke(() => [
                                X(ae(Gg), {
                                  "aria-hidden": "true",
                                  class:
                                    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                                }),
                              ]),
                              _: 1,
                            }
                          ))
                        : be("", !0),
                      ae(t).userStateIsLoggedIn
                        ? (H(),
                          He(
                            Gt,
                            {
                              key: 3,
                              navLink: { text: "Logout", target: "logout" },
                            },
                            {
                              default: ke(() => [
                                X(ae(qg), {
                                  "aria-hidden": "true",
                                  class:
                                    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                                }),
                              ]),
                              _: 1,
                            }
                          ))
                        : be("", !0),
                      ae(t).userStateIsLoggedIn
                        ? be("", !0)
                        : (H(),
                          He(
                            Gt,
                            {
                              key: 4,
                              navLink: { text: "Register", target: "signup" },
                            },
                            {
                              default: ke(() => [
                                X(ae(ev), {
                                  "aria-hidden": "true",
                                  class:
                                    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                                }),
                              ]),
                              _: 1,
                            }
                          )),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            A("div", mv, [
              A("div", yv, [A("div", bv, [A("div", _v, [X(ae(Kc))])])]),
            ]),
          ],
          64
        )
      );
    },
  }),
  xv = "modulepreload",
  kv = function (e) {
    return "/" + e;
  },
  Ga = {},
  Ev = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const i = document.getElementsByTagName("link");
    return Promise.all(
      n.map((o) => {
        if (((o = kv(o)), o in Ga)) return;
        Ga[o] = !0;
        const s = o.endsWith(".css"),
          a = s ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let u = i.length - 1; u >= 0; u--) {
            const f = i[u];
            if (f.href === o && (!s || f.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${a}`)) return;
        const c = document.createElement("link");
        if (
          ((c.rel = s ? "stylesheet" : xv),
          s || ((c.as = "script"), (c.crossOrigin = "")),
          (c.href = o),
          document.head.appendChild(c),
          s)
        )
          return new Promise((u, f) => {
            c.addEventListener("load", u),
              c.addEventListener("error", () =>
                f(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((o) => {
        const s = new Event("vite:preloadError", { cancelable: !0 });
        if (((s.payload = o), window.dispatchEvent(s), !s.defaultPrevented))
          throw o;
      });
  };
Un({});
var hu = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var r = [], i = 0; i < arguments.length; i++) {
        var o = arguments[i];
        if (o) {
          var s = typeof o;
          if (s === "string" || s === "number") r.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var a = n.apply(null, o);
              a && r.push(a);
            }
          } else if (s === "object") {
            if (
              o.toString !== Object.prototype.toString &&
              !o.toString.toString().includes("[native code]")
            ) {
              r.push(o.toString());
              continue;
            }
            for (var l in o) t.call(o, l) && o[l] && r.push(l);
          }
        }
      }
      return r.join(" ");
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(hu);
const Cv = hu.exports,
  Tv = {
    0: "w-0 h-0",
    0.5: "w-0.5 h-0.5",
    1: "w-1 h-1",
    1.5: "w-1.5 h-1.5",
    10: "w-10 h-10",
    11: "w-11 h-11",
    12: "w-12 h-12",
    2: "w-2 h-2",
    2.5: "w-2.5 h-2.5",
    3: "w-3 h-3",
    4: "w-4 h-4",
    5: "w-5 h-5",
    6: "w-6 h-6",
    7: "w-7 h-7",
    8: "w-8 h-8",
    9: "w-9 h-9",
    px: "w-px h-px",
  },
  Ov = {
    blue: "fill-blue-600",
    gray: "fill-gray-600 dark:fill-gray-300",
    green: "fill-green-500",
    pink: "fill-pink-600",
    purple: "fill-purple-600",
    red: "fill-red-600",
    yellow: "fill-yellow-400",
    white: "fill-white",
  };
function Av(e) {
  const t = ne(() => Tv[e.size.value]),
    n = ne(() => Ov[e.color.value]),
    r = ne(() => "text-gray-200 dark:text-gray-600"),
    i = ne(() => "animate-spin");
  return { spinnerClasses: ne(() => Cv(t.value, r.value, n.value, i.value)) };
}
const Sv = A(
    "path",
    {
      d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
      fill: "currentColor",
    },
    null,
    -1
  ),
  Lv = A(
    "path",
    {
      d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
      fill: "currentFill",
    },
    null,
    -1
  ),
  Pv = [Sv, Lv],
  pu = Ae({
    __name: "Spinner",
    props: {
      size: { type: String, default: "4" },
      color: { type: String, default: "blue" },
    },
    setup(e) {
      const t = e,
        { spinnerClasses: n } = Av(nc(t));
      return (r, i) => (
        H(),
        K(
          "svg",
          {
            role: "status",
            class: Pe(ae(n)),
            viewBox: "0 0 100 101",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          Pv,
          2
        )
      );
    },
  }),
  $v = "flowbite-themable-injection-key",
  wn = {
    blue: {
      background: "bg-blue-700 dark:bg-blue-600",
      disabled: "",
      hover: "hover:bg-blue-800 dark:hover:bg-blue-700",
      text: "text-blue-600 dark:text-blue-500",
      border: "border-blue-600 dark:border-blue-500",
      focus: "focus:ring-blue-300 dark:focus:ring-blue-800",
    },
    green: {
      background: "bg-green-700 dark:bg-green-600",
      disabled: "",
      hover: "hover:bg-green-800 dark:hover:bg-green-700",
      text: "text-green-600 dark:text-green-500",
      border: "border-green-600 dark:border-green-500",
      focus: "focus:ring-green-300 dark:focus:ring-green-800",
    },
    pink: {
      background: "bg-pink-700 dark:bg-pink-600",
      disabled: "",
      hover: "hover:bg-pink-800 dark:hover:bg-pink-700",
      text: "text-pink-600 dark:text-pink-500",
      border: "border-pink-600 dark:border-pink-500",
      focus: "focus:ring-pink-300 dark:focus:ring-pink-900",
    },
    purple: {
      background: "bg-purple-700 dark:bg-purple-600",
      disabled: "",
      hover: "hover:bg-purple-800 dark:hover:bg-purple-700",
      text: "text-purple-600 dark:text-purple-500",
      border: "border-purple-600 dark:border-purple-500",
      focus: "focus:ring-purple-300 dark:focus:ring-purple-900",
    },
    red: {
      background: "bg-red-700 dark:bg-red-600",
      disabled: "",
      hover: "hover:bg-red-800 dark:hover:bg-red-700",
      text: "text-red-600 dark:text-red-500",
      border: "border-red-600 dark:border-red-500",
      focus: "focus:ring-red-300 dark:focus:ring-red-900",
    },
  };
function Iv(e) {
  const t = Re($v, bt(null)),
    n = ne(() => !!(t != null && t.value)),
    r = ne(() => (t == null ? void 0 : t.value) || void 0),
    i = ne(() => e || t.value),
    o = ne(() => (i.value ? wn[i.value].background : "")),
    s = ne(() => (i.value ? wn[i.value].disabled : "")),
    a = ne(() => (i.value ? wn[i.value].hover : "")),
    l = ne(() => (i.value ? wn[i.value].text : "")),
    c = ne(() => (i.value ? wn[i.value].border : "")),
    u = ne(() => (i.value ? wn[i.value].focus : ""));
  return {
    backgroundClasses: o,
    disabledClasses: s,
    hoverClasses: a,
    textClasses: l,
    borderClasses: c,
    focusClasses: u,
    isActive: n,
    color: r,
  };
}
const Rv = { border: (e) => e.substring(0, e.lastIndexOf("-")) },
  jv = (e, t = Rv) => {
    const n = Object.keys(t).find((r) => e.includes(r));
    return n ? t[n](e) : e.substring(0, e.indexOf("-"));
  };
function io(...e) {
  return e
    .filter((t) => t)
    .reduce(
      (t, n) => {
        const r = Array.isArray(n)
            ? Array.from(n)
                .map((c) => c.split(" "))
                .flat()
            : n.split(" "),
          i = r.map((c) => jv(c)),
          o = i.filter((c) => !t.types.includes(c)),
          s = [...i.filter((c) => t.types.includes(c)), ...o],
          a = [...new Set([...t.types, ...s])],
          l = a
            .map((c) => {
              if (s.includes(c)) {
                const f = i.indexOf(c);
                if (f >= 0) return r[f] || "";
              }
              const u = t.types.indexOf(c);
              return (u >= 0 && t.classes[u]) || "";
            })
            .filter((c) => !!c);
        return { types: a, classes: l };
      },
      { types: [], classes: [] }
    )
    .classes.join(" ");
}
const gu = "flowbite-tab-style-injection",
  vu = "flowbite-tab-active-name-injection",
  mu = "flowbite-tab-visibility-directive-injection",
  yu = "flowbite-tab-activate-func-injection";
function Mv(e) {
  const t = ne(() =>
      e.variant === "default"
        ? "flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
        : e.variant === "pills"
        ? "flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        : e.variant === "underline"
        ? "flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        : ""
    ),
    n = ne(() =>
      e.variant === "underline"
        ? "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
        : ""
    );
  return { ulClasses: t, divClasses: n };
}
function Ro(e, t = !0, n = []) {
  return (
    e.forEach((r) => {
      if (r !== null) {
        if (typeof r != "object") {
          (typeof r == "string" || typeof r == "number") &&
            n.push(xt(String(r)));
          return;
        }
        if (Array.isArray(r)) {
          Ro(r, t, n);
          return;
        }
        if (r.type === me) {
          if (r.children === null) return;
          Array.isArray(r.children) && Ro(r.children, t, n);
        } else r.type !== Et && n.push(r);
      }
    }),
    n
  );
}
const Dv = {
    default:
      "cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300",
    active:
      "cursor-pointer inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500",
    disabled:
      "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
  },
  Hv = {
    default:
      "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
    active:
      "cursor-pointer inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500",
    disabled:
      "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500",
  },
  Bv = {
    default:
      "cursor-pointer inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
    active:
      "cursor-pointer inline-block py-3 px-4 text-white bg-blue-600 rounded-lg active",
    disabled:
      "inline-block py-3 px-4 text-gray-400 cursor-not-allowed dark:text-gray-500",
  };
function Nv(e) {
  const t = Iv();
  return {
    tabClasses: ne(() => {
      const n = t.isActive.value,
        r = e.active.value
          ? "active"
          : e.disabled.value
          ? "disabled"
          : "default";
      return e.variant === "default"
        ? io(Dv[r], n && r === "active" ? t.textClasses.value : "")
        : e.variant === "underline"
        ? io(
            Hv[r],
            n && r === "active"
              ? [t.borderClasses.value, t.textClasses.value]
              : ""
          )
        : e.variant === "pills"
        ? io(
            Bv[r],
            n && r === "active" ? [t.backgroundClasses.value, "text-white"] : ""
          )
        : "";
    }),
  };
}
const Fv = Ae({
    __name: "TabPane",
    props: {
      name: { type: String, required: !0 },
      title: { type: String, default: "" },
      disabled: { type: Boolean, default: !1 },
      active: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = e,
        n = Re(gu);
      n ||
        console.warn(
          "you can't use Tab outside of Tabs component. No tab style injection found"
        );
      const r = Re(yu);
      r ||
        console.warn(
          "you can't use Tab outside of Tabs component. No tab activate injection found"
        );
      const i = () => {
          if (!t.disabled) {
            if (!r) return console.warn("no onActivate");
            r(t.name);
          }
        },
        { tabClasses: o } = Nv({
          active: go(t, "active"),
          disabled: go(t, "disabled"),
          variant: n,
        });
      return (s, a) => (
        H(),
        K("li", null, [
          A("div", { class: Pe(ae(o)), onClick: i }, Ie(e.title), 3),
        ])
      );
    },
  }),
  zv = { inheritAttrs: !1 },
  Vv = Ae({
    ...zv,
    __name: "Tabs",
    props: {
      variant: { type: String, default: "default" },
      modelValue: { type: String, default: "" },
      directive: { type: String, default: "if" },
    },
    emits: ["update:modelValue", "click:pane"],
    setup(e, { emit: t }) {
      const n = e,
        { ulClasses: r, divClasses: i } = Mv(n);
      Bt(gu, n.variant);
      const o = gd().default,
        s = ne(() => (o ? Ro(o()).filter((u) => u.type.__FLOWBITE_TAB__) : [])),
        a = ne({
          get: () => n.modelValue,
          set: (u) => t("update:modelValue", u),
        });
      Bt(vu, a), Bt(mu, go(n, "directive"));
      const l = (u) => {
        a.value = u;
      };
      function c() {
        t("click:pane");
      }
      return (
        Bt(yu, l),
        (u, f) => (
          H(),
          K("div", null, [
            A(
              "div",
              { class: Pe(ae(i)) },
              [
                A(
                  "ul",
                  { class: Pe(ae(r)) },
                  [
                    (H(!0),
                    K(
                      me,
                      null,
                      oi(s.value, (h, g) => {
                        var m, b, y, _;
                        return (
                          H(),
                          He(
                            Fv,
                            {
                              key: g,
                              active:
                                a.value ===
                                ((m = h.props) == null ? void 0 : m.name),
                              name: (b = h.props) == null ? void 0 : b.name,
                              disabled:
                                (y = h.props) == null ? void 0 : y.disabled,
                              title: (_ = h.props) == null ? void 0 : _.title,
                              onClick: c,
                            },
                            null,
                            8,
                            ["active", "name", "disabled", "title"]
                          )
                        );
                      }),
                      128
                    )),
                  ],
                  2
                ),
              ],
              2
            ),
            A("div", Il(ns(u.$attrs)), [Ke(u.$slots, "default")], 16),
          ])
        )
      );
    },
  }),
  Uv = { key: 0 },
  Wv = { key: 1 },
  qv = { __FLOWBITE_TAB__: !0 },
  Kv = Ae({
    ...qv,
    __name: "Tab",
    props: {
      name: { type: String, required: !0 },
      title: { type: String, default: "" },
      disabled: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = Re(vu, ""),
        n = Re(mu, "if");
      return (r, i) => (
        H(),
        K("div", null, [
          ae(n) === "if"
            ? (H(),
              K(
                me,
                { key: 0 },
                [
                  ae(t) === e.name
                    ? (H(), K("div", Uv, [Ke(r.$slots, "default")]))
                    : be("", !0),
                ],
                64
              ))
            : ae(n) === "show"
            ? ii((H(), K("div", Wv, [Ke(r.$slots, "default")], 512)), [
                [gh, ae(t) === e.name],
              ])
            : be("", !0),
        ])
      );
    },
  });
var Za;
const Yv = typeof window < "u";
Yv &&
  (Za = window == null ? void 0 : window.navigator) != null &&
  Za.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Qv(e) {
  return e;
}
const el =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  tl = "__vueuse_ssr_handlers__";
el[tl] = el[tl] || {};
var nl;
(function (e) {
  (e.UP = "UP"),
    (e.RIGHT = "RIGHT"),
    (e.DOWN = "DOWN"),
    (e.LEFT = "LEFT"),
    (e.NONE = "NONE");
})(nl || (nl = {}));
var Jv = Object.defineProperty,
  rl = Object.getOwnPropertySymbols,
  Xv = Object.prototype.hasOwnProperty,
  Gv = Object.prototype.propertyIsEnumerable,
  il = (e, t, n) =>
    t in e
      ? Jv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Zv = (e, t) => {
    for (var n in t || (t = {})) Xv.call(t, n) && il(e, n, t[n]);
    if (rl) for (var n of rl(t)) Gv.call(t, n) && il(e, n, t[n]);
    return e;
  };
const em = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
Zv({ linear: Qv }, em);
var tm =
  typeof global == "object" && global && global.Object === Object && global;
const nm = tm;
var rm = typeof self == "object" && self && self.Object === Object && self,
  im = nm || rm || Function("return this")();
const Os = im;
var om = Os.Symbol;
const Wt = om;
var bu = Object.prototype,
  sm = bu.hasOwnProperty,
  am = bu.toString,
  Xn = Wt ? Wt.toStringTag : void 0;
function lm(e) {
  var t = sm.call(e, Xn),
    n = e[Xn];
  try {
    e[Xn] = void 0;
    var r = !0;
  } catch {}
  var i = am.call(e);
  return r && (t ? (e[Xn] = n) : delete e[Xn]), i;
}
var cm = Object.prototype,
  um = cm.toString;
function fm(e) {
  return um.call(e);
}
var dm = "[object Null]",
  hm = "[object Undefined]",
  ol = Wt ? Wt.toStringTag : void 0;
function As(e) {
  return e == null
    ? e === void 0
      ? hm
      : dm
    : ol && ol in Object(e)
    ? lm(e)
    : fm(e);
}
function Ss(e) {
  return e != null && typeof e == "object";
}
var pm = "[object Symbol]";
function Ls(e) {
  return typeof e == "symbol" || (Ss(e) && As(e) == pm);
}
function gm(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
    i[n] = t(e[n], n, e);
  return i;
}
var vm = Array.isArray;
const Pr = vm;
var mm = 1 / 0,
  sl = Wt ? Wt.prototype : void 0,
  al = sl ? sl.toString : void 0;
function _u(e) {
  if (typeof e == "string") return e;
  if (Pr(e)) return gm(e, _u) + "";
  if (Ls(e)) return al ? al.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -mm ? "-0" : t;
}
function bi(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function ym(e) {
  return e;
}
var bm = "[object AsyncFunction]",
  _m = "[object Function]",
  wm = "[object GeneratorFunction]",
  xm = "[object Proxy]";
function km(e) {
  if (!bi(e)) return !1;
  var t = As(e);
  return t == _m || t == wm || t == bm || t == xm;
}
var Em = Os["__core-js_shared__"];
const oo = Em;
var ll = (function () {
  var e = /[^.]+$/.exec((oo && oo.keys && oo.keys.IE_PROTO) || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function Cm(e) {
  return !!ll && ll in e;
}
var Tm = Function.prototype,
  Om = Tm.toString;
function Am(e) {
  if (e != null) {
    try {
      return Om.call(e);
    } catch {}
    try {
      return e + "";
    } catch {}
  }
  return "";
}
var Sm = /[\\^$.*+?()[\]{}|]/g,
  Lm = /^\[object .+?Constructor\]$/,
  Pm = Function.prototype,
  $m = Object.prototype,
  Im = Pm.toString,
  Rm = $m.hasOwnProperty,
  jm = RegExp(
    "^" +
      Im.call(Rm)
        .replace(Sm, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );
function Mm(e) {
  if (!bi(e) || Cm(e)) return !1;
  var t = km(e) ? jm : Lm;
  return t.test(Am(e));
}
function Dm(e, t) {
  return e == null ? void 0 : e[t];
}
function Ps(e, t) {
  var n = Dm(e, t);
  return Mm(n) ? n : void 0;
}
function Hm(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var Bm = 800,
  Nm = 16,
  Fm = Date.now;
function zm(e) {
  var t = 0,
    n = 0;
  return function () {
    var r = Fm(),
      i = Nm - (r - n);
    if (((n = r), i > 0)) {
      if (++t >= Bm) return arguments[0];
    } else t = 0;
    return e.apply(void 0, arguments);
  };
}
function Vm(e) {
  return function () {
    return e;
  };
}
var Um = (function () {
  try {
    var e = Ps(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {}
})();
const _i = Um;
var Wm = _i
  ? function (e, t) {
      return _i(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: Vm(t),
        writable: !0,
      });
    }
  : ym;
const qm = Wm;
var Km = zm(qm);
const Ym = Km;
var Qm = 9007199254740991,
  Jm = /^(?:0|[1-9]\d*)$/;
function wu(e, t) {
  var n = typeof e;
  return (
    (t = t ?? Qm),
    !!t &&
      (n == "number" || (n != "symbol" && Jm.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  );
}
function Xm(e, t, n) {
  t == "__proto__" && _i
    ? _i(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
    : (e[t] = n);
}
function xu(e, t) {
  return e === t || (e !== e && t !== t);
}
var Gm = Object.prototype,
  Zm = Gm.hasOwnProperty;
function e0(e, t, n) {
  var r = e[t];
  (!(Zm.call(e, t) && xu(r, n)) || (n === void 0 && !(t in e))) && Xm(e, t, n);
}
var cl = Math.max;
function t0(e, t, n) {
  return (
    (t = cl(t === void 0 ? e.length - 1 : t, 0)),
    function () {
      for (
        var r = arguments, i = -1, o = cl(r.length - t, 0), s = Array(o);
        ++i < o;

      )
        s[i] = r[t + i];
      i = -1;
      for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
      return (a[t] = n(s)), Hm(e, this, a);
    }
  );
}
var n0 = 9007199254740991;
function r0(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= n0;
}
var i0 = "[object Arguments]";
function ul(e) {
  return Ss(e) && As(e) == i0;
}
var ku = Object.prototype,
  o0 = ku.hasOwnProperty,
  s0 = ku.propertyIsEnumerable,
  a0 = ul(
    (function () {
      return arguments;
    })()
  )
    ? ul
    : function (e) {
        return Ss(e) && o0.call(e, "callee") && !s0.call(e, "callee");
      };
const Eu = a0;
var l0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  c0 = /^\w*$/;
function u0(e, t) {
  if (Pr(e)) return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || Ls(e)
    ? !0
    : c0.test(e) || !l0.test(e) || (t != null && e in Object(t));
}
var f0 = Ps(Object, "create");
const Er = f0;
function d0() {
  (this.__data__ = Er ? Er(null) : {}), (this.size = 0);
}
function h0(e) {
  var t = this.has(e) && delete this.__data__[e];
  return (this.size -= t ? 1 : 0), t;
}
var p0 = "__lodash_hash_undefined__",
  g0 = Object.prototype,
  v0 = g0.hasOwnProperty;
function m0(e) {
  var t = this.__data__;
  if (Er) {
    var n = t[e];
    return n === p0 ? void 0 : n;
  }
  return v0.call(t, e) ? t[e] : void 0;
}
var y0 = Object.prototype,
  b0 = y0.hasOwnProperty;
function _0(e) {
  var t = this.__data__;
  return Er ? t[e] !== void 0 : b0.call(t, e);
}
var w0 = "__lodash_hash_undefined__";
function x0(e, t) {
  var n = this.__data__;
  return (
    (this.size += this.has(e) ? 0 : 1),
    (n[e] = Er && t === void 0 ? w0 : t),
    this
  );
}
function pn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
pn.prototype.clear = d0;
pn.prototype.delete = h0;
pn.prototype.get = m0;
pn.prototype.has = _0;
pn.prototype.set = x0;
function k0() {
  (this.__data__ = []), (this.size = 0);
}
function zi(e, t) {
  for (var n = e.length; n--; ) if (xu(e[n][0], t)) return n;
  return -1;
}
var E0 = Array.prototype,
  C0 = E0.splice;
function T0(e) {
  var t = this.__data__,
    n = zi(t, e);
  if (n < 0) return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : C0.call(t, n, 1), --this.size, !0;
}
function O0(e) {
  var t = this.__data__,
    n = zi(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function A0(e) {
  return zi(this.__data__, e) > -1;
}
function S0(e, t) {
  var n = this.__data__,
    r = zi(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
}
function Wn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Wn.prototype.clear = k0;
Wn.prototype.delete = T0;
Wn.prototype.get = O0;
Wn.prototype.has = A0;
Wn.prototype.set = S0;
var L0 = Ps(Os, "Map");
const P0 = L0;
function $0() {
  (this.size = 0),
    (this.__data__ = {
      hash: new pn(),
      map: new (P0 || Wn)(),
      string: new pn(),
    });
}
function I0(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean"
    ? e !== "__proto__"
    : e === null;
}
function Vi(e, t) {
  var n = e.__data__;
  return I0(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function R0(e) {
  var t = Vi(this, e).delete(e);
  return (this.size -= t ? 1 : 0), t;
}
function j0(e) {
  return Vi(this, e).get(e);
}
function M0(e) {
  return Vi(this, e).has(e);
}
function D0(e, t) {
  var n = Vi(this, e),
    r = n.size;
  return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
}
function vn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
vn.prototype.clear = $0;
vn.prototype.delete = R0;
vn.prototype.get = j0;
vn.prototype.has = M0;
vn.prototype.set = D0;
var H0 = "Expected a function";
function $s(e, t) {
  if (typeof e != "function" || (t != null && typeof t != "function"))
    throw new TypeError(H0);
  var n = function () {
    var r = arguments,
      i = t ? t.apply(this, r) : r[0],
      o = n.cache;
    if (o.has(i)) return o.get(i);
    var s = e.apply(this, r);
    return (n.cache = o.set(i, s) || o), s;
  };
  return (n.cache = new ($s.Cache || vn)()), n;
}
$s.Cache = vn;
var B0 = 500;
function N0(e) {
  var t = $s(e, function (r) {
      return n.size === B0 && n.clear(), r;
    }),
    n = t.cache;
  return t;
}
var F0 =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  z0 = /\\(\\)?/g,
  V0 = N0(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(""),
      e.replace(F0, function (n, r, i, o) {
        t.push(i ? o.replace(z0, "$1") : r || n);
      }),
      t
    );
  });
const U0 = V0;
function W0(e) {
  return e == null ? "" : _u(e);
}
function Ui(e, t) {
  return Pr(e) ? e : u0(e, t) ? [e] : U0(W0(e));
}
var q0 = 1 / 0;
function Is(e) {
  if (typeof e == "string" || Ls(e)) return e;
  var t = e + "";
  return t == "0" && 1 / e == -q0 ? "-0" : t;
}
function K0(e, t) {
  t = Ui(t, e);
  for (var n = 0, r = t.length; e != null && n < r; ) e = e[Is(t[n++])];
  return n && n == r ? e : void 0;
}
function Y0(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
  return e;
}
var fl = Wt ? Wt.isConcatSpreadable : void 0;
function Q0(e) {
  return Pr(e) || Eu(e) || !!(fl && e && e[fl]);
}
function Cu(e, t, n, r, i) {
  var o = -1,
    s = e.length;
  for (n || (n = Q0), i || (i = []); ++o < s; ) {
    var a = e[o];
    t > 0 && n(a)
      ? t > 1
        ? Cu(a, t - 1, n, r, i)
        : Y0(i, a)
      : r || (i[i.length] = a);
  }
  return i;
}
function J0(e) {
  var t = e == null ? 0 : e.length;
  return t ? Cu(e, 1) : [];
}
function X0(e) {
  return Ym(t0(e, void 0, J0), e + "");
}
function G0(e, t) {
  return e != null && t in Object(e);
}
function Z0(e, t, n) {
  t = Ui(t, e);
  for (var r = -1, i = t.length, o = !1; ++r < i; ) {
    var s = Is(t[r]);
    if (!(o = e != null && n(e, s))) break;
    e = e[s];
  }
  return o || ++r != i
    ? o
    : ((i = e == null ? 0 : e.length),
      !!i && r0(i) && wu(s, i) && (Pr(e) || Eu(e)));
}
function ey(e, t) {
  return e != null && Z0(e, t, G0);
}
function ty(e, t, n, r) {
  if (!bi(e)) return e;
  t = Ui(t, e);
  for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
    var l = Is(t[i]),
      c = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype") return e;
    if (i != s) {
      var u = a[l];
      (c = r ? r(u, l, a) : void 0),
        c === void 0 && (c = bi(u) ? u : wu(t[i + 1]) ? [] : {});
    }
    e0(a, l, c), (a = a[l]);
  }
  return e;
}
function ny(e, t, n) {
  for (var r = -1, i = t.length, o = {}; ++r < i; ) {
    var s = t[r],
      a = K0(e, s);
    n(a, s) && ty(o, Ui(s, e), a);
  }
  return o;
}
function ry(e, t) {
  return ny(e, t, function (n, r) {
    return ey(e, r);
  });
}
X0(function (e, t) {
  return e == null ? {} : ry(e, t);
});
const iy = A(
    "div",
    {
      class: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    },
    null,
    -1
  ),
  oy = ["onKeyup", "onClick"],
  sy = { class: "relative bg-white rounded-lg shadow dark:bg-gray-700" },
  ay = A(
    "svg",
    {
      class: "w-5 h-5",
      fill: "currentColor",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      A("path", {
        "fill-rule": "evenodd",
        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
        "clip-rule": "evenodd",
      }),
    ],
    -1
  ),
  ly = {
    key: 0,
    class: "p-6 rounded-b border-gray-200 border-t dark:border-gray-600",
  },
  cy = Ae({
    __name: "Modal",
    props: {
      size: { default: "2xl" },
      escapable: { type: Boolean, default: !0 },
      persistent: { type: Boolean, default: !1 },
    },
    emits: ["close", "click:outside"],
    setup(e, { emit: t }) {
      const n = e,
        r = {
          xs: "max-w-xs",
          sm: "max-w-sm",
          md: "max-w-md",
          lg: "max-w-lg",
          xl: "max-w-xl",
          "2xl": "max-w-2xl",
          "3xl": "max-w-3xl",
          "4xl": "max-w-4xl",
          "5xl": "max-w-5xl",
          "6xl": "max-w-6xl",
          "7xl": "max-w-7xl",
        };
      function i() {
        t("close");
      }
      function o() {
        n.persistent || (t("click:outside"), i());
      }
      function s() {
        n.escapable && !n.persistent && i();
      }
      const a = bt(null);
      return (
        Zo(() => {
          a.value && a.value.focus();
        }),
        (l, c) => (
          H(),
          K("div", null, [
            iy,
            A(
              "div",
              {
                tabindex: "0",
                ref_key: "modalRef",
                ref: a,
                class:
                  "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex",
                onKeyup: Lc(s, ["esc"]),
                onClick: os(o, ["self"]),
              },
              [
                A(
                  "div",
                  {
                    class: Pe([
                      "relative p-4 w-full h-full md:h-auto",
                      `${r[l.size]}`,
                    ]),
                  },
                  [
                    A("div", sy, [
                      A(
                        "div",
                        {
                          class: Pe([
                            "p-4 rounded-t flex justify-between items-center",
                            l.$slots.header
                              ? "border-b border-gray-200 dark:border-gray-600"
                              : "",
                          ]),
                        },
                        [
                          Ke(l.$slots, "header"),
                          l.persistent
                            ? be("", !0)
                            : (H(),
                              K(
                                "button",
                                {
                                  key: 0,
                                  onClick: i,
                                  "aria-label": "close",
                                  type: "button",
                                  class:
                                    "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
                                },
                                [Ke(l.$slots, "close-icon", {}, () => [ay])]
                              )),
                        ],
                        2
                      ),
                      A(
                        "div",
                        { class: Pe(["p-6", l.$slots.header ? "" : "pt-0"]) },
                        [Ke(l.$slots, "body")],
                        2
                      ),
                      l.$slots.footer
                        ? (H(), K("div", ly, [Ke(l.$slots, "footer")]))
                        : be("", !0),
                    ]),
                  ],
                  2
                ),
              ],
              40,
              oy
            ),
          ])
        )
      );
    },
  }),
  uy = { "aria-label": "Page navigation example" },
  fy = { key: 0, class: "text-sm text-gray-700 dark:text-gray-400 mb-2" },
  dy = { class: "font-semibold text-gray-900 dark:text-white" },
  hy = { class: "font-semibold text-gray-900 dark:text-white" },
  py = { class: "font-semibold text-gray-900 dark:text-white" },
  gy = { class: "inline-flex -space-x-px" },
  vy = ["disabled"],
  my = {
    key: 0,
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    class: "h-5 w-5",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
  },
  yy = A(
    "path",
    {
      "fill-rule": "evenodd",
      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
      "clip-rule": "evenodd",
    },
    null,
    -1
  ),
  by = [yy],
  _y = ["disabled", "onClick"],
  wy = ["disabled"],
  xy = {
    key: 0,
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    class: "h-5 w-5",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
  },
  ky = A(
    "path",
    {
      "fill-rule": "evenodd",
      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
      "clip-rule": "evenodd",
    },
    null,
    -1
  ),
  Ey = [ky],
  Cy = Ae({
    __name: "Pagination",
    props: {
      modelValue: { type: Number, default: 1 },
      totalPages: { type: Number, default: 1 },
      perPage: { type: Number, default: 10 },
      totalItems: { type: Number, required: !1 },
      layout: { type: String, default: "pagination" },
      showIcons: { type: Boolean, default: !1 },
      sliceLength: { type: Number, default: 2 },
      previousLabel: { type: String, default: "Previous" },
      nextLabel: { type: String, default: "Next" },
    },
    emits: ["update:modelValue"],
    setup(e, { emit: t }) {
      const n = e,
        r = (m) => {
          t("update:modelValue", m);
        },
        i = () => {
          t("update:modelValue", n.modelValue - 1);
        },
        o = () => {
          t("update:modelValue", n.modelValue + 1);
        },
        s = ne(() =>
          !n.totalItems || !n.perPage
            ? n.totalPages
            : Math.ceil(n.totalItems / n.perPage)
        ),
        a = ne(() => n.modelValue <= 1),
        l = ne(() => n.modelValue >= s.value),
        c = (m) => m === n.modelValue,
        u = ne(() => {
          if (n.layout === "navigation") return [];
          if (n.layout === "table") return [];
          if (s.value <= n.sliceLength * 2 + 1) {
            const y = [];
            for (let _ = 1; _ <= s.value; _++) y.push(_);
            return y;
          }
          if (n.modelValue <= n.sliceLength) {
            const y = [],
              _ =
                Math.abs(n.modelValue - n.sliceLength) +
                n.modelValue +
                n.sliceLength +
                1;
            for (let k = 1; k <= _; k++) y.push(k);
            return y;
          }
          if (n.modelValue >= s.value - n.sliceLength) {
            const y = [];
            for (
              let _ = Math.abs(s.value - n.sliceLength * 2);
              _ <= s.value;
              _++
            )
              y.push(_);
            return y;
          }
          const m = [];
          let b =
            n.modelValue - n.sliceLength > 0 ? n.modelValue - n.sliceLength : 1;
          for (
            let y = b;
            y < n.modelValue + n.sliceLength + 1 && !(y >= s.value);
            y++
          )
            m.push(y);
          return m;
        }),
        f = ne(() => n.modelValue * n.perPage - n.perPage + 1),
        h = ne(() => {
          const m = n.modelValue * n.perPage + 1;
          return n.totalItems && m > n.totalItems ? n.totalItems : m;
        }),
        g = ne(() => (n.totalItems ? n.totalItems : s.value * n.perPage));
      return (m, b) => (
        H(),
        K("nav", uy, [
          e.layout === "table"
            ? (H(),
              K("div", fy, [
                xt(" Showing "),
                A("span", dy, Ie(f.value), 1),
                xt(" to "),
                A("span", hy, Ie(h.value), 1),
                xt(" of "),
                A("span", py, Ie(g.value), 1),
              ]))
            : be("", !0),
          A("ul", gy, [
            A("li", null, [
              A(
                "button",
                {
                  disabled: a.value,
                  onClick: i,
                  class:
                    "flex items-center py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                },
                [
                  e.showIcons ? (H(), K("svg", my, by)) : be("", !0),
                  xt(" " + Ie(e.previousLabel), 1),
                ],
                8,
                vy
              ),
            ]),
            (H(!0),
            K(
              me,
              null,
              oi(
                u.value,
                (y) => (
                  H(),
                  K("li", { key: y }, [
                    A(
                      "button",
                      {
                        disabled: c(y),
                        onClick: (_) => r(y),
                        class: Pe([
                          "w-12 py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                          {
                            "text-blue-600 dark:text-white bg-blue-50 dark:bg-gray-700":
                              y === e.modelValue,
                          },
                        ]),
                      },
                      Ie(y),
                      11,
                      _y
                    ),
                  ])
                )
              ),
              128
            )),
            A("li", null, [
              A(
                "button",
                {
                  disabled: l.value,
                  onClick: o,
                  class:
                    "flex items-center py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                },
                [
                  xt(Ie(e.nextLabel) + " ", 1),
                  e.showIcons ? (H(), K("svg", xy, Ey)) : be("", !0),
                ],
                8,
                wy
              ),
            ]),
          ]),
        ])
      );
    },
  }),
  Ty = ["top", "right", "bottom", "left"],
  dl = ["start", "end"],
  hl = Ty.reduce((e, t) => e.concat(t, t + "-" + dl[0], t + "-" + dl[1]), []),
  Cr = Math.min,
  en = Math.max,
  Oy = { left: "right", right: "left", bottom: "top", top: "bottom" },
  Ay = { start: "end", end: "start" };
function jo(e, t, n) {
  return en(e, Cr(t, n));
}
function mn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vt(e) {
  return e.split("-")[0];
}
function at(e) {
  return e.split("-")[1];
}
function Tu(e) {
  return e === "x" ? "y" : "x";
}
function Rs(e) {
  return e === "y" ? "height" : "width";
}
function $r(e) {
  return ["top", "bottom"].includes(vt(e)) ? "y" : "x";
}
function js(e) {
  return Tu($r(e));
}
function Ou(e, t, n) {
  n === void 0 && (n = !1);
  const r = at(e),
    i = js(e),
    o = Rs(i);
  let s =
    i === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[o] > t.floating[o] && (s = xi(s)), [s, xi(s)];
}
function Sy(e) {
  const t = xi(e);
  return [wi(e), t, wi(t)];
}
function wi(e) {
  return e.replace(/start|end/g, (t) => Ay[t]);
}
function Ly(e, t, n) {
  const r = ["left", "right"],
    i = ["right", "left"],
    o = ["top", "bottom"],
    s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? i : r) : t ? r : i;
    case "left":
    case "right":
      return t ? o : s;
    default:
      return [];
  }
}
function Py(e, t, n, r) {
  const i = at(e);
  let o = Ly(vt(e), n === "start", r);
  return (
    i && ((o = o.map((s) => s + "-" + i)), t && (o = o.concat(o.map(wi)))), o
  );
}
function xi(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Oy[t]);
}
function $y(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Au(e) {
  return typeof e != "number"
    ? $y(e)
    : { top: e, right: e, bottom: e, left: e };
}
function ur(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height,
  };
}
function pl(e, t, n) {
  let { reference: r, floating: i } = e;
  const o = $r(t),
    s = js(t),
    a = Rs(s),
    l = vt(t),
    c = o === "y",
    u = r.x + r.width / 2 - i.width / 2,
    f = r.y + r.height / 2 - i.height / 2,
    h = r[a] / 2 - i[a] / 2;
  let g;
  switch (l) {
    case "top":
      g = { x: u, y: r.y - i.height };
      break;
    case "bottom":
      g = { x: u, y: r.y + r.height };
      break;
    case "right":
      g = { x: r.x + r.width, y: f };
      break;
    case "left":
      g = { x: r.x - i.width, y: f };
      break;
    default:
      g = { x: r.x, y: r.y };
  }
  switch (at(t)) {
    case "start":
      g[s] -= h * (n && c ? -1 : 1);
      break;
    case "end":
      g[s] += h * (n && c ? -1 : 1);
      break;
  }
  return g;
}
const Iy = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: i = "absolute",
      middleware: o = [],
      platform: s,
    } = n,
    a = o.filter(Boolean),
    l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let c = await s.getElementRects({ reference: e, floating: t, strategy: i }),
    { x: u, y: f } = pl(c, r, l),
    h = r,
    g = {},
    m = 0;
  for (let b = 0; b < a.length; b++) {
    const { name: y, fn: _ } = a[b],
      {
        x: k,
        y: P,
        data: C,
        reset: I,
      } = await _({
        x: u,
        y: f,
        initialPlacement: r,
        placement: h,
        strategy: i,
        middlewareData: g,
        rects: c,
        platform: s,
        elements: { reference: e, floating: t },
      });
    if (
      ((u = k ?? u),
      (f = P ?? f),
      (g = { ...g, [y]: { ...g[y], ...C } }),
      I && m <= 50)
    ) {
      m++,
        typeof I == "object" &&
          (I.placement && (h = I.placement),
          I.rects &&
            (c =
              I.rects === !0
                ? await s.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: i,
                  })
                : I.rects),
          ({ x: u, y: f } = pl(c, h, l))),
        (b = -1);
      continue;
    }
  }
  return { x: u, y: f, placement: h, strategy: i, middlewareData: g };
};
async function Wi(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: o, rects: s, elements: a, strategy: l } = e,
    {
      boundary: c = "clippingAncestors",
      rootBoundary: u = "viewport",
      elementContext: f = "floating",
      altBoundary: h = !1,
      padding: g = 0,
    } = mn(t, e),
    m = Au(g),
    b = a[h ? (f === "floating" ? "reference" : "floating") : f],
    y = ur(
      await o.getClippingRect({
        element:
          (n = await (o.isElement == null ? void 0 : o.isElement(b))) == null ||
          n
            ? b
            : b.contextElement ||
              (await (o.getDocumentElement == null
                ? void 0
                : o.getDocumentElement(a.floating))),
        boundary: c,
        rootBoundary: u,
        strategy: l,
      })
    ),
    _ = f === "floating" ? { ...s.floating, x: r, y: i } : s.reference,
    k = await (o.getOffsetParent == null
      ? void 0
      : o.getOffsetParent(a.floating)),
    P = (await (o.isElement == null ? void 0 : o.isElement(k)))
      ? (await (o.getScale == null ? void 0 : o.getScale(k))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    C = ur(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            rect: _,
            offsetParent: k,
            strategy: l,
          })
        : _
    );
  return {
    top: (y.top - C.top + m.top) / P.y,
    bottom: (C.bottom - y.bottom + m.bottom) / P.y,
    left: (y.left - C.left + m.left) / P.x,
    right: (C.right - y.right + m.right) / P.x,
  };
}
const Ry = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const { x: n, y: r, placement: i, rects: o, platform: s, elements: a } = t,
      { element: l, padding: c = 0 } = mn(e, t) || {};
    if (l == null) return {};
    const u = Au(c),
      f = { x: n, y: r },
      h = js(i),
      g = Rs(h),
      m = await s.getDimensions(l),
      b = h === "y",
      y = b ? "top" : "left",
      _ = b ? "bottom" : "right",
      k = b ? "clientHeight" : "clientWidth",
      P = o.reference[g] + o.reference[h] - f[h] - o.floating[g],
      C = f[h] - o.reference[h],
      I = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let D = I ? I[k] : 0;
    (!D || !(await (s.isElement == null ? void 0 : s.isElement(I)))) &&
      (D = a.floating[k] || o.floating[g]);
    const U = P / 2 - C / 2,
      N = D / 2 - m[g] / 2 - 1,
      j = Cr(u[y], N),
      W = Cr(u[_], N),
      Y = j,
      se = D - m[g] - W,
      G = D / 2 - m[g] / 2 + U,
      pe = jo(Y, G, se),
      fe =
        at(i) != null &&
        G != pe &&
        o.reference[g] / 2 - (G < Y ? j : W) - m[g] / 2 < 0
          ? G < Y
            ? Y - G
            : se - G
          : 0;
    return { [h]: f[h] - fe, data: { [h]: pe, centerOffset: G - pe + fe } };
  },
});
function jy(e, t, n) {
  return (
    e
      ? [...n.filter((r) => at(r) === e), ...n.filter((r) => at(r) !== e)]
      : n.filter((r) => vt(r) === r)
  ).filter((r) => (e ? at(r) === e || (t ? wi(r) !== r : !1) : !0));
}
const My = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "autoPlacement",
        options: e,
        async fn(t) {
          var n, r, i;
          const {
              rects: o,
              middlewareData: s,
              placement: a,
              platform: l,
              elements: c,
            } = t,
            {
              crossAxis: u = !1,
              alignment: f,
              allowedPlacements: h = hl,
              autoAlignment: g = !0,
              ...m
            } = mn(e, t),
            b = f !== void 0 || h === hl ? jy(f || null, g, h) : h,
            y = await Wi(t, m),
            _ = ((n = s.autoPlacement) == null ? void 0 : n.index) || 0,
            k = b[_];
          if (k == null) return {};
          const P = Ou(
            k,
            o,
            await (l.isRTL == null ? void 0 : l.isRTL(c.floating))
          );
          if (a !== k) return { reset: { placement: b[0] } };
          const C = [y[vt(k)], y[P[0]], y[P[1]]],
            I = [
              ...(((r = s.autoPlacement) == null ? void 0 : r.overflows) || []),
              { placement: k, overflows: C },
            ],
            D = b[_ + 1];
          if (D)
            return {
              data: { index: _ + 1, overflows: I },
              reset: { placement: D },
            };
          const U = I.map((j) => {
              const W = at(j.placement);
              return [
                j.placement,
                W && u
                  ? j.overflows.slice(0, 2).reduce((Y, se) => Y + se, 0)
                  : j.overflows[0],
                j.overflows,
              ];
            }).sort((j, W) => j[1] - W[1]),
            N =
              ((i = U.filter((j) =>
                j[2].slice(0, at(j[0]) ? 2 : 3).every((W) => W <= 0)
              )[0]) == null
                ? void 0
                : i[0]) || U[0][0];
          return N !== a
            ? { data: { index: _ + 1, overflows: I }, reset: { placement: N } }
            : {};
        },
      }
    );
  },
  Dy = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n;
          const {
              placement: r,
              middlewareData: i,
              rects: o,
              initialPlacement: s,
              platform: a,
              elements: l,
            } = t,
            {
              mainAxis: c = !0,
              crossAxis: u = !0,
              fallbackPlacements: f,
              fallbackStrategy: h = "bestFit",
              fallbackAxisSideDirection: g = "none",
              flipAlignment: m = !0,
              ...b
            } = mn(e, t),
            y = vt(r),
            _ = vt(s) === s,
            k = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)),
            P = f || (_ || !m ? [xi(s)] : Sy(s));
          !f && g !== "none" && P.push(...Py(s, m, g, k));
          const C = [s, ...P],
            I = await Wi(t, b),
            D = [];
          let U = ((n = i.flip) == null ? void 0 : n.overflows) || [];
          if ((c && D.push(I[y]), u)) {
            const Y = Ou(r, o, k);
            D.push(I[Y[0]], I[Y[1]]);
          }
          if (
            ((U = [...U, { placement: r, overflows: D }]),
            !D.every((Y) => Y <= 0))
          ) {
            var N, j;
            const Y = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1,
              se = C[Y];
            if (se)
              return {
                data: { index: Y, overflows: U },
                reset: { placement: se },
              };
            let G =
              (j = U.filter((pe) => pe.overflows[0] <= 0).sort(
                (pe, fe) => pe.overflows[1] - fe.overflows[1]
              )[0]) == null
                ? void 0
                : j.placement;
            if (!G)
              switch (h) {
                case "bestFit": {
                  var W;
                  const pe =
                    (W = U.map((fe) => [
                      fe.placement,
                      fe.overflows
                        .filter((q) => q > 0)
                        .reduce((q, ee) => q + ee, 0),
                    ]).sort((fe, q) => fe[1] - q[1])[0]) == null
                      ? void 0
                      : W[0];
                  pe && (G = pe);
                  break;
                }
                case "initialPlacement":
                  G = s;
                  break;
              }
            if (r !== G) return { reset: { placement: G } };
          }
          return {};
        },
      }
    );
  };
async function Hy(e, t) {
  const { placement: n, platform: r, elements: i } = e,
    o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    s = vt(n),
    a = at(n),
    l = $r(n) === "y",
    c = ["left", "top"].includes(s) ? -1 : 1,
    u = o && l ? -1 : 1,
    f = mn(t, e);
  let {
    mainAxis: h,
    crossAxis: g,
    alignmentAxis: m,
  } = typeof f == "number"
    ? { mainAxis: f, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...f };
  return (
    a && typeof m == "number" && (g = a === "end" ? m * -1 : m),
    l ? { x: g * u, y: h * c } : { x: h * c, y: g * u }
  );
}
const By = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          const { x: n, y: r } = t,
            i = await Hy(t, e);
          return { x: n + i.x, y: r + i.y, data: i };
        },
      }
    );
  },
  Ny = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: i } = t,
            {
              mainAxis: o = !0,
              crossAxis: s = !1,
              limiter: a = {
                fn: (y) => {
                  let { x: _, y: k } = y;
                  return { x: _, y: k };
                },
              },
              ...l
            } = mn(e, t),
            c = { x: n, y: r },
            u = await Wi(t, l),
            f = $r(vt(i)),
            h = Tu(f);
          let g = c[h],
            m = c[f];
          if (o) {
            const y = h === "y" ? "top" : "left",
              _ = h === "y" ? "bottom" : "right",
              k = g + u[y],
              P = g - u[_];
            g = jo(k, g, P);
          }
          if (s) {
            const y = f === "y" ? "top" : "left",
              _ = f === "y" ? "bottom" : "right",
              k = m + u[y],
              P = m - u[_];
            m = jo(k, m, P);
          }
          const b = a.fn({ ...t, [h]: g, [f]: m });
          return { ...b, data: { x: b.x - n, y: b.y - r } };
        },
      }
    );
  },
  Fy = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          const { placement: n, rects: r, platform: i, elements: o } = t,
            { apply: s = () => {}, ...a } = mn(e, t),
            l = await Wi(t, a),
            c = vt(n),
            u = at(n),
            f = $r(n) === "y",
            { width: h, height: g } = r.floating;
          let m, b;
          c === "top" || c === "bottom"
            ? ((m = c),
              (b =
                u ===
                ((await (i.isRTL == null ? void 0 : i.isRTL(o.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((b = c), (m = u === "end" ? "top" : "bottom"));
          const y = g - l[m],
            _ = h - l[b],
            k = !t.middlewareData.shift;
          let P = y,
            C = _;
          if (f) {
            const D = h - l.left - l.right;
            C = u || k ? Cr(_, D) : D;
          } else {
            const D = g - l.top - l.bottom;
            P = u || k ? Cr(y, D) : D;
          }
          if (k && !u) {
            const D = en(l.left, 0),
              U = en(l.right, 0),
              N = en(l.top, 0),
              j = en(l.bottom, 0);
            f
              ? (C = h - 2 * (D !== 0 || U !== 0 ? D + U : en(l.left, l.right)))
              : (P =
                  g - 2 * (N !== 0 || j !== 0 ? N + j : en(l.top, l.bottom)));
          }
          await s({ ...t, availableWidth: C, availableHeight: P });
          const I = await i.getDimensions(o.floating);
          return h !== I.width || g !== I.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Je(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function mt(e) {
  return Je(e).getComputedStyle(e);
}
const gl = Math.min,
  fr = Math.max,
  ki = Math.round;
function Su(e) {
  const t = mt(e);
  let n = parseFloat(t.width),
    r = parseFloat(t.height);
  const i = e.offsetWidth,
    o = e.offsetHeight,
    s = ki(n) !== i || ki(r) !== o;
  return s && ((n = i), (r = o)), { width: n, height: r, fallback: s };
}
function qt(e) {
  return Pu(e) ? (e.nodeName || "").toLowerCase() : "";
}
let qr;
function Lu() {
  if (qr) return qr;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands)
    ? ((qr = e.brands.map((t) => t.brand + "/" + t.version).join(" ")), qr)
    : navigator.userAgent;
}
function yt(e) {
  return e instanceof Je(e).HTMLElement;
}
function Kt(e) {
  return e instanceof Je(e).Element;
}
function Pu(e) {
  return e instanceof Je(e).Node;
}
function vl(e) {
  if (typeof ShadowRoot > "u") return !1;
  const t = Je(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function qi(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = mt(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !["inline", "contents"].includes(i)
  );
}
function zy(e) {
  return ["table", "td", "th"].includes(qt(e));
}
function Ms(e) {
  const t = /firefox/i.test(Lu()),
    n = mt(e),
    r = n.backdropFilter || n.WebkitBackdropFilter;
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (r ? r !== "none" : !1) ||
    (t && n.willChange === "filter") ||
    (t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective"].some((i) => n.willChange.includes(i)) ||
    ["paint", "layout", "strict", "content"].some((i) => {
      const o = n.contain;
      return o != null ? o.includes(i) : !1;
    })
  );
}
function $u() {
  return !/^((?!chrome|android).)*safari/i.test(Lu());
}
function Ds(e) {
  return ["html", "body", "#document"].includes(qt(e));
}
function Iu(e) {
  return Kt(e) ? e : e.contextElement;
}
const Ru = { x: 1, y: 1 };
function An(e) {
  const t = Iu(e);
  if (!yt(t)) return Ru;
  const n = t.getBoundingClientRect(),
    { width: r, height: i, fallback: o } = Su(t);
  let s = (o ? ki(n.width) : n.width) / r,
    a = (o ? ki(n.height) : n.height) / i;
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: s, y: a }
  );
}
function Tr(e, t, n, r) {
  var i, o;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const s = e.getBoundingClientRect(),
    a = Iu(e);
  let l = Ru;
  t && (r ? Kt(r) && (l = An(r)) : (l = An(e)));
  const c = a ? Je(a) : window,
    u = !$u() && n;
  let f =
      (s.left +
        ((u && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft)) ||
          0)) /
      l.x,
    h =
      (s.top +
        ((u && ((o = c.visualViewport) == null ? void 0 : o.offsetTop)) || 0)) /
      l.y,
    g = s.width / l.x,
    m = s.height / l.y;
  if (a) {
    const b = Je(a),
      y = r && Kt(r) ? Je(r) : r;
    let _ = b.frameElement;
    for (; _ && r && y !== b; ) {
      const k = An(_),
        P = _.getBoundingClientRect(),
        C = getComputedStyle(_);
      (P.x += (_.clientLeft + parseFloat(C.paddingLeft)) * k.x),
        (P.y += (_.clientTop + parseFloat(C.paddingTop)) * k.y),
        (f *= k.x),
        (h *= k.y),
        (g *= k.x),
        (m *= k.y),
        (f += P.x),
        (h += P.y),
        (_ = Je(_).frameElement);
    }
  }
  return {
    width: g,
    height: m,
    top: h,
    right: f + g,
    bottom: h + m,
    left: f,
    x: f,
    y: h,
  };
}
function Qt(e) {
  return ((Pu(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function Ki(e) {
  return Kt(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Vy(e) {
  let { rect: t, offsetParent: n, strategy: r } = e;
  const i = yt(n),
    o = Qt(n);
  if (n === o) return t;
  let s = { scrollLeft: 0, scrollTop: 0 },
    a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if (
    (i || (!i && r !== "fixed")) &&
    ((qt(n) !== "body" || qi(o)) && (s = Ki(n)), yt(n))
  ) {
    const c = Tr(n);
    (a = An(n)), (l.x = c.x + n.clientLeft), (l.y = c.y + n.clientTop);
  }
  return {
    width: t.width * a.x,
    height: t.height * a.y,
    x: t.x * a.x - s.scrollLeft * a.x + l.x,
    y: t.y * a.y - s.scrollTop * a.y + l.y,
  };
}
function ju(e) {
  return Tr(Qt(e)).left + Ki(e).scrollLeft;
}
function Uy(e) {
  const t = Qt(e),
    n = Ki(e),
    r = e.ownerDocument.body,
    i = fr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    o = fr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + ju(e);
  const a = -n.scrollTop;
  return (
    mt(r).direction === "rtl" && (s += fr(t.clientWidth, r.clientWidth) - i),
    { width: i, height: o, x: s, y: a }
  );
}
function Or(e) {
  if (qt(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (vl(e) && e.host) || Qt(e);
  return vl(t) ? t.host : t;
}
function Mu(e) {
  const t = Or(e);
  return Ds(t) ? t.ownerDocument.body : yt(t) && qi(t) ? t : Mu(t);
}
function Ei(e, t) {
  var n;
  t === void 0 && (t = []);
  const r = Mu(e),
    i = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    o = Je(r);
  return i
    ? t.concat(o, o.visualViewport || [], qi(r) ? r : [])
    : t.concat(r, Ei(r));
}
function Wy(e, t) {
  const n = Je(e),
    r = Qt(e),
    i = n.visualViewport;
  let o = r.clientWidth,
    s = r.clientHeight,
    a = 0,
    l = 0;
  if (i) {
    (o = i.width), (s = i.height);
    const c = $u();
    (c || (!c && t === "fixed")) && ((a = i.offsetLeft), (l = i.offsetTop));
  }
  return { width: o, height: s, x: a, y: l };
}
function qy(e, t) {
  const n = Tr(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    o = yt(e) ? An(e) : { x: 1, y: 1 },
    s = e.clientWidth * o.x,
    a = e.clientHeight * o.y,
    l = i * o.x,
    c = r * o.y;
  return { width: s, height: a, x: l, y: c };
}
function ml(e, t, n) {
  return t === "viewport" ? ur(Wy(e, n)) : Kt(t) ? ur(qy(t, n)) : ur(Uy(Qt(e)));
}
function Ky(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Ei(e).filter((a) => Kt(a) && qt(a) !== "body"),
    i = null;
  const o = mt(e).position === "fixed";
  let s = o ? Or(e) : e;
  for (; Kt(s) && !Ds(s); ) {
    const a = mt(s),
      l = Ms(s);
    (
      o
        ? !l && !i
        : !l &&
          a.position === "static" &&
          i &&
          ["absolute", "fixed"].includes(i.position)
    )
      ? (r = r.filter((c) => c !== s))
      : (i = a),
      (s = Or(s));
  }
  return t.set(e, r), r;
}
function Yy(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
  const o = [...(n === "clippingAncestors" ? Ky(t, this._c) : [].concat(n)), r],
    s = o[0],
    a = o.reduce((l, c) => {
      const u = ml(t, c, i);
      return (
        (l.top = fr(u.top, l.top)),
        (l.right = gl(u.right, l.right)),
        (l.bottom = gl(u.bottom, l.bottom)),
        (l.left = fr(u.left, l.left)),
        l
      );
    }, ml(t, s, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top,
  };
}
function Qy(e) {
  return yt(e) ? Su(e) : e.getBoundingClientRect();
}
function yl(e) {
  return !yt(e) || mt(e).position === "fixed" ? null : e.offsetParent;
}
function Jy(e) {
  let t = Or(e);
  for (; yt(t) && !Ds(t); ) {
    if (Ms(t)) return t;
    t = Or(t);
  }
  return null;
}
function bl(e) {
  const t = Je(e);
  let n = yl(e);
  for (; n && zy(n) && mt(n).position === "static"; ) n = yl(n);
  return n &&
    (qt(n) === "html" ||
      (qt(n) === "body" && mt(n).position === "static" && !Ms(n)))
    ? t
    : n || Jy(e) || t;
}
function Xy(e, t, n) {
  const r = yt(t),
    i = Qt(t),
    o = Tr(e, !0, n === "fixed", t);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (r || (!r && n !== "fixed"))
    if (((qt(t) !== "body" || qi(i)) && (s = Ki(t)), yt(t))) {
      const l = Tr(t, !0);
      (a.x = l.x + t.clientLeft), (a.y = l.y + t.clientTop);
    } else i && (a.x = ju(i));
  return {
    x: o.left + s.scrollLeft - a.x,
    y: o.top + s.scrollTop - a.y,
    width: o.width,
    height: o.height,
  };
}
const Gy = {
    getClippingRect: Yy,
    convertOffsetParentRelativeRectToViewportRelativeRect: Vy,
    isElement: Kt,
    getDimensions: Qy,
    getOffsetParent: bl,
    getDocumentElement: Qt,
    getScale: An,
    async getElementRects(e) {
      let { reference: t, floating: n, strategy: r } = e;
      const i = this.getOffsetParent || bl,
        o = this.getDimensions;
      return {
        reference: Xy(t, await i(n), r),
        floating: { x: 0, y: 0, ...(await o(n)) },
      };
    },
    getClientRects: (e) => Array.from(e.getClientRects()),
    isRTL: (e) => mt(e).direction === "rtl",
  },
  Zy = (e, t, n) => {
    const r = new Map(),
      i = { platform: Gy, ...n },
      o = { ...i.platform, _c: r };
    return Iy(e, t, { ...i, platform: o });
  },
  dn = {
    disabled: !1,
    distance: 5,
    skidding: 0,
    container: "body",
    boundary: void 0,
    instantMove: !1,
    disposeTimeout: 5e3,
    popperTriggers: [],
    strategy: "absolute",
    preventOverflow: !0,
    flip: !0,
    shift: !0,
    overflowPadding: 0,
    arrowPadding: 0,
    arrowOverflow: !0,
    themes: {
      tooltip: {
        placement: "top",
        triggers: ["hover", "focus", "touch"],
        hideTriggers: (e) => [...e, "click"],
        delay: { show: 200, hide: 0 },
        handleResize: !1,
        html: !1,
        loadingContent: "...",
      },
      dropdown: {
        placement: "bottom",
        triggers: ["click"],
        delay: 0,
        handleResize: !0,
        autoHide: !0,
      },
      menu: {
        $extend: "dropdown",
        triggers: ["hover", "focus"],
        popperTriggers: ["hover", "focus"],
        delay: { show: 0, hide: 400 },
      },
    },
  };
function Mo(e, t) {
  let n = dn.themes[e] || {},
    r;
  do
    (r = n[t]),
      typeof r > "u"
        ? n.$extend
          ? (n = dn.themes[n.$extend] || {})
          : ((n = null), (r = dn[t]))
        : (n = null);
  while (n);
  return r;
}
function eb(e) {
  const t = [e];
  let n = dn.themes[e] || {};
  do
    n.$extend && !n.$resetCss
      ? (t.push(n.$extend), (n = dn.themes[n.$extend] || {}))
      : (n = null);
  while (n);
  return t.map((r) => `v-popper--theme-${r}`);
}
function _l(e) {
  const t = [e];
  let n = dn.themes[e] || {};
  do
    n.$extend
      ? (t.push(n.$extend), (n = dn.themes[n.$extend] || {}))
      : (n = null);
  while (n);
  return t;
}
let Fn = !1;
if (typeof window < "u") {
  Fn = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        Fn = !0;
      },
    });
    window.addEventListener("test", null, e);
  } catch {}
}
let Du = !1;
typeof window < "u" &&
  typeof navigator < "u" &&
  (Du = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const tb = ["auto", "top", "bottom", "left", "right"].reduce(
    (e, t) => e.concat([t, `${t}-start`, `${t}-end`]),
    []
  ),
  wl = {
    hover: "mouseenter",
    focus: "focus",
    click: "click",
    touch: "touchstart",
    pointer: "pointerdown",
  },
  xl = {
    hover: "mouseleave",
    focus: "blur",
    click: "click",
    touch: "touchend",
    pointer: "pointerup",
  };
function kl(e, t) {
  const n = e.indexOf(t);
  n !== -1 && e.splice(n, 1);
}
function so() {
  return new Promise((e) =>
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    })
  );
}
const rt = [];
let Zt = null;
const El = {};
function Cl(e) {
  let t = El[e];
  return t || (t = El[e] = []), t;
}
let Do = function () {};
typeof window < "u" && (Do = window.Element);
function oe(e) {
  return function (t) {
    return Mo(t.theme, e);
  };
}
const ao = "__floating-vue__popper",
  Hu = () =>
    Ae({
      name: "VPopper",
      provide() {
        return { [ao]: { parentPopper: this } };
      },
      inject: { [ao]: { default: null } },
      props: {
        theme: { type: String, required: !0 },
        targetNodes: { type: Function, required: !0 },
        referenceNode: { type: Function, default: null },
        popperNode: { type: Function, required: !0 },
        shown: { type: Boolean, default: !1 },
        showGroup: { type: String, default: null },
        ariaId: { default: null },
        disabled: { type: Boolean, default: oe("disabled") },
        positioningDisabled: {
          type: Boolean,
          default: oe("positioningDisabled"),
        },
        placement: {
          type: String,
          default: oe("placement"),
          validator: (e) => tb.includes(e),
        },
        delay: { type: [String, Number, Object], default: oe("delay") },
        distance: { type: [Number, String], default: oe("distance") },
        skidding: { type: [Number, String], default: oe("skidding") },
        triggers: { type: Array, default: oe("triggers") },
        showTriggers: { type: [Array, Function], default: oe("showTriggers") },
        hideTriggers: { type: [Array, Function], default: oe("hideTriggers") },
        popperTriggers: { type: Array, default: oe("popperTriggers") },
        popperShowTriggers: {
          type: [Array, Function],
          default: oe("popperShowTriggers"),
        },
        popperHideTriggers: {
          type: [Array, Function],
          default: oe("popperHideTriggers"),
        },
        container: {
          type: [String, Object, Do, Boolean],
          default: oe("container"),
        },
        boundary: { type: [String, Do], default: oe("boundary") },
        strategy: {
          type: String,
          validator: (e) => ["absolute", "fixed"].includes(e),
          default: oe("strategy"),
        },
        autoHide: { type: [Boolean, Function], default: oe("autoHide") },
        handleResize: { type: Boolean, default: oe("handleResize") },
        instantMove: { type: Boolean, default: oe("instantMove") },
        eagerMount: { type: Boolean, default: oe("eagerMount") },
        popperClass: {
          type: [String, Array, Object],
          default: oe("popperClass"),
        },
        computeTransformOrigin: {
          type: Boolean,
          default: oe("computeTransformOrigin"),
        },
        autoMinSize: { type: Boolean, default: oe("autoMinSize") },
        autoSize: { type: [Boolean, String], default: oe("autoSize") },
        autoMaxSize: { type: Boolean, default: oe("autoMaxSize") },
        autoBoundaryMaxSize: {
          type: Boolean,
          default: oe("autoBoundaryMaxSize"),
        },
        preventOverflow: { type: Boolean, default: oe("preventOverflow") },
        overflowPadding: {
          type: [Number, String],
          default: oe("overflowPadding"),
        },
        arrowPadding: { type: [Number, String], default: oe("arrowPadding") },
        arrowOverflow: { type: Boolean, default: oe("arrowOverflow") },
        flip: { type: Boolean, default: oe("flip") },
        shift: { type: Boolean, default: oe("shift") },
        shiftCrossAxis: { type: Boolean, default: oe("shiftCrossAxis") },
        noAutoFocus: { type: Boolean, default: oe("noAutoFocus") },
        disposeTimeout: { type: Number, default: oe("disposeTimeout") },
      },
      emits: [
        "show",
        "hide",
        "update:shown",
        "apply-show",
        "apply-hide",
        "close-group",
        "close-directive",
        "auto-hide",
        "resize",
        "dispose",
      ],
      data() {
        return {
          isShown: !1,
          isMounted: !1,
          skipTransition: !1,
          classes: { showFrom: !1, showTo: !1, hideFrom: !1, hideTo: !0 },
          result: {
            x: 0,
            y: 0,
            placement: "",
            strategy: this.strategy,
            arrow: { x: 0, y: 0, centerOffset: 0 },
            transformOrigin: null,
          },
          shownChildren: new Set(),
          lastAutoHide: !0,
        };
      },
      computed: {
        popperId() {
          return this.ariaId != null ? this.ariaId : this.randomId;
        },
        shouldMountContent() {
          return this.eagerMount || this.isMounted;
        },
        slotData() {
          return {
            popperId: this.popperId,
            isShown: this.isShown,
            shouldMountContent: this.shouldMountContent,
            skipTransition: this.skipTransition,
            autoHide:
              typeof this.autoHide == "function"
                ? this.lastAutoHide
                : this.autoHide,
            show: this.show,
            hide: this.hide,
            handleResize: this.handleResize,
            onResize: this.onResize,
            classes: { ...this.classes, popperClass: this.popperClass },
            result: this.positioningDisabled ? null : this.result,
            attrs: this.$attrs,
          };
        },
        parentPopper() {
          var e;
          return (e = this[ao]) == null ? void 0 : e.parentPopper;
        },
        hasPopperShowTriggerHover() {
          var e, t;
          return (
            ((e = this.popperTriggers) == null
              ? void 0
              : e.includes("hover")) ||
            ((t = this.popperShowTriggers) == null
              ? void 0
              : t.includes("hover"))
          );
        },
      },
      watch: {
        shown: "$_autoShowHide",
        disabled(e) {
          e ? this.dispose() : this.init();
        },
        async container() {
          this.isShown &&
            (this.$_ensureTeleport(), await this.$_computePosition());
        },
        ...["triggers", "positioningDisabled"].reduce(
          (e, t) => ((e[t] = "$_refreshListeners"), e),
          {}
        ),
        ...[
          "placement",
          "distance",
          "skidding",
          "boundary",
          "strategy",
          "overflowPadding",
          "arrowPadding",
          "preventOverflow",
          "shift",
          "shiftCrossAxis",
          "flip",
        ].reduce((e, t) => ((e[t] = "$_computePosition"), e), {}),
      },
      created() {
        (this.$_isDisposed = !0),
          (this.randomId = `popper_${[Math.random(), Date.now()]
            .map((e) => e.toString(36).substring(2, 10))
            .join("_")}`),
          this.autoMinSize &&
            console.warn(
              '[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'
            ),
          this.autoMaxSize &&
            console.warn(
              "[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead."
            );
      },
      mounted() {
        this.init(), this.$_detachPopperNode();
      },
      activated() {
        this.$_autoShowHide();
      },
      deactivated() {
        this.hide();
      },
      beforeUnmount() {
        this.dispose();
      },
      methods: {
        show({ event: e = null, skipDelay: t = !1, force: n = !1 } = {}) {
          var r, i;
          ((r = this.parentPopper) != null &&
            r.lockedChild &&
            this.parentPopper.lockedChild !== this) ||
            ((this.$_pendingHide = !1),
            (n || !this.disabled) &&
              (((i = this.parentPopper) == null ? void 0 : i.lockedChild) ===
                this && (this.parentPopper.lockedChild = null),
              this.$_scheduleShow(e, t),
              this.$emit("show"),
              (this.$_showFrameLocked = !0),
              requestAnimationFrame(() => {
                this.$_showFrameLocked = !1;
              })),
            this.$emit("update:shown", !0));
        },
        hide({ event: e = null, skipDelay: t = !1 } = {}) {
          var n;
          if (!this.$_hideInProgress) {
            if (this.shownChildren.size > 0) {
              this.$_pendingHide = !0;
              return;
            }
            if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
              this.parentPopper &&
                ((this.parentPopper.lockedChild = this),
                clearTimeout(this.parentPopper.lockedChildTimer),
                (this.parentPopper.lockedChildTimer = setTimeout(() => {
                  this.parentPopper.lockedChild === this &&
                    (this.parentPopper.lockedChild.hide({ skipDelay: t }),
                    (this.parentPopper.lockedChild = null));
                }, 1e3)));
              return;
            }
            ((n = this.parentPopper) == null ? void 0 : n.lockedChild) ===
              this && (this.parentPopper.lockedChild = null),
              (this.$_pendingHide = !1),
              this.$_scheduleHide(e, t),
              this.$emit("hide"),
              this.$emit("update:shown", !1);
          }
        },
        init() {
          var e, t;
          this.$_isDisposed &&
            ((this.$_isDisposed = !1),
            (this.isMounted = !1),
            (this.$_events = []),
            (this.$_preventShow = !1),
            (this.$_referenceNode =
              (e = (t = this.referenceNode) == null ? void 0 : t.call(this)) !=
              null
                ? e
                : this.$el),
            (this.$_targetNodes = this.targetNodes().filter(
              (n) => n.nodeType === n.ELEMENT_NODE
            )),
            (this.$_popperNode = this.popperNode()),
            (this.$_innerNode =
              this.$_popperNode.querySelector(".v-popper__inner")),
            (this.$_arrowNode = this.$_popperNode.querySelector(
              ".v-popper__arrow-container"
            )),
            this.$_swapTargetAttrs("title", "data-original-title"),
            this.$_detachPopperNode(),
            this.triggers.length && this.$_addEventListeners(),
            this.shown && this.show());
        },
        dispose() {
          this.$_isDisposed ||
            ((this.$_isDisposed = !0),
            this.$_removeEventListeners(),
            this.hide({ skipDelay: !0 }),
            this.$_detachPopperNode(),
            (this.isMounted = !1),
            (this.isShown = !1),
            this.$_updateParentShownChildren(!1),
            this.$_swapTargetAttrs("data-original-title", "title"),
            this.$emit("dispose"));
        },
        async onResize() {
          this.isShown &&
            (await this.$_computePosition(), this.$emit("resize"));
        },
        async $_computePosition() {
          var e;
          if (this.$_isDisposed || this.positioningDisabled) return;
          const t = { strategy: this.strategy, middleware: [] };
          (this.distance || this.skidding) &&
            t.middleware.push(
              By({ mainAxis: this.distance, crossAxis: this.skidding })
            );
          const n = this.placement.startsWith("auto");
          if (
            (n
              ? t.middleware.push(
                  My({
                    alignment:
                      (e = this.placement.split("-")[1]) != null ? e : "",
                  })
                )
              : (t.placement = this.placement),
            this.preventOverflow &&
              (this.shift &&
                t.middleware.push(
                  Ny({
                    padding: this.overflowPadding,
                    boundary: this.boundary,
                    crossAxis: this.shiftCrossAxis,
                  })
                ),
              !n &&
                this.flip &&
                t.middleware.push(
                  Dy({ padding: this.overflowPadding, boundary: this.boundary })
                )),
            t.middleware.push(
              Ry({ element: this.$_arrowNode, padding: this.arrowPadding })
            ),
            this.arrowOverflow &&
              t.middleware.push({
                name: "arrowOverflow",
                fn: ({ placement: i, rects: o, middlewareData: s }) => {
                  let a;
                  const { centerOffset: l } = s.arrow;
                  return (
                    i.startsWith("top") || i.startsWith("bottom")
                      ? (a = Math.abs(l) > o.reference.width / 2)
                      : (a = Math.abs(l) > o.reference.height / 2),
                    { data: { overflow: a } }
                  );
                },
              }),
            this.autoMinSize || this.autoSize)
          ) {
            const i = this.autoSize
              ? this.autoSize
              : this.autoMinSize
              ? "min"
              : null;
            t.middleware.push({
              name: "autoSize",
              fn: ({ rects: o, placement: s, middlewareData: a }) => {
                var l;
                if ((l = a.autoSize) != null && l.skip) return {};
                let c, u;
                return (
                  s.startsWith("top") || s.startsWith("bottom")
                    ? (c = o.reference.width)
                    : (u = o.reference.height),
                  (this.$_innerNode.style[
                    i === "min"
                      ? "minWidth"
                      : i === "max"
                      ? "maxWidth"
                      : "width"
                  ] = c != null ? `${c}px` : null),
                  (this.$_innerNode.style[
                    i === "min"
                      ? "minHeight"
                      : i === "max"
                      ? "maxHeight"
                      : "height"
                  ] = u != null ? `${u}px` : null),
                  { data: { skip: !0 }, reset: { rects: !0 } }
                );
              },
            });
          }
          (this.autoMaxSize || this.autoBoundaryMaxSize) &&
            ((this.$_innerNode.style.maxWidth = null),
            (this.$_innerNode.style.maxHeight = null),
            t.middleware.push(
              Fy({
                boundary: this.boundary,
                padding: this.overflowPadding,
                apply: ({ availableWidth: i, availableHeight: o }) => {
                  (this.$_innerNode.style.maxWidth =
                    i != null ? `${i}px` : null),
                    (this.$_innerNode.style.maxHeight =
                      o != null ? `${o}px` : null);
                },
              })
            ));
          const r = await Zy(this.$_referenceNode, this.$_popperNode, t);
          Object.assign(this.result, {
            x: r.x,
            y: r.y,
            placement: r.placement,
            strategy: r.strategy,
            arrow: {
              ...r.middlewareData.arrow,
              ...r.middlewareData.arrowOverflow,
            },
          });
        },
        $_scheduleShow(e = null, t = !1) {
          if (
            (this.$_updateParentShownChildren(!0),
            (this.$_hideInProgress = !1),
            clearTimeout(this.$_scheduleTimer),
            Zt &&
              this.instantMove &&
              Zt.instantMove &&
              Zt !== this.parentPopper)
          ) {
            Zt.$_applyHide(!0), this.$_applyShow(!0);
            return;
          }
          t
            ? this.$_applyShow()
            : (this.$_scheduleTimer = setTimeout(
                this.$_applyShow.bind(this),
                this.$_computeDelay("show")
              ));
        },
        $_scheduleHide(e = null, t = !1) {
          if (this.shownChildren.size > 0) {
            this.$_pendingHide = !0;
            return;
          }
          this.$_updateParentShownChildren(!1),
            (this.$_hideInProgress = !0),
            clearTimeout(this.$_scheduleTimer),
            this.isShown && (Zt = this),
            t
              ? this.$_applyHide()
              : (this.$_scheduleTimer = setTimeout(
                  this.$_applyHide.bind(this),
                  this.$_computeDelay("hide")
                ));
        },
        $_computeDelay(e) {
          const t = this.delay;
          return parseInt((t && t[e]) || t || 0);
        },
        async $_applyShow(e = !1) {
          clearTimeout(this.$_disposeTimer),
            clearTimeout(this.$_scheduleTimer),
            (this.skipTransition = e),
            !this.isShown &&
              (this.$_ensureTeleport(),
              await so(),
              await this.$_computePosition(),
              await this.$_applyShowEffect(),
              this.positioningDisabled ||
                this.$_registerEventListeners(
                  [...Ei(this.$_referenceNode), ...Ei(this.$_popperNode)],
                  "scroll",
                  () => {
                    this.$_computePosition();
                  }
                ));
        },
        async $_applyShowEffect() {
          if (this.$_hideInProgress) return;
          if (this.computeTransformOrigin) {
            const t = this.$_referenceNode.getBoundingClientRect(),
              n = this.$_popperNode.querySelector(".v-popper__wrapper"),
              r = n.parentNode.getBoundingClientRect(),
              i = t.x + t.width / 2 - (r.left + n.offsetLeft),
              o = t.y + t.height / 2 - (r.top + n.offsetTop);
            this.result.transformOrigin = `${i}px ${o}px`;
          }
          (this.isShown = !0),
            this.$_applyAttrsToTarget({
              "aria-describedby": this.popperId,
              "data-popper-shown": "",
            });
          const e = this.showGroup;
          if (e) {
            let t;
            for (let n = 0; n < rt.length; n++)
              (t = rt[n]),
                t.showGroup !== e && (t.hide(), t.$emit("close-group"));
          }
          rt.push(this), document.body.classList.add("v-popper--some-open");
          for (const t of _l(this.theme))
            Cl(t).push(this),
              document.body.classList.add(`v-popper--some-open--${t}`);
          this.$emit("apply-show"),
            (this.classes.showFrom = !0),
            (this.classes.showTo = !1),
            (this.classes.hideFrom = !1),
            (this.classes.hideTo = !1),
            await so(),
            (this.classes.showFrom = !1),
            (this.classes.showTo = !0),
            this.noAutoFocus || this.$_popperNode.focus();
        },
        async $_applyHide(e = !1) {
          if (this.shownChildren.size > 0) {
            (this.$_pendingHide = !0), (this.$_hideInProgress = !1);
            return;
          }
          if ((clearTimeout(this.$_scheduleTimer), !this.isShown)) return;
          (this.skipTransition = e),
            kl(rt, this),
            rt.length === 0 &&
              document.body.classList.remove("v-popper--some-open");
          for (const n of _l(this.theme)) {
            const r = Cl(n);
            kl(r, this),
              r.length === 0 &&
                document.body.classList.remove(`v-popper--some-open--${n}`);
          }
          Zt === this && (Zt = null),
            (this.isShown = !1),
            this.$_applyAttrsToTarget({
              "aria-describedby": void 0,
              "data-popper-shown": void 0,
            }),
            clearTimeout(this.$_disposeTimer);
          const t = this.disposeTimeout;
          t !== null &&
            (this.$_disposeTimer = setTimeout(() => {
              this.$_popperNode &&
                (this.$_detachPopperNode(), (this.isMounted = !1));
            }, t)),
            this.$_removeEventListeners("scroll"),
            this.$emit("apply-hide"),
            (this.classes.showFrom = !1),
            (this.classes.showTo = !1),
            (this.classes.hideFrom = !0),
            (this.classes.hideTo = !1),
            await so(),
            (this.classes.hideFrom = !1),
            (this.classes.hideTo = !0);
        },
        $_autoShowHide() {
          this.shown ? this.show() : this.hide();
        },
        $_ensureTeleport() {
          if (this.$_isDisposed) return;
          let e = this.container;
          if (
            (typeof e == "string"
              ? (e = window.document.querySelector(e))
              : e === !1 && (e = this.$_targetNodes[0].parentNode),
            !e)
          )
            throw new Error("No container for popover: " + this.container);
          e.appendChild(this.$_popperNode), (this.isMounted = !0);
        },
        $_addEventListeners() {
          const e = (n) => {
            (this.isShown && !this.$_hideInProgress) ||
              ((n.usedByTooltip = !0),
              !this.$_preventShow && this.show({ event: n }));
          };
          this.$_registerTriggerListeners(
            this.$_targetNodes,
            wl,
            this.triggers,
            this.showTriggers,
            e
          ),
            this.$_registerTriggerListeners(
              [this.$_popperNode],
              wl,
              this.popperTriggers,
              this.popperShowTriggers,
              e
            );
          const t = (n) => {
            n.usedByTooltip || this.hide({ event: n });
          };
          this.$_registerTriggerListeners(
            this.$_targetNodes,
            xl,
            this.triggers,
            this.hideTriggers,
            t
          ),
            this.$_registerTriggerListeners(
              [this.$_popperNode],
              xl,
              this.popperTriggers,
              this.popperHideTriggers,
              t
            );
        },
        $_registerEventListeners(e, t, n) {
          this.$_events.push({ targetNodes: e, eventType: t, handler: n }),
            e.forEach((r) =>
              r.addEventListener(t, n, Fn ? { passive: !0 } : void 0)
            );
        },
        $_registerTriggerListeners(e, t, n, r, i) {
          let o = n;
          r != null && (o = typeof r == "function" ? r(o) : r),
            o.forEach((s) => {
              const a = t[s];
              a && this.$_registerEventListeners(e, a, i);
            });
        },
        $_removeEventListeners(e) {
          const t = [];
          this.$_events.forEach((n) => {
            const { targetNodes: r, eventType: i, handler: o } = n;
            !e || e === i
              ? r.forEach((s) => s.removeEventListener(i, o))
              : t.push(n);
          }),
            (this.$_events = t);
        },
        $_refreshListeners() {
          this.$_isDisposed ||
            (this.$_removeEventListeners(), this.$_addEventListeners());
        },
        $_handleGlobalClose(e, t = !1) {
          this.$_showFrameLocked ||
            (this.hide({ event: e }),
            e.closePopover
              ? this.$emit("close-directive")
              : this.$emit("auto-hide"),
            t &&
              ((this.$_preventShow = !0),
              setTimeout(() => {
                this.$_preventShow = !1;
              }, 300)));
        },
        $_detachPopperNode() {
          this.$_popperNode.parentNode &&
            this.$_popperNode.parentNode.removeChild(this.$_popperNode);
        },
        $_swapTargetAttrs(e, t) {
          for (const n of this.$_targetNodes) {
            const r = n.getAttribute(e);
            r && (n.removeAttribute(e), n.setAttribute(t, r));
          }
        },
        $_applyAttrsToTarget(e) {
          for (const t of this.$_targetNodes)
            for (const n in e) {
              const r = e[n];
              r == null ? t.removeAttribute(n) : t.setAttribute(n, r);
            }
        },
        $_updateParentShownChildren(e) {
          let t = this.parentPopper;
          for (; t; )
            e
              ? t.shownChildren.add(this.randomId)
              : (t.shownChildren.delete(this.randomId),
                t.$_pendingHide && t.hide()),
              (t = t.parentPopper);
        },
        $_isAimingPopper() {
          const e = this.$_referenceNode.getBoundingClientRect();
          if (dr >= e.left && dr <= e.right && hr >= e.top && hr <= e.bottom) {
            const t = this.$_popperNode.getBoundingClientRect(),
              n = dr - Pt,
              r = hr - $t,
              i =
                t.left +
                t.width / 2 -
                Pt +
                (t.top + t.height / 2) -
                $t +
                t.width +
                t.height,
              o = Pt + n * i,
              s = $t + r * i;
            return (
              Kr(Pt, $t, o, s, t.left, t.top, t.left, t.bottom) ||
              Kr(Pt, $t, o, s, t.left, t.top, t.right, t.top) ||
              Kr(Pt, $t, o, s, t.right, t.top, t.right, t.bottom) ||
              Kr(Pt, $t, o, s, t.left, t.bottom, t.right, t.bottom)
            );
          }
          return !1;
        },
      },
      render() {
        return this.$slots.default(this.slotData);
      },
    });
typeof document < "u" &&
  typeof window < "u" &&
  (Du
    ? (document.addEventListener(
        "touchstart",
        Tl,
        Fn ? { passive: !0, capture: !0 } : !0
      ),
      document.addEventListener(
        "touchend",
        rb,
        Fn ? { passive: !0, capture: !0 } : !0
      ))
    : (window.addEventListener("mousedown", Tl, !0),
      window.addEventListener("click", nb, !0)),
  window.addEventListener("resize", sb));
function Tl(e) {
  for (let t = 0; t < rt.length; t++) {
    const n = rt[t];
    try {
      const r = n.popperNode();
      n.$_mouseDownContains = r.contains(e.target);
    } catch {}
  }
}
function nb(e) {
  Bu(e);
}
function rb(e) {
  Bu(e, !0);
}
function Bu(e, t = !1) {
  const n = {};
  for (let r = rt.length - 1; r >= 0; r--) {
    const i = rt[r];
    try {
      const o = (i.$_containsGlobalTarget = ib(i, e));
      (i.$_pendingHide = !1),
        requestAnimationFrame(() => {
          if (((i.$_pendingHide = !1), !n[i.randomId] && Ol(i, o, e))) {
            if (
              (i.$_handleGlobalClose(e, t),
              !e.closeAllPopover && e.closePopover && o)
            ) {
              let a = i.parentPopper;
              for (; a; ) (n[a.randomId] = !0), (a = a.parentPopper);
              return;
            }
            let s = i.parentPopper;
            for (; s && Ol(s, s.$_containsGlobalTarget, e); )
              s.$_handleGlobalClose(e, t), (s = s.parentPopper);
          }
        });
    } catch {}
  }
}
function ib(e, t) {
  const n = e.popperNode();
  return e.$_mouseDownContains || n.contains(t.target);
}
function Ol(e, t, n) {
  return n.closeAllPopover || (n.closePopover && t) || (ob(e, n) && !t);
}
function ob(e, t) {
  if (typeof e.autoHide == "function") {
    const n = e.autoHide(t);
    return (e.lastAutoHide = n), n;
  }
  return e.autoHide;
}
function sb(e) {
  for (let t = 0; t < rt.length; t++) rt[t].$_computePosition(e);
}
let Pt = 0,
  $t = 0,
  dr = 0,
  hr = 0;
typeof window < "u" &&
  window.addEventListener(
    "mousemove",
    (e) => {
      (Pt = dr), ($t = hr), (dr = e.clientX), (hr = e.clientY);
    },
    Fn ? { passive: !0 } : void 0
  );
function Kr(e, t, n, r, i, o, s, a) {
  const l =
      ((s - i) * (t - o) - (a - o) * (e - i)) /
      ((a - o) * (n - e) - (s - i) * (r - t)),
    c =
      ((n - e) * (t - o) - (r - t) * (e - i)) /
      ((a - o) * (n - e) - (s - i) * (r - t));
  return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
const ab = { extends: Hu() },
  Hs = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, i] of t) n[r] = i;
    return n;
  };
function lb(e, t, n, r, i, o) {
  return (
    H(),
    K(
      "div",
      {
        ref: "reference",
        class: Pe(["v-popper", { "v-popper--shown": e.slotData.isShown }]),
      },
      [Ke(e.$slots, "default", Il(ns(e.slotData)))],
      2
    )
  );
}
const cb = Hs(ab, [["render", lb]]);
function ub() {
  var e = window.navigator.userAgent,
    t = e.indexOf("MSIE ");
  if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var n = e.indexOf("Trident/");
  if (n > 0) {
    var r = e.indexOf("rv:");
    return parseInt(e.substring(r + 3, e.indexOf(".", r)), 10);
  }
  var i = e.indexOf("Edge/");
  return i > 0 ? parseInt(e.substring(i + 5, e.indexOf(".", i)), 10) : -1;
}
let Zr;
function Ho() {
  Ho.init || ((Ho.init = !0), (Zr = ub() !== -1));
}
var Yi = {
  name: "ResizeObserver",
  props: {
    emitOnMount: { type: Boolean, default: !1 },
    ignoreWidth: { type: Boolean, default: !1 },
    ignoreHeight: { type: Boolean, default: !1 },
  },
  emits: ["notify"],
  mounted() {
    Ho(),
      $i(() => {
        (this._w = this.$el.offsetWidth),
          (this._h = this.$el.offsetHeight),
          this.emitOnMount && this.emitSize();
      });
    const e = document.createElement("object");
    (this._resizeObject = e),
      e.setAttribute("aria-hidden", "true"),
      e.setAttribute("tabindex", -1),
      (e.onload = this.addResizeHandlers),
      (e.type = "text/html"),
      Zr && this.$el.appendChild(e),
      (e.data = "about:blank"),
      Zr || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) ||
        (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) &&
        ((this._w = this.$el.offsetWidth),
        (this._h = this.$el.offsetHeight),
        this.emitSize());
    },
    emitSize() {
      this.$emit("notify", { width: this._w, height: this._h });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener(
        "resize",
        this.compareAndNotify
      ),
        this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject &&
        this._resizeObject.onload &&
        (!Zr &&
          this._resizeObject.contentDocument &&
          this._resizeObject.contentDocument.defaultView.removeEventListener(
            "resize",
            this.compareAndNotify
          ),
        this.$el.removeChild(this._resizeObject),
        (this._resizeObject.onload = null),
        (this._resizeObject = null));
    },
  },
};
const fb = Kf();
Wf("data-v-b329ee4c");
const db = { class: "resize-observer", tabindex: "-1" };
qf();
const hb = fb((e, t, n, r, i, o) => (H(), He("div", db)));
Yi.render = hb;
Yi.__scopeId = "data-v-b329ee4c";
Yi.__file = "src/components/ResizeObserver.vue";
const Nu = (e = "theme") => ({
    computed: {
      themeClass() {
        return eb(this[e]);
      },
    },
  }),
  pb = Ae({
    name: "VPopperContent",
    components: { ResizeObserver: Yi },
    mixins: [Nu()],
    props: {
      popperId: String,
      theme: String,
      shown: Boolean,
      mounted: Boolean,
      skipTransition: Boolean,
      autoHide: Boolean,
      handleResize: Boolean,
      classes: Object,
      result: Object,
    },
    emits: ["hide", "resize"],
    methods: {
      toPx(e) {
        return e != null && !isNaN(e) ? `${e}px` : null;
      },
    },
  }),
  gb = ["id", "aria-hidden", "tabindex", "data-popper-placement"],
  vb = { ref: "inner", class: "v-popper__inner" },
  mb = A("div", { class: "v-popper__arrow-outer" }, null, -1),
  yb = A("div", { class: "v-popper__arrow-inner" }, null, -1),
  bb = [mb, yb];
function _b(e, t, n, r, i, o) {
  const s = De("ResizeObserver");
  return (
    H(),
    K(
      "div",
      {
        id: e.popperId,
        ref: "popover",
        class: Pe([
          "v-popper__popper",
          [
            e.themeClass,
            e.classes.popperClass,
            {
              "v-popper__popper--shown": e.shown,
              "v-popper__popper--hidden": !e.shown,
              "v-popper__popper--show-from": e.classes.showFrom,
              "v-popper__popper--show-to": e.classes.showTo,
              "v-popper__popper--hide-from": e.classes.hideFrom,
              "v-popper__popper--hide-to": e.classes.hideTo,
              "v-popper__popper--skip-transition": e.skipTransition,
              "v-popper__popper--arrow-overflow":
                e.result && e.result.arrow.overflow,
              "v-popper__popper--no-positioning": !e.result,
            },
          ],
        ]),
        style: ln(
          e.result
            ? {
                position: e.result.strategy,
                transform: `translate3d(${Math.round(
                  e.result.x
                )}px,${Math.round(e.result.y)}px,0)`,
              }
            : void 0
        ),
        "aria-hidden": e.shown ? "false" : "true",
        tabindex: e.autoHide ? 0 : void 0,
        "data-popper-placement": e.result ? e.result.placement : void 0,
        onKeyup:
          t[2] || (t[2] = Lc((a) => e.autoHide && e.$emit("hide"), ["esc"])),
      },
      [
        A("div", {
          class: "v-popper__backdrop",
          onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide")),
        }),
        A(
          "div",
          {
            class: "v-popper__wrapper",
            style: ln(
              e.result ? { transformOrigin: e.result.transformOrigin } : void 0
            ),
          },
          [
            A(
              "div",
              vb,
              [
                e.mounted
                  ? (H(),
                    K(
                      me,
                      { key: 0 },
                      [
                        A("div", null, [Ke(e.$slots, "default")]),
                        e.handleResize
                          ? (H(),
                            He(s, {
                              key: 0,
                              onNotify:
                                t[1] || (t[1] = (a) => e.$emit("resize", a)),
                            }))
                          : be("", !0),
                      ],
                      64
                    ))
                  : be("", !0),
              ],
              512
            ),
            A(
              "div",
              {
                ref: "arrow",
                class: "v-popper__arrow-container",
                style: ln(
                  e.result
                    ? {
                        left: e.toPx(e.result.arrow.x),
                        top: e.toPx(e.result.arrow.y),
                      }
                    : void 0
                ),
              },
              bb,
              4
            ),
          ],
          4
        ),
      ],
      46,
      gb
    )
  );
}
const Fu = Hs(pb, [["render", _b]]),
  zu = {
    methods: {
      show(...e) {
        return this.$refs.popper.show(...e);
      },
      hide(...e) {
        return this.$refs.popper.hide(...e);
      },
      dispose(...e) {
        return this.$refs.popper.dispose(...e);
      },
      onResize(...e) {
        return this.$refs.popper.onResize(...e);
      },
    },
  },
  wb = Ae({
    name: "VPopperWrapper",
    components: { Popper: cb, PopperContent: Fu },
    mixins: [zu, Nu("finalTheme")],
    props: { theme: { type: String, default: null } },
    computed: {
      finalTheme() {
        var e;
        return (e = this.theme) != null ? e : this.$options.vPopperTheme;
      },
    },
    methods: {
      getTargetNodes() {
        return Array.from(this.$el.children).filter(
          (e) => e !== this.$refs.popperContent.$el
        );
      },
    },
  });
function xb(e, t, n, r, i, o) {
  const s = De("PopperContent"),
    a = De("Popper");
  return (
    H(),
    He(
      a,
      {
        ref: "popper",
        theme: e.finalTheme,
        "target-nodes": e.getTargetNodes,
        "popper-node": () => e.$refs.popperContent.$el,
        class: Pe([e.themeClass]),
      },
      {
        default: ke(
          ({
            popperId: l,
            isShown: c,
            shouldMountContent: u,
            skipTransition: f,
            autoHide: h,
            show: g,
            hide: m,
            handleResize: b,
            onResize: y,
            classes: _,
            result: k,
          }) => [
            Ke(e.$slots, "default", { shown: c, show: g, hide: m }),
            X(
              s,
              {
                ref: "popperContent",
                "popper-id": l,
                theme: e.finalTheme,
                shown: c,
                mounted: u,
                "skip-transition": f,
                "auto-hide": h,
                "handle-resize": b,
                classes: _,
                result: k,
                onHide: m,
                onResize: y,
              },
              {
                default: ke(() => [
                  Ke(e.$slots, "popper", { shown: c, hide: m }),
                ]),
                _: 2,
              },
              1032,
              [
                "popper-id",
                "theme",
                "shown",
                "mounted",
                "skip-transition",
                "auto-hide",
                "handle-resize",
                "classes",
                "result",
                "onHide",
                "onResize",
              ]
            ),
          ]
        ),
        _: 3,
      },
      8,
      ["theme", "target-nodes", "popper-node", "class"]
    )
  );
}
const Bs = Hs(wb, [["render", xb]]);
({ ...Bs });
({ ...Bs });
({ ...Bs });
Ae({
  name: "VTooltipDirective",
  components: { Popper: Hu(), PopperContent: Fu },
  mixins: [zu],
  inheritAttrs: !1,
  props: {
    theme: { type: String, default: "tooltip" },
    html: { type: Boolean, default: (e) => Mo(e.theme, "html") },
    content: { type: [String, Number, Function], default: null },
    loadingContent: {
      type: String,
      default: (e) => Mo(e.theme, "loadingContent"),
    },
    targetNodes: { type: Function, required: !0 },
  },
  data() {
    return { asyncContent: null };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync
        ? this.loading
          ? this.loadingContent
          : this.asyncContent
        : this.content;
    },
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0,
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    },
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (
        typeof this.content == "function" &&
        this.$_isShown &&
        (e || (!this.$_loading && this.asyncContent == null))
      ) {
        (this.asyncContent = null), (this.$_loading = !0);
        const t = ++this.$_fetchId,
          n = this.content(this);
        n.then ? n.then((r) => this.onResult(t, r)) : this.onResult(t, n);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && ((this.$_loading = !1), (this.asyncContent = t));
    },
    onShow() {
      (this.$_isShown = !0), this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    },
  },
});
const kb = { props: ["button"] },
  Eb = {
    class:
      "bg-gray-200 hover:bg-gray-300 focus:ring-blue-300 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2",
    type: "button",
  };
function Cb(e, t, n, r, i, o) {
  return H(), K("button", Eb, Ie(n.button.text), 1);
}
const Sn = Ot(kb, [["render", Cb]]),
  Tb = A("h1", null, "You did it!", -1),
  Ob = A("div", { class: "flex items-center text-lg" }, "Terms of Service", -1),
  Ab = A(
    "p",
    { class: "text-base leading-relaxed" },
    " With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply. ",
    -1
  ),
  Sb = A(
    "p",
    { class: "text-base leading-relaxed" },
    " The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them. ",
    -1
  ),
  Lb = { class: "flex justify-between" },
  Pb = Ae({
    __name: "HomeView",
    setup(e) {
      const t = bt(!1);
      function n() {
        t.value = !1;
      }
      function r() {
        t.value = !0;
      }
      return (i, o) => (
        H(),
        K(
          me,
          null,
          [
            Tb,
            A("main", null, [
              X(Sn, { button: { text: "Click me" }, onClick: r }),
              t.value
                ? (H(),
                  He(
                    ae(cy),
                    { key: 0, onClose: n },
                    {
                      header: ke(() => [Ob]),
                      body: ke(() => [Ab, Sb]),
                      footer: ke(() => [
                        A("div", Lb, [
                          X(Sn, {
                            button: { text: "Decline" },
                            class: "hover:bg-red-400 dark:hover:bg-red-500",
                            onClick: n,
                          }),
                          X(Sn, {
                            button: { text: "I accept" },
                            class: "hover:bg-green-400 dark:hover:bg-green-500",
                            onClick: n,
                          }),
                        ]),
                      ]),
                      _: 1,
                    }
                  ))
                : be("", !0),
            ]),
          ],
          64
        )
      );
    },
  }),
  $b = Ae({
    components: { ButtonDefaultStyle: Sn },
    data() {
      return { error_message: "", username: "", password: "" };
    },
    setup() {
      return { userAuthStore: Nt() };
    },
    methods: {
      sendLogin() {
        this.userAuthStore.login(this.username, this.password).then((t) => {
          (t == null ? void 0 : t.status) === 200
            ? this.$router.push({ name: "tasks" })
            : (this.error_message = t == null ? void 0 : t.message);
        });
      },
    },
  }),
  Ib = { class: "p-6 space-y-4" },
  Rb = A(
    "h1",
    {
      class:
        "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
    },
    " Sign in to your account ",
    -1
  ),
  jb = A(
    "label",
    {
      class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      for: "username",
    },
    "Your username",
    -1
  ),
  Mb = A(
    "label",
    {
      class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      for: "password",
    },
    "Password",
    -1
  ),
  Db = { if: "error_message" },
  Hb = { class: "text-sm font-medium text-red-500 dark:text-red-400" },
  Bb = A(
    "p",
    { class: "text-sm font-light text-gray-500 dark:text-gray-400" },
    [
      A(
        "a",
        {
          class:
            "text-sm font-medium text-primary-600 hover:underline dark:text-primary-500",
          href: "#",
        },
        "Forgot password?"
      ),
    ],
    -1
  ),
  Nb = A(
    "p",
    { class: "text-sm font-light text-gray-500 dark:text-gray-400" },
    [
      xt(" Don’t have an account yet? "),
      A(
        "a",
        {
          class:
            "font-medium text-primary-600 hover:underline dark:text-primary-500",
          href: "#",
        },
        "Sign up!"
      ),
    ],
    -1
  );
function Fb(e, t, n, r, i, o) {
  const s = De("ButtonDefaultStyle");
  return (
    H(),
    K("div", Ib, [
      Rb,
      A(
        "form",
        {
          class: "space-y-4 md:space-y-6",
          onSubmit:
            t[2] ||
            (t[2] = os(
              (...a) => e.sendLogin && e.sendLogin(...a),
              ["prevent"]
            )),
        },
        [
          A("div", null, [
            jb,
            ii(
              A(
                "input",
                {
                  id: "username",
                  "onUpdate:modelValue":
                    t[0] || (t[0] = (a) => (e.username = a)),
                  class:
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  name: "username",
                  placeholder: "Username",
                  required: "",
                  type: "username",
                },
                null,
                512
              ),
              [[ko, e.username]]
            ),
          ]),
          A("div", null, [
            Mb,
            ii(
              A(
                "input",
                {
                  id: "password",
                  "onUpdate:modelValue":
                    t[1] || (t[1] = (a) => (e.password = a)),
                  class:
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  name: "password",
                  placeholder: "••••••••",
                  type: "password",
                },
                null,
                512
              ),
              [[ko, e.password]]
            ),
          ]),
          A("div", Db, [A("p", Hb, Ie(e.error_message), 1)]),
          A("div", null, [
            X(s, {
              button: { text: "Login" },
              class: "w-full",
              type: "submit",
            }),
          ]),
          Bb,
          Nb,
        ],
        32
      ),
    ])
  );
}
const zb = Ot($b, [["render", Fb]]),
  Vb = {
    props: ["task"],
    setup() {
      return { taskStore: Lr() };
    },
  },
  Ub = { class: "font-bold text-xl md:text-2xl lg:text-3xl" };
function Wb(e, t, n, r, i, o) {
  return (
    H(),
    K("div", Ub, [
      xt(Ie(n.task.title) + " ", 1),
      A(
        "a",
        {
          href: "#",
          onClick: t[0] || (t[0] = (s) => r.taskStore.deleteTask(n.task.id)),
        },
        "🗑️"
      ),
      n.task.isFav
        ? (H(),
          K(
            "a",
            {
              key: 0,
              href: "#",
              onClick: t[1] || (t[1] = (s) => r.taskStore.toggleFav(n.task.id)),
            },
            "❤️"
          ))
        : be("", !0),
      n.task.isFav
        ? be("", !0)
        : (H(),
          K(
            "a",
            {
              key: 1,
              href: "#",
              onClick: t[2] || (t[2] = (s) => r.taskStore.toggleFav(n.task.id)),
            },
            "🖤"
          )),
    ])
  );
}
const qb = Ot(Vb, [["render", Wb]]),
  Kb = {
    setup() {
      const e = Lr(),
        t = bt("");
      return {
        newTask: t,
        handleSubmit: () => {
          t.value.length > 0 &&
            (e.addTask({
              title: t.value,
              isFav: !1,
              id: Math.floor(Math.random() * 1e6),
            }),
            (t.value = ""));
        },
      };
    },
    components: { ButtonDefaultStyle: Sn },
  };
function Yb(e, t, n, r, i, o) {
  const s = De("ButtonDefaultStyle");
  return (
    H(),
    K(
      "form",
      {
        onSubmit:
          t[1] ||
          (t[1] = os(
            (...a) => r.handleSubmit && r.handleSubmit(...a),
            ["prevent"]
          )),
      },
      [
        ii(
          A(
            "input",
            {
              "onUpdate:modelValue": t[0] || (t[0] = (a) => (r.newTask = a)),
              placeholder: "I need to...",
              type: "text",
            },
            null,
            512
          ),
          [[ko, r.newTask]]
        ),
        X(s, { button: { text: "Add" }, type: "" }),
      ],
      32
    )
  );
}
const Qb = Ot(Kb, [["render", Yb]]),
  Jb = Ae({
    components: {
      TaskDetails: qb,
      TaskForm: Qb,
      Tabs: Vv,
      Tab: Kv,
      Spinner: pu,
    },
    setup() {
      const e = bt("all"),
        t = Lr();
      return t.getTasks(), { taskStore: t, filter: e, activeTab: e };
    },
  }),
  Xb = { class: "text-2xl md:text-3xl lg:text-4xl" },
  Gb = { class: "new-task-form" },
  Zb = { key: 1 },
  e_ = { key: 1 };
function t_(e, t, n, r, i, o) {
  const s = De("TaskForm"),
    a = De("spinner"),
    l = De("TaskDetails"),
    c = De("tab"),
    u = De("tabs");
  return (
    H(),
    K("main", null, [
      A("h1", Xb, Ie(e.taskStore.name), 1),
      A("div", Gb, [X(s)]),
      X(
        u,
        {
          modelValue: e.activeTab,
          "onUpdate:modelValue": t[2] || (t[2] = (f) => (e.activeTab = f)),
          class: "p-5",
        },
        {
          default: ke(() => [
            X(
              c,
              {
                name: "all",
                title: "All tasks",
                onClick: t[0] || (t[0] = (f) => (e.filter = "all")),
              },
              {
                default: ke(() => [
                  e.taskStore.isLoading
                    ? (H(),
                      He(a, {
                        key: 0,
                        class: "m-5",
                        color: "yellow",
                        size: "10",
                      }))
                    : be("", !0),
                  e.filter === "all"
                    ? (H(),
                      K("div", Zb, [
                        A(
                          "p",
                          null,
                          "All tasks: (You have " +
                            Ie(e.taskStore.totalCount) +
                            " Tasks)",
                          1
                        ),
                        (H(!0),
                        K(
                          me,
                          null,
                          oi(
                            e.taskStore.tasks,
                            (f) => (
                              H(),
                              K("div", { key: f.id }, [
                                X(l, { task: f }, null, 8, ["task"]),
                              ])
                            )
                          ),
                          128
                        )),
                      ]))
                    : be("", !0),
                ]),
                _: 1,
              }
            ),
            X(
              c,
              {
                name: "favs",
                title: "Favorites",
                onClick: t[1] || (t[1] = (f) => (e.filter = "favs")),
              },
              {
                default: ke(() => [
                  e.taskStore.isLoading
                    ? (H(),
                      He(a, {
                        key: 0,
                        class: "m-5",
                        color: "yellow",
                        size: "10",
                      }))
                    : be("", !0),
                  e.filter === "favs"
                    ? (H(),
                      K("div", e_, [
                        A(
                          "p",
                          null,
                          "Favorite tasks: (You have " +
                            Ie(e.taskStore.favCount) +
                            " Favorites )",
                          1
                        ),
                        (H(!0),
                        K(
                          me,
                          null,
                          oi(
                            e.taskStore.favs,
                            (f) => (
                              H(),
                              K("div", { key: f.id }, [
                                X(l, { task: f }, null, 8, ["task"]),
                              ])
                            )
                          ),
                          128
                        )),
                      ]))
                    : be("", !0),
                ]),
                _: 1,
              }
            ),
          ]),
          _: 1,
        },
        8,
        ["modelValue"]
      ),
    ])
  );
}
const n_ = Ot(Jb, [["render", t_]]),
  r_ = Ae({
    components: { Pagination: Cy, Spinner: pu },
    setup() {
      return { currentPage: bt(1) };
    },
  }),
  i_ = A("div", null, "inbox view", -1);
function o_(e, t, n, r, i, o) {
  const s = De("spinner"),
    a = De("Pagination");
  return (
    H(),
    K(
      me,
      null,
      [
        i_,
        X(s, { class: "m-5", color: "yellow", size: "10" }),
        X(
          a,
          {
            class: Pe(["w-fit"]),
            modelValue: e.currentPage,
            "onUpdate:modelValue": t[0] || (t[0] = (l) => (e.currentPage = l)),
            "total-pages": 30,
          },
          null,
          8,
          ["modelValue"]
        ),
      ],
      64
    )
  );
}
const s_ = Ot(r_, [["render", o_]]),
  a_ = Ae({
    components: { ButtonDefaultStyle: Sn },
    methods: {
      logoutClick() {
        this.userAuthStore.logout(), this.$router.push({ name: "login" });
      },
    },
    setup() {
      return { userAuthStore: Nt() };
    },
  }),
  l_ = A("h1", null, "Logout", -1);
function c_(e, t, n, r, i, o) {
  const s = De("ButtonDefaultStyle");
  return (
    H(),
    K(
      me,
      null,
      [
        l_,
        X(s, { button: { text: "Logout" }, onClick: e.logoutClick }, null, 8, [
          "onClick",
        ]),
      ],
      64
    )
  );
}
const u_ = Ot(a_, [["render", c_]]),
  f_ = {},
  d_ = A(
    "h1",
    { class: "text-3xl font-bold text-gray-900 dark:text-white" },
    "Register",
    -1
  ),
  h_ = A(
    "p",
    { class: "text-gray-500 dark:text-gray-400" },
    "Not implemented yet",
    -1
  );
function p_(e, t) {
  return H(), K(me, null, [d_, h_], 64);
}
const g_ = Ot(f_, [["render", p_]]),
  Vu = Ap({
    history: Wh("/"),
    routes: [
      {
        path: "/",
        name: "home",
        component: Pb,
        meta: { requiresLoggedInUser: !1, hideForAuth: !1 },
      },
      {
        path: "/login",
        name: "login",
        component: zb,
        meta: { requiresLoggedInUser: !1, hideForAuth: !0 },
      },
      {
        path: "/inbox",
        name: "inbox",
        component: s_,
        meta: { requiresLoggedInUser: !0, hideForAuth: !1 },
      },
      {
        path: "/tasks",
        name: "tasks",
        component: n_,
        meta: { requiresLoggedInUser: !0, hideForAuth: !1 },
      },
      {
        path: "/about",
        name: "about",
        meta: { requiresLoggedInUser: !1, hideForAuth: !1 },
        component: () => Ev(() => import("./AboutView-b14fb43e.js"), []),
      },
      {
        path: "/logout",
        name: "logout",
        component: u_,
        meta: { requiresLoggedInUser: !0, hideForAuth: !1 },
      },
      {
        path: "/signup",
        name: "signup",
        component: g_,
        meta: { requiresLoggedInUser: !1, hideForAuth: !0 },
      },
    ],
  });
const Ns = yh(wv);
Ns.use(wh());
Ns.use(Vu);
Ns.mount("#app");
const Al = Nt(),
  Ln = document.getElementById("theme-toggle-dark-icon"),
  Pn = document.getElementById("theme-toggle-light-icon");
localStorage.getItem("color-theme") === "dark" ||
(!("color-theme" in localStorage) &&
  window.matchMedia("(prefers-color-scheme: dark)").matches)
  ? Pn == null || Pn.classList.remove("hidden")
  : Ln == null || Ln.classList.remove("hidden");
const lo = document.getElementById("theme-toggle");
lo == null ||
  lo.addEventListener("click", function () {
    Ln == null || Ln.classList.toggle("hidden"),
      Pn == null || Pn.classList.toggle("hidden"),
      localStorage.getItem("color-theme")
        ? localStorage.getItem("color-theme") === "light"
          ? (document.documentElement.classList.add("dark"),
            localStorage.setItem("color-theme", "dark"))
          : (document.documentElement.classList.remove("dark"),
            localStorage.setItem("color-theme", "light"))
        : document.documentElement.classList.contains("dark")
        ? (document.documentElement.classList.remove("dark"),
          localStorage.setItem("color-theme", "light"))
        : (document.documentElement.classList.add("dark"),
          localStorage.setItem("color-theme", "dark"));
  });
Vu.beforeEach((e, t, n) => {
  if (
    e.matched.some((r) => r.meta.requiresLoggedInUser) &&
    !Al.userStateIsLoggedIn
  ) {
    console.log("router guard: user is not logged in, redirecting to login"),
      n({ name: "login" });
    return;
  }
  if (e.matched.some((r) => r.meta.hideForAuth) && Al.userStateIsLoggedIn) {
    console.log("router guard: user is logged in, redirecting to home"),
      n({ name: "home" });
    return;
  }
  n();
});
export {
  me as F,
  A as a,
  ne as b,
  K as c,
  jc as d,
  Ae as e,
  X as f,
  H as o,
  bt as r,
  ae as u,
};
