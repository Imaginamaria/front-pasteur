import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
    imprimir,
    validarSesion,
    eventoClickCerrarSesion
} from "../utils/functions.js";

//obtener el id del producto
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

console.log(idProducto);

// function para mostrar un error en el detalle del producto

const mostrarError = (error) => {
    imprimir("detalle-error" , error)
};

// function para mostrar el detalle del producto

const mostrarDetalle = (data) => {

    // limpiamos el error en caso de que exista
    imprimir ("detalle-error", "");

    const producto = new Producto (

        data.id,
        data.nombre,
        data.colgado,
        data.informacion,
        data.dosificacion,
        data.composicion,
        data.tiempos,
        data.especies,
        data.presentacion,
        data.registro,
        data.imagen,
        data.advertencias,
        data.recomendaciones,
        data.calculadora,
        data.lineaterapeutica,
        data.marca,
        data.precio,
        data.zafra

    )
    imprimir ("detalle" , producto.mostrarEnDetalle());
};

// obtenemos el producto por su id
RequestsAPI.getProducto(idProducto)
.then(mostrarDetalle)
.catch((error) =>{
    mostrarError(error)
})