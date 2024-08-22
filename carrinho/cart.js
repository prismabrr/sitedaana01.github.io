// Função para adicionar produtos ao carrinho e armazenar no localStorage
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} foi adicionado ao carrinho.`);
    console.log('Produto adicionado:', product);
    console.log('Carrinho atualizado:', cart);
}

// Função para atualizar a exibição do carrinho na página do carrinho
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Carrinho carregado:', cart);

    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    
    if (cartElement && totalElement) {
        cartElement.innerHTML = '';
        cart.forEach((product, index) => {
            cartElement.innerHTML += `
                <div class="cart-item">
                    <span>${product.name} - R$${product.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})">Remover</button>
                </div>`;
        });

        const total = cart.reduce((sum, product) => sum + product.price, 0);
        totalElement.innerHTML = `Total: R$${total.toFixed(2)}`;
    } else {
        console.error('Elementos do carrinho não encontrados.');
    }
}

// Função para remover produtos do carrinho e atualizar o localStorage
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Produto removido. Carrinho atualizado:', cart);
    updateCartDisplay();
}

// Função para enviar o carrinho para o WhatsApp
function sendToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    const phoneNumber = '5511999999999'; // Substitua pelo número de telefone desejado
    let message = 'Resumo do pedido:\n';
    cart.forEach(product => {
        message += `${product.name} - R$${product.price.toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    message += `Total: R$${total.toFixed(2)}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    console.log('Mensagem enviada para WhatsApp:', message);
}

// Função para navegar para a página do carrinho
function goToCart() {
    window.location.href = 'cart.html';
}

// Atualiza a exibição do carrinho na página de carregamento
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada, atualizando exibição do carrinho.');
    updateCartDisplay();
});
