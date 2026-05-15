import { Carta } from "./Carta.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlApi = "https://deckofcardsapi.com/api/deck/new/draw/?count=6";
    const contenedor = document.getElementById("Cartas"); 

    try {
        const respuesta = await fetch(urlApi);
        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
           
        const listaDeCartasApi = datos.cards;
        contenedor.innerHTML = "";
       
        const cartasInstanciadas = listaDeCartasApi.map((dato) => {
            return new Carta(
                dato.code,   
                dato.value,  
                dato.suit,   
                dato.image  
            );
        });

        cartasInstanciadas.forEach((carta) => {
            const elementoHtml = carta.createHtmlElement();
            contenedor.appendChild(elementoHtml);
        });

    } catch (error) {
        alert("Ocurrió un error al cargar el mazo: " + error.message);
    }
});