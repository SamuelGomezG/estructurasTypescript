let name: string = "Pedro"
const sum = (x: number, y: number): number => {
    return x + y
}
console.log(sum(10,20))
class individual {
    name: string
    id: number
    hairColor: string
    
    constructor(name: string, id: number, hairColor: string) {
        this.name = name
        this.id = id
        this.hairColor = hairColor
    }

    greet(): void {
        console.log(`Hola, mi nombre es ${this.name}. Mi id es ${this.id}. Y mi color de cabello es ${this.hairColor}`)
    }
}

let pedro = new individual("Pedro", 1023, "Negro")
pedro.greet()