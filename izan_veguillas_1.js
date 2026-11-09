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
//Since idk how to use promises nor waits, lets use callback funtions to make sure data is valid;
preNombre((nombre) => { //The code recursive monolith hell, if the input's right call the nect function to get the rest of the data
    preResponsable((responsable) => {
        prePlazas((plazas) => {
            prePrecio((precio) => {
                preFecha((fecha) => {
                    preIns((inscripcion) => {
                        mostrarResumen(nombre, responsable, plazas, precio, fecha, inscripcion);
                        rl.close();//Closing the interface here so it doest mess up the order of the programm
                    });
                });
            });
        });
    });
});

function preNombre(callback) {
    rl.question("Nombre de la actividad: ", (respuesta) => {//We use a function iside the question to get the user input
        const nombre = respuesta.trim();//Remove unnecessary spaces
        if (nombre.length > 0) {
            callback(nombre); //Calls the next function and nombre is ""saved""
        } else {
            console.log("El nombre no puede estar vacio");
            preNombre(callback);//If the name's invalid call the function back, the user cannot leave until his input is valid, whoopps
        }
    });
}
//We will use the same function structure
function preResponsable(callback) {
    rl.question("Nombre y apellidos del responsable: ", (respuesta) => {
        const responsable = respuesta.trim();
        if (responsable.length > 0) {
            callback(responsable);
        } else {
            console.log("El nombre no puede estar vacio");
            preResponsable(callback);
        }
    });
}

function prePlazas(callback) {
    rl.question("Numero de plazas: ", (respuesta) => {
        const plazas = Number(respuesta);
        if (respuesta.trim() !== "" && Number.isInteger(plazas) && plazas >= 1) {//Checks that plazas is a non empty number higher than 0
        callback(plazas)
        } else {
            console.log("El numero de plazas debe ser un entero mayor que 0");
            prePlazas(callback);
        }
    });
}

function prePrecio(callback) {
    rl.question("Precio de inscripcion: ", (respuesta) => {
        const precio = Number(respuesta);
        if (respuesta.trim() !== "" && Number.isFinite(precio) && precio > 0) {//Again same check as other nums
            callback(precio);
        } else {
            console.log("El precio debe ser un numero mayor que 0");
            prePrecio(callback);
        }
    });
}

function preFecha(callback) {//Asks for day,mothn and year in order to create a date object safely
    console.log("Introduce la fecha de inicio de la actividad");
    rl.question("Dia: ", (diaRespuesta) => {
        const dia = Number(diaRespuesta);
        if (!Number.isInteger(dia) || dia < 1 || dia > 31) {// Check day's valid
            console.log("El dia debe ser un numero entre 1 y 31");
            preFecha(callback);//Restarts function
            return;//we also use return to exit safely, otherwise month would be asked
        }

        rl.question("Mes: ", (mesRespuesta) => {
            const mes = Number(mesRespuesta);
            if (!Number.isInteger(mes) || mes < 1 || mes > 12) {//month will later have a -1 so it will be saved properly
                console.log("El mes debe ser un numero entre 1 y 12");
                preFecha(callback);
                return;
            }

            rl.question("Año: ", (anioRespuesta) => {
                const anio = Number(anioRespuesta);
                const fecha = new Date(anio, mes - 1, dia);//We create the new Date object
                const fechaValida = Number.isInteger(anio) && anio >= 2026//We check that year's a number and we dont allow the creation of events on past years
                    && fecha.getFullYear() === anio
                    && fecha.getMonth() === mes - 1
                    && fecha.getDate() === dia;

                if (!fechaValida) {//If we could create a fechaValida we restart
                    console.log("Introduce una fecha valida a partir del año 2026");
                    preFecha(callback);
                    return;
                }

                callback(fecha);//Next function to get input
            });
        });
    });
}

function preIns(callback) {
    rl.question("Inscripcion previa requerida (si/no): ", (respuesta) => {
        const valor = respuesta.trim().toLowerCase();
        if (valor === "si" || valor === "no") {//we check the input
            const inscripcion = valor === "si";//Create the boolean variable, if its si, as true, else as false
            callback(inscripcion);
        } else {
            console.log("Valor invalido. Escribe si o no");
            preIns(callback);
        }
    });
}

function mostrarResumen(nombre, responsable, plazas, precio, fecha, inscripcion) {
    const nombreResponsable = responsable.split(/\s+/);// We plit responsable by the spaces
    const idResponsable = nombreResponsable[0].charAt(0) + nombreResponsable[nombreResponsable.length - 1];//We create the id with the first name and the last given surname
    const caracteres = nombre.replace(/\s/g, "").length;//Save the characters number without spaces

    console.log("-----------");
    console.log("Resumen:");
    console.log("Nombre: " + nombre.toUpperCase() + "---" + nombre.toLowerCase());
    console.log("Numero de caracteres: " + caracteres);
    console.log("Nombre responsable: " + responsable + " | ID responsable: " + idResponsable);
    console.log("Numero de plazas: " + plazas);
    console.log("Precio inscripcion: " + precio);
    console.log("Inscripcion previa requerida: " + (inscripcion ? "Si" : "No"));//Convinient function to transform true to Si and false to No so its more legible
    console.log("Fecha: " + fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    console.log("Dia de la semana: " + fecha.getDay());
    const hoy = new Date(); // We save todays date, it will be in UTC timezone
    const diasRestantes = Math.round((Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
        - Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())) / (1000 * 60 * 60 * 24));//Converts into miliseconds
    console.log("Dias restantes hasta el evento: " + diasRestantes);
    console.log("Recaudacion max: " + plazas * precio);
    console.log("Precio con descuento 15%: " + precio * 0.85);
    console.log("Grupos de 4: " + plazas / 4);
    console.log("Personas sin grupo: " + plazas % 4);
    console.log("Ejemplo participacion: " +  Math.floor(Math.random() * (plazas + 1)));
}
