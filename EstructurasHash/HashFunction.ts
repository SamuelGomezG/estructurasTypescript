export class IntHash {
    prime: number
    cardinality: number
    a: number
    b: number

    constructor(prime: number, cardinality: number) {
        this.prime = prime
        this.cardinality = cardinality
        this.a = Math.floor(Math.random() * (this.prime - 1)) + 1
        this.b = Math.floor(Math.random() * this.prime)
    }

    hashInt = (num: number): number => {
        return ((this.a*num + this.b) % this.prime) % this.cardinality
    }
}

export class StringHash {
    prime: number
    intHash: IntHash
    x: number

    constructor(intHash: IntHash, prime = 100000007) {
        this.prime = prime
        this.x = Math.floor(Math.random() * (this.prime - 1)) + 1
        this.intHash = intHash
    }

    polyHash = (str: string): number => {
        let hash: number = 0
        for (let i = str.length-1; i >= 0; i--) {
            hash = (hash*this.x + str.charCodeAt(i)) % this.prime
        }
        return hash
    }

    hashString = (str: string): number => {
        let strHash: number = this.polyHash(str)
        return this.intHash.hashInt(strHash) 
    }
}

export class HashFunction {
    prime: number
    cardinality: number
    a: number
    b: number
    x: number

    constructor(cardinality: number, prime = 100000007) {
        this.prime = prime
        this.cardinality = cardinality
        this.a = Math.floor(Math.random() * (this.prime - 1)) + 1
        this.b = Math.floor(Math.random() * this.prime)
        this.x = Math.floor(Math.random() * (this.prime - 1)) + 1
    }

    hashObject = (obj: number|string): number => {
        if (typeof obj === 'number') {
            return ((this.a*obj + this.b) % this.prime) % this.cardinality
        } else if (typeof obj === 'string') {
            let hash: number = 0
            for (let i = obj.length-1; i >= 0; i--) {
                hash = (hash*this.x + obj.charCodeAt(i)) % this.prime
            }
            return this.hashObject(hash)
        }
        throw new Error("Tipo invalido");
    }
}