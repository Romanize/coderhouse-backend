const socket = io.connect();

// CHAT MESSAGES

socket.on("previousMessages", (data) => {
  const messageBox = document.querySelector('#message-box');
  messageBox.innerHTML = '';
  const previousMessages = data;
  previousMessages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `
      <p class="meta">${message.email} - ${message.date}</p>
      <p class="text">${message.message}</p>
    `;
    messageBox.appendChild(messageDiv);
  });
});

function sendMessage (e){
  e.preventDefault();
  const email = e.target.email.value;
  const message = e.target.message.value;
  const date = new Date();
  socket.emit('message', { email, message, date });
}

const form = document.querySelector('#message-form');
form.addEventListener('submit', sendMessage);

// PRODUCTS

socket.on('previousProducts', async (data) => {

  const templateText = await fetch('template/productsTable.hbs');
  const template = await templateText.text();

  const table = Handlebars.compile(template);

  document.getElementById('products-box').innerHTML = table({ products: data });
});

const productForm = document.getElementById('product-form');

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const product = {
    name: e.target.name.value,
    price: e.target.price.value,
    url: e.target.url.value
  };
  socket.emit('product', product);
});