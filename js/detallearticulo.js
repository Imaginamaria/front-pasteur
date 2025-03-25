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
            detalleConEnlace, // Usar el detalle con enlace modificado
            data.fecha,
            data.imagen,
            Array.isArray(data.temas) ? data.temas : [], // 👈 Convertimos los temas a un array si no lo son
            data.especies?.join(", "), // Usa encadenamiento opcional para especies
            data.link?.join(", ") // Usa encadenamiento opcional para link de productos
        )
        console.log("Temas en articuloActual:", articuloActual.temas); // 👈 Verificamos si los temas se asignan bien

        imprimir ("detalle" , articuloActual.mostrarEnDetalle());

            // Actualizar el acordeón con los temas y el artículo actual
            //actualizarAcordeon(articuloActual.temas, articuloActual);

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


// Acordion temas
function actualizarAcordeon(articulos) {
    if (!Array.isArray(articulos) || articulos.length === 0) {
        console.warn("No hay artículos válidos para actualizar el acordeón.");
        return;
    }

    articulos.forEach(articulo => {
        if (!Array.isArray(articulo.temas) || articulo.temas.length === 0) {
            console.warn(`El artículo "${articulo.titulo}" no tiene temas válidos.`);
            return;
        }

        articulo.temas.forEach((tema) => {
            let ulId = "";
            switch (tema.trim()) {
                case "Sanidad Animal":
                    ulId = "salud";
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
                    console.warn(`No se encontró una lista para el tema: ${tema}`);
                    return;
            }

            const ul = document.getElementById(ulId);
            if (ul) {
                const li = document.createElement("li");
                li.innerHTML = `<a href="articulo.html?id=${articulo.id}">${articulo.titulo}</a>`;
                ul.appendChild(li);
            }
        });
    });
};

// Función para inicializar la página
async function inicializarPagina() {
    try {
        const articulos = await RequestsAPI.getArticulos();
        actualizarAcordeon(articulos);

        // Obtenemos el artículo por su id y luego los articulos relacionados
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
    } catch (error) {
        console.error("Error al inicializar la página:", error);
        mostrarError("Error al cargar la página. Por favor, intenta nuevamente."); // Mostrar mensaje de error en la interfaz
    }
}

inicializarPagina();


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
