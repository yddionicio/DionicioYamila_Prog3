import { Carta } from "./carta.js";

async function cargarYMostrarCartas() {
    const urlApi = "https://deckofcardsapi.com/api/deck/new/draw/?count=6";
    
    const contenedor = document.getElementById("cartas"); 

    try {
        const respuesta = await fetch(urlApi);
        
        if (!respuesta.ok) {
            throw new Error(`Error al conectar con la API: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        contenedor.innerHTML = "";
   
        datos.forEach((dato) => {
            
            const nuevaCarta = new Carta(
                dato.code,
                dato.value,
                dato.suit,
                dato.image
            );
            const elementoHtml = nuevaCarta.createHtmlElement();
            contenedor.appendChild(elementoHtml);
        });

    } catch (error) {
        alert("Ocurrió un error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarYMostrarCartas();
});