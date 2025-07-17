let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({...producto, cantidad: 1});
  }
  guardarYActualizar();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarYActualizar();
}

function vaciarCarrito() {
  carrito = [];
  guardarYActualizar();
}

function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-contenedor");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach(p => {
    const item = document.createElement("div");
    item.className = "item-carrito";
    item.innerHTML = `
      <p>${p.nombre} x${p.cantidad}</p>
      <p>Precio: $${p.precio * p.cantidad}</p>
      <button onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
    `;
    contenedor.appendChild(item);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const totalElem = document.createElement("p");
  totalElem.innerHTML = `<strong>Total: $${total}</strong>`;
  contenedor.appendChild(totalElem);
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  document.getElementById("vaciar-carrito")?.addEventListener("click", vaciarCarrito);
});

// === VALIDACIÓN DEL FORMULARIO ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const nombre = document.getElementById("Nombre");
      const email = document.getElementById("email");
      let valid = true;

      // Validar nombre vacío
      if (!nombre.value.trim()) {
        alert("Por favor ingresá tu nombre.");
        nombre.focus();
        valid = false;
      }

      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        alert("Por favor ingresá un correo electrónico válido.");
        email.focus();
        valid = false;
      }

      if (!valid) e.preventDefault();
    });
  }
});

const botonCompra = document.getElementById('comprar-btn');
botonCompra.addEventListener('click', () => {
  console.log('Carrito antes de eliminar:', localStorage.getItem('carrito'));
  localStorage.removeItem('carrito');
  console.log('Carrito después de eliminar:', localStorage.getItem('carrito'));
  // Redirige al home ( o inicioo)
  window.location.hash = '#id-005';
});
