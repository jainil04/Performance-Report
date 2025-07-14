import {
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  reactive,
  readonly,
  ref,
  watch
} from "./chunk-HNEN3F7C.js";

// node_modules/@primeuix/utils/dist/object/index.mjs
var oe = Object.defineProperty;
var K = Object.getOwnPropertySymbols;
var ue = Object.prototype.hasOwnProperty;
var fe = Object.prototype.propertyIsEnumerable;
var N = (e, t, n) => t in e ? oe(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var d = (e, t) => {
  for (var n in t || (t = {})) ue.call(t, n) && N(e, n, t[n]);
  if (K) for (var n of K(t)) fe.call(t, n) && N(e, n, t[n]);
  return e;
};
function a(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function l(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s(e) {
  return !a(e);
}
function i(e, t = true) {
  return e instanceof Object && e.constructor === Object && (t || Object.keys(e).length !== 0);
}
function $(e = {}, t = {}) {
  let n = d({}, e);
  return Object.keys(t).forEach((r) => {
    let o = r;
    i(t[o]) && o in e && i(e[o]) ? n[o] = $(e[o], t[o]) : n[o] = t[o];
  }), n;
}
function w(...e) {
  return e.reduce((t, n, r) => r === 0 ? n : $(t, n), {});
}
function m(e, ...t) {
  return l(e) ? e(...t) : e;
}
function p(e, t = true) {
  return typeof e == "string" && (t || e !== "");
}
function _(e) {
  return s(e) && !isNaN(e);
}
function z(e, t) {
  if (t) {
    let n = t.test(e);
    return t.lastIndex = 0, n;
  }
  return false;
}
function U(...e) {
  return w(...e);
}
function G(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function ee(e) {
  return p(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t, n) => n === 0 ? t : "-" + t.toLowerCase()).toLowerCase() : e;
}

// node_modules/@primeuix/utils/dist/eventbus/index.mjs
function s2() {
  let r = /* @__PURE__ */ new Map();
  return { on(e, t) {
    let n = r.get(e);
    return n ? n.push(t) : n = [t], r.set(e, n), this;
  }, off(e, t) {
    let n = r.get(e);
    return n && n.splice(n.indexOf(t) >>> 0, 1), this;
  }, emit(e, t) {
    let n = r.get(e);
    n && n.forEach((i2) => {
      i2(t);
    });
  }, clear() {
    r.clear();
  } };
}

// node_modules/@primeuix/utils/dist/dom/index.mjs
function y(t) {
  if (t) {
    let e = t.parentNode;
    return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
  }
  return null;
}
function T(t) {
  return !!(t !== null && typeof t != "undefined" && t.nodeName && y(t));
}
function c(t) {
  return typeof Element != "undefined" ? t instanceof Element : t !== null && typeof t == "object" && t.nodeType === 1 && typeof t.nodeName == "string";
}
function A(t, e = {}) {
  if (c(t)) {
    let o = (n, r) => {
      var l2, d3;
      let i2 = (l2 = t == null ? void 0 : t.$attrs) != null && l2[n] ? [(d3 = t == null ? void 0 : t.$attrs) == null ? void 0 : d3[n]] : [];
      return [r].flat().reduce((s3, a2) => {
        if (a2 != null) {
          let u = typeof a2;
          if (u === "string" || u === "number") s3.push(a2);
          else if (u === "object") {
            let p2 = Array.isArray(a2) ? o(n, a2) : Object.entries(a2).map(([f, g3]) => n === "style" && (g3 || g3 === 0) ? `${f.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g3}` : g3 ? f : void 0);
            s3 = p2.length ? s3.concat(p2.filter((f) => !!f)) : s3;
          }
        }
        return s3;
      }, i2);
    };
    Object.entries(e).forEach(([n, r]) => {
      if (r != null) {
        let i2 = n.match(/^on(.+)/);
        i2 ? t.addEventListener(i2[1].toLowerCase(), r) : n === "p-bind" || n === "pBind" ? A(t, r) : (r = n === "class" ? [...new Set(o("class", r))].join(" ").trim() : n === "style" ? o("style", r).join(";").trim() : r, (t.$attrs = t.$attrs || {}) && (t.$attrs[n] = r), t.setAttribute(n, r));
      }
    });
  }
}
function tt() {
  return !!(typeof window != "undefined" && window.document && window.document.createElement);
}
function Kt(t, e = "", o) {
  c(t) && o !== null && o !== void 0 && t.setAttribute(e, o);
}

// node_modules/@primeuix/utils/dist/zindex/index.mjs
function g() {
  let r = [], i2 = (e, n, t = 999) => {
    let s3 = u(e, n, t), o = s3.value + (s3.key === e ? 0 : t) + 1;
    return r.push({ key: e, value: o }), o;
  }, d3 = (e) => {
    r = r.filter((n) => n.value !== e);
  }, a2 = (e, n) => u(e, n).value, u = (e, n, t = 0) => [...r].reverse().find((s3) => n ? true : s3.key === e) || { key: e, value: t }, l2 = (e) => e && parseInt(e.style.zIndex, 10) || 0;
  return { get: l2, set: (e, n, t) => {
    n && (n.style.zIndex = String(i2(e, true, t)));
  }, clear: (e) => {
    e && (d3(l2(e)), e.style.zIndex = "");
  }, getCurrent: (e) => a2(e, true) };
}
var x = g();

// node_modules/@primeuix/styled/dist/index.mjs
var Qe = Object.defineProperty;
var Ye = Object.defineProperties;
var et = Object.getOwnPropertyDescriptors;
var F2 = Object.getOwnPropertySymbols;
var fe2 = Object.prototype.hasOwnProperty;
var ye = Object.prototype.propertyIsEnumerable;
var he = (e, t, r) => t in e ? Qe(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var d2 = (e, t) => {
  for (var r in t || (t = {})) fe2.call(t, r) && he(e, r, t[r]);
  if (F2) for (var r of F2(t)) ye.call(t, r) && he(e, r, t[r]);
  return e;
};
var _2 = (e, t) => Ye(e, et(t));
var b2 = (e, t) => {
  var r = {};
  for (var s3 in e) fe2.call(e, s3) && t.indexOf(s3) < 0 && (r[s3] = e[s3]);
  if (e != null && F2) for (var s3 of F2(e)) t.indexOf(s3) < 0 && ye.call(e, s3) && (r[s3] = e[s3]);
  return r;
};
var st = s2();
var R = st;
var v = /{([^}]*)}/g;
var lt = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ct = /var\([^)]+\)/g;
function ke(e) {
  return i(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function mt(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e = "", t = "") {
  return mt(`${p(e, false) && p(t, false) ? `${e}-` : e}${t}`);
}
function ne(e = "", t = "") {
  return `--${Q(e, t)}`;
}
function dt(e = "") {
  let t = (e.match(/{/g) || []).length, r = (e.match(/}/g) || []).length;
  return (t + r) % 2 !== 0;
}
function Y(e, t = "", r = "", s3 = [], o) {
  if (p(e)) {
    let a2 = e.trim();
    if (dt(a2)) return;
    if (z(a2, v)) {
      let n = a2.replaceAll(v, (l2) => {
        let c3 = l2.replace(/{|}/g, "").split(".").filter((m2) => !s3.some((u) => z(m2, u)));
        return `var(${ne(r, ee(c3.join("-")))}${s(o) ? `, ${o}` : ""})`;
      });
      return z(n.replace(ct, "0"), lt) ? `calc(${n})` : n;
    }
    return a2;
  } else if (_(e)) return e;
}
function _e(e, t, r) {
  p(t, false) && e.push(`${t}:${r};`);
}
function T2(e, t) {
  return e ? `${e}{${t}}` : "";
}
function oe2(e, t) {
  if (e.indexOf("dt(") === -1) return e;
  function r(n, l2) {
    let i2 = [], c3 = 0, m2 = "", u = null, p2 = 0;
    for (; c3 <= n.length; ) {
      let h = n[c3];
      if ((h === '"' || h === "'" || h === "`") && n[c3 - 1] !== "\\" && (u = u === h ? null : h), !u && (h === "(" && p2++, h === ")" && p2--, (h === "," || c3 === n.length) && p2 === 0)) {
        let y2 = m2.trim();
        y2.startsWith("dt(") ? i2.push(oe2(y2, l2)) : i2.push(s3(y2)), m2 = "", c3++;
        continue;
      }
      h !== void 0 && (m2 += h), c3++;
    }
    return i2;
  }
  function s3(n) {
    let l2 = n[0];
    if ((l2 === '"' || l2 === "'" || l2 === "`") && n[n.length - 1] === l2) return n.slice(1, -1);
    let i2 = Number(n);
    return isNaN(i2) ? n : i2;
  }
  let o = [], a2 = [];
  for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a2.push(n), n += 2;
  else if (e[n] === ")" && a2.length > 0) {
    let l2 = a2.pop();
    a2.length === 0 && o.push([l2, n]);
  }
  if (!o.length) return e;
  for (let n = o.length - 1; n >= 0; n--) {
    let [l2, i2] = o[n], c3 = e.slice(l2 + 3, i2), m2 = r(c3, t), u = t(...m2);
    e = e.slice(0, l2) + u + e.slice(i2 + 1);
  }
  return e;
}
var P = (...e) => le(g2.getTheme(), ...e);
var le = (e = {}, t, r, s3) => {
  if (t) {
    let { variable: o, options: a2 } = g2.defaults || {}, { prefix: n, transform: l2 } = (e == null ? void 0 : e.options) || a2 || {}, i2 = z(t, v) ? t : `{${t}}`;
    return s3 === "value" || a(s3) && l2 === "strict" ? g2.getTokenValue(t) : Y(i2, void 0, n, [o.excludedKeyRegex], r);
  }
  return "";
};
function ar(e, ...t) {
  if (e instanceof Array) {
    let r = e.reduce((s3, o, a2) => {
      var n;
      return s3 + o + ((n = m(t[a2], { dt: P })) != null ? n : "");
    }, "");
    return oe2(r, P);
  }
  return m(e, { dt: P });
}
function ce(e, t = {}) {
  let r = g2.defaults.variable, { prefix: s3 = r.prefix, selector: o = r.selector, excludedKeyRegex: a2 = r.excludedKeyRegex } = t, n = [], l2 = [], i2 = [{ node: e, path: s3 }];
  for (; i2.length; ) {
    let { node: m2, path: u } = i2.pop();
    for (let p2 in m2) {
      let h = m2[p2], y2 = ke(h), x2 = z(p2, a2) ? Q(u) : Q(u, ee(p2));
      if (i(y2)) i2.push({ node: y2, path: x2 });
      else {
        let k2 = ne(x2), w2 = Y(y2, x2, s3, [a2]);
        _e(l2, k2, w2);
        let $2 = x2;
        s3 && $2.startsWith(s3 + "-") && ($2 = $2.slice(s3.length + 1)), n.push($2.replace(/-/g, "."));
      }
    }
  }
  let c3 = l2.join("");
  return { value: l2, tokens: n, declarations: c3, css: T2(o, c3) };
}
var S = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
  return [e].flat().map((r) => {
    var s3;
    return (s3 = t.map((o) => o.resolve(r)).find((o) => o.matched)) != null ? s3 : this.rules.custom.resolve(r);
  });
} }, _toVariables(e, t) {
  return ce(e, { prefix: t == null ? void 0 : t.prefix });
}, getCommon({ name: e = "", theme: t = {}, params: r, set: s3, defaults: o }) {
  var w2, $2, j, V, D, z2, E;
  let { preset: a2, options: n } = t, l2, i2, c3, m2, u, p2, h;
  if (s(a2) && n.transform !== "strict") {
    let { primitive: L, semantic: te, extend: re } = a2, y2 = te || {}, { colorScheme: K2 } = y2, M = b2(y2, ["colorScheme"]), N2 = re || {}, { colorScheme: X } = N2, B = b2(N2, ["colorScheme"]), x2 = K2 || {}, { dark: G2 } = x2, I = b2(x2, ["dark"]), k2 = X || {}, { dark: U2 } = k2, H = b2(k2, ["dark"]), W = s(L) ? this._toVariables({ primitive: L }, n) : {}, q2 = s(M) ? this._toVariables({ semantic: M }, n) : {}, Z = s(I) ? this._toVariables({ light: I }, n) : {}, de = s(G2) ? this._toVariables({ dark: G2 }, n) : {}, ue2 = s(B) ? this._toVariables({ semantic: B }, n) : {}, pe = s(H) ? this._toVariables({ light: H }, n) : {}, ge = s(U2) ? this._toVariables({ dark: U2 }, n) : {}, [Le, Me] = [(w2 = W.declarations) != null ? w2 : "", W.tokens], [Ae, je] = [($2 = q2.declarations) != null ? $2 : "", q2.tokens || []], [De, ze] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Ke, Xe] = [(V = de.declarations) != null ? V : "", de.tokens || []], [Be, Ge] = [(D = ue2.declarations) != null ? D : "", ue2.tokens || []], [Ie, Ue] = [(z2 = pe.declarations) != null ? z2 : "", pe.tokens || []], [He, We] = [(E = ge.declarations) != null ? E : "", ge.tokens || []];
    l2 = this.transformCSS(e, Le, "light", "variable", n, s3, o), i2 = Me;
    let qe = this.transformCSS(e, `${Ae}${De}`, "light", "variable", n, s3, o), Ze = this.transformCSS(e, `${Ke}`, "dark", "variable", n, s3, o);
    c3 = `${qe}${Ze}`, m2 = [.../* @__PURE__ */ new Set([...je, ...ze, ...Xe])];
    let Fe = this.transformCSS(e, `${Be}${Ie}color-scheme:light`, "light", "variable", n, s3, o), Je = this.transformCSS(e, `${He}color-scheme:dark`, "dark", "variable", n, s3, o);
    u = `${Fe}${Je}`, p2 = [.../* @__PURE__ */ new Set([...Ge, ...Ue, ...We])], h = m(a2.css, { dt: P });
  }
  return { primitive: { css: l2, tokens: i2 }, semantic: { css: c3, tokens: m2 }, global: { css: u, tokens: p2 }, style: h };
}, getPreset({ name: e = "", preset: t = {}, options: r, params: s3, set: o, defaults: a2, selector: n }) {
  var y2, N2, x2;
  let l2, i2, c3;
  if (s(t) && r.transform !== "strict") {
    let k2 = e.replace("-directive", ""), m2 = t, { colorScheme: w2, extend: $2, css: j } = m2, V = b2(m2, ["colorScheme", "extend", "css"]), u = $2 || {}, { colorScheme: D } = u, z2 = b2(u, ["colorScheme"]), p2 = w2 || {}, { dark: E } = p2, L = b2(p2, ["dark"]), h = D || {}, { dark: te } = h, re = b2(h, ["dark"]), K2 = s(V) ? this._toVariables({ [k2]: d2(d2({}, V), z2) }, r) : {}, M = s(L) ? this._toVariables({ [k2]: d2(d2({}, L), re) }, r) : {}, X = s(E) ? this._toVariables({ [k2]: d2(d2({}, E), te) }, r) : {}, [B, G2] = [(y2 = K2.declarations) != null ? y2 : "", K2.tokens || []], [I, U2] = [(N2 = M.declarations) != null ? N2 : "", M.tokens || []], [H, W] = [(x2 = X.declarations) != null ? x2 : "", X.tokens || []], q2 = this.transformCSS(k2, `${B}${I}`, "light", "variable", r, o, a2, n), Z = this.transformCSS(k2, H, "dark", "variable", r, o, a2, n);
    l2 = `${q2}${Z}`, i2 = [.../* @__PURE__ */ new Set([...G2, ...U2, ...W])], c3 = m(j, { dt: P });
  }
  return { css: l2, tokens: i2, style: c3 };
}, getPresetC({ name: e = "", theme: t = {}, params: r, set: s3, defaults: o }) {
  var i2;
  let { preset: a2, options: n } = t, l2 = (i2 = a2 == null ? void 0 : a2.components) == null ? void 0 : i2[e];
  return this.getPreset({ name: e, preset: l2, options: n, params: r, set: s3, defaults: o });
}, getPresetD({ name: e = "", theme: t = {}, params: r, set: s3, defaults: o }) {
  var c3, m2;
  let a2 = e.replace("-directive", ""), { preset: n, options: l2 } = t, i2 = ((c3 = n == null ? void 0 : n.components) == null ? void 0 : c3[a2]) || ((m2 = n == null ? void 0 : n.directives) == null ? void 0 : m2[a2]);
  return this.getPreset({ name: a2, preset: i2, options: l2, params: r, set: s3, defaults: o });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t) {
  var r;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t.options.darkModeSelector) : [];
}, getLayerOrder(e, t = {}, r, s3) {
  let { cssLayer: o } = t;
  return o ? `@layer ${m(o.order || o.name || "primeui", r)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: s3 = {}, set: o, defaults: a2 }) {
  let n = this.getCommon({ name: e, theme: t, params: r, set: o, defaults: a2 }), l2 = Object.entries(s3).reduce((i2, [c3, m2]) => i2.push(`${c3}="${m2}"`) && i2, []).join(" ");
  return Object.entries(n || {}).reduce((i2, [c3, m2]) => {
    if (i(m2) && Object.hasOwn(m2, "css")) {
      let u = G(m2.css), p2 = `${c3}-variables`;
      i2.push(`<style type="text/css" data-primevue-style-id="${p2}" ${l2}>${u}</style>`);
    }
    return i2;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t = {}, params: r, props: s3 = {}, set: o, defaults: a2 }) {
  var c3;
  let n = { name: e, theme: t, params: r, set: o, defaults: a2 }, l2 = (c3 = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c3.css, i2 = Object.entries(s3).reduce((m2, [u, p2]) => m2.push(`${u}="${p2}"`) && m2, []).join(" ");
  return l2 ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${i2}>${G(l2)}</style>` : "";
}, createTokens(e = {}, t, r = "", s3 = "", o = {}) {
  return {};
}, getTokenValue(e, t, r) {
  var l2;
  let o = ((i2) => i2.split(".").filter((m2) => !z(m2.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t), a2 = t.includes("colorScheme.light") ? "light" : t.includes("colorScheme.dark") ? "dark" : void 0, n = [(l2 = e[o]) == null ? void 0 : l2.computed(a2)].flat().filter((i2) => i2);
  return n.length === 1 ? n[0].value : n.reduce((i2 = {}, c3) => {
    let p2 = c3, { colorScheme: m2 } = p2, u = b2(p2, ["colorScheme"]);
    return i2[m2] = u, i2;
  }, void 0);
}, getSelectorRule(e, t, r, s3) {
  return r === "class" || r === "attr" ? T2(s(t) ? `${e}${t},${e} ${t}` : e, s3) : T2(e, T2(t != null ? t : ":root", s3));
}, transformCSS(e, t, r, s3, o = {}, a2, n, l2) {
  if (s(t)) {
    let { cssLayer: i2 } = o;
    if (s3 !== "style") {
      let c3 = this.getColorSchemeOption(o, n);
      t = r === "dark" ? c3.reduce((m2, { type: u, selector: p2 }) => (s(p2) && (m2 += p2.includes("[CSS]") ? p2.replace("[CSS]", t) : this.getSelectorRule(p2, l2, u, t)), m2), "") : T2(l2 != null ? l2 : ":root", t);
    }
    if (i2) {
      let c3 = { name: "primeui", order: "primeui" };
      i(i2) && (c3.name = m(i2.name, { name: e, type: s3 })), s(c3.name) && (t = T2(`@layer ${c3.name}`, t), a2 == null || a2.layerNames(c3.name));
    }
    return t;
  }
  return "";
} };
var g2 = { defaults: { variable: { prefix: "p", selector: ":root", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t } = e;
  t && (this._theme = _2(d2({}, t), { options: d2(d2({}, this.defaults.options), t.options) }), this._tokens = S.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), R.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = _2(d2({}, this.theme), { preset: e }), this._tokens = S.createTokens(e, this.defaults), this.clearLoadedStyleNames(), R.emit("preset:change", e), R.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = _2(d2({}, this.theme), { options: e }), this.clearLoadedStyleNames(), R.emit("options:change", e), R.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return S.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t) {
  return S.getCommon({ name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t) {
  let r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPresetC(r);
}, getDirective(e = "", t) {
  let r = { name: e, theme: this.theme, params: t, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPresetD(r);
}, getCustomPreset(e = "", t, r, s3) {
  let o = { name: e, preset: t, options: this.options, selector: r, params: s3, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPreset(o);
}, getLayerOrderCSS(e = "") {
  return S.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t, r = "style", s3) {
  return S.transformCSS(e, t, s3, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t, r = {}) {
  return S.getCommonStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t, r = {}) {
  return S.getStyleSheet({ name: e, theme: this.theme, params: t, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t), R.emit(`theme:${t}:load`, e), !this._loadingStyles.size && R.emit("theme:load"));
} };

// node_modules/@primevue/core/api/index.mjs
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};

// node_modules/@primeuix/styles/dist/base/index.mjs
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    /* Non vue overlay animations */\n    .p-connected-overlay {\n        opacity: 0;\n        transform: scaleY(0.8);\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-visible {\n        opacity: 1;\n        transform: scaleY(1);\n    }\n\n    .p-connected-overlay-hidden {\n        opacity: 0;\n        transform: scaleY(1);\n        transition: opacity 0.1s linear;\n    }\n\n    /* Vue based overlay animations */\n    .p-connected-overlay-enter-from {\n        opacity: 0;\n        transform: scaleY(0.8);\n    }\n\n    .p-connected-overlay-leave-to {\n        opacity: 0;\n    }\n\n    .p-connected-overlay-enter-active {\n        transition:\n            transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n    }\n\n    .p-connected-overlay-leave-active {\n        transition: opacity 0.1s linear;\n    }\n\n    /* Toggleable Content */\n    .p-toggleable-content-enter-from,\n    .p-toggleable-content-leave-to {\n        max-height: 0;\n    }\n\n    .p-toggleable-content-enter-to,\n    .p-toggleable-content-leave-from {\n        max-height: 1000px;\n    }\n\n    .p-toggleable-content-leave-active {\n        overflow: hidden;\n        transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n    }\n\n    .p-toggleable-content-enter-active {\n        overflow: hidden;\n        transition: max-height 1s ease-in-out;\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: dt('mask.background');\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter {\n        animation: p-overlay-mask-enter-animation dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave {\n        animation: p-overlay-mask-leave-animation dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-overlay-mask-enter-animation {\n        from {\n            background: transparent;\n        }\n        to {\n            background: dt('mask.background');\n        }\n    }\n    @keyframes p-overlay-mask-leave-animation {\n        from {\n            background: dt('mask.background');\n        }\n        to {\n            background: transparent;\n        }\n    }\n";

// node_modules/@primevue/core/usestyle/index.mjs
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i2 = _toPrimitive(t, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t, r);
    if ("object" != _typeof(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance() && getCurrentInstance().components) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}
var _id = 0;
function useStyle(css3) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css3);
  var styleRef = ref(null);
  var defaultDocument = tt() ? window.document : void 0;
  var _options$document = options.document, document2 = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$first = options.first, first = _options$first === void 0 ? false : _options$first, _options$onMounted = options.onMounted, onStyleMounted = _options$onMounted === void 0 ? void 0 : _options$onMounted, _options$onUpdated = options.onUpdated, onStyleUpdated = _options$onUpdated === void 0 ? void 0 : _options$onUpdated, _options$onLoad = options.onLoad, onStyleLoaded = _options$onLoad === void 0 ? void 0 : _options$onLoad, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load2 = function load3(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document2) return;
    var _styleProps = _objectSpread(_objectSpread({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document2.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document2.getElementById(_id2) || document2.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css3;
      A(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      first ? document2.head.prepend(styleRef.value) : document2.head.appendChild(styleRef.value);
      Kt(styleRef.value, "data-primevue-style-id", _name);
      A(styleRef.value, _styleProps);
      styleRef.value.onload = function(event) {
        return onStyleLoaded === null || onStyleLoaded === void 0 ? void 0 : onStyleLoaded(event, {
          name: _name
        });
      };
      onStyleMounted === null || onStyleMounted === void 0 || onStyleMounted(_name);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
      onStyleUpdated === null || onStyleUpdated === void 0 || onStyleUpdated(_name);
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document2 || !isLoaded.value) return;
    stop();
    T(styleRef.value) && document2.head.removeChild(styleRef.value);
    isLoaded.value = false;
    styleRef.value = null;
  };
  if (immediate && !manual) tryOnMounted(load2);
  return {
    id,
    name,
    el: styleRef,
    css: cssRef,
    unload,
    load: load2,
    isLoaded: readonly(isLoaded)
  };
}

// node_modules/@primevue/core/base/style/index.mjs
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
var _templateObject;
var _templateObject2;
var _templateObject3;
var _templateObject4;
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a2) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a2);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
  }
}
function _arrayLikeToArray(r, a2) {
  (null == a2 || a2 > r.length) && (a2 = r.length);
  for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l2) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i2, u, a2 = [], f = true, o = false;
    try {
      if (i2 = (t = t.call(r)).next, 0 === l2) ;
      else for (; !(f = (e = i2.call(t)).done) && (a2.push(e.value), a2.length !== l2); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a2;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey2(t) {
  var i2 = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i2) ? i2 : i2 + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t, r);
    if ("object" != _typeof2(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var css = function css2(_ref) {
  var dt2 = _ref.dt;
  return "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    opacity: 0;\n    overflow: hidden;\n    padding: 0;\n    pointer-events: none;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: ".concat(dt2("scrollbar.width"), ";\n}\n");
};
var classes = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css,
  style,
  classes,
  inlineStyles,
  load: function load(style2) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var transform = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(cs) {
      return cs;
    };
    var computedStyle = transform(ar(_templateObject || (_templateObject = _taggedTemplateLiteral(["", ""])), style2));
    return s(computedStyle) ? useStyle(G(computedStyle), _objectSpread2({
      name: this.name
    }, options)) : {};
  },
  loadCSS: function loadCSS() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, options);
  },
  loadStyle: function loadStyle() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var style2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.load(this.style, options, function() {
      var computedStyle = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return g2.transformCSS(options.name || _this.name, "".concat(computedStyle).concat(ar(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["", ""])), style2)));
    });
  },
  getCommonTheme: function getCommonTheme(params) {
    return g2.getCommon(this.name, params);
  },
  getComponentTheme: function getComponentTheme(params) {
    return g2.getComponent(this.name, params);
  },
  getDirectiveTheme: function getDirectiveTheme(params) {
    return g2.getDirective(this.name, params);
  },
  getPresetTheme: function getPresetTheme(preset, selector, params) {
    return g2.getCustomPreset(this.name, preset, selector, params);
  },
  getLayerOrderThemeCSS: function getLayerOrderThemeCSS() {
    return g2.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _css = m(this.css, {
        dt: P
      }) || "";
      var _style = G(ar(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["", "", ""])), _css, extendedCSS));
      var _props = Object.entries(props).reduce(function(acc, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2), k2 = _ref3[0], v2 = _ref3[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      return s(_style) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(_style, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function getCommonThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return g2.getCommonStyleSheet(this.name, params, props);
  },
  getThemeStyleSheet: function getThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var css3 = [g2.getStyleSheet(this.name, params, props)];
    if (this.style) {
      var name = this.name === "base" ? "global-style" : "".concat(this.name, "-style");
      var _css = ar(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["", ""])), m(this.style, {
        dt: P
      }));
      var _style = G(g2.transformCSS(name, _css));
      var _props = Object.entries(props).reduce(function(acc, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2), k2 = _ref5[0], v2 = _ref5[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      s(_style) && css3.push('<style type="text/css" data-primevue-style-id="'.concat(name, '" ').concat(_props, ">").concat(_style, "</style>"));
    }
    return css3.join("");
  },
  extend: function extend(inStyle) {
    return _objectSpread2(_objectSpread2({}, this), {}, {
      css: void 0,
      style: void 0
    }, inStyle);
  }
};

// node_modules/@primevue/core/service/index.mjs
var PrimeVueService = s2();

// node_modules/@primevue/core/config/index.mjs
function _typeof3(o) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof3(o);
}
function ownKeys3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys3(Object(t), true).forEach(function(r2) {
      _defineProperty3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty3(e, r, t) {
  return (r = _toPropertyKey3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey3(t) {
  var i2 = _toPrimitive3(t, "string");
  return "symbol" == _typeof3(i2) ? i2 : i2 + "";
}
function _toPrimitive3(t, r) {
  if ("object" != _typeof3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i2 = e.call(t, r);
    if ("object" != _typeof3(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  inputVariant: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    fileChosenMessage: "{0} files",
    noFileChosenMessage: "No file chosen",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  theme: void 0,
  unstyled: false,
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = Symbol();
function usePrimeVue() {
  var PrimeVue2 = inject(PrimeVueSymbol);
  if (!PrimeVue2) {
    throw new Error("PrimeVue is not installed!");
  }
  return PrimeVue2;
}
function setup(app, options) {
  var PrimeVue2 = {
    config: reactive(options)
  };
  app.config.globalProperties.$primevue = PrimeVue2;
  app.provide(PrimeVueSymbol, PrimeVue2);
  clearConfig();
  setupConfig(app, PrimeVue2);
  return PrimeVue2;
}
var stopWatchers = [];
function clearConfig() {
  R.clear();
  stopWatchers.forEach(function(fn) {
    return fn === null || fn === void 0 ? void 0 : fn();
  });
  stopWatchers = [];
}
function setupConfig(app, PrimeVue2) {
  var isThemeChanged = ref(false);
  var loadCommonTheme = function loadCommonTheme2() {
    var _PrimeVue$config;
    if (((_PrimeVue$config = PrimeVue2.config) === null || _PrimeVue$config === void 0 ? void 0 : _PrimeVue$config.theme) === "none") return;
    if (!g2.isStyleNameLoaded("common")) {
      var _BaseStyle$getCommonT, _PrimeVue$config2;
      var _ref = ((_BaseStyle$getCommonT = BaseStyle.getCommonTheme) === null || _BaseStyle$getCommonT === void 0 ? void 0 : _BaseStyle$getCommonT.call(BaseStyle)) || {}, primitive = _ref.primitive, semantic = _ref.semantic, global = _ref.global, style2 = _ref.style;
      var styleOptions = {
        nonce: (_PrimeVue$config2 = PrimeVue2.config) === null || _PrimeVue$config2 === void 0 || (_PrimeVue$config2 = _PrimeVue$config2.csp) === null || _PrimeVue$config2 === void 0 ? void 0 : _PrimeVue$config2.nonce
      };
      BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread3({
        name: "primitive-variables"
      }, styleOptions));
      BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread3({
        name: "semantic-variables"
      }, styleOptions));
      BaseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread3({
        name: "global-variables"
      }, styleOptions));
      BaseStyle.loadStyle(_objectSpread3({
        name: "global-style"
      }, styleOptions), style2);
      g2.setLoadedStyleName("common");
    }
  };
  R.on("theme:change", function(newTheme) {
    if (!isThemeChanged.value) {
      app.config.globalProperties.$primevue.config.theme = newTheme;
      isThemeChanged.value = true;
    }
  });
  var stopConfigWatcher = watch(PrimeVue2.config, function(newValue, oldValue) {
    PrimeVueService.emit("config:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopRippleWatcher = watch(function() {
    return PrimeVue2.config.ripple;
  }, function(newValue, oldValue) {
    PrimeVueService.emit("config:ripple:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopThemeWatcher = watch(function() {
    return PrimeVue2.config.theme;
  }, function(newValue, oldValue) {
    if (!isThemeChanged.value) {
      g2.setTheme(newValue);
    }
    if (!PrimeVue2.config.unstyled) {
      loadCommonTheme();
    }
    isThemeChanged.value = false;
    PrimeVueService.emit("config:theme:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: false
  });
  var stopUnstyledWatcher = watch(function() {
    return PrimeVue2.config.unstyled;
  }, function(newValue, oldValue) {
    if (!newValue && PrimeVue2.config.theme) {
      loadCommonTheme();
    }
    PrimeVueService.emit("config:unstyled:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  stopWatchers.push(stopConfigWatcher);
  stopWatchers.push(stopRippleWatcher);
  stopWatchers.push(stopThemeWatcher);
  stopWatchers.push(stopUnstyledWatcher);
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = U(defaultOptions, options);
    setup(app, configOptions);
  }
};
export {
  clearConfig,
  PrimeVue as default,
  defaultOptions,
  setup,
  setupConfig,
  usePrimeVue
};
//# sourceMappingURL=primevue_config.js.map
