let menuBar = document.getElementById("menuBar");
let close = document.getElementById("close");
let menuBars = document.getElementById("menuBars")
let box = document.getElementById("box")

let alrt = document.getElementById("alrt");

menuBar.addEventListener("click", function(e) {
    menuBars.style.display= "flex";
    menuBars.style.opacity= "1";
    menuBars.style.visibility= "visible";
    menuBars.style.cursor = "crosshair";
    box.style.cursor = "auto";
    console.log(e);
})

close.addEventListener("click", function() {
    menuBars.style.display= "none";
    menuBars.style.opacity= "0";
    menuBars.style.visibility= "hidden";
    menuBars.style.cursor = "value";
})

alrt.addEventListener("click", function() {
    alert("do you want to call us?")
})

const getProducts = async function() {
    const apiProducts = await fetch("../product.json");
    const products = await apiProducts.json();
    localStorage.setItem("ShopProducts", JSON.stringify(shopContainer));
    displayProducts(products);
    displayBestSeller(products);
}
getProducts();

///////////////////////////////////////////////////////////////////////////////
let blogContainer;

if(localStorage.getItem("blog") == null) {
    blogContainer = [];
} else {
    blogContainer = JSON.parse(localStorage.getItem("blog"));
}

const getBlogs = async function() {
    const apiOfBlogs = await fetch("../blog.json");
    const blogs = await apiOfBlogs.json();
    localStorage.setItem("blog", JSON.stringify(blogs));
    displayBlogs(blogs);
}

getBlogs();

function displayBlogs(blogs) {
    let row = document.getElementById("row");
    let list = '';
    for (let i = 0; i < blogs.length; i++) {
        list += 
        `
        
        <div class="col-md-6 col-lg-4">
        
            <div class="card">
        
            <div class="image">
            
                <a href="#"><img src="${blogs[i].imageSrc}" class="card-img-top" alt="..."></a>
            
            </div>
        
            <div class="card-body">
        
                <p class="by-date"><span class="by">by:</span> <span class="how">${blogs[i].by}</span> ${blogs[i].date}</p>
        
                <h5 class="card-title">${blogs[i].title}</h5>
        
                <p class="card-text">${blogs[i].description}</p>
        
            </div>
        
            </div>
        
        </div>
        
        `
    }
    row.innerHTML = list;
}

///////////////////////////////////////////////////////////////////

let shopContainer = [];

if(localStorage.getItem("ShopProducts") == null) {
    shopContainer = [];
} else {
    shopContainer = JSON.parse(localStorage.getItem("ShopProducts"));
}



function displayProducts(products) {
    let shop = document.getElementById("shop");
    let container = '';
    for (let i = 0 ; i < 2; i++) {
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
        container +=
        `
        
        <div class="col-lg-6">
            
            <div class="card">
            
            <div class="image">
            
                <img src="${products[i].imageSrc}" alt="">
            
                <div class="icons">
                
                    <button class="shape" onclick="addToWishlist(${i})" title="add to wishlist"><i class="fa-regular fa-heart"></i></button>
                            
                    <button class="shape" onclick="addToCart(${i})" title="add to cart"><i class="fa-brands fa-opencart"></i></button>
                
                    <a href="../pages/quickview.html" class="shape" onclick="quickView(${i})" title="view"><i class="fa-regular fa-eye"></i></a>
                
                    <button onclick="compareItem(${i})" class="shape" title="add to compare"><i class="fa-solid fa-shuffle"></i></button>
                
                </div>
            
                <div class="sale">
                
                    <span>${products[i].sale}</span>
                
                </div>
            
                <div class="shopbtn">
                
                    <a href="../pages/quickview.html" onclick="quickView(${i})" class="btn btn-primary homeBtn">view more</a>
                
                </div>
            
            </div>
            
            <div class="card-body">
            
                <div class="stars">
                
                    ${star}
                
                </div>
            
                
                <a href="#"><h5>${products[i].title}</h5></a>
            
                <p><span class="before">$${products[i].oldPrice}.00</span> <span class="after">$${products[i].price}.00</span></p>
            
            </div>
            
            </div>
        
        </div>
        
        `
    }
    shop.innerHTML = container;
}
////////////////////////////////////////////////
let bestSeller = document.getElementById("bestSeller");

function displayBestSeller(products) {
    let list = '';
    for(let i = 0; i < 4; i++) {
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
        
        <div class="col-md-6 col-lg-3">
        
            <div class="card">
                
                <div class="image">
            
                    <img src="${products[i].imageSrc}" alt="">
                
                    <div class="icons">
                    
                        <button class="shape" onclick="addToWishlist(${i})" title="add to wishlist"><i class="fa-regular fa-heart"></i></button>
                        
                        <button class="shape" onclick="addToCart(${i})" title="add to cart"><i class="fa-brands fa-opencart"></i></button>
                    
                        <a href="../pages/quickview.html" class="shape" onclick="quickView(${i})" title="view"><i class="fa-regular fa-eye"></i></a>
                    
                        <button onclick="compareItem(${i})" class="shape" title="add to compare"><i class="fa-solid fa-shuffle"></i></button>
                    
                    </div>
                
                    <div class="sale">
                    
                        <span>${products[i].sale}</span>
                    
                    </div>
                
                    <div class="shopbtn">
                    
                        <a href="../pages/quickview.html" onclick="quickView(${i})" class="btn btn-primary homeBtn">view more</a>
                    
                    </div>
            
                </div>
            
                <div class="card-body">
                
                    <div class="stars">
                    
                        ${star}
                    
                    </div>
                
                    
                    <a href="#"><h5>${products[i].title}</h5></a>
                
                    <p><span class="before">$${products[i].oldPrice}.00</span> <span class="after">$${products[i].price}.00</span></p>
                
                </div>
            
            </div>
        
        </div>
        
        `
    }
    bestSeller.innerHTML = list;
}

let allCart = JSON.parse(localStorage.getItem("addToCart")) || [];
let allWishlist = JSON.parse(localStorage.getItem("productWishlist")) || [];
let shopList = JSON.parse(localStorage.getItem("ShopProducts")) || [];

let compareProduct = [];

if (localStorage.getItem("compareProduct") == null) {
    compareProduct = [];
} else {
    compareProduct = JSON.parse(localStorage.getItem("compareProduct"));
}


let cartCount2 = document.querySelector(".cart-count");
cartCount2.textContent = allCart.length;

let wishlistCount3 = document.querySelector(".wishlist-count");
wishlistCount3.textContent = allWishlist.length;

let compareCount3 = document.querySelector(".compareCount");
compareCount3.textContent = compareProduct.length;

function addToCart(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = allCart.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You Have Already Added This Product")
    } else {
        allCart.push({...chose,count:1});
        alert("Product Added Successfully")
        cartCount2.textContent = allCart.length;
        localStorage.setItem("addToCart", JSON.stringify(allCart))
        location.reload();
    }
}

function addToWishlist(i) {
    let day = new Date();
    let date = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
    shopList[i].date = date;
    allWishlist.push(shopList[i])
    localStorage.setItem("productWishlist", JSON.stringify(allWishlist));
    alert("Product Add To Wishlist Successfully!")
    location.reload();
}

function quickView(i) {
    let chosenProduct = shopList[i];
    localStorage.setItem("quickViewProduct", JSON.stringify(chosenProduct));
}

function compareItem(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("ShopProducts"));
    let chose = ShopProducts[i];
    let fondedProduct = compareProduct.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product to Comparison Page")
    } else {
        compareProduct.push({...chose,com:1});
        alert("Product Added Successfully to Your Comparison!")
    }
    compareCount3.textContent = compareProduct.length;
    localStorage.setItem("compareProduct", JSON.stringify(compareProduct));
    location.reload();
}