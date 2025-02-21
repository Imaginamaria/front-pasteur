export default class Producto{
    id;
    nombre;
    colgado;
    informacion;
    dosificacion;
    composicion;
    tiempos;
    especies;
    presentacion;
    registro;
    imagen;
    advertencias;
    recomendaciones;
    calculadora;
    lineaterapeutica;
    marca;
    precio;
    zafra;
    constructor(id=0, nombre="", colgado="", informacion="", dosificacion="", composicion="", tiempos="", especies="", presentacion="", registro="", imagen="", 
        advertencias="", recomendaciones="", calculadora="", lineaterapeutica="", marca="", precio=0, zafra=""){
        this.id=id;
        this.nombre=nombre;
        this.colgado=colgado;
        this.informacion=informacion;
        this.dosificacion=dosificacion;
        this.composicion=composicion;
        this.tiempos=tiempos;
        this.especies=especies;
        this.presentacion=presentacion;
        this.registro=registro;
        this.imagen=imagen;
        this.advertencias=advertencias;
        this.recomendaciones=recomendaciones;
        this.calculadora=calculadora;
        this.lineaterapeutica=lineaterapeutica;
        this.marca=marca;
        this.precio=precio;
        this.zafra=zafra;
    }

    capitalizarPrimeraLetra(texto){
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

      // Nueva función para reemplazar dashes por <br>
      reemplazarDashesPorBr(texto) {
        return texto.replace(/-/g, '<br>');
    }

    mostrarEnCard(){
        return `<div class="col-md-3 producto-card " id="${this.id}">  
                            <div class="card">
                                <img src="${this.imagen}" class="card-img-top" alt="${this.nombre}">
                                <div class="card-body" style="border-top: 4px solid #CB1733;">
                                    <h5 class="card-title text-primary fw-bold">${this.capitalizarPrimeraLetra(this.nombre)}</h5>
                                    <p class="card-text text-primary lead">${this.capitalizarPrimeraLetra(this.colgado)}</p>
                                    <div class="d-flex justify-content-between">
                                    <a href="detalle-producto.html?id=${this.id}" class="btn btn-secondary stretched-link fw-bold">Más información</a>                                    </div>
                                </div>
                            </div>
                        </div>`       
    }

// hacer mostrarEnDetalle


mostrarEnDetalle() {
    console.log(this); // Verifica qué datos tiene el objeto
    let logo = '';

    // Determinar el logo según la marca
    if (this.marca === 'pasteur') {
        logo = `<img src="img/iso-laboratorios-pasteur.png" alt="Laboratorios Pasteur Logo" class="img-fluid logo-marca">`;
    } else if (this.marca === 'chinfield') {
        logo = `<img src="img/chinfield-logo.png" alt="Chinfield Logo" class="img-fluid logo-marca">`;
    } else {
        logo = `<span class="text-muted">Marca no especificada</span>`;
    }


        // Mapear especies a imágenes
        const speciesImages = {
            vaca: "img/especie-bovinos.png",
            caballo: "img/especie-equinos.png",
            mascota: "img/especie-mascotas.png",
            ave: "img/especie-aves.png",
            porcino: "img/especie-porcinos.png",
            oveja: "img/especie-ovinos.png",
            caprino: "img/especie-caprinos.png",
        };

        // Crear HTML para las imágenes de las especies
        const especieHTML = this.especies.map(especie => {
            const imgSrc = speciesImages[especie] || "img/default-especie.png"; // Imagen por defecto si no hay coincidencia
            return `<img src="${imgSrc}" alt="${especie}" class="img-fluid" style="max-width: 100px; margin-right: 10px;">`;
        }).join('');

        // Mapear presentaciones a imágenes
        const imagenesPresentacion = {
            1: "img/presentacion-supositorio.png",
            10: "img/presentacion-inyectable.png",
            50: "img/presentacion-50.png", 
            100: "img/presentacion-100.png",
            200: "img/presentacion-200.png",
            250: "img/presentacion-250.png",
            500: "img/presentacion-500.png",
            1000: "img/presentacion-1000.png",
            3000: "img/presentacion-3000.png",
            5000: "img/presentacion-5000.png"
        };

         // Obtener la imagen de presentación correspondiente

         const presentacionHTML = this.presentacion.map(presentacion => {
            const imagenPresentacion = imagenesPresentacion[presentacion] || "img/default-presentacion.png"; // Imagen por defecto si no hay coincidencia
            return `<img src="${imagenPresentacion}" alt="${presentacion}" class="img-fluid" style="max-width: 200px; margin-right: 10px;">`;
        }).join('');

        



    return `<div class="row">

                    <div class="titulo-detalle">
                     <h5 class="fw-bold mt-5 mb-2 text-primary ">${this.lineaterapeutica.map(item => this.capitalizarPrimeraLetra(item)).join(' / ')}<i class="bi bi-chevron-right"></i></h5>

                     
                </div>

  
        
        <div class="col-md-5 separador-titulo">
            <img src="${this.imagen}" alt="${this.nombre}" class="img-fluid rounded shadow">
            <div>${logo}</div>

                
            
        </div>

        <div class="col-md-7 separador-titulo">
            <h1 class="text-primary fw-bold">${this.nombre}</h1>
            <h4 class="text-primary"> ${this.colgado}</h4>
            
             <!-- Precio <p>USD ${this.precio}</p> -->
            <p><strong> ${this.registro}</strong></p>
            
            <hr>
            <h5 class="text-primary fw-bold">Detalles:</h5>
            <ul>
            <li class="detalle-ampliacion fs-5"><strong>Información:</strong> ${this.reemplazarDashesPorBr(this.informacion)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Dosificación:</strong> ${this.reemplazarDashesPorBr(this.dosificacion)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Composición (cada 100 ml): </strong> ${this.reemplazarDashesPorBr(this.composicion)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Tiempos:</strong> ${this.reemplazarDashesPorBr(this.tiempos)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Especies:</strong><br>${especieHTML}</li> <!-- Aquí se muestran las imágenes especies --> 
                <li class="detalle-ampliacion fs-5"><strong>Presentación:<br></strong> ${presentacionHTML}</li>
            </ul>

            <hr>
            <h5 class="text-primary fw-bold">Advertencias:</h5>
            <p class="detalle-ampliacion fs-5">${this.reemplazarDashesPorBr(this.advertencias)}</p>
            <h5 class="text-primary fw-bold">Recomendaciones:</h5>
            <p class="detalle-ampliacion fs-5">${this.reemplazarDashesPorBr(this.recomendaciones)}</p>

            

           <button type="button" class="btn btn-secondary stretched-link" onclick="window.location.href='/contacto.html'">
    Más información
</button>
        </div>
    </div>
    
    <hr class="my-5">

    <div class="row">
        <div class="col-md-12">
<div id="calculadora" class="p-5 bg-light text-dark">
    <h3 class="fw-bold text-primary mb-1">Calculadora de Producto</h3>
    <p class="text-primary">Ingrese los datos para calcular la cantidad a comprar.</p>

    <div class="row">
        <!-- Columna de la calculadora -->
        <div class="col-md-6 d-flex flex-column justify-content-end">
            <form id="calculadoraForm">
                <!-- Dosis y unidad -->
                <div class="mb-3">
                    <label for="dosis" class="form-label">Dosis sugerida cada 50 kg (ver en el detalle la dosificación)</label>
                    <input type="number" class="form-control" id="dosis" placeholder="Ingrese la dosis" required>
                    <select class="form-select mt-2" id="unidadDosis" required>
                        <option value="" disabled selected>Seleccione una unidad de volúmen</option>
                        <option value="cc">Centímetros cúbicos (cc)</option>
                        <option value="ml">Mililitros (ml)</option>
                        <option value="l">Litros (l)</option>
                    </select>
                </div>

                <!-- Peso promedio -->
                <div class="mb-3">
                    <label for="pesoPromedio" class="form-label">Peso Promedio por Animal (kg)</label>
                    <input type="number" class="form-control" id="pesoPromedio" placeholder="Ingrese el peso promedio" required>
                </div>

                <!-- Cantidad -->
                <div class="mb-3">
                    <label for="cantidad" class="form-label">Cantidad de Animales</label>
                    <input type="number" class="form-control" id="cantidad" placeholder="Ingrese la cantidad de animales" required>
                </div>

                <!-- Botón calcular -->
                <button id="calcularBtn" type="button" class="btn btn-secondary w-100">Calcular Cantidad a Comprar</button>
            </form>
        </div>

        <!-- Columna de resultados -->
        <div class="col-md-6 d-flex flex-column justify-content-end">
            <div id="resultados" class="mt-4">
                <h4 class="fw-bold text-white">Resultados</h4>
                <p>Dosis Sugerida por Animal: <span id="dosisSugeridaPorAnimal" class="fw-bold text-dark">-</span> cc</p>
                <p>Peso Total: <span id="pesoTotal" class="fw-bold text-dark">-</span> kg</p>
                <p>Dosis Total para el Lote: <span id="dosisTotal" class="fw-bold text-dark">-</span> cc</p>
                <p>Cantidad de Frascos de 1L a Comprar: <span id="totalFrascos" class="fw-bold text-dark">-</span></p>
            </div>
        </div>
    </div>
</div>





        </div>
    </div>`;
}


}
