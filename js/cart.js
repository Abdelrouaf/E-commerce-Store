let cartContainer;
let cartTotals = document.getElementById("cartTotals");
let totalPrice = document.getElementById("totalPrice");
let totalPrice2 = document.getElementById("totalPrice2");
let total = 0;

let statusEmpty = document.getElementById("statusEmpty");
let statusFull = document.getElementById("statusFull");


if (localStorage.getItem("addToCart") == null) {
    cartContainer = [];
} else {
    cartContainer = JSON.parse(localStorage.getItem("addToCart"));
    displayCart();
    sumTotal();
}

if (cartContainer.length == 0) {
    statusFull.classList.add("dnone");
    statusEmpty.classList.remove("dnone");
} else {
    statusFull.classList.remove("dnone");
    statusEmpty.classList.add("dnone");
}

function sumTotal() {
    for (let i = 0 ; i < cartContainer.length; i++) {
        total += cartContainer[i].price;
    }
    totalPrice.textContent = total;
    totalPrice2.textContent = total;
    localStorage.setItem("total", JSON.stringify(total));
}

let wishContainer = JSON.parse(localStorage.getItem("productWishlist")) || []

let compareProduct3 = JSON.parse(localStorage.getItem("compareProduct")) || [];

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cartContainer.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishContainer.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct3.length;

let removeCart = document.getElementById("removeCart");
removeCart.addEventListener("click", function () {
    cartContainer.splice(0);
    localStorage.setItem("addToCart", JSON.stringify(cartContainer));
    location.reload();
})

function displayCart() {
    let tbody2 = document.getElementById("tBody2");
    let boom2 = '';
    for (let i = 0; i < cartContainer.length; i++) {
        boom2 +=
        `
        
        <tr>
        
            <td class="image"><a href="#"><img src="${cartContainer[i].imageSrc}" alt=""></a></td>
        
            <td class="product-name"><a href="#">${cartContainer[i].title}</a></td>
        
            <td class="quantity"><p><button class="minus counter" onclick="minusNumber(${i})"><i class="fa-solid fa-minus"></i></button> <span class="number">${cartContainer[i].count}</span> <button class="plus counter" onclick="plusNumber(${i})"><i class="fa-solid fa-plus"></i></button></p></td>
        
            <td class="product-price"><span class="dollar">$</span><span class="subtotal">${cartContainer[i].price}.00</span></td>
        
            <td class="delete"><button class="btn btn-primary homeBtn" onclick="deleteRow(${i})"><i class="fa-regular fa-trash-can"></i></button></td>
    
        </tr>
        
        `
    }
    tbody2.innerHTML = boom2;
}

let num = document.querySelector(".number");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let subtotal = document.querySelector(".subtotal");
let shop = [];
shop = JSON.parse(localStorage.getItem("ShopProducts"));

/////////////////////////////////////////////////////////////////////
function deleteRow(i) {
    cartContainer.splice(i, 1);
    localStorage.setItem("addToCart", JSON.stringify(cartContainer));
    location.reload();
    displayCart();
    alert("Product Deleted Form Your Cart")
}

function minusNumber(i) {
    if (cartContainer[i].count === 1) {
        cartContainer.splice(i, 1);
        localStorage.setItem("addToCart", JSON.stringify(cartContainer));
    } else {
        cartContainer[i].count -= 1;
        for (let j = 0; j < shop.length; j++) {
            if(shop[j].id == cartContainer[i].id) {
                cartContainer[i].price -= shop[j].price;
                break;
            }
        }
        localStorage.setItem("addToCart", JSON.stringify(cartContainer));
    }
    location.reload();
    displayCart();
}

function plusNumber(i) {
    cartContainer[i].count += 1;
    for (let j = 0; j < shop.length; j++) {
        if(shop[j].id == cartContainer[i].id) {
            cartContainer[i].price += shop[j].price;
            break;
        }
    }
    localStorage.setItem("addToCart", JSON.stringify(cartContainer));
    location.reload();
    displayCart();
}

