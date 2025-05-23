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
    link;
    constructor(id=0, titulo="", colgado="", descripcion="", destacado="", detalle="", fecha="", imagen="", temas="", especie="", link="") {
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
        this.link=link;
    }

    capitalizarPrimeraLetra(texto){
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

      // Nueva función para reemplazar dashes por <br>
      reemplazarDashesPorBr(texto) {
        return texto.replace(/-/g, '<br>');
    }

    // Función para crear el enlace al producto de forma dinámica
     generarEnlaceProducto() {
            return `${window.location.origin}${this.link}`;
    }

    

    mostrarEnCard(){
        return ` <div  class="card-articulo" id="${this.id}">

                            <!-- Línea separatoria en color primary -->
                            <hr class="border-secondary">

                            <div class="row min-vh-50">
                                <h6 class="text-dark">${this.fecha}</h6>
                            </div>
                            <div class="row align-items-stretch">
                                <div class="col-md-6">
                                    <img src="${this.imagen}" class="img-fluid" alt="${this.titulo}">

                                </div>
                                <div class="col-md-6">
                                    <h3 class="card-title text-primary fw-bold pb-3 pt-sm-3">${this.titulo}</h3>
                                    <h5 class="card-title text-primary pb-2">${this.colgado}</h5>
                                    <p>${this.descripcion}</p>
                                    <a href="articulo.html?id=${this.id}" class="btn btn-secondary ">Leer más</a>

                                </div>
                                

                            </div>
                 </div>`       
    }

    mostrarEnDetalle(){

        const enlaceProducto = this.generarEnlaceProducto(); // Obtenemos el enlace dinámico al producto

        return `<figure class="mb-4 text-center">
            <span class="fecha-publicacion d-block text-muted small text-primary pb-3">${this.fecha}</span>
                <img src="${this.imagen}" class="img-fluid shadow-lg " alt="${this.especie}">
                </figure>

                <header class="text-center border-bottom border-primary pb-3 mb-4">
                    
                    <h2 class="card-title text-primary fw-bold mt-2">${this.reemplazarDashesPorBr(this.titulo)}</h2>
                    <h4 class="card-title mt-2">${this.colgado}</h4>
                </header>

                <section class="descripcion mb-4 px-3">
                    <p class="lead text-primary ">${this.reemplazarDashesPorBr(this.descripcion)}</p>
                </section>

                <section class="contenido px-3">
                    <blockquote class="blockquote text-primary fw-bold border-start border-primary ps-3">
                        ${this.reemplazarDashesPorBr(this.destacado)}
                    </blockquote>
                    <p class="mt-3">${this.reemplazarDashesPorBr(this.detalle)}</p>
                </section>
                <footer class="text-primary px-3 mb-4 mt-4">
                <span class="fw-semibold">Para más información, consulte el producto en el siguiente enlace:</span> <br>
                    <a href="${enlaceProducto}" class="btn btn-secondary my-3">Ver Producto</a>
                </footer>`
    }


}
