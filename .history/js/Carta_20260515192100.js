class Carta{
    constructor(code, value, suit, imagen) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(jsonString) {
        const data = JSON.parse(jsonString);
        return new Carta(data.code, data.value, data.suit, data.imagen);
    }


createHtmlElement() {
    const div = document.createElement("div");
    div.className = "carta";
    div.style.maxWidth = "200px";

    // Reemplazamos 'titulo' por el valor y palo de la carta (ej: "ACE of SPADES")
    const titulo = document.createElement("h3");
    titulo.textContent = `${this.value} de ${this.suit}`;

    // Reemplazamos 'precio' por el código único de la carta
    const codigo = document.createElement("p");
    codigo.textContent = `Código: ${this.code}`;

    const img = document.createElement("img");
    img.src = this.imagen; // Atributo correcto del enunciado
    img.alt = `Carta ${this.value} de ${this.suit}`;
    img.style.maxWidth = "150px";

    const url = document.createElement("a");
    url.href = this.imagen; // Hace referencia a la URL de la imagen para verla en grande
    url.target = "_blank"; // Abre una nueva ventana
    url.appendChild(img);

    // Mantenemos tu orden de appendChild
    div.appendChild(titulo);
    div.appendChild(codigo);
    div.appendChild(url);

    // Mantenemos tu botón de guardar con clases de Bootstrap
    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonGuardar.className = "btn btn-primary btn-sm mt-auto";
    botonGuardar.onclick = () => Carta.guardarCarta(this); 
    div.appendChild(botonGuardar);

    return div;
}


}