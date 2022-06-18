var sexo = /** @class */ (function () {
    function sexo(sex) {
        var _this = this;
        this.printSexo = function () {
            console.log(_this.sex);
        };
        this.sex = sex;
    }
    return sexo;
}());
var arr = [{}, {}];
var arr2 = arr.map(function (value) { return (new sexo("Si")); });
arr2.forEach(function (value) {
    value.printSexo();
});
