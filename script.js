document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-list');

    // Estado do carrinho com persistência
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Dados dos produtos, organizados por categoria
    const products = {
        blusas: [
            { id: 'blusa1', name: 'Blusa de Verão Floral', price: 'R$ 69,90', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHID4TJC2Flb6MH0OxaGVKCGnMmNmIe6N2g&s'},
            { id: 'blusa2', name: 'Blusa Casual Listrada', price: 'R$ 55,50', image: 'https://cf.shopee.com.br/file/br-11134207-7r98o-m1vha7qvkywa8d'},
            { id: 'blusa3', name: 'Blusa Básica de Malha', price: 'R$ 49,90', image:'https://images.tcdn.com.br/img/img_prod/845558/blusa_feminina_malha_canelada_regata_cinza_melina_2413_1_6846106f2f9237333672a65b678eed34.jpg'},
            { id: 'blusa4', name: 'Blusa de Manga Longa', price: 'R$ 79,90', image: 'https://trilo.com.br/wp-content/uploads/2024/04/bc95be149e1c953389226b406ee15f2d.jpg'},
            { id: 'blusa5', name: 'Blusa com Estampa Geométrica', price: 'R$ 85,00', image: 'https://static.eliani.com.br/public/eliani/imagens/produtos/blusa-manga-longa-meia-tunica-estampa-geometrica-9418.jpg'}
        ],
        shorts: [
            { id: 'short1', name: 'Short Jeans Casual', price: 'R$ 99,90', image:'https://lojaviego.com.br/cdn/shop/files/Bermuda_Jeans_Masculina_Rasgado_Reveillon_loja_viego_2__1_11zon.webp?v=1719351836 ' },
            { id: 'short2', name: 'Short Esportivo de Linho', price: 'R$ 75,00', image:'https://down-br.img.susercontent.com/file/br-11134201-23010-vbdog6k08kmv2e'},
            { id: 'short3', name: 'Short de Praia com Estampa', price: 'R$ 65,00', image: 'https://static.dafiti.com.br/p/Vicbela-Short-Curto-Feminino-Estampado-Prote%C3%A7%C3%A3o-Uv-50+-Moda-Sa%C3%ADda-de-Praia-Vicbela-Folha-8268-51983931-1-zoom.jpg'},
            { id: 'short4', name: 'Short de Alfaiataria', price: 'R$ 110,00', image: 'https://static.ecosweb.com.br/public/produtos/moda-feminina/shorts-social/short-marrom-amendoado-em-alfaiataria_368499_600_1.jpg'},
            { id: 'short5', name: 'Short Saia para Academia', price: 'R$ 89,90', image: 'https://m.media-amazon.com/images/I/41PPsBY+HlL._SY1000_.jpg'}
        ],
        tenis: [
            { id: 'tenis1', name: 'Tênis de Corrida Leve', price: 'R$ 250,00', image: 'https://underarmourbr.vtexassets.com/arquivos/ids/317870-800-800?v=638247605581430000&width=800&height=800&aspect=true'},
            { id: 'tenis2', name: 'Tênis Casual Branco', price: 'R$ 180,00', image: 'https://img.lojasrenner.com.br/item/927863928/original/3.jpg'},
            { id: 'tenis3', name: 'Tênis de Cano Alto Urbano', price: 'R$ 210,00', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTIx-1hYChoO02bRua8Z4zDPYI0z-mHIcAg&s' },
            { id: 'tenis4', name: 'Tênis Esportivo Amortecedor', price: 'R$ 320,00', image: 'https://cdn.dooca.store/117333/products/design-sem-nome-2023-07-21t135438280.png?v=1689958514'},
            { id: 'tenis5', name: 'Tênis de Couro Marrom', price: 'R$ 299,00', image: 'https://img.irroba.com.br/fit-in/800x800/filters:fill(fff):quality(80)/lojalaro/catalog/humanizadas-jorge-secco/04-js-connect-07324-3260-marrom-foto-02-00.jpg'}
        ]
    };

    // Função para salvar dados no localStorage
    const saveToStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Função para adicionar ao carrinho
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
            showNotification(`Quantidade de "${product.name}" aumentada!`);
        } else {
            cart.push({ ...product, quantity: 1 });
            showNotification(`"${product.name}" adicionado ao carrinho!`);
        }
        
        saveToStorage();
        updateCartUI();
        
        // Efeito visual no botão
        const btn = event.target;
        btn.style.transform = 'translateX(-50%) scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'translateX(-50%) scale(1)';
        }, 150);
    };



    // Função para atualizar UI do carrinho
    const updateCartUI = () => {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            
            // Animação quando o número muda
            if (totalItems > 0) {
                cartCount.style.animation = 'none';
                setTimeout(() => {
                    cartCount.style.animation = 'bounceIn 0.3s ease';
                }, 10);
            }
        }
    };



    // Função para mostrar notificação
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };

    // Função para criar o HTML de um card de produto
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        
        // Badge HTML (se existir)
        const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        
        card.innerHTML = `
            <div class="shine-effect"></div>
            ${badgeHTML}
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
            <button class="add-to-cart-btn">Adicionar ao Carrinho</button>
        `;
        
        // Adicionar evento de clique para o botão do carrinho
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
        });
        
        return card;
    };

    // Funções do modal do carrinho
    const openCartModal = () => {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            updateCartModalContent();
        }
    };

    const closeCartModal = () => {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    };

    // Função para extrair valor numérico do preço
    const extractPrice = (priceString) => {
        return parseFloat(priceString.replace('R$', '').replace(',', '.').trim());
    };

    // Função para formatar preço
    const formatPrice = (price) => {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    };

    // Função para calcular total do carrinho
    const calculateCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = extractPrice(item.price);
            return total + (price * item.quantity);
        }, 0);
    };

    // Função para atualizar conteúdo do modal
    const updateCartModalContent = () => {
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartEmpty || !cartTotal) return;

        if (cart.length === 0) {
            cartItems.style.display = 'none';
            cartEmpty.classList.remove('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            cartItems.style.display = 'flex';
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                        <button class="remove-item" title="Remover item">🗑️</button>
                    </div>
                </div>
            `).join('');
            
            // Adicionar event listeners para os controles
            setupCartItemControls();
        }
        
        // Atualizar total
        const total = calculateCartTotal();
        cartTotal.textContent = formatPrice(total);
    };

    // Função para configurar controles dos itens do carrinho
    const setupCartItemControls = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const itemId = item.dataset.id;
            const decreaseBtn = item.querySelector('.decrease');
            const increaseBtn = item.querySelector('.increase');
            const removeBtn = item.querySelector('.remove-item');
            
            decreaseBtn?.addEventListener('click', () => {
                decreaseQuantity(itemId);
            });
            
            increaseBtn?.addEventListener('click', () => {
                increaseQuantity(itemId);
            });
            
            removeBtn?.addEventListener('click', () => {
                removeFromCart(itemId);
            });
        });
    };

    // Função para diminuir quantidade
    const decreaseQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            saveToStorage();
            updateCartUI();
            updateCartModalContent();
            showNotification(`Quantidade de "${item.name}" diminuída`);
        }
    };

    // Função para aumentar quantidade
    const increaseQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += 1;
            saveToStorage();
            updateCartUI();
            updateCartModalContent();
            showNotification(`Quantidade de "${item.name}" aumentada`);
        }
    };

    // Função para remover item do carrinho
    const removeFromCart = (productId) => {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = cart[itemIndex];
            cart.splice(itemIndex, 1);
            saveToStorage();
            updateCartUI();
            updateCartModalContent();
            showNotification(`"${removedItem.name}" removido do carrinho`);
        }
    };

    // Função para limpar carrinho
    const clearCart = () => {
        if (cart.length > 0) {
            cart = [];
            saveToStorage();
            updateCartUI();
            updateCartModalContent();
            showNotification('Carrinho limpo com sucesso!');
        }
    };

    // Função para finalizar compra
    const checkout = () => {
        if (cart.length === 0) {
            showNotification('Carrinho vazio! Adicione alguns produtos primeiro.');
            return;
        }
        
        const total = calculateCartTotal();
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        showNotification(`Pedido de ${itemCount} item(s) no valor de ${formatPrice(total)} enviado!`);
        
        // Simular processo de checkout
        setTimeout(() => {
            cart = [];
            saveToStorage();
            updateCartUI();
            updateCartModalContent();
            closeCartModal();
            showNotification('Compra finalizada com sucesso! 🎉');
        }, 2000);
    };

    // Event listeners para os ícones do header e modal
    const setupHeaderActions = () => {
        const cartIcon = document.querySelector('.cart-icon');
        const cartClose = document.getElementById('cart-close');
        const cartOverlay = document.querySelector('.cart-modal-overlay');
        const clearCartBtn = document.getElementById('clear-cart');
        const checkoutBtn = document.getElementById('checkout-btn');
        const continueShoppingBtn = document.getElementById('continue-shopping');
        
        if (cartIcon) {
            cartIcon.addEventListener('click', openCartModal);
        }
        
        if (cartClose) {
            cartClose.addEventListener('click', closeCartModal);
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCartModal);
        }
        
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja limpar o carrinho?')) {
                    clearCart();
                }
            });
        }
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
        
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', closeCartModal);
        }
        
        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCartModal();
            }
        });
    };

    // Determina a categoria com base no nome do arquivo da URL
    const currentPage = window.location.pathname.split('/').pop();
    let category;

    if (currentPage === 'shorts.html') {
        category = 'shorts';
    } else if (currentPage === 'tenis.html') {
        category = 'tenis';
    } else if (currentPage === 'blusas.html') {
        category = 'blusas';
    } else {
        // Para index.html, não mostrar produtos
        category = null;
    }

    // Carrega e exibe os produtos da categoria correta apenas se não for a página inicial
    if (category && productGrid) {
        const productsToDisplay = products[category] || [];
        productsToDisplay.forEach(product => {
            productGrid.appendChild(createProductCard(product));
        });
    }

    // Configurar ações do header
    setupHeaderActions();

    // Inicializar UI
    updateCartUI();
});
