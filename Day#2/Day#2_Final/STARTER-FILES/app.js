const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 223,
    image: "plate__french-fries.png",
    alt: "French Fries",
    count: 0,
  },
  {
    name: "Salmon and Vegetables",
    price: 512,
    image: "plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti with Meat Sauce",
    price: 782,
    image: "plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 599,
    image: "plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 698,
    image: "plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 634,
    image: "plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];
//Fetching data
//Adding and removing from cart
const addToCartBtn = document.querySelectorAll(".add");
//Cart summary Stuff
const cartSummary = document.querySelector(".cart-summary");
const costSection = document.querySelectorAll(".amount");
//Logic
const getItemData = function (itemName) {
  const itemNameContent = itemName.textContent;
  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i]["name"] === itemNameContent) {
      return menuItems[i];
    }
  }
  return null;
};
const addToCartsummary = function (btn) {
  const itemName = btn.closest(".content").firstElementChild;
  const itemData = getItemData(itemName);
  createCartElement(cartSummary, itemData);
};
const addToCart = function (btn, basePrice, item) {
  //Button Logic
  btn.classList.add("in-cart");
  const inCartMark = document.createElement("img");
  btn.textContent = "In Cart";
  inCartMark.src = "images/check.svg";
  inCartMark.alt = "Check";
  btn.insertBefore(inCartMark, btn.firstChild);
  //Cart Summary Logic
  addToCartsummary(btn);
  affectCoseSection(basePrice, true, item);
};
const removeFromCart = function (btn) {
  btn.classList.remove("in-cart");
  btn.removeChild(btn.firstChild);
  btn.textContent = "Add to Cart";
};
for (let i = 0; i < addToCartBtn.length; i++) {
  addToCartBtn[i].addEventListener("click", function () {
    //Add this element to cart
    const btnParent = addToCartBtn[i].closest("li");
    const basePrice = Number(
      btnParent.querySelector(".price").textContent.slice(1)
    ).toFixed(2);
    const itemName = btnParent.querySelector(".menu-item");
    const item = getItemData(itemName);
    if (item["count"] === 0) {
      addToCart(addToCartBtn[i], basePrice, item);
    }
  });
}
const affectCoseSection = function (basePrice, increaseDecreaseFlag, item) {
  const subtotal = Number(costSection[0].textContent.slice(1));
  const tax = Number(costSection[1].textContent.slice(1));
  let subtotalValue = 0;
  let taxValue = 0;
  let totalValue = 0;
  if (increaseDecreaseFlag === true) {
    item["count"] += 1;
    subtotalValue = Number(subtotal + Number(basePrice)).toFixed(2);
    taxValue = Number(tax + (10 / 100) * Number(basePrice)).toFixed(2);
    totalValue = Number(Number(subtotalValue) + Number(taxValue)).toFixed(2);
  } else if (increaseDecreaseFlag === false) {
    item["count"] -= 1;
    subtotalValue = Math.max(Number(subtotal - Number(basePrice)).toFixed(2));
    taxValue = Math.max(
      Number(tax - (10 / 100) * Number(basePrice)).toFixed(2),
      0
    );
    totalValue = Math.max(
      Number(Number(subtotalValue) + Number(taxValue)).toFixed(2),
      0
    );
  }
  costSection[0].textContent = `$${
    subtotalValue < 10 ? 0 : ""
  }${subtotalValue}${subtotalValue <= 0 ? ".00" : ""}`;
  costSection[1].textContent = `$${taxValue < 10 ? 0 : ""}${taxValue}${
    taxValue <= 0 ? ".00" : ""
  }`;
  costSection[2].textContent = `$${totalValue < 10 ? 0 : ""}${totalValue}${totalValue <= 0 ? '.00' : ''}`;
};
const backFromCart = function (item) {
  for (let i = 0; i < addToCartBtn.length; i++) {
    const btnParentFistChild =
      addToCartBtn[i].closest(".content").firstElementChild.textContent;
    if (btnParentFistChild === item["name"]) {
      addToCartBtn[i].classList.remove("in-cart");
      addToCartBtn[i].removeChild(addToCartBtn[i].firstElementChild);
      addToCartBtn[i].textContent = 'Add to Cart';
    }
  }
};
cartSummary.addEventListener("click", function (event) {
  const itemsWrapper = event.target.closest("li");
  const quantity = itemsWrapper.querySelectorAll(".quantity");
  const price = itemsWrapper.querySelector(".price");
  const decreaseBtn = itemsWrapper.querySelector(".decrease");
  const increaseBtn = itemsWrapper.querySelector(".increase");
  const subtotal = itemsWrapper.querySelector(".subtotal");
  const itemName = itemsWrapper.querySelector(".menu-item");
  const eventTarget = event.target;
  const basePrice = Number(price.textContent.slice(1));
  const item = getItemData(itemName);
  if (eventTarget === increaseBtn || increaseBtn.contains(eventTarget)) {
    quantity[0].textContent = `${item["count"] + 1}`;
    quantity[1].textContent = `${item["count"] + 1}`;
    const increasingSubtotal = Number(basePrice * (item["count"] + 1)).toFixed(
      2
    );
    subtotal.textContent = `$${increasingSubtotal}`;
    affectCoseSection(Number(basePrice).toFixed(2), true, item);
  } else if (eventTarget === decreaseBtn || decreaseBtn.contains(eventTarget)) {
    const decreasingPrice = Number(
      Number(subtotal.textContent.slice(1)) - Number(basePrice)
    ).toFixed(2);
    if (Number(decreasingPrice) === 0) {
      cartSummary.removeChild(itemsWrapper);
      backFromCart(item);
    } else {
      subtotal.textContent = `$${decreasingPrice}`;
      quantity[0].textContent = `${item["count"] - 1}`;
      quantity[1].textContent = `${item["count"] - 1}`;
    }
    affectCoseSection(Number(basePrice).toFixed(2), false, item);
  }
});
const createCartElement = function (parent, itemData) {
  const cartElement = `
    <li>
  <div class="plate">
    <img
      src= images/${itemData["image"]}
      alt= ${itemData["alt"]}
      class="plate"
    />
    <div class="quantity">1</div>
  </div>
  <div class="content">
    <p class="menu-item">${itemData["name"]}</p>
    <p class="price">$${itemData["price"] / 100}</p>
  </div>
  <div class="quantity__wrapper">
    <button class="decrease">
      <img src="images/chevron.svg" />
    </button>
    <div class="quantity">1</div>
    <button class="increase">
      <img src="images/chevron.svg" />
    </button>
  </div>
  <div class="subtotal">$${itemData["price"] / 100}</div>
</li>
    `;
  const template = document.createElement("div");
  template.innerHTML += cartElement.trim();
  parent.appendChild(template.firstElementChild);
};
