let productItems = []

if(localStorage.getItem("ShopProducts") == null) {
    productItems = [];
} else {
    productItems = JSON.parse(localStorage.getItem("ShopProducts"));
}

const getAllProducts = async function() {
    const apiProducts = await fetch("../product.json");
    const products = await apiProducts.json();
    productItems = products;
    localStorage.setItem("ShopProducts", JSON.stringify(productItems));
    displayAllShops(products);
    displayShops(products)
}
getAllProducts();

////////////////////////////////////////////////
let cardShop = document.getElementById("cardShop");
function displayAllShops(products) {
    let list2 = '';
    for (let i = 0; i < (products.length) / 2; i++) {
        let star = '';
        let count = products[i].stars;
        for (let j = 1; j <= 5; j++) {
            if (count >= 1) {
                star += `<i class="fa-solid fa-star"></i>`
                count--;
            } else if (count == 0.5) {
                star += `<i class="fa-solid fa-star-half-stroke"></i>`
            } else {
                star += `<i class="fa-regular fa-star"></i>`
            }
        }
    
        list2 += 
        `
        <li>
            
            <div class="card-shop d-flex justify-content-between">
        
                <div class="image">
                
                    <a href="#"><img src="${products[i].imageSrc}" alt=""></a>
                
                </div>

                <div class="card-body">
                
                    <a href="../pages/quickview.html" onclick="quickView(${i})"><h3>${products[i].title}</h3></a>
                
                    <div class="stars">
                    
                        ${star}
                    
                    </div>
                
                    <p><span class="before">$${products[i].oldPrice}.00</span> <span class="after">$${products[i].price}.00</span></p>
                
                </div>
            
            </div>
            
        </li>
        `
    }
    cardShop.innerHTML = list2;
}

/////////////////////////////////////////
let shops = document.getElementById("shops");
function displayShops(products) {
    let list = '';
    for (let i = 0; i < products.length; i++) {
        let star = '';
        let count = products[i].stars;
        for (let j = 1; j <= 5; j++) {
            if (count >= 1) {
                star += `<i class="fa-solid fa-star"></i>`
                count--;
            } else if (count == 0.5) {
                star += `<i class="fa-solid fa-star-half-stroke"></i>`
            } else {
                star += `<i class="fa-regular fa-star"></i>`
            }
        }
    
    
        list += 
        `
        
        <div class="col-md-4 col-lg-4">
            
            <div class="card">
            
                <div class="image">
                
                    <a href="#"><img src="${products[i].imageSrc}" alt=""></a>
                
                    <div class="icons">
                    
                        <a href="#" title="add to wishlist" onclick="addToWishlist(${i})"><i class="fa-regular fa-heart"></i></a>
                    
                        <a href="../pages/quickview.html" onclick="quickView(${i})" class="btn btn-primary homeBtn">quick look</a>
                    
                        <a href="#" onclick="compare(${i})" title="add to compare"><i class="fa-solid fa-shuffle"></i></a>
                    
                    </div>
                
                    <div class="sale">
                    
                        <span>${products[i].sale}</span>
                    
                    </div>
                
                    <div class="shopbtn">
                    
                        <a href="#" class="btn btn-primary homeBtn">view more</a>
                    
                    </div>
                
                </div>
                
                <div class="card-body">
                
                    <div class="stars">
                    
                        ${star}
                    
                    </div>
                
                    
                    <a href="#"><h5>${products[i].title}</h5></a>
                
                    <div class="switch">
                    
                        <p class="prices"><span class="before">$${products[i].oldPrice}.00</span> <span class="after">$${products[i].price}.00</span></p>
                    
                        <button class="cart" onclick="addToCart(${i})">add to cart</button>
                    
                    </div>
                
                </div>
            
            </div>
    
        </div>
        
        `
    }
    shops.innerHTML = list;
}

/////////////////////////////////////////////////////////////////////////////
let wishlistContainer;
if (localStorage.getItem("productWishlist") == null) {
    wishlistContainer = [];
} else {
    wishlistContainer = JSON.parse(localStorage.getItem("productWishlist"));
}
/////////////////////////////////////
function addToWishlist(i) {
    let day = new Date();
    let date = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    ShopProducts[i].date = date;
    let chose = ShopProducts[i];
    let fondedProduct = wishlistContainer.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product")
    } else {
        wishlistContainer.push({...chose,count:1});
        alert("Product Added Successfully to your wishlist!")
    }
    cartCount.textContent = wishlistContainer.length;
    localStorage.setItem("productWishlist", JSON.stringify(wishlistContainer))
    location.reload();
}
/////////////////////////////////////
let cart = [];

if (localStorage.getItem("addToCart") == null) {
    cart = [];
} else {
    cart = JSON.parse(localStorage.getItem("addToCart"));
}

let compareProduct2 = [];

if (localStorage.getItem("compareProduct") == null) {
    compareProduct2 = [];
} else {
    compareProduct2 = JSON.parse(localStorage.getItem("compareProduct"));
}

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cart.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishlistContainer.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct2.length;

function addToCart(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = cart.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product")
    } else {
        cart.push({...chose,count:1});
        alert("Product Added Successfully!")
    }
    cartCount.textContent = cart.length;
    localStorage.setItem("addToCart", JSON.stringify(cart))
    location.reload();
}

function quickView(i) {
    let chosenProduct = productItems[i];
    localStorage.setItem("quickViewProduct", JSON.stringify(chosenProduct));
}

function compare(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = compareProduct2.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product to Comparison Page")
    } else {
        compareProduct2.push({...chose,com:1});
        alert("Product Added Successfully to Your Comparison!")
    }
    compareCount.textContent = compareProduct2.length;
    localStorage.setItem("compareProduct", JSON.stringify(compareProduct2));
    location.reload();
}