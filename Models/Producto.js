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
        return `<div class="col-md-3 class="producto-card ">  
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

}
