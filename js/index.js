import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir,
    obtenerValorInput,
    validarSesion,
    eventoClickCerrarSesion
 } from "../utils/functions.js";

 // validamos la sesión del usuario
// validarSesion();
// agregamos evento click al botón de cerrar sesión
// eventoClickCerrarSesion();

// función para normalizar cadenas de texto eliminando acentos y convirtiendo a minúsculas - pedi ayuda de AI
const normalizarTexto = (texto) => {
    return texto
        .normalize("NFD") // Descompone caracteres acentuados en caracteres simples + diacríticos
        .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
        .toLowerCase(); // Convierte a minúsculas
};


// Función para mostrar productos aleatorios generales (solo de la marca Pasteur)
const mostrarCardProductos = (data) => {
    console.log(data);
    // Limpiamos el error si existe
    imprimir("productosContainer-error", "");

    // Filtramos productos por la marca Pasteur
    const productosPasteur = data.filter(
        (producto) => producto.marca.toLowerCase() === "pasteur"
    );

    // Obtenemos 4 productos aleatorios de la marca Pasteur
    const productosAleatorios = productosPasteur
        .sort(() => Math.random() - 0.5) // Mezclamos los productos aleatoriamente
        .slice(0, 4); // Tomamos solo los primeros 4 productos

    // Para cada card de producto, creamos una instancia de la clase Producto y la mostramos
    const cardProductos = productosAleatorios
        .map((producto) => (
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
        ))
        .join("");

    // Imprimimos las cards de productos en la sección general
    imprimir("productosContainer", cardProductos);
    console.log(cardProductos);

    // Agregamos evento click a cada card de productos
    document.querySelectorAll(".producto-card").forEach((itemCard) => {
        console.log(itemCard);
        itemCard.addEventListener("click", () => {
            // Redirigimos a la página de detalle del producto
            window.location.replace(`detalle-producto.html?id=${itemCard.id}`);
        });
    });
};

// Función para mostrar productos aleatorios de la marca Chinfield
const mostrarCardProductosChinfield = (data) => {
    console.log(data);
    // Limpiamos el error si existe
    imprimir("chinfieldContainer-error", "");

    // Filtramos productos por la marca Chinfield
    const productosChinfield = data.filter(
        (producto) => producto.marca.toLowerCase() === "chinfield"
    );

    // Obtenemos 4 productos aleatorios de la marca Chinfield
    const productosAleatoriosChinfield = productosChinfield
        .sort(() => Math.random() - 0.5) // Mezclamos los productos aleatoriamente
        .slice(0, 4); // Tomamos solo los primeros 4 productos

    // Para cada card de producto, creamos una instancia de la clase Producto y la mostramos
    const cardProductosChinfield = productosAleatoriosChinfield
        .map((producto) => (
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
        ))
        .join("");

    // Imprimimos las cards de productos en la sección de Chinfield
    imprimir("chinfieldContainer", cardProductosChinfield);
    console.log(cardProductosChinfield);

    // Agregamos evento click a cada card de productos
    document.querySelectorAll(".producto-card").forEach((itemCard) => {
        console.log(itemCard);
        itemCard.addEventListener("click", () => {
            // Redirigimos a la página de detalle del producto
            window.location.replace(`detalle-producto.html?id=${itemCard.id}`);
        });
    });
};

// Función para manejar errores
const mostrarError = (error) => {
    imprimir("productosContainer-error", error);
    imprimir("chinfieldContainer-error", error);
};

// Obtenemos las cards de productos y mostramos ambas secciones
RequestsAPI.getProductos()
    .then((data) => {
        mostrarCardProductos(data); // Mostrar productos aleatorios de Pasteur
        mostrarCardProductosChinfield(data); // Mostrar productos aleatorios de Chinfield
    })
    .catch(mostrarError);
