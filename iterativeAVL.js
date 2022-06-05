"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AVL = void 0;
var iterativeBST_1 = require("./iterativeBST");
var iterativeBST_2 = require("./iterativeBST");
var AVL = /** @class */ (function (_super) {
    __extends(AVL, _super);
    function AVL() {
        var _this = _super.call(this) || this;
        _this.compareData = function (data, root, rootPar) {
            if (data > rootPar.data) {
                rootPar.right = root;
            }
            else {
                rootPar.left = root;
            }
        };
        _this.rotateLeft = function (root) {
            var ref = root;
            root = root.right;
            root.parent = ref.parent;
            ref.parent = root;
            ref.right = root.left;
            root.left = ref;
            return root;
        };
        _this.rotateRight = function (root) {
            var ref = root;
            root = root.left;
            root.parent = ref.parent;
            ref.parent = root;
            ref.left = root.right;
            root.right = ref;
            return root;
        };
        _this.recalculateNodeHeight = function (root) {
            var st1 = [];
            var st2 = [];
            st1.push(root);
            while (true) {
                var v = st1[st1.length - 1];
                st2.push(v);
                if (v.right) {
                    st1.push(v.right);
                }
                else {
                    st2.pop();
                    while (!v.left && st2.length > 0) {
                        v = st2.pop();
                    }
                    if (!v.left) {
                        break;
                    }
                    st1.push(v.left);
                }
            }
            while (st1.length > 0) {
                var n = st1.pop();
                var lHeight = n.left ? n.left.height : -1;
                var rHeight = n.right ? n.right.height : -1;
                n.height = 1 + Math.max(lHeight, rHeight);
            }
        };
        _this.balance = function (root) {
            while (root) {
                var lHeight = root.left ? root.left.height : -1;
                var rHeight = root.right ? root.right.height : -1;
                var heightDiff = lHeight - rHeight;
                if (Math.abs(heightDiff) <= 1) {
                    root.height = 1 + Math.max(lHeight, rHeight);
                }
                else {
                    if (heightDiff > 0) {
                        var lSon = root.left;
                        if (lSon.right && (!lSon.left || lSon.right.height > lSon.left.height)) {
                            root.left = _this.rotateLeft(root.left);
                        }
                        root = _this.rotateRight(root);
                    }
                    else {
                        var rSon = root.right;
                        if (rSon.left && (!rSon.right || rSon.left.height > rSon.right.height)) {
                            root.right = _this.rotateRight(root.right);
                        }
                        root = _this.rotateLeft(root);
                    }
                    if (root.parent) {
                        _this.compareData(root.data, root, root.parent);
                    }
                    else {
                        _this.root = root;
                    }
                    _this.recalculateNodeHeight(root);
                }
                root = root.parent;
            }
        };
        _this.insert = function (data) {
            if (!_this.root) {
                _this.root = new iterativeBST_1.node(data);
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
            ref = new iterativeBST_1.node(data);
            _this.numItem++;
            ref.parent = refPar;
            _this.compareData(data, ref, refPar);
            _this.balance(refPar);
        };
        _this.remove = function (data) {
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
                _this.compareData(data, refSon, refPar);
                _this.numItem--;
                _this.balance(refPar);
            }
        };
        return _this;
    }
    return AVL;
}(iterativeBST_2.BinarySearchTree));
exports.AVL = AVL;
