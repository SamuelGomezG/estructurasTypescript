export class node<T> {
    data: T
    left: node<T>
    right: node<T>
    parent: node<T>
    height: number

    constructor(data = null) {
        this.data = data
        this.left = null
        this.right = null
        this.parent = null
        this.height = 0
    }
}

export class BinarySearchTree<T> {
    root: node<T>
    numItem: number

    constructor() {
        this.root = null
        this.numItem = 0
    }

    protected recalculateNodeHeight = (root: node<T>): void => {
        while (root) {
            let lHeight: number = root.left? root.left.height: -1
            let rHeight: number = root.right? root.right.height: -1
            root.height = 1 + Math.max(lHeight, rHeight)
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
        if (data > refPar.data) {
            refPar.right = ref
        } else {
            refPar.left = ref
        }
        this.recalculateNodeHeight(refPar)
    }

    findMin = (root = this.root): T => {
        if (!root) {
            throw new Error("Árbol vacío.")
        }
        while (root.left) {
            root = root.left
        }
        return root.data
    }

    findMax = (root = this.root): T => {
        if (!root) {
            throw new Error("Árbol vacío.")
        }
        while (root.right) {
            root = root.right
        }
        return root.data
    }

    search = (data: T): node<T> => {
        if (!this.root) {
            throw new Error("Árbol vacío.")
        }
        let root: node<T> = this.root
        while (root.data != data) {
            if (data > root.data && root.right) {
                root = root.right
            }
            else if (data < root.data && root.left) {
                root = root.left
            } else {
                throw new Error(`${data} no está en el árbol.`)
            }
        }
        return root
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
            if (data > refPar.data) {
                refPar.right = refSon
            } else {
                refPar.left = refSon
            }
            this.numItem--
            this.recalculateNodeHeight(refPar)
        }
    }

    getHeight = (): number => {
        return this.root? this.root.height: -1
    }

    protected inOrder = (): string => {
        let st1: node<T>[] = []
        let st2: node<T>[] = []
        st1.push(this.root)
        while (st1.length < this.numItem) {
            let v: node<T> = st1.pop()
            st2.push(v)
            if (v.right) {
                st1.push(v.right)
            } else {
                st1.push(st2.pop())
                while (!v.left && st1.length < this.numItem) {
                    v = st2.pop()
                    st1.push(v)
                }
                if (v.left) {
                    st1.push(v.left)
                }
            }
        }
        let treeStr: string = ""
        while (st1.length > 0) {
            treeStr += (treeStr.length > 0)? `, ${st1.pop().data}`: `${st1.pop().data}`
        }
        return treeStr
    }

    public toString = (): string => {
        return "[" + this.inOrder() + "]"
    }
}