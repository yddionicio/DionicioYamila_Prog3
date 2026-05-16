import { Carta } from "./Carta.js";


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




function paginaSiguiente(){
    paginaActual++;
    cargarCartas(paginaActual);
}

function paginaAnterior(){
    paginaActual--;
    cargarCartas(paginaActual);
}
