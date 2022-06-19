var fs = require("fs")

var map = require("./HashMap.js")

const insertData = () => {
    let s = new map.HashMap()

    for (let i = 1; i <= 250000; i++) {
        let start = performance.now()
        s.set(i, "Ok")
        let finish = performance.now()
        let time = finish - start
        fs.appendFileSync("./insercionMap.csv", i + "," + time + "\n")
    }
}

const searchData = () => {
    let m = new map.HashMap()
    let arr = []
    for (let i = 1; i <= 1000000; i++) {
        arr.push(i)
        m.set(i, "Ok")
        if (i == 100 || i % 500 == 0) {
            let av = 0
            for (let j = 0; j < 100; j++) {
                let randomN = Math.floor(Math.random() * i)
                let randomElement = arr[randomN]
                let start = performance.now()
                let searchResult = m.get(randomElement)
                let finish = performance.now()
                let time = finish - start
                av += time*0.01
            }
            fs.appendFileSync("./busquedaMap.csv", i + "," + av + "\n")
        }
    }
}

insertData()
searchData()