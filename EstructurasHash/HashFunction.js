"use strict";
exports.__esModule = true;
exports.HashFunction = exports.StringHash = exports.IntHash = void 0;
var IntHash = /** @class */ (function () {
    function IntHash(prime, cardinality) {
        var _this = this;
        this.hashInt = function (num) {
            return ((_this.a * num + _this.b) % _this.prime) % _this.cardinality;
        };
        this.prime = prime;
        this.cardinality = cardinality;
        this.a = Math.floor(Math.random() * (this.prime - 1)) + 1;
        this.b = Math.floor(Math.random() * this.prime);
    }
    return IntHash;
}());
exports.IntHash = IntHash;
var StringHash = /** @class */ (function () {
    function StringHash(intHash, prime) {
        if (prime === void 0) { prime = 100000007; }
        var _this = this;
        this.polyHash = function (str) {
            var hash = 0;
            for (var i = str.length - 1; i >= 0; i--) {
                hash = (hash * _this.x + str.charCodeAt(i)) % _this.prime;
            }
            return hash;
        };
        this.hashString = function (str) {
            var strHash = _this.polyHash(str);
            return _this.intHash.hashInt(strHash);
        };
        this.prime = prime;
        this.x = Math.floor(Math.random() * (this.prime - 1)) + 1;
        this.intHash = intHash;
    }
    return StringHash;
}());
exports.StringHash = StringHash;
var HashFunction = /** @class */ (function () {
    function HashFunction(cardinality, prime) {
        if (prime === void 0) { prime = 100000007; }
        var _this = this;
        this.hashObject = function (obj) {
            if (typeof obj === 'number') {
                return ((_this.a * obj + _this.b) % _this.prime) % _this.cardinality;
            }
            else if (typeof obj === 'string') {
                var hash = 0;
                for (var i = obj.length - 1; i >= 0; i--) {
                    hash = (hash * _this.x + obj.charCodeAt(i)) % _this.prime;
                }
                return _this.hashObject(hash);
            }
            throw new Error("Tipo invalido");
        };
        this.prime = prime;
        this.cardinality = cardinality;
        this.a = Math.floor(Math.random() * (this.prime - 1)) + 1;
        this.b = Math.floor(Math.random() * this.prime);
        this.x = Math.floor(Math.random() * (this.prime - 1)) + 1;
    }
    return HashFunction;
}());
exports.HashFunction = HashFunction;
