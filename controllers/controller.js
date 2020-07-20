"use strict";
var carList = [];
var car;
var addCarForm = document.getElementById('addCar');
var addWheelForm = document.getElementById('addWheels');
function createCar(plate, brand, color) {
    var plateInput = plate;
    var plateId = document.getElementById('plate');
    var brandId = document.getElementById('brand');
    var colorId = document.getElementById('color');
    if (plateInput == "") {
        console.log(plate);
        plateId.classList.add('is-invalid');
    }
    else if (!validatePlate(plate)) {
        plateId.classList.add('is-invalid');
    }
    else if (brand == "") {
        brandId.classList.add('is-invalid');
    }
    else if (color == "") {
        colorId.classList.add('is-invalid');
    }
    else {
        car = new Car(plate, color, brand);
        carList.push(car);
        alert("El coche se ha creado correctamente: \nMATRÍCULA: " + plate
            + "\nCOLOR: " + color + "\nMARCA: " + brand);
        //Dejar de ver el primer formulario
        addCarForm.classList.remove('d-flex');
        addCarForm.classList.add('d-none');
        //Visualizar siguiente formulario:
        addWheelForm.classList.remove('d-none');
        writeCar();
    }
}
function validatePlate(plate) {
    var plateRegEx = /^[0-9]{4}[a-z]{3}$/;
    return plateRegEx.test(plate) ? true : false;
}
var list = document.getElementById('product-list');
var info = document.getElementById('carList');
function writeCar() {
    //Para visualizar el div con el listado de coches
    info.classList.remove('d-none');
    //Para visualizar el listado de coches
    if (car.wheels.length < 1) {
        list.innerHTML = "\n        <div class=\"row col-12 border-bottom border-warning m-0\">\n            <div class=\"col-3 p-0\"><h5>COCHE: </h5></div>\n        </div>\n        <div class=\"row col-12 mt-3\">\n            <div class=\"col-3\"><span class=\"font-weight-bold\">MATR\u00CDCULA:</span> \n            " + car.plate + " </div>\n            <div class=\"col-3\"><span class=\"font-weight-bold\">COLOR:</span> \n            " + car.color + " </div>\n            <div class=\"col-3\"><span class=\"font-weight-bold\">MARCA: </span> \n            " + car.brand + " </div>\n        </div>\n        ";
    }
    else {
        list.innerHTML = "\n        <div class=\"row col-12 border-bottom border-warning m-0\">\n            <div class=\"col-3 p-0\"><h5>COCHE: </h5></div>\n        </div>\n        <div class=\"row col-12 mt-3\">\n            <div class=\"col-3\"><span class=\"font-weight-bold\">MATR\u00CDCULA:</span> \n            " + car.plate + " </div>\n            <div class=\"col-3\"><span class=\"font-weight-bold\">COLOR:</span> \n            " + car.color + " </div>\n            <div class=\"col-3\"><span class=\"font-weight-bold\">MARCA: </span> \n            " + car.brand + " </div>\n        </div>\n        \n        <div class=\"row col-12 mt-3\">\n            <div class=\"col-3\"><div class=\"font-weight-bold\">RUEDA 1:</div> \n                Marca: " + car.wheels[0].brand + " \n                Di\u00E1metro: " + car.wheels[0].diameter + "</div>\n            <div class=\"col-3\"><div class=\"font-weight-bold\">RUEDA 2:</div>\n                Marca: " + car.wheels[1].brand + "\n                Di\u00E1metro: " + car.wheels[1].diameter + " </div>\n            <div class=\"col-3\"><div class=\"font-weight-bold\">RUEDA 3:</div>\n                Marca: " + car.wheels[2].brand + "\n                Di\u00E1metro: " + car.wheels[2].diameter + " </div>\n            <div class=\"col-3\"><div class=\"font-weight-bold\">RUEDA 4:</div>\n                Marca: " + car.wheels[3].brand + "\n                Di\u00E1metro: " + car.wheels[3].diameter + " </div>\n        </div>\n        ";
    }
}
//WHEELS
function addCarWheels() {
    checkWheels();
    if (checkWheels()) {
        for (var i = 1; i <= 4; i++) {
            var brand = document.getElementById('brand' + i).value;
            var diameter = document.getElementById('diameter' + i).value;
            car.addWheel(new Wheel(brand, diameter));
        }
        //Dejar de ver el primer formulario
        addWheelForm.classList.remove('d-flex');
        addWheelForm.classList.add('d-none');
        addWheelForm.reset();
        //Visualizar siguiente formulario:
        addCarForm.classList.remove('d-none');
        addCarForm.reset();
        writeCar();
    }
}
function checkWheels() {
    var accumError = 0;
    for (var j = 1; j <= 4; j++) {
        var diameter = document.getElementById('diameter' + j);
        var diameterValue = document.getElementById('diameter' + j).value;
        if (diameterValue < 0.4 || diameterValue > 2) {
            diameter.classList.add('is-invalid');
            accumError = +1;
        }
        else if (diameter.classList.contains('is-invalid')) {
            diameter.classList.remove('is-invalid');
        }
    }
    if (accumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
