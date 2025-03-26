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
        .filter((articulo) => {
            // Verifica que el artículo tenga todas las propiedades necesarias
            return articulo && articulo.id && articulo.titulo && articulo.imagen;
        })
        .map((articulo) => {
            console.log("Imagen:", articulo.imagen); // Verifica la URL de la imagen

            return new Articulo(
                articulo.id,
                articulo.titulo,
                articulo.colgado,
                articulo.descripcion,
                articulo.destacado,
                articulo.detalle,
                articulo.fecha,
                articulo.imagen,
                articulo.temas?.join(", "), // Usa encadenamiento opcional para temas
                articulo.especie?.join(", "), // Usa encadenamiento opcional para especies
                articulo.link?.join(", ") // Usa encadenamiento opcional para productos
            ).mostrarEnCard();
        })
        .join("");

    // imprimimos la card de producto en el elemento con id productosContainer
    imprimir("articulosContainer", cardArticulos);
    console.log(cardArticulos);

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

// obtenemos las cards de articulos
RequestsAPI.getArticulos().then(mostrarCardArticulos).catch(mostrarError);
