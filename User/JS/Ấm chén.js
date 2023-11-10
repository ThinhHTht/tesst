const list = document.querySelector(".list");
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const body = document.querySelector("body");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quantity");

let products = [
  {
    id: 1,
    name: "Bộ ấm chén Bát Tràng men kem vẽ tay ",
    price: 120000,
    image: "ac8.jpg",
  },
  {
    id: 2,
    name: "Bộ ấm chén Bát Tràng men kem vẽ tay",
    price: 120000,
    image: "ac2.jpg",
  },
  {
    id: 3,
    name: "Bộ ấm chén chọp lửa vẽ hoa dây độc đáo",
    price: 120000,
    image: "ac3.jpg",
  },
  {
    id: 4,
    name: "Bộ ấm chén vẽ sen quai ngược độc đáo",
    price: 120000,
    image: "ac6.jpg",
  },
  {
    id: 5,
    name: "Bộ ấm chén chấm mưa đen quai mây",
    price: 120000,
    image: "ac5.jpg",
  },
  {
    id: 6,
    name: "Bộ ấm chén hoa dây quai mây",
    price: 120000,
    image: "ac9.jpg",
  },
];

// Format tiền
let VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const listProduct = localStorage.setItem(
  "listProduct",
  JSON.stringify(products)
);
const listCarts = JSON.parse(localStorage.getItem("listCarts")) || [];

function renderItem() {
  for (let i = 0; i < products.length; i++) {
    let value = products[i];
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="../image/Ấm chén/${value.image}"/>
      <div class="title">${value.name}</div>
      <div class="price">${VND.format(value.price)}</div>
      <button onclick="addToCart(${i})">Thêm vào giỏ hàng</button>
      `;
    list.appendChild(newDiv);
  }
}
renderItem();

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

function addToCart(index) {
  //   console.log(index);
  if (listCarts[index] == null) {
    // spread
    listCarts[index] = { ...products[index], quantity: 1 };
  } else {
    listCarts[index].quantity += 1;
  }
  localStorage.setItem("listCarts", JSON.stringify(listCarts));
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  for (let i = 0; i < listCarts.length; i++) {
    let value = listCarts[i];
    if (value !== null) {
      let newLi = document.createElement("li");
      // newLi.classList.add("cart-style");
      newLi.innerHTML = `
          <div>
              <img src="../image/Ấm chén/${value.image}" />
              <div>${value.name}</div>
              <div>${VND.format(value.price)}</div>
              <button onclick="changeQuantity(${i}, ${
        value.quantity - 1
      })">-</button>
              <div>${value.quantity}</div>
              <button onclick="changeQuantity(${i}, ${
        value.quantity + 1
      })">+</button>
          </div>
          `;
      listCard.appendChild(newLi);
      totalPrice += value.price * value.quantity;
      count += value.quantity;
    }
  }
  total.innerText = VND.format(totalPrice);
  quantity.innerHTML = count;
}
reloadCard();

function changeQuantity(index, newQuantity) {
  if (newQuantity <= 0) {
    delete listCarts[index];
  } else {
    listCarts[index].quantity = newQuantity;
  }

  localStorage.setItem("listCarts", JSON.stringify(listCarts));
  reloadCard();
}
