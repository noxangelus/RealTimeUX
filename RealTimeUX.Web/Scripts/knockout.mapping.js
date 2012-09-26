﻿// Knockout Mapping plugin v2.0.2
// (c) 2011 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
// License: Ms-Pl (http://www.opensource.org/licenses/ms-pl.html)

ko.exportSymbol = function (g, r) { for (var h = g.split("."), i = window, e = 0; e < h.length - 1; e++) i = i[h[e]]; i[h[h.length - 1]] = r }; ko.exportProperty = function (g, r, h) { g[r] = h };
(function () {
    function g(a, c) { for (var b in c) c.hasOwnProperty(b) && c[b] && (b && a[b] && !(a[b] instanceof Array) ? g(a[b], c[b]) : a[b] = c[b]) } function r(a, c) { var b = {}; g(b, a); g(b, c); return b } function h(a) { return a && typeof a === "object" && a.constructor == (new Date).constructor ? "date" : typeof a } function i(a, c) {
        a = a || {}; if (a.create instanceof Function || a.update instanceof Function || a.key instanceof Function || a.arrayChanged instanceof Function) a = { "": a }; if (c) a.ignore = e(c.ignore, a.ignore), a.include = e(c.include, a.include),
a.copy = e(c.copy, a.copy); a.ignore = e(a.ignore, l.ignore); a.include = e(a.include, l.include); a.copy = e(a.copy, l.copy); a.mappedProperties = a.mappedProperties || {}; return a
    } function e(a, c) { a instanceof Array || (a = h(a) === "undefined" ? [] : [a]); c instanceof Array || (c = h(c) === "undefined" ? [] : [c]); return a.concat(c) } function J(a, c) {
        var b = ko.dependentObservable; ko.dependentObservable = function (b, c, d) {
            var d = d || {}, j = d.deferEvaluation; b && typeof b == "object" && (d = b); var h = false, e = function (b) {
                var c = o({ read: function () {
                    h || (ko.utils.arrayRemoveItem(a,
b), h = true); return b.apply(b, arguments)
                }, write: function (a) { return b(a) }, deferEvaluation: true
                }); c.__ko_proto__ = o; return c
            }; d.deferEvaluation = true; b = new o(b, c, d); b.__ko_proto__ = o; j || (a.push(b), b = e(b)); return b
        }; var d = c(); ko.dependentObservable = b; return d
    } function y(a, c, b, d, f, e) {
        var x = ko.utils.unwrapObservable(c) instanceof Array, e = e || ""; if (ko.mapping.isMapped(a)) var j = ko.utils.unwrapObservable(a)[n], b = r(j, b); var l = function () { return b[d] && b[d].create instanceof Function }, B = function (a) {
            return J(C, function () {
                return b[d].create({ data: a ||
c, parent: f
                })
            })
        }, g = function () { return b[d] && b[d].update instanceof Function }, p = function (a, K) { var e = { data: K || c, parent: f, target: ko.utils.unwrapObservable(a) }; if (ko.isWriteableObservable(a)) e.observable = a; return b[d].update(e) }; if (j = z.get(c)) return j; d = d || ""; if (x) {
            var x = [], m = false, k = function (a) { return a }; if (b[d] && b[d].key) k = b[d].key, m = true; if (!ko.isObservable(a)) a = ko.observableArray([]), a.mappedRemove = function (b) { var c = typeof b == "function" ? b : function (a) { return a === k(b) }; return a.remove(function (a) { return c(k(a)) }) },
a.mappedRemoveAll = function (b) { var c = v(b, k); return a.remove(function (a) { return ko.utils.arrayIndexOf(c, k(a)) != -1 }) }, a.mappedDestroy = function (b) { var c = typeof b == "function" ? b : function (a) { return a === k(b) }; return a.destroy(function (a) { return c(k(a)) }) }, a.mappedDestroyAll = function (b) { var c = v(b, k); return a.destroy(function (a) { return ko.utils.arrayIndexOf(c, k(a)) != -1 }) }, a.mappedIndexOf = function (b) { var c = v(a(), k), b = k(b); return ko.utils.arrayIndexOf(c, b) }, a.mappedCreate = function (b) {
    if (a.mappedIndexOf(b) !==
-1) throw Error("There already is an object with the key that you specified."); var c = l() ? B(b) : b; g() && (b = p(c, b), ko.isWriteableObservable(c) ? c(b) : c = b); a.push(c); return c
}; var j = v(ko.utils.unwrapObservable(a), k).sort(), i = v(c, k); m && i.sort(); for (var m = ko.utils.compareArrays(j, i), j = {}, i = [], o = 0, u = m.length; o < u; o++) {
                var t = m[o], s, q = e + "[" + o + "]"; switch (t.status) {
                    case "added": var w = A(ko.utils.unwrapObservable(c), t.value, k); s = ko.utils.unwrapObservable(y(void 0, w, b, d, a, q)); q = F(ko.utils.unwrapObservable(c), w, j); i[q] =
s; j[q] = true; break; case "retained": w = A(ko.utils.unwrapObservable(c), t.value, k); s = A(a, t.value, k); y(s, w, b, d, a, q); q = F(ko.utils.unwrapObservable(c), w, j); i[q] = s; j[q] = true; break; case "deleted": s = A(a, t.value, k)
                } x.push({ event: t.status, item: s })
            } a(i); b[d] && b[d].arrayChanged && ko.utils.arrayForEach(x, function (a) { b[d].arrayChanged(a.event, a.item) })
        } else if (D(c)) {
            a = ko.utils.unwrapObservable(a); if (!a) if (l()) return m = B(), g() && (m = p(m)), m; else { if (g()) return p(m); a = {} } g() && (a = p(a)); z.save(c, a); G(c, function (d) {
                var f =
e.length ? e + "." + d : d; if (ko.utils.arrayIndexOf(b.ignore, f) == -1) if (ko.utils.arrayIndexOf(b.copy, f) != -1) a[d] = c[d]; else { var h = z.get(c[d]) || y(a[d], c[d], b, d, a, f); if (ko.isWriteableObservable(a[d])) a[d](ko.utils.unwrapObservable(h)); else a[d] = h; b.mappedProperties[f] = true } 
            })
        } else switch (h(c)) {
            case "function": g() ? ko.isWriteableObservable(c) ? (c(p(c)), a = c) : a = p(c) : a = c; break; default: ko.isWriteableObservable(a) ? g() ? a(p(a)) : a(ko.utils.unwrapObservable(c)) : (a = l() ? B() : ko.observable(ko.utils.unwrapObservable(c)), g() &&
a(p(a)))
        } return a
    } function F(a, c, b) { for (var d = 0, f = a.length; d < f; d++) if (b[d] !== true && a[d] === c) return d; return null } function H(a, c) { var b; c && (b = c(a)); h(b) === "undefined" && (b = a); return ko.utils.unwrapObservable(b) } function A(a, c, b) { a = ko.utils.arrayFilter(ko.utils.unwrapObservable(a), function (a) { return H(a, b) === c }); if (a.length == 0) throw Error("When calling ko.update*, the key '" + c + "' was not found!"); if (a.length > 1 && D(a[0])) throw Error("When calling ko.update*, the key '" + c + "' was not unique!"); return a[0] }
    function v(a, c) { return ko.utils.arrayMap(ko.utils.unwrapObservable(a), function (a) { return c ? H(a, c) : a }) } function G(a, c) { if (a instanceof Array) for (var b = 0; b < a.length; b++) c(b); else for (b in a) c(b) } function D(a) { var c = h(a); return c === "object" && a !== null && c !== "undefined" } function I() { var a = [], c = []; this.save = function (b, d) { var f = ko.utils.arrayIndexOf(a, b); f >= 0 ? c[f] = d : (a.push(b), c.push(d)) }; this.get = function (b) { b = ko.utils.arrayIndexOf(a, b); return b >= 0 ? c[b] : void 0 } } ko.mapping = {}; var n = "__ko_mapping__", o = ko.dependentObservable,
E = 0, C, z, u = { include: ["_destroy"], ignore: [], copy: [] }, l = u; ko.mapping.isMapped = function (a) { return (a = ko.utils.unwrapObservable(a)) && a[n] }; ko.mapping.fromJS = function (a) {
    if (arguments.length == 0) throw Error("When calling ko.fromJS, pass the object you want to convert."); window.setTimeout(function () { E = 0 }, 0); E++ || (C = [], z = new I); var c, b; arguments.length == 2 && (arguments[1][n] ? b = arguments[1] : c = arguments[1]); arguments.length == 3 && (c = arguments[1], b = arguments[2]); b && (c = r(c, b[n])); c = i(c); var d = y(b, a, c); b && (d = b); --E ||
window.setTimeout(function () { ko.utils.arrayForEach(C, function (a) { a && a() }) }, 0); d[n] = r(d[n], c); return d
}; ko.mapping.fromJSON = function (a) { var c = ko.utils.parseJson(a); arguments[0] = c; return ko.mapping.fromJS.apply(this, arguments) }; ko.mapping.updateFromJS = function () { throw Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!"); }; ko.mapping.updateFromJSON = function () {
    throw Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!");
}; ko.mapping.toJS = function (a, c) {
    l || ko.mapping.resetDefaultOptions(); if (arguments.length == 0) throw Error("When calling ko.mapping.toJS, pass the object you want to convert."); if (!(l.ignore instanceof Array)) throw Error("ko.mapping.defaultOptions().ignore should be an array."); if (!(l.include instanceof Array)) throw Error("ko.mapping.defaultOptions().include should be an array."); if (!(l.copy instanceof Array)) throw Error("ko.mapping.defaultOptions().copy should be an array."); c = i(c, a[n]); return ko.mapping.visitModel(a,
function (a) { return ko.utils.unwrapObservable(a) }, c)
}; ko.mapping.toJSON = function (a, c) { var b = ko.mapping.toJS(a, c); return ko.utils.stringifyJson(b) }; ko.mapping.defaultOptions = function () { if (arguments.length > 0) l = arguments[0]; else return l }; ko.mapping.resetDefaultOptions = function () { l = { include: u.include.slice(0), ignore: u.ignore.slice(0), copy: u.copy.slice(0)} }; ko.mapping.visitModel = function (a, c, b) {
    b = b || {}; b.visitedObjects = b.visitedObjects || new I; b.parentName || (b = i(b)); var d, f = ko.utils.unwrapObservable(a);
    if (D(f)) c(a, b.parentName), d = f instanceof Array ? [] : {}; else return c(a, b.parentName); b.visitedObjects.save(a, d); var e = b.parentName; G(f, function (a) {
        if (!(b.ignore && ko.utils.arrayIndexOf(b.ignore, a) != -1)) {
            var j = f[a], g = b, i = e || ""; f instanceof Array ? e && (i += "[" + a + "]") : (e && (i += "."), i += a); g.parentName = i; if (!(ko.utils.arrayIndexOf(b.copy, a) === -1 && ko.utils.arrayIndexOf(b.include, a) === -1 && f[n] && f[n].mappedProperties && !f[n].mappedProperties[a] && !(f instanceof Array))) switch (h(ko.utils.unwrapObservable(j))) {
                case "object": case "undefined": g =
b.visitedObjects.get(j); d[a] = h(g) !== "undefined" ? g : ko.mapping.visitModel(j, c, b); break; default: d[a] = c(j, b.parentName)
            } 
        } 
    }); return d
}; ko.exportSymbol("ko.mapping", ko.mapping); ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS); ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON); ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped); ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions); ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS); ko.exportSymbol("ko.mapping.toJSON",
ko.mapping.toJSON); ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS); ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON); ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel)
})();