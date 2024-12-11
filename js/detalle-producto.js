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

        data.id && !isNaN(data.id) ? parseInt(data.id) : null,  // Verifica si id es válido
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

        // Llamada a la función calcularDosis si data.calculadora está presente
        const calcularBtn = document.getElementById('calcularBtn');
        if (calcularBtn) {
            calcularBtn.addEventListener('click', function(event) {
                event.preventDefault(); // Prevenir recarga de la página
                calcularDosis(); // Llamar a la función de cálculo
            });
        }

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
        const response = await RequestsAPI.getProductosPorEspecie(especies); // Obtiene todos los productos relacionados
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


        container.innerHTML += productoRelacionado.mostrarEnCard(); // Uso método mostrarEnCard para cada producto
        });

    }

   
};


function calcularDosis() {
    document.getElementById('calcularBtn').addEventListener('click', function() {
        // Obtener los valores de los campos del formulario
        const dosis = parseFloat(document.getElementById('dosis').value);
        const unidadDosis = document.getElementById('unidadDosis').value;
        const pesoPromedio = parseFloat(document.getElementById('pesoPromedio').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);
    
        // Validación básica
        if (isNaN(dosis) || isNaN(pesoPromedio) || isNaN(cantidad) || !unidadDosis) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
    
        // Calcular dosis por animal (suponiendo que la dosis es por 50 kg)
        const dosisSugeridaPorAnimal = (dosis / 50) * pesoPromedio;
    
        // Calcular el peso total de todos los animales
        const pesoTotal = pesoPromedio * cantidad;
    
        // Calcular dosis total para el lote
        const dosisTotal = dosisSugeridaPorAnimal * cantidad;
    
        // Calcular cantidad de frascos de 1L a comprar
        const totalFrascos = Math.ceil(dosisTotal / 1000); // Asumiendo que cada frasco tiene 1L = 1000cc
    
        // Mostrar resultados
        document.getElementById('dosisSugeridaPorAnimal').textContent = dosisSugeridaPorAnimal.toFixed(2);
        document.getElementById('pesoTotal').textContent = pesoTotal.toFixed(2);
        document.getElementById('dosisTotal').textContent = dosisTotal.toFixed(2);
        document.getElementById('totalFrascos').textContent = totalFrascos;
    });
    
    
}




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


