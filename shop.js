const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzg1NzM4MzRiZjAwMTUwMDA3MTgiLCJpYXQiOjE3NDI1NTExMjcsImV4cCI6MTc0Mzc2MDcyN30.NuI3QFLfgHb9Vr9m8F3Gg0JMpe8K33Oydi-dTmZaXIc";

const productContainer = document.getElementById("product-container");
const loadBtn = document.getElementById("load");

loadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchProducts();
});

function fetchProducts() {
  fetch(API_URL, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  })
    .then((res) => res.json())
    .then((products) => renderProducts(products))
    .catch((err) => console.error("Errore nel recupero dei prodotti", err));
}

function renderProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card">
        <img src="${product.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text fw-bold">€${product.price}</p>
          <button class="btn btn-warning me-2" onclick='editProduct("${product._id}")'>Modifica</button>
          <button class="btn btn-danger" onclick='deleteProduct("${product._id}")'>Elimina</button>
          <a href="dettagli.html?id=${product._id}" class="btn btn-info mt-2">Dettagli</a>
        </div>
      </div>
    `;
    productContainer.appendChild(col);
  });
}

function deleteProduct(id) {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(API_URL + id, {
      method: "DELETE",
      headers: {
        Authorization: AUTH_TOKEN,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Prodotto eliminato con successo");
          fetchProducts(); // ricarica prodotti aggiornati
        } else {
          throw new Error("Errore nella cancellazione");
        }
      })
      .catch((err) => console.error(err));
  }
}

function editProduct(id) {
  // Porta alla pagina per la modifica
  window.location.href = `backoffice.html?id=${id}`;
}
