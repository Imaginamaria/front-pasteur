import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir,
    obtenerValorInput,
    validarSesion,
    eventoClickCerrarSesion
 } from "../utils/functions.js";

// validamos la sesión del usuario
//validarSesion();
// agregamos evento click al botón de cerrar sesión
//eventoClickCerrarSesion();

// función para normalizar cadenas de texto eliminando acentos y convirtiendo a minúsculas
const normalizarTexto = (texto) => {
    return texto
        .normalize("NFD") // Descompone caracteres acentuados en caracteres simples + diacríticos
        .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
        .toLowerCase(); // Convierte a minúsculas
};

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
        console.log(itemCard)
        itemCard.addEventListener("click", () => {
            // Redirigimos a la página de detalle del producto
            window.location.replace(`detalle-producto.html?id=${itemCard.id}`);
        });
    });

}

const mostrarError = (error) => {
    imprimir("productosContainer-error", error);
}


// Función para manejar el filtrado por especie
const filtrarPorEspecie = (especieSeleccionada) => {
    RequestsAPI.getProductos().then((data) => {
        const productosFiltrados = data.filter((producto) =>
            producto.especies.some((especie) =>
                normalizarTexto(especie) === normalizarTexto(especieSeleccionada)
            )
        );
        mostrarCardProductos(productosFiltrados);
    }).catch(mostrarError);
};

// Configuramos los eventos de clic en los botones de especies
document.querySelectorAll(".boton-especie").forEach((boton) => {
    boton.addEventListener("click", () => {
        const especieSeleccionada = boton.dataset.especie; // Obtenemos la especie del atributo data-especie
        filtrarPorEspecie(especieSeleccionada);
    });
});

// aca van los filtros
document.querySelector("#boton-filtro").addEventListener("click", ()=>{
    // obtenemos los valores de los inputs
    const filtroNombre = obtenerValorInput("input-filtro-nombre");
    const filtroLineaTerapeutica = obtenerValorInput("input-filtro-linea");

    // Llamamos a la API de nuevo, pero con los filtros
    RequestsAPI.getProductos().then((data) => {
        // Filtramos los productos por nombre y línea terapéutica
        const productosFiltrados = data.filter((producto) => {
            // Normalizamos el nombre de cada producto y el filtro de nombre
            const nombreNormalizado = normalizarTexto(producto.nombre);
            const filtroNombreNormalizado = normalizarTexto(filtroNombre);

            // Comprobamos si el nombre del producto incluye el filtro (parcial)
            const nombreCoincide = nombreNormalizado.includes(filtroNombreNormalizado);

            // Comprobamos si la línea terapéutica coincide (si se proporciona un filtro)
            //const lineaCoincide = !filtroLineaTerapeutica || normalizarTexto(producto.lineaterapeutica).includes(normalizarTexto(filtroLineaTerapeutica));

            const lineaCoincide =
                    !filtroLineaTerapeutica ||
                    (Array.isArray(producto.lineaterapeutica)
                        ? producto.lineaterapeutica.some((linea) =>
                              normalizarTexto(linea).includes(normalizarTexto(filtroLineaTerapeutica))
                          )
                        : normalizarTexto(producto.lineaterapeutica).includes(normalizarTexto(filtroLineaTerapeutica)));


            // Retornamos si ambos filtros coinciden
            return nombreCoincide && lineaCoincide;
        });

        // Mostramos los productos filtrados
        mostrarCardProductos(productosFiltrados);
    }).catch(mostrarError);
})

// obtenemos las cards de productos
RequestsAPI.getProductos().then(mostrarCardProductos).catch(mostrarError);
