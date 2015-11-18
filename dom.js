'use strict';

function _type (obj) {
    return /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))[1].toLowerCase()
}

function Dom(selector) {
    return new Interface(
        _type(selector) == ''
            ? document.querySelectorAll(selector)
            : [selector || window]
    )
}

function ArrayElements () {}
ArrayElements.prototype = Array.prototype

function Interface(items) {
    items && items.length && [].slice.call(items).forEach(function (item) {
        this.push(item)
    }.bind(this))
}
var proto = Interface.prototype = new ArrayElements()

proto.addClass = function (clazz) {
    this.forEach(function(el) {
        // IE9 below not support classList
        el.classList && el.classList.add(clazz)
    })
    return this
}
proto.removeClass = function (clazz) {
    this.forEach(function(el) {
        // IE9 below not support classList
        el.classList && el.classList.remove(clazz)
    })
    return this
}
proto.find = function (sel) {
    var items = []
    this.forEach(function(el) {
        var childs = el.querySelectorAll(sel)
        if (childs) {
            [].slice.call(childs).forEach(function (c) {
                if (!~items.indexOf(c)) items.push(c)
            })
        }
    })
    return new Interface(items)
}
proto.html = function (html) {
    this.forEach(function(el) {
        // IE9 below not support classList
        el.innerHTML = html
    })
    return this
}
proto.attr = function(attname, attvalue) {
    var len = arguments.length
    var el = this[0]
    if (len > 1) {
        el.setAttribute(attname, attvalue)
    } else if (len == 1) {
        return (el.getAttribute(attname) || '').toString()
    }
    return this
}
proto.removeAttr = function(attname) {
    this.forEach(function(el) {
        el.removeAttribute(attname)
    })
    return this
}
module.exports = Dom