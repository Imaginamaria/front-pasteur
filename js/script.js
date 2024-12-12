// Navbar transparente al scrollear

function userScroll() {
    const navbar = document.querySelector('.navbar');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-sticky');
      } else {
        navbar.classList.remove('navbar-sticky');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', userScroll);


  // Toast de confirmación del suscribase del footer

  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Previene el comportamiento por defecto del formulario

    // Muestra el Toast de confirmación
    var toast = new bootstrap.Toast(document.getElementById('subscribeToast'));
    toast.show();
    
    // Limpia el campo de email
    document.getElementById('subscribeEmail').value = '';
});
  

