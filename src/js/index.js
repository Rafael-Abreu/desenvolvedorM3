import { loadMore } from "./loadMore";
import { ordanateFunction } from "./ordenate";

const bagList = document.querySelector('.bag-list');
const bagContainer = document.querySelector('.bag-container');
const productList = document.querySelector('.product-list');
const bagCountInfo = document.getElementById('bag-count-info');
const bagTotalValue = document.getElementById('bag-total-value');


let bagItemId = 1;

var currentIndex = 0;

eventListener()

function eventListener(){
  window.addEventListener('DOMContentLoaded', () => {
    loadJSON();
    loadBag();
    // filterFunction();
    loadMore();
    ordanateFunction();

    
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
  fetch('http://localhost:5000/products')
  .then(response => response.json())
  .then(data => {
    let html = '';
    data.forEach(products => {
      html += `
        <div class="product-vitrine ${products.color} ${products.size} ${products.price }">
          <img src="${products.image}" alt="imagem do produto">
          <h3>${products.name}</h3>
          <span>R$ ${products.price}</span>
          <p>${products.parcelamento}</p>
          <button class="add-to-bag-btn">Comprar</button>
        </div>
      `;
    });
    productList.innerHTML = html;
  });
}


function addProduct(e){
  if(e.target.classList.contains('add-to-bag-btn')){
    let Product = e.target.parentElement;
    getProductInfo(Product);
  }
}

function getProductInfo(product){
  let productInfo = {
    id: bagItemId,
    image: product.querySelector('.product-vitrine img').src,
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
      <span class="bag-item-price">${product.price}</span>
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

//Filter responsivo


function initFilterContent() {

  const filterTitle = document.querySelectorAll('.js-side-nav dt')

  const appearClass = 'appear';
  
  if(filterTitle.length) {
    
    function appearInfo() {
      this.classList.toggle(appearClass);
      this.nextElementSibling.classList.toggle(appearClass)
    }
    
    filterTitle.forEach((item) =>{
      item.addEventListener('click', appearInfo)
    })
  } 
} initFilterContent();

function initFilterNav() {
    var element = document.querySelector(".side-nav");
    element.classList.add("appear");
  }

function closeFilterNav() {
  var element = document.querySelector(".side-nav");
  element.classList.remove("appear");
}

//Ordenar responsivo

function initOrderNav() {
  var element = document.querySelector(".dropdown");
  element.classList.add("appear");
}

function closeOrderNav() {
var element = document.querySelector(".dropdown");
element.classList.remove("appear");
}

// Filter


