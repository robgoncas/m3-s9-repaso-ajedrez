document.addEventListener("DOMContentLoaded", function() {
    // Arreglo para almacenar los jugadores
    var jugadores = [];  
    // Arreglo para almacenar los movimientos
    var movimientos = [];  
    // Arreglo que representa el tablero
    var tablero = new Array(64).fill(null);  
    // Letras para las columnas del tablero
    var columnas = 'abcdefgh';  
    // Symbol para identificar a los jugadores
    var simboloJugador = Symbol('id');  

    // Clase Jugador
    function Jugador(nombre) {
        // Nombre del jugador
        this.nombre = nombre;  
        // ID del jugador usando Symbol
        this[simboloJugador] = 'jugador_' + (jugadores.length + 1);  
    }

    // Proxy para validar y manejar los jugadores
    var manejadorJugador = {
        set: function(target, prop, value) {
            // Validar y establecer el nombre del jugador
            if (prop === 'nombre' && typeof value === 'string' && value.trim().length > 0) {
                target[prop] = value.trim();
            } else {
                console.log('Nombre inválido');
            }
            return true;
        },
        get: function(target, prop) {
            // Obtener el ID del jugador usando Symbol
            if (prop === 'id') {
                return target[simboloJugador];
            }
            return target[prop];
        }
    };

    // Función para agregar un jugador
    function agregarJugador() {
        var nombreJugador = prompt("Ingrese el nombre del jugador:");
        if (nombreJugador) {
            // Crear un nuevo jugador
            var jugador = new Jugador(nombreJugador);  
            // Crear un proxy para el jugador
            var proxyJugador = new Proxy(jugador, manejadorJugador);  
            // Agregar el jugador al arreglo de jugadores
            jugadores.push(proxyJugador);  
            console.log('Jugador agregado: ' + proxyJugador.nombre + ' (' + proxyJugador.id + ')');
        }
    }

    // Función para agregar un movimiento
    function agregarMovimiento() {
        if (jugadores.length < 2) {
            console.log("Debe haber al menos dos jugadores para agregar movimientos.");
            return;
        }
        // Alternar entre los jugadores
        var indiceJugador = movimientos.length % 2;  
        var desde = prompt('Jugador ' + jugadores[indiceJugador].nombre + ', ingrese la posición inicial (ej. e2):');
        var hasta = prompt('Jugador ' + jugadores[indiceJugador].nombre + ', ingrese la posición final (ej. e4):');
        if (desde && hasta) {
            // Agregar el movimiento al arreglo
            movimientos.push({ jugador: jugadores[indiceJugador].nombre, desde: desde, hasta: hasta });  
            console.log('Movimiento agregado: ' + jugadores[indiceJugador].nombre + ' mueve de ' + desde + ' a ' + hasta);
            // Actualizar el tablero con el movimiento
            actualizarTablero(desde, hasta, indiceJugador);  
        }
    }

    // Función para actualizar el tablero
    function actualizarTablero(desde, hasta, indiceJugador) {
        var indiceDesde = obtenerIndiceDesdePosicion(desde);
        var indiceHasta = obtenerIndiceDesdePosicion(hasta);
        // Añadir la pieza en la nueva posición
        tablero[indiceHasta] = indiceJugador === 0 ? '♔' : '♚';  
        // Vaciar la posición inicial
        tablero[indiceDesde] = null;   
        // Volver a dibujar el tablero
        renderizarTablero();   
    }

    // Función para renderizar el tablero
    function renderizarTablero() {
        var tableroElemento = document.getElementById('tableroAjedrez');
        // Vaciar el contenido actual
        tableroElemento.innerHTML = '';  
        for (var fila = 0; fila < 8; fila++) {
            // Crear una fila
            var tr = document.createElement('tr');  
            for (var col = 0; col < 8; col++) {
                // Crear una celda
                var td = document.createElement('td');  
                // Asignar color a la celda
                td.className = (fila + col) % 2 === 0 ? 'white' : 'black';  
                var indiceCelda = fila * 8 + col;
                var pieza = tablero[indiceCelda];
                // Mostrar la pieza o el nombre de la celda
                td.innerText = pieza ? pieza : columnas[col] + (8 - fila);  
                // Añadir la celda a la fila
                tr.appendChild(td);  
            }
            // Añadir la fila al tablero
            tableroElemento.appendChild(tr);  
        }
    }

    // Función para obtener el índice de una posición en el tablero
    function obtenerIndiceDesdePosicion(posicion) {
        var fila = 8 - parseInt(posicion[1]);
        var columna = columnas.indexOf(posicion[0]);
        return fila * 8 + columna;
    }

    // Inicializar el tablero
    renderizarTablero();

    // Añadir los event listeners a los botones
    document.getElementById('agregarJugador').addEventListener('click', agregarJugador);
    document.getElementById('agregarMovimiento').addEventListener('click', agregarMovimiento);
});
