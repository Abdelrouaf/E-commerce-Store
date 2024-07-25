let blogList = [];

if (localStorage.getItem("blog") == null) {
    blogList = [];
} else {
    blogList = JSON.parse(localStorage.getItem("blog"));
}   

let cartContainer = JSON.parse(localStorage.getItem("addToCart")) || []

let wishContainer = JSON.parse(localStorage.getItem("productWishlist")) || []

let compareProduct3 = JSON.parse(localStorage.getItem("compareProduct")) || [];

let cartCount = document.querySelector(".cart-count");
cartCount.textContent = cartContainer.length;

let wishlistCount = document.querySelector(".wishlist-count");
wishlistCount.textContent = wishContainer.length;

let compareCount = document.querySelector(".compareCount");
compareCount.textContent = compareProduct3.length;

let blogBox = document.getElementById("blogBox");

function displayOurBlog() {
    let list = '';
    for (let i = 0 ; i < blogList.length; i++) {
        list +=
        `
        
        <div class="card">
                
            <div class="image">
            
                <img src="${blogList[i].imageSrc}" alt="">
            
            </div>
    
            <div class="details d-flex my-3">
            
                <h5 class="text-capitalize">by: <span>${blogList[i].by}</span></h5>
            
                <p>${blogList[i].date}</p>
            
                <span><i class="fa-regular fa-clock"></i> ${blogList[i].datePosted}</span>
            
            </div>
    
            <h3 class="title">${blogList[i].title}</h3>
        
            <p class="paragraph">${blogList[i].description}</p>
        
            <a href="#">read more <i class="fa-solid fa-arrow-right"></i></a>
    
        </div>
        
        `
    }
    blogBox.innerHTML = list;
}
displayOurBlog();


let slideBlog = document.getElementById("slideBlog");

function displaySlide() {
    let con = '';
    let counter = 0;
    for (let i = 0 ; i < (blogList.length) * 2; i++) {
        if (counter == blogList.length) {
            counter = 0;
        }
        con +=
        `
        
        <li class="mb-3">
                                
            <div class="blog-box d-flex justify-content-between my-4">
            
                <div class="left">
                
                    <div class="image">
                    
                        <a href="#"><img src="${blogList[counter].imageSrc}" alt=""></a>
                    
                    </div>
                
                </div>
            
                <div class="right">
                    
                    <p class="date">${blogList[counter].datePosted}</p>
                
                    <h3 class="title">${blogList[counter].title}</h3>
                
                </div>
            
            </div>
    
        </li>
        
        `
        counter++;
    }
    slideBlog.innerHTML = con;
}
displaySlide();