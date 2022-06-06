"use strict";
exports.__esModule = true;
exports.Heap = void 0;
var Heap = /** @class */ (function () {
    function Heap() {
        var _this = this;
        this.swap = function (indexA, indexB) {
            var temp = _this.arr[indexA];
            _this.arr[indexA] = _this.arr[indexB];
            _this.arr[indexB] = temp;
        };
        this.leftChild = function (index) {
            return 2 * index + 1;
        };
        this.rightChild = function (index) {
            return 2 * (index + 1);
        };
        this.parent = function (index) {
            return (index > 0) ? Math.floor((index - 1) / 2) : 0;
        };
        this.siftUp = function (index) {
            var parent = _this.parent(index);
            while (_this.arr[index] > _this.arr[parent]) {
                _this.swap(index, parent);
                index = parent;
                parent = _this.parent(index);
            }
        };
        this.siftDown = function (index) {
            var maxi = index;
            var li = _this.leftChild(index);
            var ri = _this.rightChild(index);
            if (li < _this.size && _this.arr[li] > _this.arr[maxi]) {
                maxi = li;
            }
            if (ri < _this.size && _this.arr[ri] > _this.arr[maxi]) {
                maxi = ri;
            }
            if (maxi != index) {
                _this.swap(index, maxi);
                _this.siftDown(maxi);
            }
        };
        this.insert = function (item) {
            _this.arr.push(item);
            _this.siftUp(_this.size);
            _this.size += 1;
        };
        this.extractMax = function () {
            if (_this.arr.length == 0) {
                throw new Error("Cola de prioridad vacía.");
            }
            var result = _this.arr[0];
            _this.size -= 1;
            _this.swap(0, _this.size);
            _this.siftDown(0);
            return result;
        };
        this.getMax = function () {
            if (_this.arr.length == 0) {
                throw new Error("Cola de prioridad vacía.");
            }
            return _this.arr[0];
        };
        this.changePriority = function (index, newPriority) {
            var oldPriority = _this.arr[index];
            _this.arr[index] = newPriority;
            if (newPriority > oldPriority) {
                _this.siftUp(index);
            }
            else if (newPriority < oldPriority) {
                _this.siftDown(index);
            }
        };
        this.remove = function (index) {
            _this.arr[index] = _this.getMax();
            _this.siftUp(index);
            _this.extractMax();
        };
        this.search = function (item) {
            for (var i = 0; i < _this.size; i++) {
                if (_this.arr[i] == item) {
                    return i;
                }
            }
            return -1;
        };
        this.toString = function () {
            var heapStr = "[";
            for (var i = 0; i < _this.size; i++) {
                heapStr += (i > 0) ? ", ".concat(_this.arr[i]) : "".concat(_this.arr[i]);
            }
            return heapStr + "]";
        };
        this.arr = [];
        this.size = 0;
    }
    return Heap;
}());
exports.Heap = Heap;

