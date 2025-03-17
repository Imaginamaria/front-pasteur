import Articulo from "../Models/Articulo.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
    imprimir,
    validarSesion,
    eventoClickCerrarSesion
} from "../utils/functions.js";

//obtener el id del articulo
const params = new URLSearchParams(window.location.search);
const idArticulo = params.get("id");

console.log("ID del articulo:", idArticulo);

// funcion para mostrar un error en el detalle del articulo

const mostrarError = (error) => {
    imprimir("detalle-error" , error)
};

// funcion para mostrar el detalle del articulo
const mostrarDetalle = (data) => {
        // limpiamos el error en caso de que exista
        imprimir ("detalle-error", "");

        const articuloActual = new Articulo (
            data.id && !isNaN(data.id) ? parseInt(data.id) : null,  // Verifica si id es válido
            data.titulo,
            data.colgado,
            data.descripcion,
            data.destacado,
            data.detalle,
            data.fecha,
            data.imagen,
            data.temas?.join(", "), // Usa encadenamiento opcional para temas
            data.especies?.join(", ") // Usa encadenamiento opcional para especies
        )
        imprimir ("detalle" , articuloActual.mostrarEnDetalle());

            // Obtener y mostrar articulos relacionados, pasando el ID actual y las especies
    obtenerArticulosRelacionados(articuloActual.temas, productoActual.id, productoActual.especies);
    
};



// Función para obtener articulos relacionados
const obtenerArticulosRelacionados = async (temas, idActual, especies) => {
    try {
        const response = await RequestsAPI.getArticulosPorTemas(temas); // Obtiene todos los articulos relacionados
        // Filtra el articulos actual
        const articulosFiltrados = response.filter(articulo => articulo.id !== idActual);

        

        if (articulosFiltrados.length === 0) {
            // Si no hay articulos relacionados, buscar por especies
            obtenerProductosPorEspecie(especies, idActual);
        } else {
            // Selecciona 2 articulos aleatorios
            const articulosAleatorios = seleccionarArticulosAleatorios(articulosFiltrados, 2);
            mostrarArticulosRelacionados(articulosAleatorios); // Mostrar los articulos filtrados y aleatorios
        }

    } catch (error) {
        mostrarError(error);
    }
};