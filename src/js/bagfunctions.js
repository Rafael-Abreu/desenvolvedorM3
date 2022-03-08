const bagContainer = document.querySelector('.bag-container');
const productList = document.querySelector('.product-lista');
const bagList = document.querySelector('.bag-list');
const bagTotalValue = document.getElementById('bag-total-value');
const bagCountInfo = document.getElementById('bag-count-info');


let bagItemId = 1;

var currentIndex = 0;

eventListener()

function eventListener(){
  window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    loadBag();
    
  });
  document.getElementById('bag-btn').addEventListener('click', () => {
    bagContainer.classList.toggle('show-bag-container');
  });

  productList.addEventListener('click', addProduct);
  bagList.addEventListener('click', deleteProduct);
}

function updateBagInfo(){
  let bagInfo = findBagInfo();
  bagCountInfo.textContent = bagInfo.productCount;
  bagTotalValue.textContent = bagInfo.total;
}

updateBagInfo()

function loadJSON(){
  fetch('db.json')
  .then(response => response.json())
  .then(data => {
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


function addProduct(e){
  if(e.target.classList.contains('add-to-bag-btn')){
    let product = e.target.parentElement;
    getProductInfo(product);
  }
}

function getProductInfo(product){
  let productInfo = {
    id: bagItemId,
    imgSrc: product.querySelector('.product-vitrine img').src,
    name: product.querySelector('.product-vitrine h3').textContent,
    price: product.querySelector('.product-vitrine span').textContent
  }
  bagItemId++;
  addToBagList(productInfo);
  saveProductInBag(productInfo);
}

function addToBagList(product){
  const bagItem = document.createElement('div');
  bagItem.classList.add('bag-item');
  bagItem.setAttribute('data-id', `${product.id}`);
  bagItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="bag-item-info">
      <h3 class="bag-item-name">${product.name}</h3>
      <span class="bag-item-price">R$${product.price}</span>
    </div>
    <button type="button" class="bag-item-del-btn">X</button>
  `;
  bagList.appendChild(bagItem);
}

function saveProductInBag(item) {
  let product = getProductFromStorage()
  product.push(item);
  localStorage.setItem('product', JSON.stringify(product));
  updateBagInfo();
}

function getProductFromStorage() {
  return localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
}

function loadBag() {
  let product = getProductFromStorage();
  if(product.length < 1) {
    bagItemId = 1;
  } else {
    bagItemId = product[product.length - 1].id;
    bagItemId++;
  }
  product.forEach(product => addToBagList(product))
}

function findBagInfo() {
  let product = getProductFromStorage();
  let total = product.reduce((acc, product) => {
    let price = parseFloat(product.price.substr(2));
    return acc += price;
  }, 0);

  return {
    total: total.toFixed(2),
    productCount: product.length
  }
}

function deleteProduct(e){
  let bagItem;
  if(e.target.tagName === "BUTTON"){
    bagItem = e.target.parentElement;
    bagItem.remove()
  } else if(e.target.tagName === "I"){
    bagItem = e.target.parentElement
    bagItem.remove();
  }

  let product = getProductFromStorage();
  let updatedProduct = product.filter(product => {
    return product.id !== parseInt(bagItem.dataset.id);
  });

  localStorage.setItem('product', JSON.stringify(updatedProduct));

  updateBagInfo()
}