let prodcutDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".no-products");

//  remove one item from cart



function drawCartProductsUI(allProducts = []) {

    if (JSON.parse(localStorage.getItem("productsInCart")).length === 0)
        noProductsDom.style.display = "block";
        noProductsDom.innerHTML = "There Is NO Items";


    let products = JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
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
          <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
        </div>
      </div>
        `
    });

    prodcutDom.innerHTML = productsUI.join("");
}

drawCartProductsUI();

function removeItemFromCart(id) {
    let productsInCart = localStorage.getItem("productsInCart");
    if (productsInCart) {
        let items = JSON.parse(productsInCart);

        let filteredItems =  items.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems);
    }

};