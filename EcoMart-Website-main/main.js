let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let account = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

document.querySelector('#search-btn')?.addEventListener("click", () => {
  searchForm.classList.toggle('active');
  shoppingCart?.classList.remove('active');
  account?.classList.remove('active');
  navbar.classList.remove('active');
});

document.querySelector('#cart-btn')?.addEventListener("click", () => {
  shoppingCart.classList.toggle('active');
  searchForm?.classList.remove('active');
  account?.classList.remove('active');
  navbar.classList.remove('active');
  loadCartItems(); // Refresh cart
});

document.querySelector('#login-btn')?.addEventListener("click", () => {
  account.classList.toggle('active');
  searchForm?.classList.remove('active');
  shoppingCart?.classList.remove('active');
  navbar.classList.remove('active');
});

document.querySelector('#menu-btn')?.addEventListener("click", () => {
  navbar.classList.toggle('active');
  searchForm?.classList.remove('active');
  shoppingCart?.classList.remove('active');
  account?.classList.remove('active');
});

window.onscroll = () => {
  searchForm?.classList.remove('active');
  shoppingCart?.classList.remove('active');
  account?.classList.remove('active');
  navbar.classList.remove('active');
};

function addProductToCart(name, price, imagePath) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push({ name, price, imagePath });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  alert(`${name} added to cart!`);
}

function loadCartItems() {
  const cart = document.getElementById('shopping-cart');
  const totalDiv = document.getElementById('total-amount');
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Remove old items
  cart.querySelectorAll('.box').forEach(box => box.remove());

  let total = 0;

  cartItems.forEach((item, index) => {
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `
      <i class="fas fa-trash" onclick="removeProduct(${index})"></i>
      <img src="${item.imagePath}" alt="${item.name}">
      <div class="content">
        <h3>${item.name}</h3>
        <span class="price">₹ ${item.price}/-</span>
        <span class="quantity">Qty: 1</span>
      </div>
    `;
    cart.insertBefore(box, totalDiv);
    total += item.price;
  });

  totalDiv.textContent = `Total: ₹ ${total}/-`;
}

function removeProduct(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  loadCartItems();
}

// Load cart on page load
window.onload = () => {
  loadCartItems();
};
