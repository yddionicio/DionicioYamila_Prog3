export class Carta {
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
     
        const titulo = document.createElement("h3");
        titulo.textContent = `${this.value} de ${this.suit}`;

        const codigo = document.createElement("p");
        codigo.textContent = `Código: ${this.code}`;

        const img = document.createElement("img");
        img.src = this.imagen; 
        img.alt = `Carta ${this.value} de ${this.suit}`;
        img.style.maxWidth = "150px";

        const url = document.createElement("a");
        url.href = this.imagen; 
        url.target = "_blank"; 
        url.appendChild(img);

        div.appendChild(titulo);
        div.appendChild(codigo);
        div.appendChild(url);

        const botonGuardar = document.createElement("button");
        botonGuardar.textContent = "Guardar";
        botonGuardar.className = "btn btn-primary btn-sm mt-auto";
        botonGuardar.onclick = () => Carta.guardarCarta(this);
        div.appendChild(botonGuardar);

        return div;
    }


     static guardarCarta(carta) {
    const cartasGuardadas =
      JSON.parse(localStorage.getItem("cartasGuardadas")) || [];
    cartasGuardadas.push(carta);
    localStorage.setItem("cartasGuardadas", JSON.stringify(cartasGuardadas)); //persistencia para que viva en el codigo
    console.log("las cartas fueron cargadas");
    console.log(cartasGuardadas);
  }


}