var fs = require("fs")

var bst = require("./pruebabst");
var avl = require("./pruebaAVL");
var heap = require("./pruebaHeap");

function average(arr) {
    let s = 0
    for (let i = 0; i < arr.length; i++) {
        s += arr[i]
    }
    return s/arr.length
}

function searchElement(tree, item) {
    let result = tree.search(item)
    return result
}

function test100bst() {
    var t = new bst.BinarySearchTree()
    var arr = []
    for (let i = 1; i <= 100; i++) {
        arr.push(i)
    }

    arr.forEach(function(value) {
        t.insert(value)
    })

    var times = []

    for (let j = 0; j < 100; j++) {
        let randomN = Math.floor(Math.random() * 100)
        let randomElement = arr[randomN]
        let start = performance.now()
        let searchNode = searchElement(t, randomElement)
        let finish = performance.now()
        let time = finish - start
        times.push(time)
    }

    let av = average(times);
    fs.appendFileSync("./promedioprueba2.txt", av.toString() + "\n")
}

function testRestbst() {
    for (let i = 500; i <= 1000000; i+=500) {
        let t = new bst.BinarySearchTree()
        let arr = []
        for (let k = 1; k <= i; k++) {
            arr.push(k)
        }

        arr.forEach(function(value) {
            t.insert(value)
        })

        let times = []

        for (let j = 0; j < 100; j++) {
            let randomN = Math.floor(Math.random() * i)
            let randomElement = arr[randomN]
            let start = performance.now()
            let searchNode = searchElement(t, randomElement)
            let finish = performance.now()
            let time = finish - start
            times.push(time)
        }

        let av = average(times)
        fs.appendFileSync("./promedioprueba2.txt", av.toString() + "\n")
    }
}

function test100AVL() {
    let t = new avl.AVL()
    var arr = []
    for (let i = 1; i <= 100; i++) {
        arr.push(i)
    }

    arr.forEach(function(value) {
        t.insert(value)
    })

    var times = []

    for (let j = 0; j < 100; j++) {
        let randomN = Math.floor(Math.random() * 100)
        let randomElement = arr[randomN]
        let start = performance.now()
        let searchNode = t.search(randomElement)
        let finish = performance.now()
        let time = finish - start
        times.push(time)
    }

    let av = average(times);
    fs.appendFileSync("./promedioprueba4.txt", av + "\n")
}

function testRestAVL() {
    for (let i = 500; i <= 1000000; i+=500) {
        let t = new avl.AVL()
        let arr = []
        for (let k = 1; k <= i; k++) {
            arr.push(k)
        }

        arr.forEach(function(value) {
            t.insert(value)
        })

        let times = []

        for (let j = 0; j < 100; j++) {
            let randomN = Math.floor(Math.random() * i)
            let randomElement = arr[randomN]
            let start = performance.now()
            let searchNode = t.search(randomElement)
            let finish = performance.now()
            let time = finish - start
            times.push(time)
        }

        let av = average(times)
        fs.appendFileSync("./promedioprueba4.txt", av + "\n")
    }
}

function test100Heap() {
    let h = new heap.Heap()
    let arr = []
    for (let i = 1; i <= 100; i++) {
        arr.push(i)
    }

    arr.forEach(function(value) {
        h.insert(value)
    })

    let times = []

    for (let j = 0; j < 100; j++) {
        let randomN = Math.floor(Math.random() * 100)
        let randomElement = arr[randomN]
        let start = performance.now()
        let searchIndex = h.search(randomElement)
        let finish = performance.now()
        let time = finish - start
        times.push(time)
    }

    let av = average(times)
    fs.appendFileSync("./promedioprueba3.txt", av + "\n")
}

function testRestHeap() {
    for (let i = 500; i <= 1000000; i += 500) {
        let h = new heap.Heap()
        let arr = []
        for (let i = 1; i <= 100; i++) {
            arr.push(i)
        }

        arr.forEach(function(value) {
            h.insert(value)
        })

        let times = []

        for (let j = 0; j < 100; j++) {
            let randomN = Math.floor(Math.random() * 100)
            let randomElement = arr[randomN]
            let start = performance.now()
            let searchIndex = h.search(randomElement)
            let finish = performance.now()
            let time = finish - start
            times.push(time)
        }

        let av = average(times)
        fs.appendFileSync("./promedioprueba3.txt", av + "\n")
    }
}

test100AVL()
testRestAVL()