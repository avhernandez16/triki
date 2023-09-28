
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
 

let tablero = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let juegoActivo = true;

// Lógica para verificar si hay un ganador
function verificarGanador() {
  const lineasGanadoras = [
    // Combinaciones de líneas que representan una victoria
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  const empate = tablero.flat().every(cell => cell !== '');
  if (empate) {
    // Resaltar ambos labels en color naranja en caso de empate
    labelJugador1.classList.add('empate');
    labelJugador2.classList.add('empate');
    return null;
  }

  for (const linea of lineasGanadoras) {
    const [a, b, c] = linea;
    if (tablero[a[0]][a[1]] && tablero[a[0]][a[1]] === tablero[b[0]][b[1]] && tablero[a[0]][a[1]] === tablero[c[0]][c[1]]) {

      // Resaltar el label del jugador ganador en verde
      if (tablero[a[0]][a[1]] === 'X') {
        labelJugador1.classList.add('ganador');
        labelJugador2.classList.remove('ganador');
      } else {
        labelJugador1.classList.remove('ganador');
        labelJugador2.classList.add('ganador');
      }

      // Resaltar el label del jugador ganador en verde y el perdedor en rojo
      if (tablero[a[0]][a[1]] === 'X') {
        labelJugador1.classList.add('ganador');
        labelJugador2.classList.add('perdedor');
      } else {
        labelJugador1.classList.add('perdedor');
        labelJugador2.classList.add('ganador');
      }

      return tablero[a[0]][a[1]];
    }
  }

  if (tablero.flat().every(cell => cell !== '')) {
    return 'Empate';
  }

  return null;
}


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
    if (!casillaActual.classList.contains('marcado') && tablero[filaActual][columnaActual] === '') {
      casillaActual.textContent = jugadorActual;
      casillaActual.classList.add('marcado');
      tablero[filaActual][columnaActual] = jugadorActual;

      // Verificar si hay un ganador
      const ganador = verificarGanador();
      if (ganador) {        
        reiniciarJuego();
        return;
      }

      // Verificar si hay un empate
      if (tablero.flat().every(cell => cell !== '')) {        
        reiniciarJuego();
        return;
      }

      jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    }
  }
});


// Función para resaltar el cuadro actual
function actualizarSeleccion() {
    casilla[filaActual * 3 + columnaActual].classList.add('seleccionado');

}

function reiniciarJuego() {
  // Limpiar el tablero y reiniciar las variables
  tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  jugadorActual = 'X';
  filaActual = 0;
  columnaActual = 0;

  // Limpiar la interfaz gráfica
  casilla.forEach(button => {
    button.textContent = '';
    button.classList.remove('marcado', 'seleccionado');
  });
  casilla[filaActual * 3 + columnaActual].classList.add('seleccionado');
}

