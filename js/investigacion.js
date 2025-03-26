import Articulo from "../Models/Articulo.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
    imprimir,
    validarSesion,
    eventoClickCerrarSesion,
} from "../utils/functions.js";

// Función para mostrar las tarjetas de artículos en la página principal
const mostrarCardArticulos = (data) => {
    console.log(data);
    // Limpiamos el error si existe
    imprimir("articulosContainer-error", "");

    // Para cada artículo, creamos una instancia de la clase Articulo y la mostramos
    const cardArticulos = data
        .filter((articulo) => {
            // Verifica que el artículo tenga todas las propiedades necesarias
            return articulo && articulo.id && articulo.titulo && articulo.imagen;
        })
        .map((articulo) => {
            return new Articulo(
                articulo.id,
                articulo.titulo,
                articulo.colgado,
                articulo.descripcion,
                articulo.destacado,
                articulo.detalle,
                articulo.fecha,
                articulo.imagen,
                Array.isArray(articulo.temas) ? articulo.temas.join(", ") : "",
                Array.isArray(articulo.especie) ? articulo.especie.join(", ") : "",
                Array.isArray(articulo.link) ? articulo.link.join(", ") : ""
            ).mostrarEnCard();
        })
        .join("");

    // Imprimimos las tarjetas de artículos en el contenedor correspondiente
    imprimir("articulosContainer", cardArticulos);

    // Agregamos evento click a cada tarjeta de artículo
    document.querySelectorAll(".card-articulo").forEach((itemCard) => {
        itemCard.addEventListener("click", () => {
            // Redirigimos a la página de detalle del artículo
            window.location.replace(`articulo.html?id=${itemCard.id}`);
        });
    });
};

// Función para mostrar errores en pantalla
const mostrarError = (error) => {
    imprimir("articulosContainer-error", error);
};

// Función para actualizar el contenido del acordeón con los artículos y sus temas
function actualizarAcordeon(articulos) {
    if (!Array.isArray(articulos) || articulos.length === 0) {
        console.warn("No hay artículos válidos para actualizar el acordeón.");
        return;
    }

    articulos.forEach((articulo) => {
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
}

// Función para inicializar la página: cargar artículos y actualizar el acordeón
async function inicializarPagina() {
    try {
        const articulos = await RequestsAPI.getArticulos();

        // Actualizar el acordeón con todos los artículos disponibles
        actualizarAcordeon(articulos);

        // Mostrar las tarjetas de artículos en la página principal
        mostrarCardArticulos(articulos);
    } catch (error) {
        console.error("Error al inicializar la página:", error);
        mostrarError("Error al cargar la página. Por favor, intenta nuevamente.");
    }
}

// Llamar a la función para inicializar la página al cargarla
inicializarPagina();
