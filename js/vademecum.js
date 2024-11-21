import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestaAPI.js";
import { imprimir,
    obtenerValorInput,
    validarSesion,
    eventoClickCerrarSesion
 } from "../utils/functions.js";

 // validamos la sesión del usuario
//validarSesion();
// agregamos evento click al botón de cerrar sesión
//eventoClickCerrarSesion();

// function para mostrar las cards de productos

const mostrarCardProductos =(data) =>{
    console.log(data);
    // limpiamos el error si existe
    imprimir("productosContainer-error", "");

     // para cada card de producto, creamos una instancia de la clase Producto y la mostramos

     const cardProductos = data
     .map((producto) =>(
         new Producto(
            producto.id,
            producto.nombre,
            producto.colgado,
            producto.informacion,
            producto.dosificacion,
            producto.composicion,
            producto.tiempos,
            producto.especies,
            producto.presentacion,
            producto.registro,
            producto.imagen,
            producto.advertencias,
            producto.recomendaciones,
            producto.calculadora,
            producto.lineaterapeutica,
            producto.marca,
            producto.precio,
            producto.zafra
         ).mostrarEnCard()
     )).join("");

     // imprimimos la card de producto en el elemento con id productosContainer

     imprimir("productosContainer", cardProductos);
     console.log(cardProductos);

    // Agregamos evento click a cada card de productos
    document.querySelectorAll(".producto-card").forEach((itemCard) => {
        card.addEventListener("click", () => {
            // Redirigimos a la página de detalle del producto
            window.location.replace(`detalle-producto.html?id=${itemCard.id}`);
        });
    });

}

const mostrarError = (error) => {
    imprimir("productosContainer-error", error);
}

// aca van los filtros
document.querySelector("#boton-filtro").addEventListener("click", ()=>{
    // obtenemos los valores de los inputs
    const filtroNombre = obtenerValorInput("filtro-nombre");
    const filtroLineaTerapeutica = obtenerValorInput("filtro-linea-terapeutica");

    // Llamamos a la API de nuevo, pero con los filtros
    RequestsAPI.getProductos({filtroNombre, filtroLineaTerapeutica})
    .then(mostrarCardProductos)
    .catch(mostrarError);

})


// obtenemos las cards de productos
RequestsAPI.getProductos().then(mostrarCardProductos).catch(mostrarError);