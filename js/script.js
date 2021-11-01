// Define products
let prodcutDom = document.querySelector(".products");
let cartProductMenu = document.querySelector(".carts-products");
let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let products = productsDB;



// open cart menu
shoppingCartIcon.addEventListener("click", openCartMenu);

//desplay products
let drawproductsUI;
(drawproductsUI = function (products = []) {
    
    let productsUI = products.map((item) => {
        console.log("eee", item);
        return `
         <div class="product-item">
        <img
          src="${item.imageUrl}"
          class="product-item-img"
          alt="image"
        />
        <div class="product-item-desc">
          <a onclick="saveItemData(${item.id})">${item.title}</a>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <span>color : ${item.color}</span>
        </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
          <i class="fas fa-heart favorite" style="color: ${item.liked == true ? "red": ""}" onclick="addToFavorite(${item.id})"></i>
        </div>
      </div>
        `
    });

    prodcutDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);

        // check if there is items in localStorage or DataBais
let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];

if (addedItem) {
    addedItem.map(item => {
        cartProductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`
    });
    
    badgeDom.style.display = "block";
    badgeDom.innerHTML += addedItem.length 
}

// Add to Cart

function addedToCart(id) {

    if (localStorage.getItem("username")) {

        let product = products.find((item) => item.id === id);
        let isProductInCart = addedItem.some(i => i.id === product.id);

        if (isProductInCart) {
            addedItem = addedItem.map(p => {
                if (p.id === product.id) p.qty += 1;
                return p;
            });
        } else {
            addedItem.push(product)
        }
        cartProductDivDom.innerHTML = "";
        addedItem.forEach(item => {
            cartProductDivDom.innerHTML += `<p> ${item.title}  ${item.qty} </p>`;

        });
        // save our data
        localStorage.setItem("productsInCart", JSON.stringify(addedItem))

        // count items
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductItems.length;
    }  else {
        window.location = "login.html"
    }
};

function getArray(arr, filterType) {
    let unique = arr
        .map(item => item[filterType])
        .map((item, i, final) => final.indexOf(item) === i && i)
        .filter((item) => arr[item])
        .map(item => arr[item]);
    return unique;
}



// open cart menu
function openCartMenu() {
    if (cartProductDivDom.innerHTML != "") {
        if (cartProductMenu.style.display == "block") {
            cartProductMenu.style.display = "none"
        } else {
            cartProductMenu.style.display = "block"
        }
    }
}

function saveItemData(id) {
    localStorage.setItem("productId", id);
    window.location = "cartDetails.html";
}

// search input
let searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", (e) => {
       search(e.target.value, JSON.parse(localStorage.getItem("products")))

    if (e.target.value.trim() === "") {
        drawproductsUI(JSON.parse(localStorage.getItem("products")));
    }
});



//search  
function search(title, myArray) {
  
    let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
    drawproductsUI(arr);
};

// Add to favorite

let favoriteItems = localStorage.getItem("productsFavorite") ? JSON.parse(localStorage.getItem("productsFavorite")) : []; // to save data in localStorage
function addToFavorite(id) {

    if (localStorage.getItem("username")) {

        let product = products.find((item) => item.id === id);
        product.liked = true;
        favoriteItems =[...favoriteItems, product]
        let uniqueProducts = getArray(favoriteItems, "id");
        localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
        products.map(item => {
            if (item.id === product.id) {
                item.liked = true 
            }
        });
        localStorage.setItem("products", JSON.stringify(products));
        drawproductsUI(products);
    }  else {
        window.location = "login.html"
    }
};
