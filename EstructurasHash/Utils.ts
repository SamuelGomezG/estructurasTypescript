export class node<T extends number|string> {
    key: T
    next: node<T>

    constructor(key: T) {
        this.key = key
        this.next = {} as node<T>
    }
}

export class Key_Value_node<K extends number|string, V extends number|string> {
    key: K
    value: V
    next: Key_Value_node<K, V>

    constructor(key: K, value: V) {
        this.key = key
        this.value = value
        this.next = {} as Key_Value_node<K,V>
    }
}

export class Chain<T extends number|string> {
    head: node<T>
    tail: node<T>

    constructor() {
        this.head = {} as node<T>
        this.tail = {} as node<T>
    }

    append = (key: T): void => {
        let keyNode: node<T>
        keyNode = new node<T>(key)
        if (Object.keys(this.head).length === 0) {
            this.head = this.tail = keyNode
            return
        }
        this.tail.next = keyNode
        this.tail = keyNode
    }

    erase = (key: T): void => {
        let ref: node<T> = this.head
        let prev: node<T> = this.head
        while (ref.key != key && Object.keys(ref).length != 0) {
            prev = ref
            ref = ref.next
        }
        if (Object.keys(ref).length != 0) {
            if (ref == this.head) {
                if (this.head == this.tail) {
                    this.head = this.tail = {} as node<T>
                    return
                }
                this.head = this.head.next
                return
            }
            prev.next = ref.next
            if (ref == this.tail) {
                this.tail = prev
            }
        }
    }
}

export class ValueChain<K extends number|string, V extends number|string> {
    head: Key_Value_node<K,V>
    tail: Key_Value_node<K,V>

    /**
     *
     */
    constructor() {
        this.head = {} as Key_Value_node<K,V>
        this.tail = {} as Key_Value_node<K,V>
    }

    append = (key: K, value: V): void => {
        let elementNode: Key_Value_node<K,V>
        elementNode = new Key_Value_node<K,V>(key, value)
        if (Object.keys(this.head).length === 0) {
            this.head = this.tail = elementNode
            return
        }
        this.tail.next = elementNode
        this.tail = elementNode
    }

    erase = (key: K): void => {
        let ref: Key_Value_node<K,V> = this.head
        let prev: Key_Value_node<K,V> = this.head
        while (ref.key != key && Object.keys(ref).length != 0) {
            prev = ref
            ref = ref.next
        }
        if (Object.keys(ref).length != 0) {
            if (ref == this.head) {
                if (this.head == this.tail) {
                    this.head = this.tail = {} as Key_Value_node<K,V>
                    return
                }
                this.head = this.head.next
                return
            }
            prev.next = ref.next
            if (ref == this.tail) {
                this.tail = prev
            }
        }
    }
}