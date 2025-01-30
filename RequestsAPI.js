
// obtener url es una función que recibe una ruta y retorna la url completa de la ruta que se le pase.

const obtenerUrl=(ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;

// headers es un objeto que contiene las cabeceras que se enviarán en las peticiones fetch.

const headers = {
   Accept: "application/json",
   "Content-Type": "application/json"
}


// token es una constante que contiene el token de la sesión que se obtiene del sessionStorage.
const token = sessionStorage.getItem("session");

// Si token existe, se añade al objeto headers la cabecera authorization con el valor del token.
if(token){
   headers.authorization = token;
}
// procesarRespuesta es una función que recibe una respuesta y retorna la respuesta en formato json. Si la respuesta contiene un error, se lanza una excepción con el mensaje de error.
const procesarRespuesta =(res)=>{
   return res.json().then((data)=>{
       if(data.error){
           throw new Error (data?.error) // ? es para que si no existe el error, no se lanza el errores
       }

       return data
   })
}

const manejarErrores =(error = new Error("Error desconocido"))=>{
   console.error("Ha ocurrido un error:", error.message)
   throw error.message
}

// RequestsAPI es una clase que contiene las funciones que se encargan de realizar las peticiones fetch al backend de manera ordenada y centralizada.
export class RequestsAPI{


static urlBaseBackend = "https://apipasteur-back.onrender.com"; 
//static urlBaseBackend = "http://localhost:3001"; //cuando suba al servidor lo cambio por la del servidor


   // post /login



   static login(email, password){
       
       const body = JSON.stringify({email, password});

       return fetch (obtenerUrl("login"),{method: "POST", body, headers})
       .then(procesarRespuesta)
       .catch(manejarErrores)

   }

   
   // post /logout
   static logout() {
       return fetch(obtenerUrl("logout"), { method: "POST", headers })
       .then(procesarRespuesta)
       .catch(manejarErrores);
   }

   // post /registrar
   static register(body) {
       return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
       .then(procesarRespuesta)
       .catch(manejarErrores);
   }


 


// get /usuario

 static getProductos(opciones={}){
    // queryParams es un objeto que contiene los parámetros de la url, en este caso, los filtros de nombre y linea terapeutica.
    const queryParams = new URLSearchParams({});

    // nombre del producto
    if(opciones.filtroNombre){
        queryParams.append("nombre", opciones.filtroNombre);
    }
    // linea terapeutica
    if(opciones.filtroLineaTerapeutica){
        queryParams.append("lineaTerapeutica", opciones.filtroLineaTerapeutica);
    }

    // filtro especie
    if(opciones.filtroEspecie){
        queryParams.append("especie", opciones.filtroEspecie);
    }

    // filtro marca
    if(opciones.filtroMarca){
        queryParams.append("marca", opciones.filtroMarca);
    }

    return fetch(obtenerUrl(`productos?${queryParams}`), { headers })
    .then(procesarRespuesta)
    .catch(manejarErrores);
}


    // Función para obtener productos por línea terapéutica
    static async getProductosPorLinea(lineaTerapeutica) {
        const response = await fetch(obtenerUrl(`productos?lineaTerapeutica=${lineaTerapeutica}`), { headers });
        
        if (!response.ok) {
            throw new Error('Error al obtener productos relacionados');
        }

        return await response.json();
    }

    // Función para obtener productos por especie
static async getProductosPorEspecie(especies) {
    const queryString = especies.map(especie => `especies=${especie}`).join('&'); // Crea una cadena de consulta con las especies seleccionadas.
    
    const response = await fetch(obtenerUrl(`productos?${queryString}`), { headers });
    
    if (!response.ok) {
        throw new Error('Error al obtener productos por especie');
    }

    return await response.json();
}

    // get /productos/:idProducto
    static getProducto(idProducto) {
    return fetch(obtenerUrl(`productos/${idProducto}`), { headers })
    .then(procesarRespuesta)
    .catch(manejarErrores);
    }
}



