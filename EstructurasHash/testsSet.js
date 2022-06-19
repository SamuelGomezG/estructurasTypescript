var fs = require("fs")

var set = require("./HashSet.js")

const average = (arr) => {
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        s += arr[i]
    }
    return s / arr.length
}

const insertData = () => {
    let s = new set.HashSet()

    for (let i = 1; i <= 250000; i++) {
        let start = performance.now()
        s.add(i)
        let finish = performance.now()
        let time = finish - start
        fs.appendFileSync("./insercionSet.csv", i + "," + time + "\n")
    }
}

const testInsertion = () => {
    insertData()
}

const search100 = () => {
    let s = new set.HashSet()
    let arr = []
    for (let i = 1; i <= 100; i++) {
        arr.push(i)
    }

    arr.forEach((value) => {
        s.add(value)
    })
    let av = 0

    for (let j = 0; j < 100; j++) {
        let randomN = Math.floor(Math.random() * 100)
        let randomElement = arr[randomN]
        let start = performance.now()
        let searchResult = s.find(randomElement)
        let finish = performance.now()
        let time = finish - start
        av += time*0.01
    }

    fs.appendFileSync("./busquedaSet.csv", 100 + "," + av + "\n")
}

const search1M = () => {
    for (let i = 500; i <= 1000000; i += 500) {
        let s = new set.HashSet()
        let arr = []
        for (let k = 1; k <= i; k++) {
            arr.push(k)
        }

        arr.forEach((value) => {
            s.add(value)
        })

        let av = 0

        for (let j = 0; j < 100; j++) {
            let randomN = Math.floor(Math.random() * i)
            let randomElement = arr[randomN]
            let start = performance.now()
            let searchResult = s.find(randomElement)
            let finish = performance.now()
            let time = finish - start
            av += time*0.01
        }
        fs.appendFileSync("./busquedaSet.csv", i + "," + av + "\n")
    }
}

const something = () => {
    let s = new set.HashSet()
    let arr = []
    for (let i = 1; i <= 1000000; i++) {
        arr.push(i)
        s.add(i)
        if (i == 100 || i % 500 == 0) {
            let av = 0
            for (let j = 0; j < 100; j++) {
                let randomN = Math.floor(Math.random() * i)
                let randomElement = arr[randomN]
                let start = performance.now()
                let searchResult = s.find(randomElement)
                let finish = performance.now()
                let time = finish - start
                av += time*0.01
            }
            fs.appendFileSync("./busquedaSet.csv", i + "," + av + "\n")
        }
    }
}

const testSearch = () => {
    something()
}

testSearch()