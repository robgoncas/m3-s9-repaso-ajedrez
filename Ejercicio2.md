
#### Objetivo:
Desarrollar un programa en JavaScript donde dos jugadores intentan adivinar un número aleatorio entre 1 y 100. El jugador que adivina el número exacto gana, y si nadie lo acierta, gana el jugador que se acerque más al número.

### Instrucciones

#### **Paso 1: Preparación del Proyecto**
1. **Crea la estructura del proyecto**:
   - Crea una carpeta llamada `AdivinaElNumero`.
   - Dentro de esa carpeta, crea dos archivos: `index.html` y `main.js`.

2. **Configura el HTML**:
   - En `index.html`, define la estructura básica con un campo de entrada para los nombres de los jugadores, botones para comenzar el juego, hacer las adivinanzas, y un área para mostrar los resultados.

---

### **2. Función para Agregar Jugadores**

**Función:** `agregarJugador()`

- **Entrada:** Un nombre ingresado por el usuario.
- **Proceso:**
  - Validar que el nombre no esté vacío.
  - Crear un objeto jugador con un `Symbol` único como identificador.
  - Almacenar el jugador en un array de jugadores.
- **Salida:** El jugador se agrega a la lista de jugadores.

**Pseudocódigo:**
```
función agregarJugador()
    nombre <- solicitar al usuario("Ingrese el nombre del jugador:")
    si nombre es válido (no vacío, no nulo)
        jugador <- crear objeto Jugador(nombre)
        idJugador <- crear Symbol único
        jugador[idJugador] <- identificador
        agregar jugador al array jugadores
    sino
        mostrar("Nombre inválido, intente nuevamente")
fin función
```

---

### **3. Generar el Número Aleatorio**

**Función:** `generarNumeroAleatorio()`

- **Entrada:** Ninguna.
- **Proceso:**
  - Generar un número aleatorio entre 1 y 100.
  - Almacenar el número en una variable.
- **Salida:** Número aleatorio generado.

**Pseudocódigo:**
```
función generarNumeroAleatorio()
    numeroAleatorio <- generar número aleatorio entre 1 y 100
    devolver numeroAleatorio
fin función
```

---

### **4. Función para Adivinar el Número**

**Función:** `adivinarNumero()`

- **Entrada:** La adivinanza de cada jugador.
- **Proceso:**
  - Solicitar a cada jugador que ingrese su adivinanza.
  - Comparar la adivinanza con el número aleatorio.
  - Determinar si la adivinanza es correcta o, si no, quién estuvo más cerca.
- **Salida:** El jugador que acertó o el que estuvo más cerca.

**Pseudocódigo:**
```
función adivinarNumero(numeroAleatorio)
    para cada jugador en jugadores
        adivinanza <- solicitar al jugador("Ingrese su adivinanza:")
        almacenar adivinanza en objeto jugador
    fin
    si jugador1.adivinanza == numeroAleatorio
        mostrar("Jugador 1 gana")
    sino si jugador2.adivinanza == numeroAleatorio
        mostrar("Jugador 2 gana")
    sino
        diferencia1 <- calcular diferencia entre jugador1.adivinanza y numeroAleatorio
        diferencia2 <- calcular diferencia entre jugador2.adivinanza y numeroAleatorio
        si diferencia1 < diferencia2
            mostrar("Jugador 1 estuvo más cerca y gana")
        sino
            mostrar("Jugador 2 estuvo más cerca y gana")
    fin
fin función
```

---

### **5. Validación y Manejo de Jugadores con Proxy**

**Función:** `crearProxyJugador(jugador)`

- **Entrada:** Un objeto jugador.
- **Proceso:**
  - Crear un `Proxy` para validar las adivinanzas y evitar entradas no válidas.
  - Usar `Reflect` para manejar las propiedades del jugador.
- **Salida:** Devuelve un proxy que valida al jugador.

**Pseudocódigo:**
```
función crearProxyJugador(jugador)
    manejador <- definir objeto manejador con 'set' y 'get'
    en 'set'
        si la propiedad es 'adivinanza' y el valor es válido (número entre 1 y 100)
            asignar valor a la propiedad usando Reflect
        sino
            mostrar("Error: Adivinanza inválida")
    fin
    en 'get'
        si la propiedad es 'id'
            devolver el Symbol del jugador
        devolver la propiedad solicitada
    fin
    proxyJugador <- crear Proxy para jugador con manejador
    devolver proxyJugador
fin función
```

---

### **6. Mostrar Resultados**

**Función:** `mostrarResultado(ganador)`

- **Entrada:** El nombre del jugador ganador o un mensaje de empate.
- **Proceso:**
  - Actualizar el HTML con el resultado.
  - Usar métodos de cadena (`trim`, `replace`) para limpiar y formatear el nombre del jugador.
- **Salida:** Resultado mostrado en la página.

**Pseudocódigo:**
```
función mostrarResultado(ganador)
    si hay ganador
        nombreLimpio <- limpiar nombre del ganador con trim y replace
        mostrar("El ganador es: " + nombreLimpio)
    sino
        mostrar("Empate")
fin función
```

---

### **7. Flujo Principal**

**Pseudocódigo:**
```
inicializar array jugadores vacío
inicializar variable numeroAleatorio

agregar evento a botón 'Agregar Jugador' para llamar a agregarJugador
agregar evento a botón 'Comenzar Juego' para llamar a generarNumeroAleatorio
agregar evento a botón 'Adivinar Número' para llamar a adivinarNumero

función principal()
    cargar página
    esperar interacción del usuario
fin función
```

---

### Resumen de Funciones y Detalles

- **`agregarJugador()`**: Solicita y valida el nombre del jugador, crea un objeto jugador, y lo añade al array de jugadores.
- **`generarNumeroAleatorio()`**: Genera un número aleatorio entre 1 y 100.
- **`adivinarNumero()`**: Compara las adivinanzas de los jugadores con el número aleatorio y determina quién ganó.
- **`crearProxyJugador(jugador)`**: Crea un `Proxy` para validar la adivinanza de los jugadores.
- **`mostrarResultado(ganador)`**: Muestra el resultado del juego en la página, formateando correctamente los nombres.
