"use strict";
exports.__esModule = true;
exports.ValueChain = exports.Chain = exports.Key_Value_node = exports.node = void 0;
var node = /** @class */ (function () {
    function node(key) {
        this.key = key;
        this.next = {};
    }
    return node;
}());
exports.node = node;
var Key_Value_node = /** @class */ (function () {
    function Key_Value_node(key, value) {
        this.key = key;
        this.value = value;
        this.next = {};
    }
    return Key_Value_node;
}());
exports.Key_Value_node = Key_Value_node;
var Chain = /** @class */ (function () {
    function Chain() {
        var _this = this;
        this.append = function (key) {
            var keyNode;
            keyNode = new node(key);
            if (Object.keys(_this.head).length === 0) {
                _this.head = _this.tail = keyNode;
                return;
            }
            _this.tail.next = keyNode;
            _this.tail = keyNode;
        };
        this.erase = function (key) {
            var ref = _this.head;
            var prev = _this.head;
            while (ref.key != key && Object.keys(ref).length != 0) {
                prev = ref;
                ref = ref.next;
            }
            if (Object.keys(ref).length != 0) {
                if (ref == _this.head) {
                    if (_this.head == _this.tail) {
                        _this.head = _this.tail = {};
                        return;
                    }
                    _this.head = _this.head.next;
                    return;
                }
                prev.next = ref.next;
                if (ref == _this.tail) {
                    _this.tail = prev;
                }
            }
        };
        this.head = {};
        this.tail = {};
    }
    return Chain;
}());
exports.Chain = Chain;
var ValueChain = /** @class */ (function () {
    /**
     *
     */
    function ValueChain() {
        var _this = this;
        this.append = function (key, value) {
            var elementNode;
            elementNode = new Key_Value_node(key, value);
            if (Object.keys(_this.head).length === 0) {
                _this.head = _this.tail = elementNode;
                return;
            }
            _this.tail.next = elementNode;
            _this.tail = elementNode;
        };
        this.erase = function (key) {
            var ref = _this.head;
            var prev = _this.head;
            while (ref.key != key && Object.keys(ref).length != 0) {
                prev = ref;
                ref = ref.next;
            }
            if (Object.keys(ref).length != 0) {
                if (ref == _this.head) {
                    if (_this.head == _this.tail) {
                        _this.head = _this.tail = {};
                        return;
                    }
                    _this.head = _this.head.next;
                    return;
                }
                prev.next = ref.next;
                if (ref == _this.tail) {
                    _this.tail = prev;
                }
            }
        };
        this.head = {};
        this.tail = {};
    }
    return ValueChain;
}());
exports.ValueChain = ValueChain;
