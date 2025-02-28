import Articulo from "../Models/Articulo.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir,
    obtenerValorInput,
    validarSesion,
    eventoClickCerrarSesion
 } from "../utils/functions.js";


 const mostrarCardArticulos = (data) => {
    console.log(data);
    // limpiamos el error si existe
    imprimir("articulosContainer-error", "");

    // para cada card de articulos, creamos una instancia de la clase Articulo y la mostramos
    const cardArticulos = data
     .map((articulo) =>(
         new Articulo(
            articulo.id,
            articulo.titulo,
            articulo.colgado,
            articulo.descripcion,
            articulo.destacado,
            articulo.detalle,
            articulo.fecha,
            articulo.imagen,
            articulo.temas.join(", "), // Une el array de temas en un string
            articulo.especie.join(", ") // Une el array de especies en un string
         ).mostrarEnCard()
     )).join("");

     // imprimimos la card de producto en el elemento con id productosContainer
     imprimir("articulosContainer", cardArticulos);
     console.log(cardArticulos);

     console.log(this.imagen); // Debería mostrar la URL de la imagen

         // Agregamos evento click a cada card de productos
    document.querySelectorAll(".card-articulo").forEach((itemCard) => {
        console.log(itemCard)
        itemCard.addEventListener("click", () => {
            // Redirigimos a la página de detalle del producto
            window.location.replace(`articulo.html?id=${itemCard.id}`);
        });
    });
     
 }

 const mostrarError = (error) => {
    imprimir("articulosContainer-error", error);
}


// obtenemos las cards de articulos
RequestsAPI.getArticulos().then(mostrarCardArticulos).catch(mostrarError);