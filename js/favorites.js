let prodcutDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".no-products");





function drawFavoritesProductsUI(allProducts = []) {

    if (JSON.parse(localStorage.getItem("productsFavorite")).length === 0)
        noProductsDom.style.display = "block";
        noProductsDom.innerHTML = "There Is NO Items";


    let products = JSON.parse(localStorage.getItem("productsFavorite")) || allProducts;
    let productsUI = products.map((item) => {
        return `
         <div class="product-item">
        <img
          src="${item.imageUrl}"
          class="product-item-img"
          alt="image"
        />
        <div class="product-item-desc">
          <a href="#">${item.title}</a>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <span> color : ${item.color}</span> <br/>
          <span> quantity : ${item.qty}</span>
          </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="removeItemFromFavorite(${item.id})">Remove From Favorite</button>
        </div>
      </div>
        `
    });

    prodcutDom.innerHTML = productsUI.join("");
}

drawFavoritesProductsUI();


// remove from fav
function removeItemFromFavorite (id) {
    let productsFavorite = localStorage.getItem("productsFavorite");
    if (productsFavorite) {
        let items = JSON.parse(productsFavorite);

        let filteredItems =  items.filter((item) => item.id !== id);
        localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
        drawFavoritesProductsUI(filteredItems);
    }

};