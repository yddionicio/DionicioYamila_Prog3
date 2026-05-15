import { Carta } from "./Carta.js";


import { Carta } from "./carta.js";

// 4.a. Al momento de cargar la página, se ejecuta la lógica
document.addEventListener("DOMContentLoaded", async () => {
    const urlApi = "https://deckofcardsapi.com/api/deck/new/draw/?count=6";
    const contenedor = document.getElementById("Cartas"); // 4.c. ID corregido según la consigna

    try {
        // 4.a. Un solo fetch para traer las 6 cartas juntas
        const respuesta = await fetch(urlApi);
        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        
        // La API de Deck of Cards devuelve un objeto con un array llamado "cards"
        const listaDeCartasApi = datos.cards;

        // Limpiamos el contenedor por si acaso
        contenedor.innerHTML = "";

        // 4.b. Instanciar objetos de la clase Carta mapeando sus atributos correctos
        const cartasInstanciadas = listaDeCartasApi.map((dato) => {
            return new Carta(
                dato.code,   // string (ej: "6H")
                dato.value,  // string (ej: "6")
                dato.suit,   // string (ej: "HEARTS")
                dato.image   // string (URL de la imagen) - Nota: la API lo devuelve como "image", no "imagen"
            );
        });

        // 4.c. Llamar a createHtmlElement() e insertar en el DOM como hijos de #Cartas
        cartasInstanciadas.forEach((carta) => {
            const elementoHtml = carta.createHtmlElement();
            contenedor.appendChild(elementoHtml);
        });

    } catch (error) {
        alert("Ocurrió un error al cargar el mazo: " + error.message);
    }
});