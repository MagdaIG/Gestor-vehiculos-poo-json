class Vehiculo {
  constructor(marca, modelo, año, color, kilometraje) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.color = color;
    this.kilometraje = kilometraje;
  }

  mostrarDetalles() {
    return `${this.marca} ${this.modelo} (${this.año}) - Color: ${this.color} - Km: ${this.kilometraje}`;
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, año, color, kilometraje, puertas, transmision, combustible) {
    super(marca, modelo, año, color, kilometraje);
    this.numeroDePuertas = puertas;
    this.transmision = transmision;
    this.combustible = combustible;
    this.tipo = 'auto';
  }

  mostrarDetalles() {
    return `${super.mostrarDetalles()} | Puertas: ${this.numeroDePuertas} | Transmisión: ${this.transmision} | Combustible: ${this.combustible}`;
  }
}

class Motocicleta extends Vehiculo {
  constructor(marca, modelo, año, color, kilometraje, manillar, cilindrada) {
    super(marca, modelo, año, color, kilometraje);
    this.tipoDeManillar = manillar;
    this.cilindrada = cilindrada;
    this.tipo = 'motocicleta';
  }

  mostrarDetalles() {
    return `${super.mostrarDetalles()} | Manillar: ${this.tipoDeManillar} | Cilindrada: ${this.cilindrada}`;
  }
}

class Camion extends Vehiculo {
  constructor(marca, modelo, año, color, kilometraje, carga, ejes, tipoRemolque) {
    super(marca, modelo, año, color, kilometraje);
    this.capacidadDeCarga = carga;
    this.ejes = ejes;
    this.tipoRemolque = tipoRemolque;
    this.tipo = 'camion';
  }

  mostrarDetalles() {
    return `${super.mostrarDetalles()} | Carga: ${this.capacidadDeCarga} kg | Ejes: ${this.ejes} | Remolque: ${this.tipoRemolque}`;
  }
}

// Cargar datos desde JSON
let vehiculos = [];

async function cargarVehiculos() {
  try {
    const response = await fetch('assets/data/vehiculos.json');
    const data = await response.json();
    vehiculos = data.vehiculos.map(v => {
      switch(v.tipo) {
        case 'auto':
          return new Auto(v.marca, v.modelo, v.año, v.color, v.kilometraje,
            v.numeroDePuertas, v.transmision, v.combustible);
        case 'motocicleta':
          return new Motocicleta(v.marca, v.modelo, v.año, v.color, v.kilometraje,
            v.tipoDeManillar, v.cilindrada);
        case 'camion':
          return new Camion(v.marca, v.modelo, v.año, v.color, v.kilometraje,
            v.capacidadDeCarga, v.ejes, v.tipoRemolque);
        default:
          return new Vehiculo(v.marca, v.modelo, v.año, v.color, v.kilometraje);
      }
    });
  } catch (error) {
    console.error('Error cargando vehículos:', error);
  }
}

// Elementos del DOM
const listaVehiculos = document.getElementById('listaVehiculos');
const jsonOutput = document.getElementById('jsonOutput');
const btnConsola = document.getElementById('btnConsola');
const btnPantalla = document.getElementById('btnPantalla');
const btnJSON = document.getElementById('btnJSON');
const btnLimpiar = document.getElementById('btnLimpiar');

// Mostrar en consola
btnConsola.addEventListener('click', () => {
  console.clear();
  console.log('=== DETALLES DE VEHÍCULOS ===');
  vehiculos.forEach(v => console.log(v.mostrarDetalles()));
  jsonOutput.textContent = 'Consulta la consola (F12) para ver los detalles completos';
});

// Mostrar en pantalla
btnPantalla.addEventListener('click', () => {
  listaVehiculos.innerHTML = '';
  vehiculos.forEach(v => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>[${v.tipo.toUpperCase()}]</strong> ${v.mostrarDetalles()}`;
    listaVehiculos.appendChild(li);
  });
  jsonOutput.textContent = `Mostrando ${vehiculos.length} vehículos en la lista`;
});

// Mostrar JSON completo
btnJSON.addEventListener('click', () => {
  const vehiculosParaJSON = vehiculos.map(v => {
    const { tipo, ...rest } = v;
    return { tipo, ...rest };
  });
  jsonOutput.textContent = JSON.stringify({ vehiculos: vehiculosParaJSON }, null, 2);
});

// Limpiar pantalla
btnLimpiar.addEventListener('click', () => {
  listaVehiculos.innerHTML = '';
  jsonOutput.textContent = 'Pantalla limpiada. Presiona otro botón para interactuar.';
  console.clear();
});

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  await cargarVehiculos();
  jsonOutput.textContent = 'Sistema listo. Use los botones para interactuar.';
});
