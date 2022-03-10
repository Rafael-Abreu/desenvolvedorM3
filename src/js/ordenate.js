export function ordanateFunction()

{function orderByLowerPrice() {
    fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(function (data) {
      data.sort(function(a, b) {
        return parseFloat(a.price.replace(",", ".")) - parseFloat(b.price.replace(",", "."));
      })
  
      let html = '';
      data.forEach(product => {
        html += `
          <div class="product-vitrine ${product.color} ${product.size} ${product.price}">
            <img src="${product.image}" alt="imagem do produto">
            <h3>${product.name}</h3>
            <span>R$ ${product.price}</span>
            <p>${product.parcelamento}</p>
            <button class="add-to-bag-btn">Comprar</button>
          </div>
        `;
      });
      productList.innerHTML = html;
    });
  }
  
  function orderByHigherPrice() {
    fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(function (data) {
      data.sort(function(a, b) {
        return parseFloat(b.price.replace(",", ".")) - parseFloat(a.price.replace(",", "."));
      })
  
      let html = '';
      data.forEach(product => {
        html += `
          <div class="product-vitrine ${product.color} ${product.size} ${product.price}">
            <img src="${product.imgSrc}" alt="imagem do produto">
            <h3>${product.name}</h3>
            <span>R$ ${product.price}</span>
            <p>${product.parcelamento}</p>
            <button class="add-to-bag-btn">Comprar</button>
          </div>
        `;
      });
      productList.innerHTML = html;
    });
  }
  
  function orderByTime() {
    fetch('http://localhost:5000/products')
    .then(response => response.json())
    .then(function (data) {
      data.sort(function(a, b) {
        return a.createdAt - b.createdAt;
      })
  
      let html = '';
      data.forEach(product => {
        html += `
          <div class="product-vitrine ${product.color} ${product.size} ${product.price}">
            <img src="${product.imgSrc}" alt="imagem do produto">
            <h3>${product.name}</h3>
            <span>R$ ${product.price}</span>
            <p>${product.parcelamento}</p>
            <button class="add-to-bag-btn">Comprar</button>
          </div>
        `;
      });
      productList.innerHTML = html;
    });
  }
  
  //Ordenar responsivo
  
  function initOrderNav() {
    var element = document.querySelector(".dropdown");
    element.classList.add("appear");
  }
  
  function closeOrderNav() {
  var element = document.querySelector(".dropdown");
  element.classList.remove("appear");
  }}