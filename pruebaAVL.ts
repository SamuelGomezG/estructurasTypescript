import {node} from "./pruebabst"
import {BinarySearchTree} from "./pruebabst"

export class AVL<T> extends BinarySearchTree<T> {
    constructor() {
        super();
    }

    private rotateRight = (root: node<T>): node<T> => {
        let ref: node<T> = root
        root = root.left
        ref.left = root.right
        root.right = ref
        return root
    }

    private rotateLeft = (root: node<T>): node<T> => {
        let ref: node<T> = root
        root = root.right
        ref.right = root.left
        root.left = ref
        return root
    }

    getHeight = (root?: node<T>): number => {
        if (!root) {
            return this.root? this.root.height: -1
        }
        if (root.left) {
            root.left.height = this.getHeight(root.left)
        }
        if (root.right) {
            root.right.height = this.getHeight(root.right)
        }
        let lHeight: number = root.left? root.left.height: -1
        let rHeight: number = root.right? root.right.height: -1
        return 1 + Math.max(lHeight, rHeight)
    }

    private balance = (root: node<T>): node<T> => {
        let lHeight: number = root.left? root.left.height: -1
        let rHeight: number = root.right? root.right.height: -1
        let heightDiff: number = lHeight - rHeight
        if (Math.abs(heightDiff) <= 1) {
            root.height = 1 + Math.max(lHeight, rHeight)
            return root
        }
        if (heightDiff > 0) {
            let lSon: node<T> = root.left
            if (lSon.right && (!lSon.left || lSon.right.height > lSon.left.height)) {
                root.left = this.rotateLeft(root.left)
            }
            root = this.rotateRight(root)
        } else {
            let rSon: node<T> = root.right
            if (rSon.left && (!rSon.right || rSon.left.height > rSon.right.height)) {
                root.right = this.rotateRight(root.right)
            }
            root = this.rotateLeft(root)
        }
        root.height = this.getHeight(root)
        return root
    }

    protected insert2 = (data: T, root: node<T>): node<T> => {
        if (!root) {
            return new node<T>(data)
        }
        if (data > root.data) {
            root.right = this.insert2(data, root.right)
            root = this.balance(root)
        }
        else if (data < root.data) {
            root.left = this.insert2(data, root.left)
            root = this.balance(root)
        }
        return root
    }

    remove = (data: T, root?: node<T>): node<T> => {
        if (root) {
            if ((data > root.data && !root.right) || (data < root.data && !root.left)) {
                throw new Error(`${data} no está en el árbol. Imposible eliminar.`);
            }
            if (data > root.data && root.right) {
                root.right = this.remove(data, root.right)
                root = this.balance(root)
            }
            else if (data < root.data && root.left) {
                root.left = this.remove(data, root.left)
                root = this.balance(root)
            }
            else {
                if (!root.right && !root.left) {
                    root = null
                }
                else if (root.left && !root.right) {
                    root = root.left
                }
                else if (!root.left && root.right) {
                    root = root.right
                }
                else {
                    root.data = this.findMin(root.right)
                    root.right = this.remove(root.data, root.right)
                    root = this.balance(root)
                }
            }
            return root
        }
        if (!this.root) {
            throw new Error("Árbol vacío. Imposible eliminar.");
        }
        this.root = this.remove(data, this.root)
    }

    bfs = (): T[] => {
        let q: node<T>[] = []
        let arr: T[] = []
        q.push(this.root)
        while (q.length > 0) {
            let n: node<T> = q.shift()
            if (n.left) {
                q.push(n.left)
            }
            if (n.right) {
                q.push(n.right)
            }
            arr.push(n.data)
        }
        return arr
    }

    public toString = () => {
        return this.root? "[" + this.inOrder(this.root) + "]": "[]"
    }
}

let tr: AVL<number> = new AVL<number>()
let arr: number[] = [4, 5, 3, 1, 2, 0, 6, 14, 11, 12, 13, 8, 7, 9, 10]
arr.forEach(function(item) {
    tr.insert(item)
})
console.log("" + tr)
console.log(tr.bfs().toString())
console.log(tr.getHeight())
tr.remove(12)
console.log("----//----")
console.log(tr.bfs().toString())
console.log(tr.getHeight())