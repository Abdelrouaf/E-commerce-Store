let wishlistContainer;
if (localStorage.getItem("productWishlist") == null) {
    wishlistContainer = [];
} else {
    wishlistContainer = JSON.parse(localStorage.getItem("productWishlist"));
    displayWishlist();
}

let statusEmpty1 = document.getElementById("statusEmpty1");
let statusFull1 = document.getElementById("statusFull1");

if (wishlistContainer.length == 0) {
    statusEmpty1.classList.remove("dnone");
    statusFull1.classList.add("dnone");
} else {
    statusEmpty1.classList.add("dnone");
    statusFull1.classList.remove("dnone");
}

let removeWishlist = document.getElementById("removeWishlist");
removeWishlist.addEventListener("click", function() {
    wishlistContainer.splice(0);
    localStorage.setItem("productWishlist", JSON.stringify(wishlistContainer));
    location.reload();
    displayWishlist();
})

function displayWishlist() {
    let tbody = document.getElementById("tBody");
    let boom = '';
    for (let i = 0; i < wishlistContainer.length; i++) {
        boom +=
        `
        
        <tr>
                
            <td><input type="checkbox" name="checkboxBody" id="checkboxBody" check></td>
        
            <td class="image"><a href="#"><img src="${wishlistContainer[i].imageSrc}" alt=""></a></td>
        
            <td class="product-name"><a href="#">${wishlistContainer[i].title}</a></td>
        
            <td class="product-price"><span>$${wishlistContainer[i].price}.00</span></td>
        
            <td class="time-added"><p>${wishlistContainer[i].date}</p></td>
        
            <td class="stock-status"><p>in stock</p></td>
        
            <td class="addCart"><button class="btn btn-primary homeBtn" onclick="addToCart(${i})"><i class="fa-solid fa-cart-shopping"></i></button></td>
    
            <td class="delete"><button class="btn btn-primary homeBtn" onclick="deleteRow(${i})"><i class="fa-regular fa-trash-can"></i></button></td>
    
        </tr>
        
        `
    }
    tbody.innerHTML = boom;
}

/////////////////////////////////////////////////////////////////////
function deleteRow(i) {
    wishlistContainer.splice(i, 1);
    localStorage.setItem("productWishlist", JSON.stringify(wishlistContainer));
    alert("Product Deleted From Your Wishlist Successfully!")
    displayWishlist();
    location.reload();
}

/////////////////////////////////////////////////
let cart = [];

if (localStorage.getItem("addToCart") == null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem("addToCart"));
}

let compareProduct3 = JSON.parse(localStorage.getItem("compareProduct")) || [];

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cart.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishlistContainer.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct3.length;

function addToCart(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = cart.find((item) => item.id === chose.id);
    if (fondedProduct) {
        fondedProduct.count += 1;
    } else {
        cart.push({...chose,count:1});
        alert("Product Added to Your Cart Successfully!")
    }
    cartCount.textContent = cart.length;
    localStorage.setItem("addToCart", JSON.stringify(cart))
    location.reload();
}