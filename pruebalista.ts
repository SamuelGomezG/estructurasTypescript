class sexo {
    sex: string

    constructor(sex: string) {
        this.sex = sex
    }

    printSexo = (): void => {
        console.log(this.sex)
    }
}

let arr: sexo[] = [{} as sexo, {} as sexo]
let arr2 = arr.map((value) => (new sexo("Si")))
arr2.forEach((value) => {
    value.printSexo()
})