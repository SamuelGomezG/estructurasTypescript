var fs = require("fs")

var avl = require("./iterativeAVL")

const average = (arr) => {
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        s += arr[i]
    }
    return s/arr.length
}

const insertThousandM = () => {
    let t = new avl.AVL()

    for (let i = 1; i <= 1000000000; i++) {
        let start = performance.now()
        t.insert(i)
        let finish = performance.now()
        let time = finish - start
        fs.appendFileSync("./insercionAVLiterativo.txt", time + "\n")
    }
}

const testInsertion = () => {
    insertThousandM()
}

const search100 = () => {
    let t = new avl.AVL()
    let arr = []
    for (let i = 1; i <= 100; i++) {
        arr.push(i)
    }

    arr.forEach((value) => {
        t.insert(value)
    })

    let times = []

    for (let j = 0; j < 100; j++) {
        let randomN = Math.floor(Math.random() * 100)
        let randomElement = arr[randomN]
        let start = performance.now()
        let searchResult = t.search(randomElement)
        let finish = performance.now()
        let time = finish - start
        times.push(time)
    }

    let av = average(times)
    fs.appendFileSync("./busquedaAVLiterativo.txt", av + "\n")
}

const search1M = () => {
    for (let i = 500; i <= 1000000; i+=500) {
        let t = new avl.AVL()
        let arr = []
        for (let k = 1; k <= i; k++) {
            arr.push(k)
        }

        arr.forEach((value) => {
            t.insert(value)
        })

        let times = []

        for (let j = 0; j < 100; j++) {
            let randomN = Math.floor(Math.random() * i)
            let randomElement = arr[randomN]
            let start = performance.now()
            let searchResult = t.search(randomElement)
            let finish = performance.now()
            let time = finish - start
            times.push(time)
        }

        let av = average(times)
        fs.appendFileSync("./busquedaAVLiterativo.txt", av + "\n")
    }
}

const testSearch = () => {
    search100()
    search1M()
}

testSearch()