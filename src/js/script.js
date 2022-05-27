function creatCard(product) {
  const ul = document.querySelector(".productList");

  const card = document.createElement("li");
  card.classList.add("card");

  const cardImg = creatCardImg(product);
  const cardTitle = creatCardTitle(product);
  const cardType = creatCardType(product);
  const cardPrice = creatCardPrice(product);

  card.append(cardImg, cardTitle, cardType, cardPrice);
  ul.appendChild(card);
}

function creatCardImg(product) {
  const img = document.createElement("img");
  img.classList.add("product");
  img.src = product.img;
  img.alt = product.secao;

  return img;
}

function creatCardTitle(product) {
  const productTitle = document.createElement("h3");
  productTitle.classList.add("nameProduct");
  productTitle.innerText = product.nome;

  return productTitle;
}

function creatCardType(product) {
  const productType = document.createElement("p");
  productType.classList.add("typeProduct");
  productType.innerText = product.secao;

  return productType;
}

function creatCardPrice(product) {
  const productPrice = document.createElement("p");
  productPrice.classList.add("productPrice");
  productPrice.innerText = `R$ ${product.preco}`;

  return productPrice;
}

function valueProducts(product) {
  const arrValue = [];
  for (let i = 0; i < product.length; i++) {
    arrValue.push(product[i].preco);
  }
  const totalValue = arrValue.reduce((a, b) => a + b, 0);

  cardValueProducts(totalValue);
}

function removePrice() {
  const divSum = document.querySelector(".sum");
  const removeSum = document.querySelector(".sumTotal");

  divSum.removeChild(removeSum);
}

function cardValueProducts(value) {
  removePrice();
  const divSum = document.querySelector(".sum");
  const totalValue = document.createElement("p");
  totalValue.classList.add("sumTotal");
  totalValue.innerText = `R$${value}`;

  divSum.appendChild(totalValue);
}

function assembleData(productList, category) {
  const itemList = productList.forEach((product) => creatCard(product));
}
assembleData(produtos);

function idButton(eventButton) {
  filter(eventButton.target.id);
}

function filter(filter) {
  if (filter === "allProducts") {
    allButton(filter);
  } else if (filter === "watercolor") {
    watercolorButton(filter);
  } else if (filter === "acrylic") {
    acrylicButton(filter);
  } else if (filter === "guache") {
    guacheButton(filter);
  }
}

function allButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));
  assembleData(produtos);
  valueProducts(produtos);
}

function watercolorButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));

  const productsFiltered = produtos.filter(
    (product) => product.categoria === "watercolor"
  );
  assembleData(productsFiltered);
  valueProducts(productsFiltered);
}

function acrylicButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));

  const productsFiltered = produtos.filter(
    (product) => product.categoria === "acrylic"
  );
  valueProducts(productsFiltered);
  assembleData(productsFiltered);
}

function guacheButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));

  const productsFiltered = produtos.filter(
    (product) => product.categoria === "guache"
  );
  valueProducts(productsFiltered);
  assembleData(productsFiltered);
}

function buttonEventFilter(event) {
  const buttons = document.querySelectorAll(".buttonFilted");
  buttons.forEach((button) => button.addEventListener("click", idButton));
}
buttonEventFilter();

function buttoneventSearch(event) {
  const buttonSearch = document
    .querySelector(".buttonSearch")
    .addEventListener("click", searchInput);
}
buttoneventSearch();

function searchInput() {
  const input = document.querySelector(".searchProduct");
  searchProduct(input.value);
}
function searchProduct(value) {
  const filterInput = value.toLowerCase();
  console.log(filterInput);
  for (let i = 0; i < produtos.length; i++) {
    if (filterInput === produtos[i].nome.toLowerCase()) {
      const cardList = document.querySelector(".productList");
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => cardList.removeChild(card));
      creatCard(produtos[i]);
    }
  }
}
