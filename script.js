// --- 1. GLOBAL STATE ---
// We declare this once at the top so every function can access it.
let cart = [];

// --- 2. INITIALIZATION ---
// This runs as soon as the page loads to set up observers and listeners.
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('appear');
      }
  });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
  observer.observe(card);
});

// --- 3. CORE FUNCTIONS (The Logic) ---

function addToCart(productName, quantity) {
  const qty = parseInt(quantity);
    
    // Check if item already exists using .find()
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
      existingItem.qty += qty;
  } else {
      cart.push({ name: productName, qty: qty });
  }
  updateCartUI();
}

function removeFromCart(index) {
    // .splice removes the item at that specific index
  cart.splice(index, 1);
  updateCartUI();
}

// --- 4. UI UPDATE FUNCTION (The Visuals) ---
function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('final-order-btn');
  
  // 1. Clear the list first
  cartList.innerHTML = ""; 

    // 2. CHECK: If the cart has 0 items, show the "Empty" message
  if (cart.length === 0) {
      cartList.innerHTML = `<p class="empty-msg">Your cart is empty</p>`;
      checkoutBtn.style.display = "none";
      return; // Stop the function here
  }

  // 3. If we have items, loop through and build the list
  cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <span><i>${item.qty}x ${item.name}<i></span>
          <button onclick="removeFromCart(${index})" class="remove-btn">
              <i class="fa-solid fa-trash"></i>
          </button>
      `;
      cartList.appendChild(li);
  });

  // 4. Show the checkout button because we have items
  checkoutBtn.style.display = "block";
}
// --- 5. EVENT LISTENERS ---

// Listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;
    const quantityInput = button.parentElement.querySelector('.qty-input');
    const quantity = quantityInput.value;
    addToCart(productName, quantity);

    // Visual Feedback Logic
    const originalText = button.innerText;
    button.innerText = "Added! ✓";
    button.classList.add('success');

    // Reset the button after 1.5 seconds
    setTimeout(() => {
        button.innerText = originalText;
        button.classList.remove('success');
    }, 1500);
  });
});

// Listener for the Final WhatsApp Checkout
document.getElementById('final-order-btn').addEventListener('click', () => {
  let orderList = "Hello Latito Cakes! I'd like to order:\n";
  
  cart.forEach(item => {
      orderList += `_${item.qty} x ${item.name}_\n`;
  });

  const encodedMessage = encodeURIComponent(orderList);
  window.open(`https://wa.me/2349013288333?text=${encodedMessage}`, "_blank");
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  
  // Add a tiny delay so the user actually sees the smooth transition
  setTimeout(() => {
      loader.classList.add("loader-hidden");
  }, 500);
});
