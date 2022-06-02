"use strict";
exports.__esModule = true;
exports.BinarySearchTree = exports.node = void 0;
var node = /** @class */ (function () {
    function node(data) {
        if (data === void 0) { data = null; }
        this.data = data;
        this.right = null;
        this.left = null;
        this.height = 0;
    }
    return node;
}());
exports.node = node;
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree() {
        var _this = this;
        this.insert2 = function (data, root) {
            if (!root) {
                return new node(data);
            }
            if (data > root.data) {
                root.right = _this.insert2(data, root.right);
            }
            else if (data < root.data) {
                root.left = _this.insert2(data, root.left);
            }
            root.height = _this.getHeight(root);
            return root;
        };
        this.insert = function (data) {
            _this.root = _this.insert2(data, _this.root);
        };
        this.findMin = function (ref) {
            if (!ref) {
                if (!_this.root) {
                    throw new Error("Árbol vacío.");
                }
                return _this.findMin(_this.root);
            }
            return ref.left ? _this.findMin(ref.left) : ref.data;
        };
        this.findMax = function (ref) {
            if (!ref) {
                if (!_this.root) {
                    throw new Error("Árbol vacío.");
                }
                return _this.findMax(_this.root);
            }
            return ref.right ? _this.findMax(ref.right) : ref.data;
        };
        this.remove = function (data, root) {
            if (root) {
                if ((data > root.data && !root.right) || (data < root.data && !root.left)) {
                    throw new Error("".concat(data, " no est\u00E1 en el \u00E1rbol. Imposible eliminar."));
                }
                if (data > root.data && root.right) {
                    root.right = _this.remove(data, root.right);
                    root.height = _this.getHeight(root);
                }
                else if (data < root.data && root.left) {
                    root.left = _this.remove(data, root.left);
                    root.height = _this.getHeight(root);
                }
                else {
                    if (!root.right && !root.left) {
                        root = null;
                    }
                    else if (root.left && !root.right) {
                        root = root.left;
                    }
                    else if (!root.left && root.right) {
                        root = root.right;
                    }
                    else {
                        root.data = _this.findMin(root.right);
                        root.right = _this.remove(root.data, root.right);
                        root.height = _this.getHeight(root);
                    }
                }
                return root;
            }
            if (!_this.root) {
                throw new Error("Árbol vacío. Imposible eliminar.");
            }
            _this.root = _this.remove(data, _this.root);
        };
        this.search = function (data, root) {
            if (!root) {
                if (!_this.root) {
                    throw new Error("Árbol vacío.");
                }
                return _this.search(data, _this.root);
            }
            if (data == root.data) {
                return root;
            }
            else if (data > root.data && root.right) {
                return _this.search(data, root.right);
            }
            else if (data < root.data && root.left) {
                return _this.search(data, root.left);
            }
            else {
                throw new Error("".concat(data, " no est\u00E1 en el \u00E1rbol."));
            }
        };
        this.getHeight = function (root) {
            if (!root) {
                return _this.root ? _this.root.height : -1;
            }
            var lHeight = root.left ? root.left.height : -1;
            var rHeight = root.right ? root.right.height : -1;
            return 1 + Math.max(lHeight, rHeight);
        };
        this.inOrder = function (ref, s) {
            if (s === void 0) { s = ""; }
            if (ref.left != null) {
                s = _this.inOrder(ref.left, s);
            }
            s += (s.length > 0 ? ", ".concat(ref.data) : "".concat(ref.data));
            if (ref.right != null) {
                s = _this.inOrder(ref.right, s);
            }
            return s;
        };
        this.toString = function () {
            return _this.root ? "[" + _this.inOrder(_this.root) + "]" : "[]";
        };
        this.root = null;
    }
    return BinarySearchTree;
}());
exports.BinarySearchTree = BinarySearchTree;
// let bst = new BinarySearchTree<number>()
// bst.insert(4)
// bst.insert(5)
// bst.insert(3)
// bst.insert(1)
// bst.insert(2)
// bst.insert(0)
// bst.insert(6)
// bst.insert(14)
// bst.insert(11)
// bst.insert(12)
// bst.insert(13)
// bst.insert(8)
// bst.insert(7)
// bst.insert(9)
// bst.insert(10)
// console.log("" + bst)
// bst.remove(11)
// console.log(bst.findMin())
// console.log(bst.findMax())
// console.log(bst.root)
// console.log("" + bst)
// console.log(bst.search(8))
// bst.remove(10)
// console.log("" + bst)
// console.log(bst.getHeight())
// let t = new BinarySearchTree<number>()
// console.log(t.findMax())
