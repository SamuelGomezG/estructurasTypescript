import { node } from "./iterativeBST";
import { BinarySearchTree } from "./iterativeBST";

export class AVL<T> extends BinarySearchTree<T> {
    constructor() {
        super()
    }

    private compareData = (data: T, root: node<T>, rootPar: node<T>): void => {
        if (data > rootPar.data) {
            rootPar.right = root
        } else {
            rootPar.left = root
        }
    }

    private rotateLeft = (root: node<T>): node<T> => {
        let ref: node<T> = root
        root = root.right
        root.parent = ref.parent
        ref.parent = root
        ref.right = root.left
        root.left = ref
        return root
    }

    private rotateRight = (root: node<T>): node<T> => {
        let ref: node<T> = root
        root = root.left
        root.parent = ref.parent
        ref.parent = root
        ref.left = root.right
        root.right = ref
        return root
    }

    protected recalculateNodeHeight = (root: node<T>): void => {
        let st1: node<T>[] = []
        let st2: node<T>[] = []
        st1.push(root)
        while (true) {
            let v: node<T> = st1[st1.length-1]
            st2.push(v)
            if (v.right) {
                st1.push(v.right)
            } else {
                st2.pop()
                while (!v.left && st2.length > 0) {
                    v = st2.pop()
                }
                if (!v.left) {
                    break
                }
                st1.push(v.left)
            }
        }
        while (st1.length > 0) {
            let n: node<T> = st1.pop()
            let lHeight: number = n.left? n.left.height: -1
            let rHeight: number = n.right? n.right.height: -1
            n.height = 1 + Math.max(lHeight, rHeight)
        }
    }

    private balance = (root: node<T>): void => {
        while (root) {
            let lHeight: number = root.left? root.left.height: -1
            let rHeight: number = root.right? root.right.height: -1
            let heightDiff: number = lHeight - rHeight
            if (Math.abs(heightDiff) <= 1) {
                root.height = 1 + Math.max(lHeight, rHeight)
            } else {
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
                if (root.parent) {
                    this.compareData(root.data, root, root.parent)
                } else {
                    this.root = root
                }
                this.recalculateNodeHeight(root)
            }
            root = root.parent
        }
    }

    insert = (data: T): void => {
        if (!this.root) {
            this.root = new node<T>(data)
            this.numItem++
            return
        }
        let ref: node<T> = this.root
        let refPar: node<T> = null
        while (ref) {
            refPar = ref
            if (data > ref.data) {
                ref = ref.right
            } else if (data < ref.data) {
                ref = ref.left
            } else {
                return
            }
        }
        ref = new node<T>(data)
        this.numItem++
        ref.parent = refPar
        this.compareData(data, ref, refPar)
        this.balance(refPar)
    }

    remove = (data: T): void => {
        if (!this.root) {
            throw new Error("Árbol vacío. Imposible eliminar.")
        }
        if (data == this.root.data && this.numItem == 1) {
            this.root = null
            this.numItem--
            return
        }
        let ref: node<T> = null
        try {
            ref = this.search(data)
        } catch (error) {
            throw new Error(`${data} no está en el árbol. Imposible eliminar.`)
        }
        if (ref.left && ref.right) {
            let newVal: T = this.findMin(ref.right)
            this.remove(newVal)
            ref.data = newVal
        } else {
            let refSon: node<T> = null
            if (ref.left && !ref.right) {
                refSon = ref.left
            }
            else if (ref.right && !ref.left) {
                refSon = ref.right
            }
            let refPar: node<T> = ref.parent
            if (refSon) {
                refSon.parent = refPar
            }
            this.compareData(data, refSon, refPar)
            this.numItem--
            this.balance(refPar)
        }
    }
}