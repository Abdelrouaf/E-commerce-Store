const getCountries = async function() {
    const apiOfCountries = await fetch("../country.json");
    const countries = await apiOfCountries.json();
    localStorage.setItem("country", JSON.stringify(countries));
    displayCountries(countries);
}
getCountries();

let country = document.getElementById("countries");
function displayCountries(countries) {
    let con = '';
    for (let i = 0; i < countries.length; i++) {
        con +=
        `
            <option value="${countries[i].code}">${countries[i].name}</option>
        
        `
    }
    country.innerHTML = con;
}

////////////////////////////////
let check = 0;

function sumCost() {
    for (let i = 0 ; i < cartList1.length; i++) {
        check += cartList1[i].price;
    }
    totalCost.textContent = check;
}

let orderBox = document.getElementById("orderBox");
let totalCost = document.getElementById("totalCost");
let cartList1 = [];
if (localStorage.getItem("addToCart") == null) {
    cartList1 = [];
} else {
    cartList1 = JSON.parse(localStorage.getItem("addToCart"));
    displayOrders();
    sumCost();
}

let wishContainer9 = JSON.parse(localStorage.getItem("productWishlist")) || []

let compareProduct9 = JSON.parse(localStorage.getItem("compareProduct")) || [];

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cartList1.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishContainer9.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct9.length;

function displayOrders() {
    let container = '';
    for (let i = 0; i < cartList1.length; i++) {
        container +=
        `
        
        <div class="orders d-flex justify-content-between mb-3" id="orders">
        
            <div class="left">
            
                <p>${cartList1[i].title} <span class="mluti">x</span> <span class="counter">${cartList1[i].count}</span></p>
            
            </div>
        
            <div class="right">
            
                <p><span class="dollar">$</span><span class="prices"> ${cartList1[i].price}</span><span class="zeros">.00</span></p>

            </div>
        
        </div>
        
        `
    }
    orderBox.innerHTML = container;
}


let placeOrder = document.getElementById("placeOrder");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let companyName = document.getElementById("companyName");
let street = document.getElementById("street");
let town = document.getElementById("town");
let state = document.getElementById("state");
let postcode = document.getElementById("postcode");
let phone = document.getElementById("phone");
let email = document.getElementById("email");


function submitOrder() {
    var details = {
        fName: firstName.value,
        lName: lastName.value,
        streetName: street.value,
        city: town.value,
        county: state.value,
        zip: postcode.value,
        number: phone.value,
        address: email.value
    }

    if (firstName.value == "" || lastName.value == "" || street.value == "" || town.value == "" || state.value == "" || postcode.value == "" || phone.value == "" || email.value == "") {
        alert("Invalid Inputs")
    } else {
        alert("your order has been successful")
    }
}

placeOrder.addEventListener("click", submitOrder);