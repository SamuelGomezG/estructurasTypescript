"use strict";
exports.__esModule = true;
exports.HashSet = void 0;
var HashFunction_1 = require("./HashFunction");
var Utils_1 = require("./Utils");
var HashSet = /** @class */ (function () {
    /**
     *
     */
    function HashSet() {
        var _this = this;
        this.reHash = function () {
            var loadFactor = _this.numberOfKeys / _this.table.length;
            if (loadFactor > 0.9) {
                var newTable_1 = [];
                for (var i = 0; i < 2 * _this.table.length; i++) {
                    newTable_1.push(new Utils_1.Chain());
                }
                var newHash_1 = new HashFunction_1.HashFunction(newTable_1.length);
                _this.table.forEach(function (oldChain) {
                    var ref = oldChain.head;
                    while (Object.keys(ref).length != 0) {
                        var key = ref.key;
                        newTable_1[newHash_1.hashObject(key)].append(key);
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
                    return true;
                }
                ref = ref.next;
            }
            return false;
        };
        this.add = function (key) {
            var chain = _this.table[_this.hash.hashObject(key)];
            var ref = chain.head;
            while (Object.keys(ref).length != 0) {
                if (ref.key == key) {
                    return;
                }
                ref = ref.next;
            }
            chain.append(key);
            _this.numberOfKeys++;
            _this.reHash();
        };
        this.remove = function (key) {
            if (!_this.find(key)) {
                return;
            }
            var chain = _this.table[_this.hash.hashObject(key)];
            chain.erase(key);
            _this.numberOfKeys--;
        };
        this.toString = function () {
            var setStr = "";
            _this.table.forEach(function (chain) {
                var ref = chain.head;
                while (Object.keys(ref).length != 0) {
                    setStr += (setStr.length > 0) ? ", ".concat(ref.key) : "".concat(ref.key);
                    ref = ref.next;
                }
            });
            return "{" + setStr + "}";
        };
        this.table = [new Utils_1.Chain(), new Utils_1.Chain()];
        this.hash = new HashFunction_1.HashFunction(2);
        this.numberOfKeys = 0;
    }
    return HashSet;
}());
exports.HashSet = HashSet;
