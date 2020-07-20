var carList:any = [];
var car:Car;

let addCarForm:any = document.getElementById('addCar');
let addWheelForm:any = document.getElementById('addWheels');


function createCar(plate:string,brand:string,color:string){
    let plateInput:any = plate;
    let plateId:any = document.getElementById('plate');
    let brandId:any = document.getElementById('brand');
    let colorId:any = document.getElementById('color');

    if (plateInput == ""){
        console.log(plate);
        plateId.classList.add('is-invalid');
    } else if (!validatePlate(plate)){
        plateId.classList.add('is-invalid');
    } else if (brand == ""){
        brandId.classList.add('is-invalid');
    } else if (color == "") {
        colorId.classList.add('is-invalid');
    } else {
        car=new Car(plate,color,brand);
        carList.push(car);
        
        alert("El coche se ha creado correctamente: \nMATRÍCULA: " + plate 
        + "\nCOLOR: " +color + "\nMARCA: " + brand );  

        //Dejar de ver el primer formulario
        addCarForm.classList.remove('d-flex');
        addCarForm.classList.add('d-none');
 
        //Visualizar siguiente formulario:
        addWheelForm.classList.remove('d-none');

        writeCar()
    }
}

function validatePlate(plate:string){
    let plateRegEx: any = /^[0-9]{4}[a-z]{3}$/;
    return plateRegEx.test(plate) ? true : false;
}

let list:any = document.getElementById('product-list');
let info:any = document.getElementById('carList');

function writeCar(){
    //Para visualizar el div con el listado de coches
    info.classList.remove('d-none');

    //Para visualizar el listado de coches
    if(car.wheels.length < 1){
    list.innerHTML= `
        <div class="row col-12 border-bottom border-warning m-0">
            <div class="col-3 p-0"><h5>COCHE: </h5></div>
        </div>
        <div class="row col-12 mt-3">
            <div class="col-3"><span class="font-weight-bold">MATRÍCULA:</span> 
            ${car.plate} </div>
            <div class="col-3"><span class="font-weight-bold">COLOR:</span> 
            ${car.color} </div>
            <div class="col-3"><span class="font-weight-bold">MARCA: </span> 
            ${car.brand} </div>
        </div>
        `;
    } else {
        list.innerHTML= `
        <div class="row col-12 border-bottom border-warning m-0">
            <div class="col-3 p-0"><h5>COCHE: </h5></div>
        </div>
        <div class="row col-12 mt-3">
            <div class="col-3"><span class="font-weight-bold">MATRÍCULA:</span> 
            ${car.plate} </div>
            <div class="col-3"><span class="font-weight-bold">COLOR:</span> 
            ${car.color} </div>
            <div class="col-3"><span class="font-weight-bold">MARCA: </span> 
            ${car.brand} </div>
        </div>
        
        <div class="row col-12 mt-3">
            <div class="col-3"><div class="font-weight-bold">RUEDA 1:</div> 
                Marca: ${car.wheels[0].brand} 
                Diámetro: ${car.wheels[0].diameter}</div>
            <div class="col-3"><div class="font-weight-bold">RUEDA 2:</div>
                Marca: ${car.wheels[1].brand}
                Diámetro: ${car.wheels[1].diameter} </div>
            <div class="col-3"><div class="font-weight-bold">RUEDA 3:</div>
                Marca: ${car.wheels[2].brand}
                Diámetro: ${car.wheels[2].diameter} </div>
            <div class="col-3"><div class="font-weight-bold">RUEDA 4:</div>
                Marca: ${car.wheels[3].brand}
                Diámetro: ${car.wheels[3].diameter} </div>
        </div>
        `;
    }

}


//WHEELS
function addCarWheels() {

    checkWheels();

    if(checkWheels()){
        for (let i=1;  i<=4;  i++){
            let brand:any = (<HTMLInputElement>document.getElementById('brand'+ i)).value;
            let diameter:any = (<HTMLInputElement>document.getElementById('diameter'+i)).value;

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
    let accumError:number = 0;

    for(let j=1;  j<=4;  j++){
        let diameter:any = document.getElementById('diameter'+j);
        let diameterValue:any = (<HTMLInputElement>document.getElementById('diameter'+j)).value;

        if(diameterValue<0.4 || diameterValue>2){
        diameter.classList.add('is-invalid');
        accumError=+1;
        } else if (diameter.classList.contains('is-invalid')){
            diameter.classList.remove('is-invalid');
        }
    }



    if (accumError > 0){
        return false;
    } else {
        return true;
    }
}