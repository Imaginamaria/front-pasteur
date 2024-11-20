import { obtenerValorInput , imprimir, validarSesion } from "../utils/functions.js";
import { RequestsAPI } from "../RequestaAPI.js";


// validamos la sesion del usuario
validarSesion();

// obtenemos el boton de login
const botonLogin = document.querySelector("#form-login-submit");

botonLogin.addEventListener("click", () => {

    // obtener el user y password del formulario
  const email = obtenerValorInput("form-login-email");
  const password = obtenerValorInput("form-login-password");

  console.log(email, password); //para ver que funcione y obtenga los valores del input del form

    // hacer el fetch, usando el metodo login de request api
    RequestsAPI.login(email, password)
    .then((data) => {
      //    si el login es exitoso, lo guardamos en el session storage
      sessionStorage.setItem("session", data.session);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // redirigimos al usuario a la pagina con precios
      document.location.replace("proveedor.html");
    })
    .catch((error) => {
      // si hay un error, lo mostramos en la consola y en el formulario
      console.error(error);
      imprimir("form-login-error", "Email o contraseña incorrectos");
    });





});