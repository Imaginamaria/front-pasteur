function mostrarProductosPorEstacion(estacion) {
    // Simulación de productos
    const productos = [
        { id: 1, nombre: "Producto Verano", estacion: "verano" },
        { id: 2, nombre: "Producto Invierno", estacion: "invierno" },
        { id: 3, nombre: "Producto Primavera", estacion: "primavera" },
        { id: 4, nombre: "Producto Otoño", estacion: "otoño" },
    ];

    // Filtramos los productos por la estación
    const productosFiltrados = productos.filter(producto => producto.estacion === estacion);

    // Mostrar los productos en el DOM
    const container = document.getElementById("productosContainer");
    container.innerHTML = productosFiltrados.map(producto => `
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                </div>
            </div>
        </div>
    `).join("");
}

// Consulta para filtrar según el mes actual
const mesActual = new Date().getMonth() + 1; // Mes actual (0-indexado, sumamos 1)

// Ejemplo usando Mongoose
const productosRelevantes = await Producto.find({ zafra: mesActual });

//definir previamente la relación entre las estaciones y los meses
function obtenerMesesPorEstacion(estacion) {
    switch (estacion) {
        case "verano": return [12, 1, 2];
        case "otoño": return [3, 4, 5];
        case "invierno": return [6, 7, 8];
        case "primavera": return [9, 10, 11];
        default: return [];
    }
}

const estacion = "invierno";
const meses = obtenerMesesPorEstacion(estacion);

// Consulta MongoDB para los productos relevantes
const productosPorEstacion = await Producto.find({ zafra: { $in: meses } });

