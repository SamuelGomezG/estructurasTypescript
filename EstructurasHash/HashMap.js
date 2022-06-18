"use strict";
exports.__esModule = true;
exports.HashMap = void 0;
var HashFunction_1 = require("./HashFunction");
var Utils_1 = require("./Utils");
var HashMap = /** @class */ (function () {
    /**
     *
     */
    function HashMap() {
        var _this = this;
        this.rehash = function () {
            var loadFactor = _this.numberOfKeys / _this.table.length;
            if (loadFactor > 0.9) {
                var newTable_1 = [];
                for (var i = 0; i < 2 * _this.table.length; i++) {
                    newTable_1.push(new Utils_1.ValueChain());
                }
                var newHash_1 = new HashFunction_1.HashFunction(newTable_1.length);
                _this.table.forEach(function (oldChain) {
                    var ref = oldChain.head;
                    while (Object.keys(ref).length != 0) {
                        var key = ref.key;
                        var value = ref.value;
                        newTable_1[newHash_1.hashObject(key)].append(key, value);
                        ref = ref.next;
                    }
                });
                _this.table = newTable_1;
                _this.hash = newHash_1;
            }
        };
        this.find = function (key) {
            var chain = _this.table[_this.hash.hashObject(key)];
            var ref = chain.head;
            while (Object.keys(ref).length != 0) {
                if (ref.key == key) {
                    return ref;
                }
                ref = ref.next;
            }
            return null;
        };
        this.hasKey = function (key) {
            var searchResult = _this.find(key);
            if (searchResult != null) {
                return true;
            }
            return false;
        };
        this.get = function (key) {
            var searchResult = _this.find(key);
            if (searchResult != null) {
                return searchResult.value;
            }
            return null;
        };
        this.set = function (key, value) {
            var chain = _this.table[_this.hash.hashObject(key)];
            var ref = chain.head;
            while (Object.keys(ref).length != 0) {
                if (ref.key == key) {
                    ref.value = value;
                    return;
                }
                ref = ref.next;
            }
            chain.append(key, value);
            _this.numberOfKeys++;
            _this.rehash();
        };
        this.remove = function (key) {
            if (!_this.hasKey(key)) {
                return;
            }
            var chain = _this.table[_this.hash.hashObject(key)];
            chain.erase(key);
            _this.numberOfKeys--;
        };
        this.toString = function () {
            var mapStr = "";
            _this.table.forEach(function (chain) {
                var ref = chain.head;
                while (Object.keys(ref).length != 0) {
                    mapStr += (mapStr.length) ? ", ".concat(ref.key, ": ").concat(ref.value) : "".concat(ref.key, ": ").concat(ref.value);
                    ref = ref.next;
                }
            });
            return "{" + mapStr + "}";
        };
        this.table = [new Utils_1.ValueChain(), new Utils_1.ValueChain()];
        this.hash = new HashFunction_1.HashFunction(2);
        this.numberOfKeys = 0;
    }
    return HashMap;
}());
exports.HashMap = HashMap;
