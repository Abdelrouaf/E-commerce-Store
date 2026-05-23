
let cartContainer2 = JSON.parse(localStorage.getItem("addToCart")) || [];

function displayCart() {
    let tbody2 = document.getElementById("tBody2");
    let boom2 = '';
    for (let i = 0; i < cartContainer2.length; i++) {
        boom2 +=
        `
        
        <tr>
        
            <td class="image"><a href="#"><img src="${cartContainer2[i].imageSrc}" alt=""></a></td>
        
            <td class="product-name"><a href="#">${cartContainer2[i].title}</a></td>
        
            <td class="quantity"><p><button class="minus counter" onclick="minusNumber(${i})"><i class="fa-solid fa-minus"></i></button> <span class="number">${cartContainer2[i].count}</span> <button class="plus counter" onclick="plusNumber(${i})"><i class="fa-solid fa-plus"></i></button></p></td>
        
            <td class="product-price"><span class="dollar">$</span><span class="subtotal">${cartContainer2[i].price}.00</span></td>
        
            <td class="delete"><button class="btn btn-primary homeBtn" onclick="deleteRow(${i})"><i class="fa-regular fa-trash-can"></i></button></td>
    
        </tr>
        
        `
    }
    tbody2.innerHTML = boom2;
    sumTotal();
}

let cartTotals = document.getElementById("cartTotals");
let totalPrice = document.getElementById("totalPrice");
let totalPrice2 = document.getElementById("totalPrice2");

let statusEmpty = document.getElementById("statusEmpty");
let statusFull = document.getElementById("statusFull");


if (cartContainer2.length === 0) {
    statusFull.classList.add("dnone");
    statusEmpty.classList.remove("dnone");
} else {
    statusFull.classList.remove("dnone");
    statusEmpty.classList.add("dnone");
    displayCart();
    sumTotal();
}

let total = 0;
function sumTotal() {
    total = 0; // ← ADD THIS RESET LINE
    for (let i = 0; i < cartContainer2.length; i++) {
        total += cartContainer2[i].price;
    }
    totalPrice.textContent = total;
    totalPrice2.textContent = total;
    localStorage.setItem("total", JSON.stringify(total));
}

console.log(cartContainer2);

let wishContainer = JSON.parse(localStorage.getItem("productWishlist")) || []

let compareProduct3 = JSON.parse(localStorage.getItem("compareProduct")) || [];

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cartContainer2.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishContainer.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct3.length;

let removeCart = document.getElementById("removeCart");
removeCart.addEventListener("click", function () {
    cartContainer2.splice(0);
    localStorage.setItem("addToCart", JSON.stringify(cartContainer2));
    location.reload();
})

let num = document.querySelector(".number");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let subtotal = document.querySelector(".subtotal");
let shop2 = [];
shop2 = JSON.parse(localStorage.getItem("ShopProducts"));

/////////////////////////////////////////////////////////////////////
function deleteRow(i) {
    cartContainer2.splice(i, 1);
    localStorage.setItem("addToCart", JSON.stringify(cartContainer2));
    location.reload();
    displayCart();
    alert("Product Deleted Form Your Cart")
}

function minusNumber(i) {
    if (cartContainer2[i].count === 1) {
        cartContainer2.splice(i, 1);
        localStorage.setItem("addToCart", JSON.stringify(cartContainer2));
    } else {
        cartContainer2[i].count -= 1;
        for (let j = 0; j < shop2.length; j++) {
            if(shop2[j].id == cartContainer2[i].id) {
                cartContainer2[i].price -= shop2[j].price;
                break;
            }
        }
        localStorage.setItem("addToCart", JSON.stringify(cartContainer2));
    }
    location.reload();
    displayCart();
}

function plusNumber(i) {
    cartContainer2[i].count += 1;
    for (let j = 0; j < shop2.length; j++) {
        if(shop2[j].id == cartContainer2[i].id) {
            cartContainer2[i].price += shop2[j].price;
            break;
        }
    }
    localStorage.setItem("addToCart", JSON.stringify(cartContainer2));
    location.reload();
    displayCart();
}