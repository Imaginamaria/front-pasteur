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
        console.log("Temas recibidos:", data.temas); // 👈 Aquí vemos qué llega desde la API
        // limpiamos el error en caso de que exista
        imprimir ("detalle-error", "");

        // Extraer el id del producto del campo "detalle"
        const idProducto = data.detalle.match(/id=(\d+)/); // Busca el patrón "id=X" en el detalle

         let detalleConEnlace = data.detalle;

         if (idProducto && idProducto[1]) {
            const baseURL = window.location.origin;  // Obtiene el dominio actual
            const urlProducto = `${baseURL}/detalle-producto.html?id=${idProducto[1]}`; // Ruta dinámica del producto
    
            // Reemplazar "id=..." en el texto con un enlace
            detalleConEnlace = detalleConEnlace.replace(
                new RegExp(`/detalle-producto.html?id=${idProducto[1]}`, 'g'),  // Buscar la mención del id
                `<a href="${urlProducto}" class="btn btn-secondary">Ver Producto</a>`
            );
        }

        const articuloActual = new Articulo (
            data.id && !isNaN(data.id) ? parseInt(data.id) : null,  // Verifica si id es válido
            data.titulo,
            data.colgado,
            data.descripcion,
            data.destacado,
            data.detalle,
            data.fecha,
            data.imagen,
            Array.isArray(data.temas) ? data.temas.join(", ") : "", // 👈 Aquí convertimos el array a string
            data.especies?.join(", "), // Usa encadenamiento opcional para especies
            data.link?.join(", ") // Usa encadenamiento opcional para link de productos
        )
        console.log("Temas en articuloActual:", articuloActual.temas); // 👈 Verificamos si los temas se asignan bien

        imprimir ("detalle" , articuloActual.mostrarEnDetalle());

            // Obtener y mostrar articulos relacionados, pasando el ID actual y las especies
   // obtenerArticulosRelacionados(articuloActual.temas, productoActual.id, productoActual.especies); este lo pongo cuando haga el div de articulos relacionados
    
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

// acordion temas
function actualizarAcordeon(temas, articulo) {
    temas.forEach(temas => {
        let ulId = "";
        switch (temas) { 
            case "Sanidad Animal":
                ulId = "sanidad";
                break;
            case "Biotecnología":
                ulId = "biotecnologia";
                break;
            case "Investigación Veterinaria":
                ulId = "investigacion";
                break;
            case "Desarrollo de Productos":
                ulId = "desarrollo";
                break;
            default:
                console.warn(`No se encontró una lista para el tema: ${temas}`);
                return;
        }

        // Obtener el elemento UL correspondiente
        const ul = document.getElementById(ulId);
        if (ul) {
            // Crear un elemento <li> para agregar el título del artículo
            const li = document.createElement("li");
            li.innerHTML = `<a href="${articulo.link}">${articulo.titulo}</a>`; // 👈 Agrega el título como un enlace
            ul.appendChild(li); // Agregar el <li> a la lista
        }
    });
}
;


// Obtenemos el articulo por su id y luego los articulos relacionados
RequestsAPI.getArticulo(idArticulo)
.then(data => {
    if (!data) {
        throw new Error("Articulo no encontrado");
    }
    mostrarDetalle(data);
})
.catch((error) => {
    mostrarError(error);
});
