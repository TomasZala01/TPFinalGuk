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