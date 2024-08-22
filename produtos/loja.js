if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

var totalAmount = "0,00";

// =================abrir e fechar carrinho =============

document.getElementById('toggle-button').addEventListener('click', function() {
  var cart = document.getElementById('cart');
  if (cart.style.display === 'none' || cart.style.display === '') {
    cart.style.display = 'block';
  }
});

document.getElementById('close-button').addEventListener('click', function() {
  document.getElementById('cart').style.display = 'none';
});

function ready() {
  // Botão remover produto
  const removeCartProductButtons = document.getElementsByClassName("remove-product-button");
  for (var i = 0; i < removeCartProductButtons.length; i++) {
      removeCartProductButtons[i].addEventListener("click", removeProduct);
  }

  // Mudança valor dos inputs
  const quantityInputs = document.getElementsByClassName("product-qtd-input");
  for (var i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", checkIfInputIsNull);
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("button-hover-background");
  for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  // Botão enviar pelo WhatsApp
  const whatsappButton = document.getElementById("whatsapp-button");
  whatsappButton.addEventListener("click", sendCartToWhatsApp);
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove();
  updateTotal();
}

function checkIfInputIsNull(event) {
  if (event.target.value === "0") {
      event.target.parentElement.parentElement.remove();
  }

  updateTotal();
}

function addProductToCart(event) {
  const button = event.target;
  const productInfos = button.parentElement.parentElement;
  const productImage = productInfos.getElementsByClassName("product-image")[0].src;
  const productName = productInfos.getElementsByClassName("product-title")[0].innerText;
  const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText;

  const productsCartNames = document.getElementsByClassName("cart-product-title");
  for (var i = 0; i < productsCartNames.length; i++) {
      if (productsCartNames[i].innerText === productName) {
          productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++;
          updateTotal();
          return;
      }
  }

  let newCartProduct = document.createElement("tr");
  newCartProduct.classList.add("cart-product");

  newCartProduct.innerHTML =
      `<td class='scroll-info'> 
        <td class="product-identification">
            <img src="${productImage}" alt="${productName}" class="cart-product-image">
            <strong class="cart-product-title">${productName}</strong>
            
        </td> 
        <td>
            <span class="cart-product-price">${productPrice}</span>
        </td>
        <td></td>
        <td class='auto-button'>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
        </td>
      </td>
      
      `;

  const tableBody = document.querySelector(".cart-table tbody");
  tableBody.append(newCartProduct);
  updateTotal();

  newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);
  newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull);
}

function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product");
  totalAmount = 0;

  for (var i = 0; i < cartProducts.length; i++) {
      const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".");
      const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

      totalAmount += productPrice * productQuantity;
  }

  totalAmount = totalAmount.toFixed(2);
  totalAmount = totalAmount.replace(".", ",");
  document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount;

  const tableBody = document.querySelector(".cart-table tbody");
  if (cartProducts.length > 2) {
      tableBody.classList.add("scrollable");
  } else {
      tableBody.classList.remove("scrollable");
  }

  const cartCount = document.getElementById("cart-count");
  if (cartProducts.length > 0) {
      cartCount.innerText = cartProducts.length;
      cartCount.classList.add("visible");
  } else {
      cartCount.classList.remove("visible");
  }
}

function sendCartToWhatsApp() {
  const name = document.getElementById("customer-name").value;
  const cpf = document.getElementById("customer-cpf").value;
  const phone = document.getElementById("customer-phone").value;

  if (name === "" || cpf === "" || phone === "") {
      alert("Por favor, preencha todos os campos!");
      return;
  }

  const cartProducts = document.getElementsByClassName("cart-product");
  let cartMessage = `Meu carrinho de compras:\n\nNome: ${name}\nCPF: ${cpf}\nNúmero de Celular: ${phone}\n\n`;

  for (var i = 0; i < cartProducts.length; i++) {
      const productName = cartProducts[i].getElementsByClassName("cart-product-title")[0].innerText;
      const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText;
      const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

      cartMessage += `${productName} - ${productQuantity} x ${productPrice}\n`;
  }

  cartMessage += `\nTotal: R$${totalAmount}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=5579996004918&text=${encodeURIComponent(cartMessage)}`;
  window.open(whatsappUrl, "_blank");
}
