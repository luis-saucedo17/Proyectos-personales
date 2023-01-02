
  let container = document.getElementsByClassName("item-image"); //Asignando el contenedor para el botón oculto.

  for (let i = 0; i < container.length; i++) {
    let actualContainer = container[i];
    actualContainer.addEventListener("mouseover", showButton);
    actualContainer.addEventListener("mouseout", hideButton);
  }

  let cartBtn = document.getElementsByClassName("bx bx-cart")[0];
  let shoppingCart = document.getElementsByClassName("cart-container")[0];
  let closeBtn = document.getElementsByClassName("bx bx-x")[0];

  cartBtn.addEventListener("click", showCart);
  closeBtn.addEventListener("click", hideCart);

  let removeBtn = document.getElementsByClassName("btn-remove");
  for (let i = 0; i < removeBtn.length; i++) {
    let button = removeBtn[i];
    button.addEventListener("click", removeItem);
  }

  let quantityInput = document.getElementsByClassName("item-quantity");
  for (let i = 0; i < quantityInput.length; i++) {
    let actualInput = quantityInput[i];
    actualInput.addEventListener("change", quantityChanged);
  }

  let hiddenBtn = document.getElementsByClassName("button");
  for (let i = 0; i < hiddenBtn.length; i++) {
    let actualBtn = hiddenBtn[i];
    actualBtn.addEventListener("click", addItem);
  }

function showButton() {
  let button = document.getElementsByClassName("button-hover");
  for (let i = 0; i < button.length; i++) {
    let actualBtn = button[i];
    actualBtn.classList.add("active");
  }
}

function hideButton() {
  let button = document.getElementsByClassName("button-hover");
  for (let i = 0; i < button.length; i++) {
    let actualBtn = button[i];
    actualBtn.classList.remove("active");
  }
}

function showCart() {
  shoppingCart.classList.add("visible");
}

function hideCart() {
  shoppingCart.classList.remove("visible");
}

function removeItem(e) {
  let container = e.target.parentElement.parentElement.remove();
  refreshCart();
}

function refreshCart() {
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  let cartItems = cartContainer.getElementsByClassName("cart-item");
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    let priceItem = cartItems.getElementsByClassName("item-price")[0].innerText;
    let itemQuantity =
      cartItems.getElementsByClassName("item-quantity")[0].value;
    let price = parseFloat(priceItem.replace("$", ""));

    total = total + price * itemQuantity;
  }
  total = Math.round(total * 100) / 100;
  let cartTotal = (document.getElementsByClassName("cart-total")[0].innerText =
    "$" + total);
}

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  refreshCart();
}

function addItem(e) {
  let buttonContainer = e.target.parentElement.parentElement.parentElement;
  let price = buttonContainer.getElementsByClassName("item-price")[0].innerText;
  let title = buttonContainer.getElementsByClassName("item-title")[0].innerText;
  let image = buttonContainer.getElementsByClassName("img")[0].src;

  addToCart(price, title, image);
  refreshCart();
}

function addToCart(price, title, image) {
  let newItem = document.createElement("div");
  newItem.classList.add("cart-item");
  let cartContainer = document.getElementsByClassName("cart-container")[0];
  let itemTitles = cartContainer.getElementsByClassName("item-title");
  for (let i = 0; i < itemTitles.length; i++) {
    if (itemTitles[i].innerText == title) {
      alert("You already added this item");
      return;
    }
  }

  let itemContent = `<div class="image">
    <img src="${image}" alt="" />
  </div>
  <div class="info">
    <span class="item-title">
      ${title}
    </span>
    <span class="item-price">${price}</span>
    <button class="btn btn-remove">Remove</button>
  </div>
  <div class="input">
    <input class="item-quantity" type="number" value="1" />
  </div>`;

  cartContainer.append(newItem);
  newItem.innerHTML = itemContent;
  let removeBtn = newItem
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", removeItem);
  let input = newItem
    .getElementsByClassName("item-quantity")[0]
    .addEventListener("change", quantityChanged);
}
