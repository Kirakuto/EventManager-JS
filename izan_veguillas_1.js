const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bienvenido");
console.log("-----------");


let nombre = preNombre();

function preNombre(){
    rl.question("Nombre de la actividad: ", function (nombre) {

        if (nombre != null || nombre != "") {

            console.log("-----------");

        } else {
            console.log("El nombre no puede estar vacio");
            preNombre();
        }
    });
}

let responsable = preResponsable();

function preResponsable(){
    rl.question("Nombre y apellidos del responsable: ", function (responsable) {

        if (responsable != null || responsable != "") {

            console.log("-----------");
            console.log("Nombre responsable: " + responsable)

        } else {
            console.log("El nombre no puede estar vacio");
        }
    });
}

let plazas = prePlazas();

function prePlazas(){
    rl.question("Numero de plazas:", function (plazas) {

        if (plazas >= 1 || plazas != null || plazas != "") {
            console.log("-----------");
        } else {
            console.log("El numero de plazas no puede ser menor que 1");
        }
    });
}

let precio = prePlazas();

function prePrecio(){
    rl.question("Precio de inscripcion:", function (precio) {

        if (precio >= 0 || precio != null || precio != "") {
            console.log("-----------");

        } else {
            console.log("El precio no puede ser menor que 0");

        }
    })
} 

do {
    //Vamos a preguntar por cada apartado por separado para facilitar la creacion del objeto Date
    console.log("Introduce la fecha de inicio de la actividad");
    rl.question("Dia", function (dia) {
        //Revisamos que dia se un NUMERO y sea valido

        for (let i = 0; i < dia.length; i++) {
            if (isNaN(dia[i])) {
                console.log("El dia debe ser un numero");
                valid = false;
            }
        }

        if ((valido != false) && dia >= 1 && dia <= 31) {

            rl.question("Mes", function (mes) {
                for (let i = 0; i < mes.length; i++) {
                    if (isNaN(mes[i])) {
                        console.log("El mes debe ser un numero");
                        valid = false;
                    }

                    if(valid != false && mes >= 1 && mes <= 12) {
                        
                        rl.question("Año", function (anio) {
                            for (let i = 0; i < anio.length; i++) {
                                if (isNaN(anio[i])) {
                                    console.log("El año debe ser un numero");
                                    valid = false;
                                }

                                if(valid != false && anio >= 2026) {

                                    const dateDef = new Date(anio, mes - 1, dia);
                                    console.log("-----------");
                                    valid = true;
                                }
                            }
                        })
                    }
                }
            })
        }
    })
} while (valid == false);
valid = false;

do {
    rl.question("Inscripcion previa requerida (si/no):", function (inscripcion) {

        if (inscripcion == "si" || inscipcion == "no") {
            console.log("-----------");
            valid = true;
        } else {
            console.log("Valor invalido");
            valid = false;
        }
    });
} while (valid == false);
valid = false;

rl.close();

