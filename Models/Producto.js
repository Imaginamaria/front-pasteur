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


    mostrarEnDetalle(){
        
        return   `<div class="row">
        
        <div class="col-md-5">
            <img src="${this.imagen}" alt="${this.nombre}" class="img-fluid rounded shadow">
        </div>

        
        <div class="col-md-7">
            <h1 class="text-primary fw-bold">${this.nombre}</h1>
            <p class="text-muted"> ${this.colgado}</p>
            <p><strong> ${this.marca}</p>
            <p><strong> ${this.precio}</p>
            <p><strong>Registro:</strong> ${this.registro}</p>
            
            <hr>
            <h5 class="text-primary fw-bold">Detalles:</h5>
            <ul>
                <li><strong>Dosificación:</strong> ${this.dosificacion}</li>
                <li><strong>Composición:</strong> ${this.composicion}</li>
                <li><strong>Tiempos:</strong> ${this.tiempos}</li>
                <li><strong>Especies:</strong> ${this.especies}</li>
                <li><strong>Presentación:</strong> ${this.presentacion}</li>
            </ul>

            <hr>
            <h5 class="text-primary fw-bold">Advertencias y Recomendaciones:</h5>
            <p>${this.advertencias}</p>
            <p>${this.recomendaciones}</p>

            <a href="/formulario.html" class="btn btn-secondary btn-md mt-3">Solicite mas información</a>
        </div>
    </div>`;

    }

}
