import { Carta } from "./Carta.js";

let historialCartas = [];

async function cargarCartas() {
    const listaCarta = [];

    for (let i = 1; i <= 6; i++) {
        listaCarta.push(
           
            fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=6`)
                .then((res) => {
                    if (res.status != 200) {
                        throw new Error(`No se cargó la carta ${i}`);
                    }
                    return res.json();
                })
                .then((objetoJson) => {
                    return objetoJson.cards[0]; 
                })
        );
    }

    try {
        const datosCarta = await Promise.all(listaCarta);
        const contenedor = document.getElementById("cartas"); 
        contenedor.innerHTML = "";
       
        const cartas = datosCarta.map((dato) => {
            return new Carta(
                dato.code,   
                dato.value,  
                dato.suit,  
                dato.image 
            );
        });
        cartas.forEach((carta) => {
            const elemento = carta.createHtmlElement();
            contenedor.appendChild(elemento);
        });

    } catch (error) {
        alert("Ocurrio un error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCartas();

    document.getElementById("anterior").addEventListener("click", paginaAnterior);
    document.getElementById("siguiente").addEventListener("click", siguientePagina);
});

async function siguientePagina() {
    // Calculamos el total de páginas posibles (52 cartas / 6 por página = 9 páginas)
    const totalPaginas = Math.ceil(totalDeCartas / cartasPorPagina); 

    if (paginaActual < totalPaginas) {
        paginaActual++;
        
        // Si la página que queremos ver YA está en el historial, la cargamos directo
        if (historialCartas[paginaActual - 1]) {
            renderizarCartasLocales(historialCartas[paginaActual - 1]);
        } else {
            // Si es una página nueva, llamamos a la API normalmente
            await cargarCartas(paginaActual);
        }
    } else {
        alert("Esta es la última página");
    }
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        
        // Al ir atrás, el 100% de las veces las cartas ya existen en el historial.
        // Las mostramos desde la memoria de JS, sin tocar la API ni mezclar el mazo.
        const cartasDeLaPagina = historialCartas[paginaActual - 1];
        renderizarCartasLocales(cartasDeLaPagina);
        
    } else {
        alert("No podés retroceder más de la 1ra página");
    }
}


// ... adentro de tu cargarCartas, justo después de recibir el JSON de la API:
const dato = await respuesta.json();

// GUARDAMOS LAS CARTAS EN EL HISTORIAL (asociadas a la página actual)
historialCartas[pagina - 1] = dato.cards; 

// ... y después seguís con tu forEach como siempre para dibujarlas

