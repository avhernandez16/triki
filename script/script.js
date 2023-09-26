// Obtener referencias a elementos HTML
const casilla = document.querySelectorAll('.parent button'); // Todos los botones del triqui
const cuadricula = document.querySelector('.parent'); // El contenedor del triqui

// Variables para el seguimiento de la posición actual
let filaActual = 0;
let columnaActual = 0;
actualizarSeleccion(); // Resaltar el cuadro inicial

/// ...

// Agregar un evento de teclado para detectar las flechas y la barra espaciadora
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Ignorar todas las teclas excepto las flechas
  if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
    casilla[filaActual * 3 + columnaActual].classList.remove('seleccionado'); // Eliminar la selección actual

    switch (key) {
      case 'ArrowUp':
        if (filaActual > 0) {
          filaActual--;
        }
        break;
      case 'ArrowDown':
        if (filaActual < 2) {
          filaActual++;
        }
        break;
      case 'ArrowLeft':
        if (columnaActual > 0) {
          columnaActual--;
        }
        break;
      case 'ArrowRight':
        if (columnaActual < 2) {
          columnaActual++;
        }
        break;
      default:
        return;
    }

    actualizarSeleccion(); // Resaltar el cuadro actual
  } else if (key === ' ') {
    // Si se presiona la barra espaciadora, prevenir su comportamiento predeterminado
    event.preventDefault();
  }
});


// Función para resaltar el cuadro actual
function actualizarSeleccion() {
    casilla[filaActual * 3 + columnaActual].classList.add('seleccionado');

}

