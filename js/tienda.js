'use strict';

// ===== Datos de productos =====
const productos = [
  {
    id: 1,
    nombre: 'Sneaker Urbano Pro',
    categoria: 'hombre',
    precio: 89.99,
    precioOriginal: 120,
    descripcion: 'Zapatilla urbana con suela de alta tracción. Perfecta para el día a día con un look deportivo casual.',
    tallas: [39, 40, 41, 42, 43, 44],
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    estrellas: 5,
    badge: 'descuento',
    nuevo: false
  },
  {
    id: 2,
    nombre: 'Tacón Elegante Milano',
    categoria: 'mujer',
    precio: 115.00,
    precioOriginal: null,
    descripcion: 'Zapato de tacón en cuero genuino italiano. Diseño clásico ideal para eventos formales y reuniones de negocios.',
    tallas: [35, 36, 37, 38, 39, 40],
    imagen: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
    estrellas: 4,
    badge: null,
    nuevo: true
  },
  {
    id: 3,
    nombre: 'Running Boost X',
    categoria: 'deportivo',
    precio: 149.99,
    precioOriginal: 180,
    descripcion: 'Zapatilla de running con tecnología de amortiguación reactiva. Ideal para maratones y entrenamientos intensivos.',
    tallas: [39, 40, 41, 42, 43, 44, 45],
    imagen: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    estrellas: 5,
    badge: 'descuento',
    nuevo: false
  },
  {
    id: 4,
    nombre: 'Oxford Clásico Premium',
    categoria: 'hombre',
    precio: 135.00,
    precioOriginal: null,
    descripcion: 'Zapato oxford de cuero pulido con costura brogue. El acompañante perfecto para trajes y looks formales.',
    tallas: [40, 41, 42, 43, 44],
    imagen: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop',
    estrellas: 4,
    badge: null,
    nuevo: false
  },
  {
    id: 5,
    nombre: 'Sandalia Bohemia',
    categoria: 'mujer',
    precio: 62.00,
    precioOriginal: 85,
    descripcion: 'Sandalia de piel con trenzado artesanal. Ligera y cómoda para los días calurosos y paseos playeros.',
    tallas: [35, 36, 37, 38, 39],
    imagen: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=400&fit=crop',
    estrellas: 4,
    badge: 'descuento',
    nuevo: false
  },
  {
    id: 6,
    nombre: 'Skate Canvas Classic',
    categoria: 'casual',
    precio: 55.00,
    precioOriginal: null,
    descripcion: 'Zapatilla de lona estilo skate con suela de goma vulcanizada. Un icono del streetwear moderno.',
    tallas: [38, 39, 40, 41, 42, 43, 44],
    imagen: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
    estrellas: 4,
    badge: null,
    nuevo: true
  },
  {
    id: 7,
    nombre: 'Trail Runner Extreme',
    categoria: 'deportivo',
    precio: 175.00,
    precioOriginal: 210,
    descripcion: 'Zapatilla para trail running con impermeabilidad y agarre en todo tipo de terreno. Aventura sin límites.',
    tallas: [40, 41, 42, 43, 44, 45],
    imagen: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop',
    estrellas: 5,
    badge: 'descuento',
    nuevo: false
  },
  {
    id: 8,
    nombre: 'Bota Chelsea Caramel',
    categoria: 'mujer',
    precio: 128.00,
    precioOriginal: null,
    descripcion: 'Bota Chelsea en cuero camel con elásticos laterales. Versátil para combinar con jeans, faldas o vestidos.',
    tallas: [36, 37, 38, 39, 40],
    imagen: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400&h=400&fit=crop',
    estrellas: 5,
    badge: null,
    nuevo: true
  },
  {
    id: 9,
    nombre: 'Mocasín Comfort Plus',
    categoria: 'casual',
    precio: 78.00,
    precioOriginal: 95,
    descripcion: 'Mocasín de cuero suave con plantilla memory foam. Comodidad todo el día sin sacrificar el estilo.',
    tallas: [39, 40, 41, 42, 43],
    imagen: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=400&h=400&fit=crop',
    estrellas: 4,
    badge: 'descuento',
    nuevo: false
  }
];

// ===== Estado del carrito =====
let carrito = JSON.parse(localStorage.getItem('stepstyle_carrito') || '[]');

// ===== Navbar scroll =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== Renderizar productos =====
function renderizarProductos(lista) {
  const grid = document.getElementById('gridProductos');
  const sinRes = document.getElementById('sinResultados');

  if (lista.length === 0) {
    grid.innerHTML = '';
    sinRes.classList.remove('d-none');
    return;
  }
  sinRes.classList.add('d-none');

  grid.innerHTML = lista.map(p => `
    <div class="col-sm-6 col-lg-4">
      <div class="card producto-card h-100" onclick="abrirModal(${p.id})">
        <div class="producto-img-wrapper">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
          ${p.badge === 'descuento' ? `<span class="badge-descuento">-${Math.round((1 - p.precio / p.precioOriginal) * 100)}%</span>` : ''}
          ${p.nuevo ? '<span class="badge-nuevo">Nuevo</span>' : ''}
          <button class="btn-agregar-overlay" onclick="event.stopPropagation(); agregarAlCarrito(${p.id})">
            <i class="fa-solid fa-cart-plus me-2"></i>Agregar al Carrito
          </button>
        </div>
        <div class="card-body p-3">
          <small class="text-muted text-uppercase" style="font-size:0.7rem;letter-spacing:0.1em">${p.categoria}</small>
          <h6 class="card-title fw-bold mt-1 mb-1">${p.nombre}</h6>
          <div class="stars mb-2">${'★'.repeat(p.estrellas)}${'☆'.repeat(5 - p.estrellas)}</div>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold text-primary fs-5">$${p.precio.toFixed(2)}</span>
            ${p.precioOriginal ? `<span class="producto-precio-original">$${p.precioOriginal.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== Filtros =====
function filtrarProductos() {
  const busq = document.getElementById('busqueda').value.toLowerCase();
  const cat = document.getElementById('filtroCategoria').value;
  const precio = document.getElementById('filtroPrecio').value;

  let resultado = productos.filter(p => {
    const matchBusq = p.nombre.toLowerCase().includes(busq) || p.categoria.includes(busq);
    const matchCat = !cat || p.categoria === cat;
    let matchPrecio = true;
    if (precio === '0-50') matchPrecio = p.precio < 50;
    else if (precio === '50-100') matchPrecio = p.precio >= 50 && p.precio < 100;
    else if (precio === '100-200') matchPrecio = p.precio >= 100 && p.precio < 200;
    else if (precio === '200+') matchPrecio = p.precio >= 200;
    return matchBusq && matchCat && matchPrecio;
  });

  renderizarProductos(resultado);
}

document.getElementById('busqueda').addEventListener('input', filtrarProductos);
document.getElementById('filtroCategoria').addEventListener('change', filtrarProductos);
document.getElementById('filtroPrecio').addEventListener('change', filtrarProductos);

document.getElementById('btnLimpiar').addEventListener('click', () => {
  document.getElementById('busqueda').value = '';
  document.getElementById('filtroCategoria').value = '';
  document.getElementById('filtroPrecio').value = '';
  document.querySelectorAll('.categoria-card').forEach(c => c.classList.remove('active'));
  renderizarProductos(productos);
});

// ===== Categorías rápidas =====
document.querySelectorAll('.categoria-card').forEach(card => {
  card.addEventListener('click', () => {
    const filtro = card.dataset.filter;
    document.querySelectorAll('.categoria-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    document.getElementById('filtroCategoria').value = filtro;
    filtrarProductos();
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Modal producto =====
function abrirModal(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;

  const descuento = p.precioOriginal ? Math.round((1 - p.precio / p.precioOriginal) * 100) : null;

  document.getElementById('modalProductoBody').innerHTML = `
    <div class="row g-4">
      <div class="col-md-6">
        <div class="producto-img-wrapper rounded-3" style="height:320px">
          <img src="${p.imagen}" alt="${p.nombre}" style="width:100%;height:100%;object-fit:cover">
          ${descuento ? `<span class="badge-descuento">-${descuento}%</span>` : ''}
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <small class="text-muted text-uppercase" style="letter-spacing:0.1em">${p.categoria}</small>
        <h2 class="fw-bold mt-1">${p.nombre}</h2>
        <div class="stars mb-2" style="font-size:1rem">${'★'.repeat(p.estrellas)}${'☆'.repeat(5 - p.estrellas)}</div>
        <div class="mb-3">
          <span class="fw-bold text-primary fs-3">$${p.precio.toFixed(2)}</span>
          ${p.precioOriginal ? `<span class="producto-precio-original ms-2 fs-6">$${p.precioOriginal.toFixed(2)}</span>` : ''}
        </div>
        <p class="text-muted mb-4">${p.descripcion}</p>
        <p class="fw-semibold mb-2">Seleccionar Talla:</p>
        <div class="d-flex flex-wrap gap-2 mb-4" id="tallasModal">
          ${p.tallas.map(t => `<button class="talla-btn" data-talla="${t}">${t}</button>`).join('')}
        </div>
        <button class="btn btn-primary btn-lg" onclick="agregarDesdeModal(${p.id})">
          <i class="fa-solid fa-cart-plus me-2"></i>Agregar al Carrito
        </button>
      </div>
    </div>
  `;

  document.querySelectorAll('#tallasModal .talla-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#tallasModal .talla-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  new bootstrap.Modal(document.getElementById('modalProducto')).show();
}

function agregarDesdeModal(id) {
  const tallaBtn = document.querySelector('#tallasModal .talla-btn.selected');
  const talla = tallaBtn ? tallaBtn.dataset.talla : null;
  agregarAlCarrito(id, talla);
  bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
}

// ===== Carrito =====
function agregarAlCarrito(id, talla = null) {
  const p = productos.find(x => x.id === id);
  if (!p) return;

  const key = `${id}_${talla}`;
  const existente = carrito.find(i => i.key === key);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ key, id, nombre: p.nombre, precio: p.precio, imagen: p.imagen, talla, cantidad: 1 });
  }

  guardarCarrito();
  renderizarCarrito();
  mostrarToast(`"${p.nombre}" agregado al carrito`);
}

function renderizarCarrito() {
  const contenedor = document.getElementById('carritoItems');
  const badge = document.getElementById('badgeCarrito');
  const total = document.getElementById('carritoTotal');

  const cantidadTotal = carrito.reduce((s, i) => s + i.cantidad, 0);
  badge.textContent = cantidadTotal;
  badge.style.display = cantidadTotal === 0 ? 'none' : 'inline-flex';

  const totalPrecio = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  total.textContent = `$${totalPrecio.toFixed(2)}`;

  if (carrito.length === 0) {
    contenedor.innerHTML = '';
    return;
  }

  contenedor.innerHTML = carrito.map(item => `
    <div class="carrito-item">
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="carrito-item-info">
        <h6>${item.nombre}</h6>
        <small>${item.talla ? `Talla: ${item.talla}` : 'Talla no seleccionada'}</small>
        <div class="qty-controls">
          <button onclick="cambiarCantidad('${item.key}', -1)">−</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad('${item.key}', 1)">+</button>
        </div>
      </div>
      <div class="text-end">
        <div class="carrito-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
        <button class="btn btn-sm btn-link text-danger p-0 mt-1" onclick="eliminarItem('${item.key}')">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function cambiarCantidad(key, delta) {
  const item = carrito.find(i => i.key === key);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) carrito = carrito.filter(i => i.key !== key);
  guardarCarrito();
  renderizarCarrito();
}

function eliminarItem(key) {
  carrito = carrito.filter(i => i.key !== key);
  guardarCarrito();
  renderizarCarrito();
}

document.getElementById('btnVaciar').addEventListener('click', () => {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

document.getElementById('btnPagar').addEventListener('click', () => {
  if (carrito.length === 0) {
    mostrarToast('El carrito está vacío', 'warning');
    return;
  }
  mostrarToast('Redirigiendo al pago...', 'info');
});

function guardarCarrito() {
  localStorage.setItem('stepstyle_carrito', JSON.stringify(carrito));
}

// ===== Toast =====
function mostrarToast(mensaje, tipo = 'success') {
  const toastEl = document.getElementById('toastCarrito');
  const toastMsg = document.getElementById('toastMsg');
  toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;
  toastMsg.textContent = mensaje;
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2500 });
  toast.show();
}

// ===== Formulario contacto =====
document.getElementById('formContacto').addEventListener('submit', e => {
  e.preventDefault();
  mostrarToast('Mensaje enviado correctamente');
  e.target.reset();
});

// ===== Init =====
renderizarProductos(productos);
renderizarCarrito();
