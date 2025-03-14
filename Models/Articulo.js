export default class Articulo{
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

                            <!-- Línea separatoria en color primary -->
                            <hr class="border-primary">

                            <div class="row">
                                <h6 class="text-dark">${this.fecha}</h6>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${this.imagen}" class="img-fluid" alt="${this.titulo}">

                                </div>
                                <div class="col-md-6">
                                    <h3 class="card-title text-primary fw-bold pb-3">${this.titulo}</h3>
                                    <h5 class="card-title text-primary pb-2">${this.colgado}</h5>
                                    <p>${this.descripcion}</p>
                                    <a href="articulo.html?id=${this.id}" class="btn btn-secondary stretched-link">Leer más</a>

                                </div>
                                

                            </div>
                 </div>`       
    }

    mostrarEnDetalle(){
        return `<header>
                            <span class="fecha-publicacion">${this.fecha}</span>
                            <h1 class="card-title text-primary">${this.titulo}</h1>
                            <h2 class="card-title text-primary pb-2">${this.colgado}</h2>
                </header>
                        
                <figure>
                            <img src="${this.imagen}" class="img-fluid" alt="${this.especie}">
                </figure>
                        
                <section class="descripcion">
                            <p>${this.descripcion}</p>
                </section>
                        
                <section class="contenido">
                            <blockquote class="card-title text-primary pb-2">
                            ${this.destacado}
                            </blockquote>
                            
                            <p>${this.detalle}</p>
                </section>`
    }


}
