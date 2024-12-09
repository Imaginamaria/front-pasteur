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
    zafra
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
        this.zafra=zafra
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



    return `<div class="row">

                    <div class="titulo-detalle">
                     <h3 class="fw-bold mt-5 mb-2 text-primary">${this.lineaterapeutica}</h3>
                </div>

  
        
        <div class="col-md-5 separador-titulo">
            <img src="${this.imagen}" alt="${this.nombre}" class="img-fluid rounded shadow">
            <div>${logo}</div>
        </div>

        <div class="col-md-7 separador-titulo">
            <h1 class="text-primary fw-bold">${this.nombre}</h1>
            <h4 class="text-primary"> ${this.colgado}</h4>
            
            <p>USD ${this.precio}</p>
            <p><strong>Registro:</strong> ${this.registro}</p>
            
            <hr>
            <h5 class="text-primary fw-bold">Detalles:</h5>
            <ul>
            <li class="detalle-ampliacion fs-5"><strong>Información:</strong> ${this.reemplazarDashesPorBr(this.informacion)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Dosificación:</strong> ${this.reemplazarDashesPorBr(this.dosificacion)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Composición (cada 100 ml): </strong> ${this.reemplazarDashesPorBr(this.composicion)}</li>
                <li class="detalle-ampliacion fs-5"><strong>Tiempos:</strong> ${this.reemplazarDashesPorBr(this.tiempos)}</li>
                        <li class="detalle-ampliacion fs-5"><strong>Especies:</strong><br>${especieHTML}</li> <!-- Aquí se muestran las imágenes -->                <li class="detalle-ampliacion fs-5"><strong>Presentación:</strong> ${this.presentacion} cc</li>
            </ul>

            <hr>
            <h5 class="text-primary fw-bold">Advertencias y Recomendaciones:</h5>
            <p class="detalle-ampliacion fs-5">${this.reemplazarDashesPorBr(this.advertencias)}</p>
            <p class="detalle-ampliacion fs-5">${this.reemplazarDashesPorBr(this.recomendaciones)}</p>

            <a href="/formulario.html" class="btn btn-secondary btn-md mt-3">Solicite mas información</a>
        </div>
    </div>
    
    <hr class="my-5">
    </div>`;
}


}
