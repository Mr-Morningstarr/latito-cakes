const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;

    const message = `Hello Latito Cakes! I'd like to order ${productName}.`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/234901328833?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  });
});
