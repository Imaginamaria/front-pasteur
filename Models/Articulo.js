export default class Producto{
    id;
    titulo;
    colgado;
    descripcion;
    destacado;
    detalle;
    fecha;
    imagen;
    temas;
    especie;
    constructor(id=0, titulo="", colgado="", descripcion="", destacado="", detalle="", fecha="", imagen="", temas="", especie=""){
        this.id=id;
        this.titulo=titulo;
        this.colgado=colgado;
        this.descripcion=descripcion;
        this.destacado=destacado;
        this.detalle=detalle;
        this.fecha=fecha;
        this.imagen=imagen;
        this.temas=temas;
        this.especie=especie;
    }

    capitalizarPrimeraLetra(texto){
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

      // Nueva función para reemplazar dashes por <br>
      reemplazarDashesPorBr(texto) {
        return texto.replace(/-/g, '<br>');
    }

    mostrarEnCard(){
        return ` <div  class="card-articulo" id="${this.id}">
                            <div class="row">
                                <h6 class="text-dark">${this.fecha}</h6>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <img class="img-fluid" src="${this.imagen}" alt="${this.titulo}">

                                </div>
                                <div class="col-md-6">
                                    <h3 class="card-title text-primary fw-bold pb-3">${this.titulo}</h3>
                                    <h5 class="card-title text-primary pb-2">${this.colgado}</h5>
                                    <p>${this.detalle}</p>
                                    <a href="articulo.html?id=${this.id}" class="btn btn-secondary stretched-link">Leer más</a>

                                </div>
                                

                            </div>
                 </div>`       
    }

// hacer mostrarEnDetalle


mostrarEnDetalle() {
    console.log(this); // Verifica qué datos tiene el objeto



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
        const especieHTML = this.especie.map(especie => {
            const imgSrc = speciesImages[especie] || "img/default-especie.png"; // Imagen por defecto si no hay coincidencia
            return `<img src="${imgSrc}" alt="${especie}" class="img-fluid" style="max-width: 100px; margin-right: 10px;">`;
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
