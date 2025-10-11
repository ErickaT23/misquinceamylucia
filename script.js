// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
    // Obtener el sobre y la invitación
    const envelope = document.getElementById('envelope');
    const invitacion = document.getElementById('invitacion');
    
    // Añadir clase para animar la apertura del sobre
    envelope.classList.add('open');

    // Mostrar la invitación después de la animación
    setTimeout(() => {
        envelope.style.display = 'none';
        invitacion.style.display = 'block';
        
        // Reproducir la música solo después de abrir el sobre
        const musica = document.getElementById('musica');
        if (musica) {
            musica.play();
        }
    }, 1000); // Ajustar tiempo para esperar la animación de apertura del sobre
}

// Asignar el evento de clic al sello para abrir el sobre
document.addEventListener('DOMContentLoaded', function() {
    const seal = document.getElementById('seal');
    if (seal) {
        seal.addEventListener('click', abrirInvitacion);
    }

    // Iniciar el contador y cargar los datos del invitado al cargar la página
    iniciarContador();
    cargarDatosInvitado();
});

function cargarDatosInvitado() {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get('id');  // Obtener el ID del invitado desde la URL

    if (!invitadoId) {
        alert('ID de invitado no encontrado en el enlace.');
        return;
    }

    const invitado = window.invitados[invitadoId];  // Acceder a los datos del invitado en window.invitados

    if (invitado) {
        // Actualizar el contenido en el HTML con los datos del invitado
        document.getElementById('nombreInvitado').innerText = invitado.nombre;

        // Mostrar solo adultos y niños si hay niños, sino solo adultos
        if (invitado.ninos > 0) {
            document.getElementById('cantidadPases').innerText = `${invitado.adultos} adultos y ${invitado.ninos} niños`;
        } else {
            document.getElementById('cantidadPases').innerText = `${invitado.adultos} adultos`;
        }
    } else {
        alert('Invitado no encontrado.');
    }
}


  

// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
    const eventoFecha = new Date("October 18, 2025 00:00:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    }, 1000);
}

// Función para abrir el lightbox solo al hacer clic en una imagen de la galería
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');

    // Establecer la imagen del modal como la imagen seleccionada
    mainPhotoModal.src = element.src;

    // Mostrar el modal
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex'; // Usar 'flex' para centrar la imagen en pantalla
}

// Función para cerrar el modal
function closeModal(event) {
    // Cerrar el modal solo si el clic no fue en la imagen
    if (event.target.id === 'photo-modal' || event.target.className === 'close') {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

// Fade-in effect cuando los elementos se hacen visibles al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        threshold: 0.5, // El porcentaje del elemento que debe ser visible antes de activar la animación
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar una vez que la animación se activa
            }
        });
    }, observerOptions);

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});

//Funcion para confirmar la asistencia 
function confirmarAsistencia() {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get('id');  // Obtener el ID del invitado desde la URL

    if (!invitadoId || !window.invitados[invitadoId]) {
        alert("Invitado no encontrado.");
        return;
    }

    const invitado = window.invitados[invitadoId];  // Obtener los datos del invitado
    let mensaje = `Hola, soy ${invitado.nombre} y confirmo mi asistencia con ${invitado.adultos} adultos`;

    // Solo agregar niños si la cantidad de niños es mayor que 0
    if (invitado.ninos > 0) {
        mensaje += ` y ${invitado.ninos} niños`;
    }

    mensaje += ` para la fiesta de quince años de Amy Lucía.`;

    const numeroTelefono = '50255654205';  // Número de WhatsApp al cual se enviará el mensaje

    // Crear el enlace de WhatsApp
    const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;

    // Abrir el enlace de WhatsApp en una nueva ventana
    window.open(enlaceWhatsapp, '_blank');
}



//Funcion para abrir waze o maps
//iglesia
function elegirAplicacion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/5VGnAG54sZjYzjx78';
    const enlaceWaze = 'https://waze.com/ul?ll=14.558065,-90.729567&navigate=yes';

    // Intentar abrir Google Maps primero
    window.open(enlaceGoogleMaps, '_blank');
    
    // Intentar abrir Waze (en caso de que Google Maps no esté disponible)
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000); // Retraso para permitir que el primer enlace se abra si está disponible
}
//fiesta
function elegirAplicacionOtraDireccion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/UnDwjn4dhAkNAXfQ9';

    // Intentar abrir Google Maps primero
    window.open(enlaceGoogleMaps, '_blank');

    // Intentar abrir Waze (en caso de que Google Maps no esté disponible)
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000); // Retraso para permitir que el primer enlace se abra si está disponible
}

