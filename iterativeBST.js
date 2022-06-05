"use strict";
exports.__esModule = true;
exports.BinarySearchTree = exports.node = void 0;
var node = /** @class */ (function () {
    function node(data) {
        if (data === void 0) { data = null; }
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.height = 0;
    }
    return node;
}());
exports.node = node;
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree() {
        var _this = this;
        this.recalculateNodeHeight = function (root) {
            while (root) {
                var lHeight = root.left ? root.left.height : -1;
                var rHeight = root.right ? root.right.height : -1;
                root.height = 1 + Math.max(lHeight, rHeight);
                root = root.parent;
            }
        };
        this.insert = function (data) {
            if (!_this.root) {
                _this.root = new node(data);
                _this.numItem++;
                return;
            }
            var ref = _this.root;
            var refPar = null;
            while (ref) {
                refPar = ref;
                if (data > ref.data) {
                    ref = ref.right;
                }
                else if (data < ref.data) {
                    ref = ref.left;
                }
                else {
                    return;
                }
            }
            ref = new node(data);
            _this.numItem++;
            ref.parent = refPar;
            if (data > refPar.data) {
                refPar.right = ref;
            }
            else {
                refPar.left = ref;
            }
            _this.recalculateNodeHeight(refPar);
        };
        this.findMin = function (root) {
            if (root === void 0) { root = _this.root; }
            if (!root) {
                throw new Error("Árbol vacío.");
            }
            while (root.left) {
                root = root.left;
            }
            return root.data;
        };
        this.findMax = function (root) {
            if (root === void 0) { root = _this.root; }
            if (!root) {
                throw new Error("Árbol vacío.");
            }
            while (root.right) {
                root = root.right;
            }
            return root.data;
        };
        this.search = function (data) {
            if (!_this.root) {
                throw new Error("Árbol vacío.");
            }
            var root = _this.root;
            while (root.data != data) {
                if (data > root.data && root.right) {
                    root = root.right;
                }
                else if (data < root.data && root.left) {
                    root = root.left;
                }
                else {
                    throw new Error("".concat(data, " no est\u00E1 en el \u00E1rbol."));
                }
            }
            return root;
        };
        this.remove = function (data) {
            if (!_this.root) {
                throw new Error("Árbol vacío. Imposible eliminar.");
            }
            if (data == _this.root.data && _this.numItem == 1) {
                _this.root = null;
                _this.numItem--;
                return;
            }
            var ref = null;
            try {
                ref = _this.search(data);
            }
            catch (error) {
                throw new Error("".concat(data, " no est\u00E1 en el \u00E1rbol. Imposible eliminar."));
            }
            if (ref.left && ref.right) {
                var newVal = _this.findMin(ref.right);
                _this.remove(newVal);
                ref.data = newVal;
            }
            else {
                var refSon = null;
                if (ref.left && !ref.right) {
                    refSon = ref.left;
                }
                else if (ref.right && !ref.left) {
                    refSon = ref.right;
                }
                var refPar = ref.parent;
                if (refSon) {
                    refSon.parent = refPar;
                }
                if (data > refPar.data) {
                    refPar.right = refSon;
                }
                else {
                    refPar.left = refSon;
                }
                _this.numItem--;
                _this.recalculateNodeHeight(refPar);
            }
        };
        this.getHeight = function () {
            return _this.root ? _this.root.height : -1;
        };
        this.inOrder = function () {
            var st1 = [];
            var st2 = [];
            st1.push(_this.root);
            while (st1.length < _this.numItem) {
                var v = st1.pop();
                st2.push(v);
                if (v.right) {
                    st1.push(v.right);
                }
                else {
                    st1.push(st2.pop());
                    while (!v.left && st1.length < _this.numItem) {
                        v = st2.pop();
                        st1.push(v);
                    }
                    if (v.left) {
                        st1.push(v.left);
                    }
                }
            }
            var treeStr = "";
            while (st1.length > 0) {
                treeStr += (treeStr.length > 0) ? ", ".concat(st1.pop().data) : "".concat(st1.pop().data);
            }
            return treeStr;
        };
        this.toString = function () {
            return "[" + _this.inOrder() + "]";
        };
        this.root = null;
        this.numItem = 0;
    }
    return BinarySearchTree;
}());
exports.BinarySearchTree = BinarySearchTree;
