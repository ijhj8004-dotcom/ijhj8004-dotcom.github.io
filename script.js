// Inicializar Lucide Icons
lucide.createIcons();

// Custom Cursor (Desktop Only)
const cursor = document.getElementById('cursor-trail');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover effect for interactive elements
    const interactives = document.querySelectorAll('a, button, .product-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
} else {
    cursor.style.display = 'none';
}

// Datos de Menú
const products = [
    { id: 1, name: 'Cyber Burger', price: 8500, category: 'burgers', desc: 'Doble carne, cheddar fundido, bacon crujiente y salsa secreta neón.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Glitch Chicken', price: 7800, category: 'burgers', desc: 'Pollo frito crispy, coleslaw picante y pan brioche negro.', img: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Acid Fries', price: 4200, category: 'papas', desc: 'Papas rústicas bañadas en salsa de queso azul y jalapeños.', img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Neon Cola', price: 2000, category: 'bebidas', desc: 'Gaseosa artesanal con extractos cítricos y colorante UV.', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

// Renderizar Menú
const menuGrid = document.getElementById('menuGrid');

function renderMenu(filter = 'all') {
    menuGrid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${p.img}" alt="${p.name}" class="product-img">
            </div>
            <div class="card-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="card-footer">
                    <span class="product-price">$${p.price}</span>
                    <button class="add-btn" onclick="addToCart(${p.id})">
                        <i data-lucide="plus"></i>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
    lucide.createIcons();
    
    // Re-attach cursor hover events
    if(!isTouchDevice){
        document.querySelectorAll('.add-btn, .product-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderMenu(e.target.dataset.filter);
    });
});

renderMenu(); // Init

// Lógica del Carrito
let cart = JSON.parse(localStorage.getItem('neon_cart')) || [];

function saveCart() {
    localStorage.setItem('neon_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    
    // Feedback visual (abrir carrito brevemente o animar icono)
    document.getElementById('cartBadge').style.transform = 'scale(1.5)';
    setTimeout(() => document.getElementById('cartBadge').style.transform = 'scale(1)', 200);
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cartItems');
    const badge = document.getElementById('cartBadge');
    const totalDisplay = document.getElementById('cartTotalDisplay');
    
    itemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        
        itemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-actions">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    badge.innerText = count;
    totalDisplay.innerText = '$' + total;
}

updateCartUI(); // Init

// UI Controls
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

document.getElementById('openCart').addEventListener('click', () => {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
});

const closeCart = () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
};

document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Mobile Menu
const mobileMenu = document.getElementById('mobileMenu');
document.getElementById('hamburgerMenu').addEventListener('click', () => {
    mobileMenu.classList.add('active');
});
document.getElementById('closeMenuBtn').addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if(cart.length === 0) return alert('El carrito está vacío');
    alert('Pedido enviado a la matrix. Preparate para el impacto.');
    cart = [];
    saveCart();
    closeCart();
});
