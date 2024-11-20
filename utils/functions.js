import { RequestsAPI } from "../RequestsAPI.js";

// function para obtener el valor de un input. Recibe el id del input y retorna el valor del input.
export const obtenerValorInput = (idInput) => {
    const inputElement = document.getElementById(idInput);
    if (inputElement) {
        return inputElement.value;
    } else {
        console.error(`No se encontró un elemento con el ID: ${idInput}`);
        return null;
    }
};

// function para obtener el valor de un input. Recibe el id del input y retorna el valor del input.

export const imprimir =(elemento, contenido) => {
    const element = document.querySelector(`#${elemento}`);
    if (element) {
        element.innerHTML = contenido;
    } else {
        console.error(`No se encontró un elemento con el ID: ${elemento}`);
    }

};

// función para validar sesión de usuario
export const validarSesion = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const usuarioLogueado = sessionStorage.getItem("session");
        const estaEnLogin = document.location.pathname.includes("login.html");
        const estaEnRegister = document.location.pathname.includes("registrar.html");
        const estaEnPaginaPublica = estaEnLogin || estaEnRegister;

        console.log("Ruta actual:", document.location.pathname);
        console.log("Usuario logueado:", usuarioLogueado);
        console.log("Está en página pública:", estaEnPaginaPublica);

        if (usuarioLogueado) {
            if (estaEnPaginaPublica) {
                document.location.replace("proveedor.html"); // Redirigir a la página de proveedor falta hacerla
            }
        } else {
            if (!estaEnPaginaPublica) {
                document.location.replace("login.html");
            }
        }
    });
};

// function para agregar evento click al botón de cerrar sesión no tengo hecho el boton alerta alerta
export const eventoClickCerrarSesion = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const logoutButton = document.querySelector("#boton-logout");
        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                sessionStorage.removeItem("session");
                RequestsAPI.logout().then(() => {
                    document.location.replace("login.html");
                });
            });
        } else {
            console.error("No se encontró un botón de cerrar sesión con el ID: boton-logout");
        }
    });
};