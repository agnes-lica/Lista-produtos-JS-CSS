function creatCard(product) {
  const ul = document.querySelector(".productList");

  const card = document.createElement("li");
  card.classList.add("card");

  const divButtonPrice = document.createElement("div");
  divButtonPrice.classList.add("buttonAndPrice");

  const cardImg = creatCardImg(product);
  const cardTitle = creatCardTitle(product);
  const cardType = creatCardType(product);
  const cardInfo = creatCardInfo(product);
  const cardPrice = creatCardPrice(product);
  const cardButtonCart = creatButtonCart(product);

  divButtonPrice.append(cardPrice, cardButtonCart);

  card.append(cardImg, cardTitle, cardType, cardInfo, divButtonPrice);
  ul.appendChild(card);

  addButtonEvent();
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

function creatCardInfo(product) {
  const components = product.componentes;
  const orderedList = document.createElement("ol");
  orderedList.classList.add("orderedListInfo");
  const element1 = document.createElement("li");
  element1.innerText = components[0];
  const element2 = document.createElement("li");
  element2.innerText = components[1];
  const element3 = document.createElement("li");
  element3.innerText = components[2];

  orderedList.appendChild(element1);
  orderedList.appendChild(element2);
  orderedList.appendChild(element3);

  return orderedList;
}

function creatCardPrice(product) {
  const productPrice = document.createElement("p");
  productPrice.classList.add("productPrice");
  productPrice.innerText = `R$ ${product.preco}`;

  return productPrice;
}

function creatButtonCart(product) {
  const buttonAdd = document.createElement("button");
  buttonAdd.classList.add("addButton");
  buttonAdd.innerText = "Buy";
  buttonAdd.id = product.id;

  return buttonAdd;
}

function assembleData(productList) {
  productList.forEach((product) => creatCard(product));
}
assembleData(produtos);

function creatCartEmpty() {
  const divEmpty = document.createElement("div");
  divEmpty.classList.add("cartEmpty");
  const imgEmpty = document.createElement("img");
  imgEmpty.src = "../src/img/bag.png";
  imgEmpty.alt = "cartBag";
  imgEmpty.classList.add("bagEmpty");
  const textEmpty = document.createElement("p");
  textEmpty.innerText = "You have nothing on your bag :c";
  textEmpty.classList.add("textEmptyCart");

  divEmpty.appendChild(imgEmpty);
  divEmpty.appendChild(textEmpty);

  return divEmpty;
}

function creatCartWithProducts() {
  if (document.querySelector(".cartEmpty")) {
    document.querySelector(".cartEmpty").remove();
  }

  if (document.querySelector(".fullBag")) {
  } else {
    const divCart = document.querySelector(".cart");

    const cartWithProducts = document.createElement("div");
    cartWithProducts.classList.add("fullBag");
    const cartSumQuantity = document.createElement("div");
    cartSumQuantity.classList.add("sumQuantity");
    const cartSumTotal = document.createElement("div");
    cartSumTotal.classList.add("sumTotal");
    const SumQuantityTitle = document.createElement("p");
    SumQuantityTitle.classList.add("quantityTitle");
    SumQuantityTitle.innerText = "Quantity";
    const SumQuantitySum = document.createElement("p");
    SumQuantitySum.classList.add("quantityTotal");
    SumQuantitySum.innerText = "hello";
    const sumTotalTitle = document.createElement("p");
    sumTotalTitle.classList.add("totalTitle");
    sumTotalTitle.innerText = "Total";
    const sumTotalSum = document.createElement("p");
    sumTotalSum.classList.add("priceTotal");
    sumTotalSum.innerText = "hello";
    const ulItem = document.createElement("ul");
    ulItem.classList.add("listProduct");

    cartSumQuantity.append(SumQuantityTitle, SumQuantitySum);
    cartSumTotal.append(sumTotalTitle, sumTotalSum);
    cartWithProducts.append(ulItem, cartSumQuantity, cartSumTotal);
    divCart.appendChild(cartWithProducts);
  }
}

function creatCart() {
  const cart = document.querySelector(".cart");
  const cartEmpty = creatCartEmpty();

  cart.appendChild(cartEmpty);
}
creatCart();

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
}

function watercolorButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));

  const productsFiltered = produtos.filter(
    (product) => product.categoria === "watercolor"
  );
  assembleData(productsFiltered);
}

function acrylicButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));

  const productsFiltered = produtos.filter(
    (product) => product.categoria === "acrylic"
  );
  assembleData(productsFiltered);
}

function guacheButton(filter) {
  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));

  const productsFiltered = produtos.filter(
    (product) => product.categoria === "guache"
  );
  assembleData(productsFiltered);
}

function buttonEventFilter(event) {
  const buttons = document.querySelectorAll(".buttonFilted");
  buttons.forEach((button) => button.addEventListener("click", idButton));
}
buttonEventFilter();

function addButtonEvent() {
  const addButtonToCart = document.querySelectorAll(".addButton");
  addButtonToCart.forEach((button) =>
    button.addEventListener("click", idButtonCart)
  );
}
addButtonEvent();

function idButtonCart(eventButton) {
  const idButtonAdd = eventButton.path[0].id;
  creatCartWithProducts();
  filterAddButton(idButtonAdd);
}

function removeDivCartFull() {
  document.querySelector(".fullBag").remove();
  creatCart();
}

function totalPrice() {
  const itens = Array.from(document.querySelectorAll(".priceProductBag"));
  const price = itens.map((item) => parseInt(item.innerText, 10));

  const total = price.reduce((a, b) => a + b, 0);

  if (total === 0) {
    removeDivCartFull();
  }
  return total;
}

function totalQuantity() {
  const itens = Array.from(document.querySelectorAll(".productsBag"));

  const quantity = itens.map((item) => item.className).length;

  if (quantity > 0) {
    const newQuantity = document.querySelector(".quantityTotal");
    newQuantity.innerText = quantity;
  }
  return quantity;
}

function randomNumber() {
  return Math.floor(Math.random() * 1000);
}

function creatCartItem(item) {
  const ulCart = document.querySelector(".listProduct");

  const randomId = randomNumber();

  const creatProduct = item.forEach((item) => {
    const divItem = document.createElement("li");
    divItem.classList.add("productsBag");
    divItem.id = randomId;
    const divInfoItem = document.createElement("div");
    divInfoItem.classList.add("productBagInfo");
    const imgItem = document.createElement("img");
    imgItem.alt = "Product Image";
    imgItem.src = item.img;
    imgItem.classList.add("imgBag");
    const pItemTitle = document.createElement("p");
    pItemTitle.innerText = item.nome;
    pItemTitle.classList.add("titleProductBag");
    const pItemSection = document.createElement("p");
    pItemSection.innerText = item.secao;
    pItemSection.classList.add("sectionProductBag");
    const pItemPrice = document.createElement("p");
    pItemPrice.innerText = item.preco;
    pItemPrice.classList.add("priceProductBag");
    const ButtonGarbage = document.createElement("button");
    ButtonGarbage.id = randomId;
    ButtonGarbage.classList.add("garbageButton");
    const imgGarbage = document.createElement("img");
    imgGarbage.alt = "Remove Item From Cart Button";
    imgGarbage.src = "../src/img/garbage.png";
    imgGarbage.classList.add("garbageImg");
    imgGarbage.id = randomId;

    ButtonGarbage.append(imgGarbage);
    divInfoItem.append(pItemTitle, pItemSection, pItemPrice);
    divItem.append(imgItem, divInfoItem, ButtonGarbage);

    ulCart.prepend(divItem);
  });

  const newPrice = document.querySelector(".priceTotal");
  newPrice.innerText = totalPrice();

  const newQuantity = document.querySelector(".quantityTotal");
  newQuantity.innerText = totalQuantity();

  buttoneventRemove();
}

function filterAddButton(idButton) {
  const item = produtos.filter((produto) => produto.id === parseInt(idButton));
  creatCartItem(item);
}

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

  const filtered = produtos.filter(function (product) {
    return (
      product.nome.toLowerCase().includes(filterInput) ||
      product.secao.toLocaleLowerCase().includes(filterInput) ||
      product.categoria.toLocaleLowerCase().includes(filterInput)
    );
  });

  const cardList = document.querySelector(".productList");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => cardList.removeChild(card));
  assembleData(filtered);
}

function removeItemCart(event) {
  const itemToRemove = parseInt(event.target.id);
  const itemListCart = Array.from(document.querySelectorAll(".productsBag"));

  itemListCart.forEach((item) => {
    const numberId = parseInt(item.id);

    if (numberId === itemToRemove) {
      document.querySelector(`li.productsBag[id="${numberId}"]`).remove();

      const newPrice = document.querySelector(".priceTotal");
      newPrice.innerText = totalPrice();

      totalQuantity();
    }
  });
}

function buttoneventRemove() {
  document
    .querySelector(".garbageButton")
    .addEventListener("click", removeItemCart);
}
