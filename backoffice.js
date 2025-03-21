// backoffice.js
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzg1NzM4MzRiZjAwMTUwMDA3MTgiLCJpYXQiOjE3NDI1NTExMjcsImV4cCI6MTc0Mzc2MDcyN30.NuI3QFLfgHb9Vr9m8F3Gg0JMpe8K33Oydi-dTmZaXIc"; 

const form = document.getElementById("product-form");
const resetBtn = document.getElementById("reset-btn");
const submitBtn = document.getElementById("submit-btn");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId) {
  // Se siamo in modalità modifica, carica i dati
  fetch(API_URL + productId, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  })
    .then((res) => res.json())
    .then((product) => {
      nameInput.value = product.name;
      descriptionInput.value = product.description;
      brandInput.value = product.brand;
      imageUrlInput.value = product.imageUrl;
      priceInput.value = product.price;
      submitBtn.textContent = "Modifica Prodotto";
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validazione base
  if (!nameInput.value || !descriptionInput.value || !brandInput.value || !imageUrlInput.value || !priceInput.value) {
    alert("Compila tutti i campi!");
    return;
  }

  const nuovoProdotto = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: parseFloat(priceInput.value),
  };

  const method = productId ? "PUT" : "POST";
  const url = productId ? API_URL + productId : API_URL;

  fetch(url, {
    method,
    headers: {
      Authorization: AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuovoProdotto),
  })
    .then((res) => {
      if (res.ok) {
        alert(productId ? "Prodotto modificato!" : "Prodotto creato!");
        window.location.href = "index.html";
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .catch((err) => console.error(err));
});

resetBtn.addEventListener("click", () => {
  form.reset();
});
