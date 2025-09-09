const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 10000,
  },
  {
    id: 4,
    name: "SmartWatch",
    price: 5000,
  },
  {
    id: 5,
    name: "HeadPhones",
    price: 1000,
  },
];

let cart = [];

// References from html to js
productsContainer1 = document.getElementById("productsContainer");
cartContainer1 = document.getElementById("cartContainer");
feedback1 = document.getElementById("feedback");
totalprice = document.getElementById("TotalPrice");
resetbutton = document.getElementById("ResetButton");
sortByPrice = document.getElementById("SortByPriceButton");
let timerID; //variable for timer(Feedback)

// Listeners to HTML elements
resetbutton.addEventListener("click", resetCartItems);
sortByPrice.addEventListener("click", sortCartItems);

// Displaying All items from Products Array
products.forEach(function (value) {
  const productEle = `<div class="ProductItemContainer">
<p>${value.name} - Rs. ${value.price}/-</p>
<button onclick="addToCart(${value.id})" >Add to Cart</button>
</div>`;
  productsContainer1.insertAdjacentHTML("beforeend", productEle);
});

// Add to cart Function
function addToCart(id) {
  const AlredyInCart = cart.some(function (product) {
    return product.id === id;
  });
  if (AlredyInCart) {
    updateFeedback(`Item Already in Cart`, "error");
    return;
  }
  const selectedItem = products.find(function (product) {
    return product.id === id;
  });
  cart.push(selectedItem);
  renderCartDetails();
  updateFeedback(`${selectedItem.name} Added to Cart`, "success");
}

// Function to render Cart details
function renderCartDetails() {
  cartContainer1.innerHTML = "";
  cart.forEach(function (selectedItem) {
    const CartEle = `<div class="ProductItemContainer">
<p>${selectedItem.name} - Rs. ${selectedItem.price}/-</p>
<button onclick="removeItem(${selectedItem.id})">Remove</button>
</div>`;
    cartContainer1.insertAdjacentHTML("beforeend", CartEle);
  });
  // let priceTotal = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   priceTotal = priceTotal + cart[i].price;
  // }
  const accumulation = cart.reduce(function (acc, prod) {
    return acc + prod.price;
  }, 0);
  totalprice.textContent = `Rs. ${accumulation}`;
}

// function for Remove items from cart
function removeItem(id) {
  // console.log(id);
  const productIndex = cart.findIndex((product) => product.id === id);
  cart.splice(productIndex, 1);
  renderCartDetails();
  updateFeedback(
    `${products[productIndex].name} is removed from the Cart`,
    "danger"
  );
}

// function to Update feedback
function updateFeedback(msg, type) {
  clearTimeout(timerID);
  feedback1.style.display = "block";
  if (type == "success") {
    feedback1.style.backgroundColor = "green";
  } else if (type == "error") {
    feedback1.style.backgroundColor = "orange";
  } else if (type == "danger") {
    feedback1.style.backgroundColor = "red";
  }
  feedback1.textContent = msg;
  timerID = setTimeout(function () {
    feedback1.style.display = "none";
  }, 3000);
}

// function to Clear Cart Items
function resetCartItems() {
  cart.splice(0);
  renderCartDetails();
  updateFeedback("Cart is Cleared", "success");
}

// function to Sort Item in Cart
function sortCartItems() {
  cart.sort((item1, item2) => item1.price - item2.price);
  renderCartDetails();
  updateFeedback("Cart is Sorted by Price", "success ");
}

// Listeners and Calling Functions
resetbutton.addEventListener("click", resetCartItems);
sortByPrice.addEventListener("click", sortCartItems);
