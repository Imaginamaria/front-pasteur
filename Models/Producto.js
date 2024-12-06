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

    mostrarEnCard(){
        return `<div class="col-md-3 producto-card " id="${this.id}">  
                            <div class="card">
                                <img src="${this.imagen}" class="card-img-top" alt="${this.nombre}">
                                <div class="card-body" style="border-top: 4px solid #CB1733;">
                                    <h5 class="card-title text-primary fw-bold">${this.capitalizarPrimeraLetra(this.nombre)}</h5>
                                    <p class="card-text text-primary lead">${this.capitalizarPrimeraLetra(this.colgado)}</p>
                                    <div class="d-flex justify-content-between">
                                         <input type="button" class="btn btn-secondary stretched-link fw-bold" id="verMas" value="Más información" />
                                    </div>
                                </div>
                            </div>
                        </div>`       
    }

// hacer mostrarEnDetalle


mostrarEnDetalle() {
    let logo = '';

    // Determinar el logo según la marca
    if (this.marca === 'pasteur') {
        logo = `<img src="img/iso-laboratorios-pasteur.png" alt="Laboratorios Pasteur Logo" class="img-fluid logo-marca">`;
    } else if (this.marca === 'chinfield') {
        logo = `<img src="img/chinfield-logo.png" alt="Chinfield Logo" class="img-fluid logo-marca">`;
    } else {
        logo = `<span class="text-muted">Marca no especificada</span>`;
    }

    return `<div class="row">
        
        <div class="col-md-5">
            <img src="${this.imagen}" alt="${this.nombre}" class="img-fluid rounded shadow">
            <div>${logo}</div>
        </div>

        <div class="col-md-7">
            <h1 class="text-primary fw-bold">${this.nombre}</h1>
            <h4 class="text-primary"> ${this.colgado}</h4>
            
            <p>USD ${this.precio}</p>
            <p><strong>Registro:</strong> ${this.registro}</p>
            
            <hr>
            <h5 class="text-primary fw-bold">Detalles:</h5>
            <ul>
                <li class="detalle-ampliacion fs-5"><strong>Dosificación:</strong> ${this.dosificacion}</li>
                <li class="detalle-ampliacion fs-5"><strong>Composición (cada 100 ml): </strong> ${this.composicion}</li>
                <li class="detalle-ampliacion fs-5"><strong>Tiempos:</strong> ${this.tiempos}</li>
                <li class="detalle-ampliacion fs-5"><strong>Especies:</strong> ${this.especies}</li>
                <li class="detalle-ampliacion fs-5"><strong>Presentación:</strong> ${this.presentacion}</li>
            </ul>

            <hr>
            <h5 class="text-primary fw-bold">Advertencias y Recomendaciones:</h5>
            <p class="detalle-ampliacion fs-5">${this.advertencias}</p>
            <p class="detalle-ampliacion fs-5">${this.recomendaciones}</p>

            <a href="/formulario.html" class="btn btn-secondary btn-md mt-3">Solicite mas información</a>
        </div>
    </div>`;
}


}
