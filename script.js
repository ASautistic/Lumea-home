// Simple Shopping Cart for Lumea Home
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.product button');

  addButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const product = button.parentElement;
      const name = product.querySelector('h3').innerText;
      const priceText = product.querySelector('p').innerText;
      const price = parseFloat(priceText.match(/R([\d.]+)/)[1]);

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart.`);
    });
  });

  // If on checkout page, show cart
  if (document.querySelector('.checkout')) {
    const summary = document.createElement('div');
    summary.innerHTML = '<h3>Order Summary</h3>';
    if (cart.length === 0) {
      summary.innerHTML += '<p>Your cart is empty.</p>';
    } else {
      const ul = document.createElement('ul');
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} × ${item.quantity} = R${(item.price * item.quantity).toFixed(2)}`;
        ul.appendChild(li);
      });
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      summary.appendChild(ul);
      summary.innerHTML += `<p><strong>Total: R${total.toFixed(2)}</strong></p>`;
    }
    document.querySelector('.checkout').prepend(summary);
  }
});
