import { HashFunction } from "./HashFunction";
import { Key_Value_node } from "./Utils"
import { ValueChain } from "./Utils";

export class HashMap<K extends number|string, V extends number|string> {
    table: ValueChain<K,V>[]
    hash: HashFunction
    numberOfKeys: number

    /**
     *
     */
    constructor() {
        this.table = [new ValueChain<K,V>(), new ValueChain<K,V>()]
        this.hash = new HashFunction(2)
        this.numberOfKeys = 0
    }

    private rehash = (): void => {
        let loadFactor: number = this.numberOfKeys/this.table.length
        if (loadFactor > 0.9) {
            let newTable: ValueChain<K,V>[] = []
            for (let i = 0; i < 2*this.table.length; i++) {
                newTable.push(new ValueChain<K, V>())
            }
            let newHash: HashFunction = new HashFunction(newTable.length)
            this.table.forEach((oldChain) => {
                let ref: Key_Value_node<K, V> = oldChain.head
                while (Object.keys(ref).length != 0) {
                    let key: K = ref.key
                    let value: V = ref.value
                    newTable[newHash.hashObject(key)].append(key, value)
                    ref = ref.next
                }
            })
            this.table = newTable
            this.hash = newHash
        }
    }

    private find = (key: K): Key_Value_node<K, V>|null => {
        let chain: ValueChain<K, V> = this.table[this.hash.hashObject(key)]
        let ref: Key_Value_node<K, V> = chain.head
        while (Object.keys(ref).length != 0) {
            if (ref.key == key) {
                return ref
            }
            ref = ref.next
        }
        return null
    }

    hasKey = (key: K): boolean => {
        let searchResult: Key_Value_node<K, V>|null = this.find(key)
        if (searchResult != null) {
            return true
        }
        return false
    }

    get = (key: K): V|null => {
        let searchResult: Key_Value_node<K, V>|null = this.find(key)
        if (searchResult != null) {
            return searchResult.value
        }
        return null
    }

    set = (key: K, value: V): void => {
        let chain: ValueChain<K, V> = this.table[this.hash.hashObject(key)]
        let ref: Key_Value_node<K, V> = chain.head
        while (Object.keys(ref).length != 0) {
            if (ref.key == key) {
                ref.value = value
                return
            }
            ref = ref.next
        }
        chain.append(key, value)
        this.numberOfKeys++
        this.rehash()
    }

    remove = (key: K): void => {
        if (!this.hasKey(key)) {
            return
        }
        let chain: ValueChain<K, V> = this.table[this.hash.hashObject(key)]
        chain.erase(key)
        this.numberOfKeys--
    }

    toString = (): string => {
        let mapStr: string = ""
        this.table.forEach((chain) => {
            let ref: Key_Value_node<K, V> = chain.head
            while (Object.keys(ref).length != 0) {
                mapStr += (mapStr.length)? `, ${ref.key}: ${ref.value}`: `${ref.key}: ${ref.value}`
                ref = ref.next
            }
        })
        return "{" + mapStr + "}"
    }
}