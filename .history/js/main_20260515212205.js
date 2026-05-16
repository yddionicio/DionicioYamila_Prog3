import { Carta } from "./Carta.js";

let paginaActual = 1;
const cartasPagina = 6;
let deckId = null;

// 1. AQUÍ DECLARÁS LA FUNCIÓN RECIBIENDO LA PÁGINA
async function cargarCartas(pagina) { 
    try {
        // Si es la primera vez, generamos el mazo
        if (!deckId) {
            const resInicial = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            const datosIniciales = await resInitial.json();
            deckId = datosIniciales.deck_id;
        }

        // NOTA: Aunque la API no use el número de página directamente, 
        // tu función interna ya está recibiendo el número (por ejemplo: 1, 2, 3...)
        console.log("Cargando la página número: " + pagina); 

        const respuesta = await fetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cartasPagina}`
        );

        if (!respuesta.ok) {
            alert("Las cartas no se cargaron, 404");
            return;
        }

        const dato = await respuesta.json();
        const contenedor = document.getElementById("cartas");
        contenedor.innerHTML = "";

        dato.cards.forEach((datoCarta) => {
            const carta = new Carta(
                datoCarta.code,
                datoCarta.value,
                datoCarta.suit,
                datoCarta.image
            );
            contenedor.appendChild(carta.createHtmlElement());
        });

    } catch (error) {
        alert("ocurrio un error: " + error.message);
    }
}

// 2. AQUÍ LLAMÁS A LA FUNCIÓN PASÁNDOLE LA PÁGINA ACTUAL ACTUALIZADA
function paginaSiguiente() {
    if (paginaActual * cartasPagina < 52) {
        paginaActual++; // Incrementamos
        cargarCartas(paginaActual); // <--- LLAMADO 1: Le pasamos la nueva página (ej: 2)
    } else {
        alert("Esta es la última página");
    }
}

function paginaAtras() {
    if (paginaActual > 1) {
        paginaActual--; // Decrementamos
        cargarCartas(paginaActual); // <--- LLAMADO 2: Le pasamos la nueva página (ej: 1)
    } else {
        alert("No podés retroceder más de la 1ra página");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 3. LLAMADO INICIAL: Cuando abre la web, arranca en la página 1
    cargarCartas(paginaActual); 

    document.getElementById("siguiente").addEventListener("click", paginaSiguiente);
    document.getElementById("anterior").addEventListener("click", paginaAtras);
});