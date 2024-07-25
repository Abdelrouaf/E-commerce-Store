let allProducts = JSON.parse(localStorage.getItem("ShopProducts")) || [];

let compareProduct1 = [];

if (localStorage.getItem("compareProduct") == null) {
    compareProduct1 = [];
} else {
    compareProduct1 = JSON.parse(localStorage.getItem("compareProduct"));
}

let cartContainer = JSON.parse(localStorage.getItem("addToCart")) || []

let wishContainer = JSON.parse(localStorage.getItem("productWishlist")) || []

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cartContainer.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishContainer.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct1.length;

function compare(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = cart.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product to Comparison Page")
    } else {
        compareProduct1.push({...chose,com:1});
        alert("Product Added Successfully to Your Comparison!")
    }
    localStorage.setItem("compareProduct", JSON.stringify(compareProduct1))
    location.reload();
}

let shos = document.getElementById("shos");
function displayShops() {
    let list = '';
    for (let i = allProducts.length - 2; i > 4; i--) {
        let star = '';
        for (let j = 1; j <= 5; j++) {
            if (allProducts[i].stars >= 1) {
                star += `<i class="fa-solid fa-star"></i>`
                allProducts[i].stars--;
            } else if (allProducts[i].stars == 0.5) {
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
                
                    <a href="#"><img src="${allProducts[i].imageSrc}" alt=""></a>
                
                    <div class="icons">
                    
                        <a href="#" title="add to wishlist" onclick="addToWishlist(${i})"><i class="fa-regular fa-heart"></i></a>
                    
                        <a href="../pages/quickview.html" class="btn btn-primary homeBtn" onclick="quickView(${i})">quick look</a>
                    
                        <a href="../pages/compare.html" onclick="compare(${i})" title="add to compare"><i class="fa-solid fa-shuffle"></i></a>
                    
                    </div>
                
                    <div class="sale">
                    
                        <span>${allProducts[i].sale}</span>
                    
                    </div>
                
                    <div class="shopbtn">
                    
                        <a href="#" class="btn btn-primary homeBtn">view more</a>
                    
                    </div>
                
                </div>
                
                <div class="card-body">
                
                    <div class="stars">
                    
                        ${star}
                    
                    </div>
                
                    
                    <a href="#"><h5>${allProducts[i].title}</h5></a>
                
                    <div class="switch">
                    
                        <p class="prices"><span class="before">$${allProducts[i].oldPrice}.00</span> <span class="after">$${allProducts[i].price}.00</span></p>
                    
                        <button class="cart" onclick="addCart(${i})">add to cart</button>
                    
                    </div>
                
                </div>
            
            </div>
    
        </div>
        
        `
    }
    shos.innerHTML = list;
}
displayShops();

function quickView(i) {
    let chosenProduct = productItems[i];
    localStorage.setItem("quickViewProduct", JSON.stringify(chosenProduct));
}

let view = document.getElementById("view");
let quick = JSON.parse(localStorage.getItem("quickViewProduct")) || [];

function displayItem() {

    let star = '';
    let count = quick.stars;
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

    let list = 
    `
    
    <div class="col-lg-6">
    
        <div class="image">

            <a href="#"><img src="${quick.imageSrc}" alt=""></a>
        
        </div>

    </div>

    <div class="col-lg-6">

        <div class="product-info">
    
            <div class="product-title">
            
                <h3>${quick.title}</h3>
            
            </div>
        
            <div class="product-description">
            
                <p>${quick.description}</p>
            
            </div>
        
            <div class="product-count d-flex align-items-center">
            
                <div class="count">
                
                    <input type="number" value="1" name="productCount" id="itemCount" class="form-control py-3">
                
                </div>
            
                <div class="addToCardBtn">
                
                    <button class="btn btn-primary homeBtn ms-2" onclick="addToCart()">add to cart</button>
                
                </div>
            
            </div>
        
            <div class="infoProduct">
            
                <h4>sku: <span>${quick.SKU}</span></h4>
            
            </div>
        
            <div class="infoProduct">
            
                <h4>categories: <span>${quick.Categories}</span></h4>
            
            </div>
        
            <div class="productPrice">
            
                <p><span class="one">$<span class="oldprice">${quick.oldPrice}</span>.00</span> <span class="two">$<span class="price">${quick.price}</span>.00</span></p>
            
            </div>
        
            <div class="stars">
                
                    ${star}
                
            </div>
    
        </div>

    </div>
    
    `;
    view.innerHTML = list;
}
displayItem();

let cartItem = [];

if (localStorage.getItem("addToCart") == null) {
    cartItem = [];
} else {
    cartItem = JSON.parse(localStorage.getItem("addToCart"));
}

let wishlistBox = [];
if (localStorage.getItem("productWishlist") == null) {
    wishlistBox = [];
} else {
    wishlistBox = JSON.parse(localStorage.getItem("productWishlist"));
}

let cartCount5 = document.querySelector(".cart-count");
cartCount5.textContent = cartItem.length;

let wishlistCount5 = document.querySelector(".wishlist-count");
wishlistCount5.textContent = wishlistBox.length;

let itemCount = document.querySelector("#itemCount");

function addToCart() {
    let viewProducts = JSON.parse(localStorage.getItem("quickViewProduct"));
    let fondedProduct = cartItem.find((item) => item.id === viewProducts.id);
    if (fondedProduct) {
        alert("You have already added this product")
    } else {
        viewProducts.price *= itemCount.value;
        cartItem.push({...viewProducts,count:itemCount.value});
        alert("Product Added Successfully!")
    }
    cartCount5.textContent = cartItem.length;
    localStorage.setItem("addToCart", JSON.stringify(cartItem))
}

function addCart(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = cartItem.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product")
    } else {
        cartItem.push({...chose,count:1});
        alert("Product Added Successfully!")
    }
    cartCount5.textContent = cartItem.length;
    localStorage.setItem("addToCart", JSON.stringify(cartItem))
    location.reload();
}

function quickView(i) {
    let chosenProduct = allProducts[i];
    localStorage.setItem("quickViewProduct", JSON.stringify(chosenProduct));
}

let detailsBox = document.getElementById("detailsBox"); 
function displayInformation() {
    let list = 
    `
    
    <div class="content" id="content">
    
        <p>${quick.description}</p>

    </div>

    <div class="additionalInformation" id="additionalInformation">

        <h4 class="text-capitalize mb-3">additional information</h4>

        <div class="box">
        
            <p class="border-top p-2 text-capitalize border-bottom-0">weight <span class="weight ms-5">${quick.weight}</span></p>
        
            <p class="border-top border-bottom p-2 text-capitalize">dimensions <span class="dimension ms-3">${quick.Dimensions}</span></p>
        
            <p class="border-bottom p-2 text-capitalize">color <span class="dimension ms-3">${quick.color}</span></p>
        
            <p class="border-bottom p-2 text-capitalize">size <span class="dimension ms-3">${quick.size}</span></p>
        
        </div>

    </div>
    
    `
    detailsBox.innerHTML = list;
}
displayInformation()


let descriptionDetailsBtn = document.getElementById("descriptionDetailsBtn");
let content = document.getElementById("content");

let additionalInformationBtn = document.getElementById("additionalInformationBtn");
let additionalInformation = document.getElementById("additionalInformation");
additionalInformation.style.display = "none";
let reviewsBtn = document.getElementById("reviewsBtn");

descriptionDetailsBtn.addEventListener("click", function() {
    content.style.display = "block";
    additionalInformation.style.display = "none";
    descriptionDetailsBtn.classList.add("design");
    additionalInformationBtn.classList.remove("design");
})

additionalInformationBtn.addEventListener("click", function() {
    content.style.display = "none";
    additionalInformation.style.display = "block";
    additionalInformationBtn.classList.add("design");
    descriptionDetailsBtn.classList.remove("design");
})

