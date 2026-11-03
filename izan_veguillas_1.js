/*
* Copyright (c) 2026 Izan Veguillas Pina
*/

const readline = require("readline");

const rl = readline.createInterface({//Opening the interface to make the console interactive
    input: process.stdin,
    output: process.stdout
});

console.log("Bienvenido");
console.log("-----------");
//Initial data gather, we use recursive function to ensure inputs are valid
let nombre = preNombre();
let responsable;
let precio;
let plazas;
let fecha;
let inscripcion;

function preNombre() { //TODO check rl.question no working
    console.log("entro a la function");
    rl.question("Nombre de la actividad: ", (nombre) => {
        console.log("funciono");
        if (nombre != null || nombre != "") {

            console.log("-----------");
            responsable = preResponsable();
            plazas = prePlazas();
            precio = prePrecio();
            fecha = preFecha();
            inscripcion = preIns();

        } else {
            console.log("El nombre no puede estar vacio");
            preNombre();
        }
    });
}



function preResponsable() {
    rl.question("Nombre y apellidos del responsable: ", function (responsable) {

        if (responsable != null || responsable != "") {

            console.log("-----------");
            console.log("Nombre responsable: " + responsable)

        } else {
            console.log("El nombre no puede estar vacio");
        }
    });
}



function prePlazas() {
    rl.question("Numero de plazas:", function (plazas) {

        if (plazas >= 1 || plazas != null || plazas != "") {
            console.log("-----------");
        } else {
            console.log("El numero de plazas no puede ser menor que 1");
        }
    });
}



function prePrecio() {
    rl.question("Precio de inscripcion:", function (precio) {

        if (precio >= 0 || precio != null || precio != "") {
            console.log("-----------");

        } else {
            console.log("El precio no puede ser menor que 0");

        }
    })
}


function preFecha() {
    console.log("Introduce la fecha de inicio de la actividad");
    rl.question("Dia", function (dia) {//isNaN checks if the input is a number, convinient
        if (isNaN(dia) || dia < 1 || dia > 31) {
            console.log("El dia debe ser un numero entre 1 y 31");
            preFecha();
            return;
        }

        rl.question("Mes", function (mes) {
            if (isNaN(mes) || mes < 1 || mes > 12) {
                console.log("El mes debe ser un numero entre 1 y 12");
                preFecha();
                return;
            }

            rl.question("Año", function (anio) {
                if (isNaN(anio) || anio < 2026) {
                    console.log("El año debe ser un numero mayor o igual que 2026");
                    preFecha();
                    return;
                }

                const dateDef = new Date(anio, mes - 1, dia);
                console.log("-----------");
            });
        });
    });
}

function preIns() {
    rl.question("Inscripcion previa requerida (si/no):", function (respuesta) {
        respuesta = respuesta.trim().toLowerCase();

        if (respuesta == "si" || respuesta == "no") {
            console.log("-----------");

            inscripcion = respuesta == "si";//Converts to boolean, since its in a == check it returns true or false
        } else {
            console.log("Valor invalido");
            preIns();
        }
    });
}

console.log("Resumen: " + "\n" + "Nombre: " + nombre.toUpperCase() + "---" + nombre.toLowerCase());//TODO .toUpperCase throws name undefined error (this is due to the question not working)

let charNum = charNumSpaceless(nombre);

function charNumSpaceless(nombre) {//Delete blanks and count the chars

    nombre = nombre.replace(/\s/g, '');

    return nombre.length;
}
console.log("Numero de caracteres: " + charNum)

console.log("Nombre responsable: " + responsable + "id responsable: " + function idResponsible() {

    return responsable.charAt(0) + responsable.split(' ').pop();

}());//Shows responsible name and id based on first name letter and last name

console.log("Numero de plazas: " + Number(plazas));

console.log("Precio inscripcion: " + Number(precio));

console.log("Inscripcion previa requerida: " + function () {//Little anonymous function to make the boolean more legible
    if (inscripcion == true) { return "Si" } else { return "No" }
}());

console.log("Fecha: " + fecha.dia + "/" + fecha.mes + "/" + fecha.anio);

rl.close();
