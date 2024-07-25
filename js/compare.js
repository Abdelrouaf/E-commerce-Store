let headCompare = document.getElementById("headCompare");
let bodyCompare = document.getElementById("bodyCompare");
let bodyCompare2 = document.getElementById("bodyCompare2");
let bodyCompare3 = document.getElementById("bodyCompare3");
let bodyCompare4 = document.getElementById("bodyCompare4");
let bodyCompare5 = document.getElementById("bodyCompare5");
let bodyCompare6 = document.getElementById("bodyCompare6");
let bodyCompare7 = document.getElementById("bodyCompare7");
let bodyCompare8 = document.getElementById("bodyCompare8");
let bodyCompare9 = document.getElementById("bodyCompare9");
let bodyCompare10 = document.getElementById("bodyCompare10");
let bodyCompare11 = document.getElementById("bodyCompare11");
let bodyCompare12 = document.getElementById("bodyCompare12");
let bodyCompare13 = document.getElementById("bodyCompare13");

let compareProduct3 = [];
let cart4 = JSON.parse(localStorage.getItem("addToCart")) || [];
let wishlistContainer4 = JSON.parse(localStorage.getItem("productWishlist")) || [];

if (localStorage.getItem("compareProduct") == null) {
    compareProduct3 = [];
} else {
    compareProduct3 = JSON.parse(localStorage.getItem("compareProduct"));
    displayCompare();
}

let cartCount4 = document.querySelector(".cart-count");
cartCount4.textContent = cart4.length;

let wishlistCount4 = document.querySelector(".wishlist-count");
wishlistCount4.textContent = wishlistContainer4.length;

let compareCount5 = document.querySelector(".compareCount");
compareCount5.textContent = compareProduct3.length;

let borderBottom = document.getElementById("borderBottom");

if (compareProduct3.length == 0) {
    statusEmpty7.classList.remove("dnone");
    statusFull7.classList.add("dnone");
    borderBottom.classList.add("dnone");
} else {
    statusEmpty7.classList.add("dnone");
    statusFull7.classList.remove("dnone");
    borderBottom.classList.remove("dnone");
}

function removeAll() {
    compareProduct3.splice(0);
    localStorage.setItem("compareProduct", JSON.stringify(compareProduct3));
    location.reload();
    displayCompare();
}

function displayCompare() {
    let title = `<th>product comparison</th>`;
    let image = `<td>image</td>`;
    let stars = `<td>star rating</td>`;
    let price = `<td>price</td>`;
    let availability = `<td>availability</td>`;
    let cart = `<td>add to cart</td>`;
    let desc = `<td>description</td>`;
    let skuItem = `<td>SKU</td>`;
    let categories = `<td>categories</td>`;
    let weight = `<td>weight</td>`;
    let dimensions = `<td>dimensions</td>`;
    let color = `<td>color</td>`;
    let size = `<td>size</td>`;
    let remove = '<td><button class="btn btn-danger ms-2 text-capitalize" id="removeCompare" onclick="removeAll()">remove all</button></td>';
    for (let i = 0; i < compareProduct3.length; i++) {
        let star = '';
        let count = compareProduct3[i].stars;
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
        
        title +=
        `
        
            <th>${compareProduct3[i].title}</th>
        
        `
    
        image += 
        `
        
        <td>
        
            <div class="image">
            
                <img src="${compareProduct3[i].imageSrc}" alt="">
            
            </div>
    
        </td>
        
        `
    
        stars +=
        `
        
        <td>
                        
            <div class="stars">

                ${star}
            
            </div>
    
        </td>
        
        `
    
        price +=
        `
        
            <td><p class="price"><span>$${compareProduct3[i].oldPrice}.00</span> $${compareProduct3[i].price}.00 </p></td>
        
        `
    
        availability += 
        `
        
        <td>
        
            <div class="availability">
            
                <p>${compareProduct3[i].availability}</p>
            
            </div>
    
        </td>
        
        `
    
        cart +=
        `
        
            <td class="cart"><button class="btn btn-primary homeBtn" onclick="addToCart(${i})"><i class="fa-solid fa-cart-shopping"></i></button></td>
        
        `
    
        desc +=
        `
        
            <td class="description">
            
                <p>${compareProduct3[i].description}</p>
            
            </td>
        
        `
    
        skuItem +=
        `
        
            <td class="sku">
            
                <p>${compareProduct3[i].SKU}</p>
            
            </td>
        
        `
    
        categories +=
        `
        
            <td class="sku">${compareProduct3[i].Categories}</td>
        
        `
    
        weight +=
        `
        
            <td class="sku">${compareProduct3[i].weight}</td>
        
        `
    
        dimensions +=
        `
        
            <td class="sku">${compareProduct3[i].Dimensions}</td>
        
        `
    
        color +=
        `
        
            <td class="sku">${compareProduct3[i].color}</td>
        
        `
    
        size +=
        `
        
            <td class="sku">${compareProduct3[i].size}</td>
        
        `
    
        remove +=
        `
        
        <td class="delete"><button class="btn btn-primary homeBtn" onclick="deleteRow(${i})"><i class="fa-regular fa-trash-can"></i></button></td>
        
        `
    
    }
    headCompare.innerHTML = title;
    bodyCompare.innerHTML = image;
    bodyCompare2.innerHTML = stars;
    bodyCompare3.innerHTML = price;
    bodyCompare4.innerHTML = availability;
    bodyCompare5.innerHTML = remove;
    bodyCompare6.innerHTML = cart;
    bodyCompare7.innerHTML = desc;
    bodyCompare8.innerHTML = skuItem;
    bodyCompare9.innerHTML = categories;
    bodyCompare10.innerHTML = weight;
    bodyCompare11.innerHTML = dimensions;
    bodyCompare12.innerHTML = color;
    bodyCompare13.innerHTML = size;
}

function deleteRow(i) {
    compareProduct3.splice(i, 1);
    localStorage.setItem("compareProduct", JSON.stringify(compareProduct3));
    alert("Product Deleted Successfully!")
    displayCompare();
    location.reload();
}

function addToCart(i) {
    let ShopProducts = JSON.parse(localStorage.getItem("compareProduct"));
    let chose = ShopProducts[i];
    let fondedProduct = cart4.find((item) => item.id === chose.id);
    if (fondedProduct) {
        alert("You have already added this product")
    } else {
        cart4.push({...chose,count:1});
        alert("Product Added Successfully!")
    }
    cartCount4.textContent = cart4.length;
    localStorage.setItem("addToCart", JSON.stringify(cart4))
    location.reload();
}