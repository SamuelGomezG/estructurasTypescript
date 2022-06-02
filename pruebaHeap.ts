export class Heap<T> {
    arr: T[]
    size: 0

    constructor() {
        this.arr = []
        this.size = 0
    }

    private swap = (indexA: number, indexB: number): void => {
        let temp: T = this.arr[indexA]
        this.arr[indexA] = this.arr[indexB]
        this.arr[indexB] = temp
    }

    private leftChild = (index: number): number => {
        return 2 * index + 1
    }

    private rightChild = (index: number): number => {
        return 2 * (index + 1)
    }

    private parent = (index: number): number => {
        return (index > 0)? Math.floor((index - 1) / 2): 0
    }

    private siftUp = (index: number): void => {
        let parent: number = this.parent(index)
        while (this.arr[index] > this.arr[parent]) {
            this.swap(index, parent)
            index = parent
            parent = this.parent(index)
        }
    }

    private siftDown = (index: number): void => {
        let maxi: number = index
        let li: number = this.leftChild(index)
        let ri: number = this.rightChild(index)
        if (li < this.size && this.arr[li] > this.arr[maxi]) {
            maxi = li
        }
        if (ri < this.size && this.arr[ri] > this.arr[maxi]) {
            maxi = ri
        }
        if (maxi != index) {
            this.swap(index, maxi)
            this.siftDown(maxi)
        }
    }

    insert = (item: T): void => {
        this.arr.push(item)
        this.siftUp(this.size)
        this.size += 1
    }

    extractMax = (): T => {
        if (this.arr.length == 0) {
            throw new Error("Cola de prioridad vacía.");
        }
        let result: T = this.arr[0]
        this.size -= 1
        this.swap(0, this.size)
        this.siftDown(0)
        return result
    }

    getMax = (): T => {
        if (this.arr.length == 0) {
            throw new Error("Cola de prioridad vacía.");
        }
        return this.arr[0]
    }

    changePriority = (index: number, newPriority: T): void => {
        let oldPriority: T = this.arr[index]
        this.arr[index] = newPriority
        if (newPriority > oldPriority) {
            this.siftUp(index)
        }
        else if (newPriority < oldPriority) {
            this.siftDown(index)
        }
    }

    remove = (index: number): void => {
        this.arr[index] = this.getMax()
        this.siftUp(index)
        this.extractMax()
    }

    search = (item: T): number => {
        for (let i = 0; i < this.size; i++) {
            if (this.arr[i] == item) {
                return i
            }
        }
        return -1
    }

    public toString = (): string => {
        let heapStr: string = "["
        for (let i = 0; i < this.size; i++) {
            heapStr += (i > 0)? `, ${this.arr[i]}`: `${this.arr[i]}`
        }
        return heapStr + "]"
    }
}

const main = (): void => {
    let h: Heap<number> = new Heap<number>()
    let arr: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    arr.forEach(function(value) {
        h.insert(value)
    })
    console.log("" + h)
    h.remove(3)
    console.log("" + h)
    h.changePriority(7, 20)
    console.log("" + h)
}
console.time('main')
main()
console.timeEnd('main')