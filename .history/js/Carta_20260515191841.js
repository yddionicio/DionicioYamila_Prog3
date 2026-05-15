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

}