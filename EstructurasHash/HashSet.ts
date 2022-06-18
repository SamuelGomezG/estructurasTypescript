import { HashFunction } from "./HashFunction";
import { node } from "./Utils";
import { Chain } from "./Utils";

export class HashSet<T extends number|string> {
    table: Chain<T>[]
    hash: HashFunction
    numberOfKeys: number

    /**
     *
     */
    constructor() {
        this.table = [new Chain<T>(), new Chain<T>()]
        this.hash = new HashFunction(2)
        this.numberOfKeys = 0
    }

    private reHash = (): void => {
        let loadFactor = this.numberOfKeys/this.table.length
        if (loadFactor > 0.9) {
            let newTable: Chain<T>[] = []
            for (let i = 0; i < 2 * this.table.length; i++) {
                newTable.push(new Chain<T>())
            }
            let newHash: HashFunction = new HashFunction(newTable.length)
            this.table.forEach((oldChain) => {
                let ref: node<T> = oldChain.head
                while (Object.keys(ref).length != 0) {
                    let key: T = ref.key
                    newTable[newHash.hashObject(key)].append(key)
                    ref = ref.next
                }
            })
            this.table = newTable
            this.hash = newHash
        }
    }

    find = (key: T): boolean => {
        let chain: Chain<T> = this.table[this.hash.hashObject(key)]
        let ref: node<T> = chain.head
        while (Object.keys(ref).length != 0) {
            if (ref.key == key) {
                return true
            }
            ref = ref.next
        }
        return false
    }

    add = (key: T): void => {
        let chain: Chain<T> = this.table[this.hash.hashObject(key)]
        let ref: node<T> = chain.head
        while (Object.keys(ref).length != 0) {
            if (ref.key == key) {
                return
            }
            ref = ref.next
        }
        chain.append(key)
        this.numberOfKeys++
        this.reHash()
    }

    remove = (key: T): void  => {
        if (!this.find(key)) {
            return
        }
        let chain: Chain<T> = this.table[this.hash.hashObject(key)]
        chain.erase(key)
        this.numberOfKeys--
    }

    toString = (): string => {
        let setStr: string = ""
        this.table.forEach((chain) => {
            let ref: node<T> = chain.head
            while (Object.keys(ref).length != 0) {
                setStr += (setStr.length > 0)? `, ${ref.key}`: `${ref.key}`
                ref = ref.next
            }
        })
        return "{" + setStr + "}"
    }
}