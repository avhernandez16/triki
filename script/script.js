const Jugador1 = prompt("Ingrese el nombre del jugador 1");
const Jugador2 = prompt("Ingrese el nombre del jugador 2");

// Obtener referencias a elementos HTML
const labelJugador1 = document.querySelector('.jugadores label:nth-child(1)');
const labelJugador2 = document.querySelector('.jugadores label:nth-child(2)');

// Asignar los nombres de los jugadores a los elementos <label>
labelJugador1.textContent = `Jugador 1: ${Jugador1}`;
labelJugador2.textContent = `Jugador 2: ${Jugador2}`;

// Obtener referencias a elementos HTML
const casilla = document.querySelectorAll('.parent button'); // Todos los botones del triqui
const cuadricula = document.querySelector('.parent'); // El contenedor del triqui

// Variables para el seguimiento de la posición actual
let filaActual = 0;
let columnaActual = 0;
let jugadorActual = 'X';
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
    const casillaActual = casilla[filaActual * 3 + columnaActual];
    if (!casillaActual.classList.contains('marcado')) {
      casillaActual.textContent = jugadorActual;
      casillaActual.classList.add('marcado');
      jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    }
  }
});


// Función para resaltar el cuadro actual
function actualizarSeleccion() {
    casilla[filaActual * 3 + columnaActual].classList.add('seleccionado');

}

