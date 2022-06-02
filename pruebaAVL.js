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
var pruebabst_1 = require("./pruebabst");
var pruebabst_2 = require("./pruebabst");
var AVL = /** @class */ (function (_super) {
    __extends(AVL, _super);
    function AVL() {
        var _this = _super.call(this) || this;
        _this.rotateRight = function (root) {
            var ref = root;
            root = root.left;
            ref.left = root.right;
            root.right = ref;
            return root;
        };
        _this.rotateLeft = function (root) {
            var ref = root;
            root = root.right;
            ref.right = root.left;
            root.left = ref;
            return root;
        };
        _this.getHeight = function (root) {
            if (!root) {
                return _this.root ? _this.root.height : -1;
            }
            if (root.left) {
                root.left.height = _this.getHeight(root.left);
            }
            if (root.right) {
                root.right.height = _this.getHeight(root.right);
            }
            var lHeight = root.left ? root.left.height : -1;
            var rHeight = root.right ? root.right.height : -1;
            return 1 + Math.max(lHeight, rHeight);
        };
        _this.balance = function (root) {
            var lHeight = root.left ? root.left.height : -1;
            var rHeight = root.right ? root.right.height : -1;
            var heightDiff = lHeight - rHeight;
            if (Math.abs(heightDiff) <= 1) {
                root.height = 1 + Math.max(lHeight, rHeight);
                return root;
            }
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
            root.height = _this.getHeight(root);
            return root;
        };
        _this.insert2 = function (data, root) {
            if (!root) {
                return new pruebabst_1.node(data);
            }
            if (data > root.data) {
                root.right = _this.insert2(data, root.right);
                root = _this.balance(root);
            }
            else if (data < root.data) {
                root.left = _this.insert2(data, root.left);
                root = _this.balance(root);
            }
            return root;
        };
        _this.remove = function (data, root) {
            if (root) {
                if ((data > root.data && !root.right) || (data < root.data && !root.left)) {
                    throw new Error("".concat(data, " no est\u00E1 en el \u00E1rbol. Imposible eliminar."));
                }
                if (data > root.data && root.right) {
                    root.right = _this.remove(data, root.right);
                    root = _this.balance(root);
                }
                else if (data < root.data && root.left) {
                    root.left = _this.remove(data, root.left);
                    root = _this.balance(root);
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
                        root = _this.balance(root);
                    }
                }
                return root;
            }
            if (!_this.root) {
                throw new Error("Árbol vacío. Imposible eliminar.");
            }
            _this.root = _this.remove(data, _this.root);
        };
        _this.bfs = function () {
            var q = [];
            var arr = [];
            q.push(_this.root);
            while (q.length > 0) {
                var n = q.shift();
                if (n.left) {
                    q.push(n.left);
                }
                if (n.right) {
                    q.push(n.right);
                }
                arr.push(n.data);
            }
            return arr;
        };
        _this.toString = function () {
            return _this.root ? "[" + _this.inOrder(_this.root) + "]" : "[]";
        };
        return _this;
    }
    return AVL;
}(pruebabst_2.BinarySearchTree));
exports.AVL = AVL;
var tr = new AVL();
var arr = [4, 5, 3, 1, 2, 0, 6, 14, 11, 12, 13, 8, 7, 9, 10];
arr.forEach(function (item) {
    tr.insert(item);
});
console.log("" + tr);
console.log(tr.bfs().toString());
console.log(tr.getHeight());
tr.remove(12);
console.log("----//----");
console.log(tr.bfs().toString());
console.log(tr.getHeight());
