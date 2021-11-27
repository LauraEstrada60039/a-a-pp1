console.log("algoritmos voraces");

let cantidades = [];
let max = 1000;
let min = 1;
let totalAPagar = Math.round(Math.random() * (max - min) + min);

function muestra_oculta(id_dos){
    document.getElementById('deuda').innerHTML=totalAPagar;
    let div_dos = document.getElementById(id_dos);
    console.log(div_dos);
    div_dos.style.display = (div_dos.style.display == 'none') ? 'block' : 'none';
}

if (cantidades.length === 0 ) {
    document.getElementById('MensajeCajaVacia').innerHTML='Caja Vacia';
    muestra_oculta('interactuar');
}else {
    document.getElementById('MensajeCajaVacia').innerHTML='';
}

function obtenerValores() {
    var arrayInputs = document.getElementById('denominaciones-cantidad').value;
    if ( arrayInputs === "" || arrayInputs === " " ) {
        alert("No ingresó  la información");
    }else{
        muestra_oculta('interactuar');
        if (arrayInputs[arrayInputs.length-1] === ';' || arrayInputs[arrayInputs.length-1] === ' ') {
            arrayInputs = arrayInputs.split(';'); 
            arrayInputs.splice(arrayInputs.length,1);
            console.log(arrayInputs);
        }else {
            arrayInputs = arrayInputs.split(';'); 
            console.log(arrayInputs);
        }
        for (let i = 0; i < arrayInputs.length; i++) {
            const temporal = arrayInputs[i].split(',');
            const arreglo_objeto = new Map ([['denominacion', parseInt(temporal[0])], ['cantidad', parseInt(temporal[1])]]);
            const obj = Object.fromEntries(arreglo_objeto);
            cantidades.push(obj);
        }
    }
    if (cantidades.length === 0 ) {
        document.getElementById('MensajeCajaVacia').innerHTML='Caja Vacia';
        muestra_oculta('interactuar');
    }else {
        document.getElementById('MensajeCajaVacia').innerHTML='';
    }
}

function pagarDeuda(){
    let div;
    console.log("Veamos los valores del arreglo: ");
    console.log(cantidades);
    console.log("Pagar a :" + document.getElementById('pagoUsuario').value);
    if (document.getElementById('pagoUsuario').value < totalAPagar ) {
        alert("La cantidad que ingresaste no cubre tú deuda");
    }else {
        console.log("Entró");
        let denominacionPago = document.getElementById('pagoUsuario').value;
        let cambio = denominacionPago - totalAPagar;
        // console.log("Usted debe: " + totalAPagar);
        // console.log("Paga con: " + denominacionPago);
        // console.log("Su cambio de resta es: " + cambio);
        document.getElementById('vuelto').innerHTML=cambio;
        for (let i = 0; i < cantidades.length; i++) {
            do {
                if(cantidades[i].denominacion<=cambio){
                    div = document.getElementById("vueltoFor");
                    div.innerHTML += `<span>${cantidades[i].denominacion}</span><br>`;
                    console.log("Su cambio: " + cantidades[i].denominacion);
                    cambio = cambio - cantidades[i].denominacion;
                    console.log("primero: " + cantidades[i].cantidad);
                    cantidades[i].cantidad = cantidades[i].cantidad - 1;
                    console.log("despues: " + cantidades[i].cantidad);
                }
            } while (cantidades[i].denominacion<=cambio);
        }
        console.log("El cambio quedó como: " + cambio);
        if (cambio != 0) {
            div.innerHTML += `<span>Sin cambio, consulte al dueño</span><br>`;
        }
        // cantidades.map(items => {
        //     document.getElementsById('vueltoFor').innerHTML=items[i].denominacion;
        // });
    }
    console.log("Veamos los nuevos valores: ");
    console.log(cantidades);
    setTimeout(function(){
        totalAPagar = Math.round(Math.random() * (max - min) + min);
        document.getElementById('deuda').innerHTML=totalAPagar;
        document.getElementById('vuelto').innerHTML="";
        document.getElementById('formulario_dos').reset();
        document.getElementById('vueltoFor').innerHTML = "";

// Fuente: https://www.iteramos.com/pregunta/50732/como-limpiar-el-contenido-de-un-div-usando-javascript
        // div.innerHTML = `<span></span>`;
        if (cantidades.length === 0 ) {
            document.getElementById('MensajeCajaVacia').innerHTML='Caja Vacia';
            muestra_oculta('interactuar');
        }else {
            document.getElementById('MensajeInicio').innerHTML='';
        }
    }, 10000);
}
