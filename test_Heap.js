var fs = require("fs")

var heap = require("./pruebaHeap.js")

const average = (arr) => {
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        s += arr[i]
    }
    return s / arr.length
}

const insertData = () => {
    let h = new heap.Heap()

    for (let i = 1; i <= 250000; i++) {
        let start = performance.now()
        h.insert(i)
        let finish = performance.now()
        let time = finish - start
        fs.appendFileSync("./insercionHeap.txt", time + "\n")
    }
}

const testInsertion = () => {
    insertData()
}

const search100 = () => {
    let h = new heap.Heap()
    let arr = []
    for (let i = 1; i <= 100; i++) {
        arr.push(i)
    }

    arr.forEach((value) => {
        h.insert(value)
    })

    var times = []

    for (let j = 0; j < 100; j++) {
        let randomN = Math.floor(Math.random() * 100)
        let randomElement = arr[randomN]
        let start = performance.now()
        let searchResult = h.search(randomElement)
        let finish = performance.now()
        let time = finish - start
        times.push(time)
    }

    let av = average(times)
    fs.appendFileSync("./busquedaHeap.txt", av + "\n")
}

const search1M = () => {
    for (let i = 500; i <= 1000000; i += 500) {
        let h = new heap.Heap()
        let arr = []
        for (let k = 1; k <= i; k++) {
            arr.push(k)
        }

        arr.forEach((value) => {
            h.insert(value)
        })

        var times = []

        for (let j = 0; j < 100; j++) {
            let randomN = Math.floor(Math.random() * 100)
            let randomElement = arr[randomN]
            let start = performance.now()
            let searchResult = h.search(randomElement)
            let finish = performance.now()
            let time = finish - start
            times.push(time)
        }

        let av = average(times)
        fs.appendFileSync("./busquedaHeap.txt", av + "\n")
    }
}

const testSearch = () => {
    search100()
    search1M()
}

testInsertion()
testSearch()