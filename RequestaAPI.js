
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

   static urlBaseBackend = "http://localhost:3001"; //cuando suba al servidor lo cambio por la del servidor


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
}