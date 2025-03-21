const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzg1NzM4MzRiZjAwMTUwMDA3MTgiLCJpYXQiOjE3NDI1NTExMjcsImV4cCI6MTc0Mzc2MDcyN30.NuI3QFLfgHb9Vr9m8F3Gg0JMpe8K33Oydi-dTmZaXIc";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(API_URL + productId, {
  headers: {
    Authorization: AUTH_TOKEN,
  },
})
  .then(res => res.json())
  .then(product => {
    document.getElementById("details-container").innerHTML = `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.imageUrl}" class="img-fluid rounded-start" alt="${product.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
              <p class="card-text"><strong>Prezzo:</strong> €${product.price}</p>
              <a href="backoffice.html?id=${product._id}" class="btn btn-warning">Modifica</a>
            </div>
          </div>
        </div>
      </div>`;
  })
  .catch(err => {
    document.getElementById("details-container").innerHTML = `<div class="alert alert-danger">Errore nel caricamento dei dettagli.</div>`;
    console.error(err);
  });