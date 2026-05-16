import { Carta } from "./Carta.js";

function GuardadosHTML(criterio = null) {
    const datos = localStorage.getItem("cartasGuardadas");
    const contenedor = document.getElementById("contenedorCartas");


    contenedor.innerHTML = "";
    if (!datos) return;

    let cartas = JSON.parse(datos);

if (criterio === "nombre") {
    cartas.sort((a, b) => {
      const valA = a.value || a.nombre || "";
      const valB = b.value || b.nombre || "";
      return valA.localeCompare(valB);
    });
  } else if (criterio === "precio") {
    cartas.sort((a, b) => {
      const suitA = a.suit || a.palo || "";
      const suitB = b.suit || b.palo || "";
      return suitA.localeCompare(suitB);
    });
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