import { Carta } from "./Carta.js";

function GuardadosHTML(criterio = null) {
    const datos = localStorage.getItem("cartasGuardadas");
    const contenedor = document.getElementById("contenedorCartas");


    contenedor.innerHTML = "";
    if (!datos) return;

    let cartas = JSON.parse(datos);

    if (criterio === "nombre") {
        cartas.sort((a, b) => a.value.localeCompare(b.value));
    } else if (criterio === "precio") {
        cartas.sort((a, b) => a.suit.localeCompare(b.suit));
    }

    cartas.forEach((carta) => {
        const urlImagen = carta.image || carta.imagen || carta.urlImagen;
        const valorCarta = carta.value || carta.nombre;
        const paloCarta = carta.suit || carta.palo;
        const codigoCarta = carta.code || carta.id;

        const cartaInstanciada = new Carta(
            codigoCarta,
            valorCarta,
            paloCarta,
            urlImagen
        );

        const htmlCarta = cartaInstanciada.createHtmlElement();

        const botonGuardar = htmlCarta.querySelector("button");
        if (botonGuardar) botonGuardar.remove();

        contenedor.appendChild(htmlCarta);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    GuardadosHTML();

    document.getElementById("btnOrdenNombre").addEventListener("click", () => {
        GuardadosHTML("nombre");
    });

    document.getElementById("ordenarMenor").addEventListener("click", () => {
        GuardadosHTML("precio");
    });
});