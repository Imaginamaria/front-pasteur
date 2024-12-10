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

console.log("ID del producto:", idProducto);

// funcion para mostrar un error en el detalle del producto

const mostrarError = (error) => {
    imprimir("detalle-error" , error)
};

// funcion para mostrar el detalle del producto

const mostrarDetalle = (data) => {

    // limpiamos el error en caso de que exista
    imprimir ("detalle-error", "");

    const productoActual = new Producto (

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
    imprimir ("detalle" , productoActual.mostrarEnDetalle());

    // Obtener y mostrar productos relacionados, pasando el ID actual y las especies
    obtenerProductosRelacionados(productoActual.lineaterapeutica, productoActual.id, productoActual.especies);
};

// Función para obtener productos relacionados
const obtenerProductosRelacionados = async (lineaTerapeutica, idActual, especies) => {
    try {
        const response = await RequestsAPI.getProductosPorLinea(lineaTerapeutica); // Obtiene todos los productos relacionados
        
        // Filtra el producto actual
        const productosFiltrados = response.filter(producto => producto.id !== idActual);

        if (productosFiltrados.length === 0) {
            // Si no hay productos relacionados, buscar por especies
            obtenerProductosPorEspecie(especies, idActual);
        } else {
            // Selecciona 4 productos aleatorios
            const productosAleatorios = seleccionarProductosAleatorios(productosFiltrados, 4);
            mostrarProductosRelacionados(productosAleatorios); // Mostrar los productos filtrados y aleatorios
        }

    } catch (error) {
        mostrarError(error);
    }
};

// Función para obtener productos por especie
const obtenerProductosPorEspecie = async (especies, idActual) => {
    try {
        const response = await RequestsAPI.getProductosPorEspecie(especies); // Asegúrate de tener esta función en tu API

        // Filtra el producto actual
        const productosFiltrados = response.filter(producto => producto.id !== idActual);

        

        // Selecciona 4 productos aleatorios
        const productosAleatorios = seleccionarProductosAleatorios(productosFiltrados, 4);

        console.log("Productos aleatorios por especie:", productosAleatorios); // Para depuración

        mostrarProductosRelacionados(productosAleatorios); // Mostrar los productos filtrados y aleatorios
        
    } catch (error) {
        mostrarError(error);
    }
};

// Función para seleccionar una cantidad específica de productos aleatorios
const seleccionarProductosAleatorios = (productos, cantidad) => {
    const shuffled = productos.sort(() => 0.5 - Math.random()); // Mezcla el array
    return shuffled.slice(0, cantidad); // Devuelve los primeros 'cantidad' elementos
};

// Función para mostrar los productos relacionados en el DOM
const mostrarProductosRelacionados = (productosRelacionados) => {
    const container = document.getElementById('productosRelacionadosContainer'); 
    container.innerHTML = ''; // Limpiar el contenido previo

    if (productosRelacionados.length === 0) {
        container.innerHTML = '<p>No hay productos relacionados disponibles.</p>';
    } else{
         productosRelacionados.forEach(data => {
            const productoRelacionado = new Producto(
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
            );


        container.innerHTML += productoRelacionado.mostrarEnCard(); // Usar el método mostrarEnCard para cada producto
        });

    }

   
};

// Obtenemos el producto por su id y luego los productos relacionados
RequestsAPI.getProducto(idProducto)
.then(data => {
    if (!data) {
        throw new Error("Producto no encontrado");
    }
    mostrarDetalle(data);
})
.catch((error) => {
    mostrarError(error);
});
