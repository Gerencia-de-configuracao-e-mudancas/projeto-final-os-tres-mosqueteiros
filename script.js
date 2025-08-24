document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-list');
    
    // Estado do carrinho
    let cart = [];
    let favorites = [];

    // Dados dos produtos, organizados por categoria
    const products = {
        blusas: [
            { id: 'blusa1', name: 'Blusa de Verão Floral', price: 'R$ 69,90', image: 'https://placehold.co/400x400/FFD1DC/333333?text=Blusa+Floral', badge: 'Novo' },
            { id: 'blusa2', name: 'Blusa Casual Listrada', price: 'R$ 55,50', image: 'https://placehold.co/400x400/D3D3D3/333333?text=Blusa+Listrada', badge: 'Popular' },
            { id: 'blusa3', name: 'Blusa Básica de Malha', price: 'R$ 49,90', image: 'https://placehold.co/400x400/ADD8E6/333333?text=Blusa+Malha' },
            { id: 'blusa4', name: 'Blusa de Manga Longa', price: 'R$ 79,90', image: 'https://placehold.co/400x400/90EE90/333333?text=Blusa+Manga', badge: 'Tendência' },
            { id: 'blusa5', name: 'Blusa com Estampa Geométrica', price: 'R$ 85,00', image: 'https://placehold.co/400x400/FFB6C1/333333?text=Blusa+Geométrica', badge: 'Exclusivo' }
        ],
        shorts: [
            { id: 'short1', name: 'Short Jeans Casual', price: 'R$ 99,90', image: 'https://placehold.co/400x400/B0C4DE/333333?text=Shorts+Jeans', badge: 'Mais Vendido' },
            { id: 'short2', name: 'Short Esportivo de Linho', price: 'R$ 75,00', image: 'https://placehold.co/400x400/E6E6FA/333333?text=Shorts+Linho' },
            { id: 'short3', name: 'Short de Praia com Estampa', price: 'R$ 65,00', image: 'https://placehold.co/400x400/F08080/333333?text=Shorts+Praia', badge: 'Verão' },
            { id: 'short4', name: 'Short de Alfaiataria', price: 'R$ 110,00', image: 'https://placehold.co/400x400/DDA0DD/333333?text=Shorts+Alfaiataria', badge: 'Elegante' },
            { id: 'short5', name: 'Short Saia para Academia', price: 'R$ 89,90', image: 'https://placehold.co/400x400/A2D2FF/333333?text=Shorts+Saia', badge: 'Fitness' }
        ],
        tenis: [
            { id: 'tenis1', name: 'Tênis de Corrida Leve', price: 'R$ 250,00', image: 'https://placehold.co/400x400/B0E0E6/333333?text=Tênis+Corrida', badge: 'Performance' },
            { id: 'tenis2', name: 'Tênis Casual Branco', price: 'R$ 180,00', image: 'https://placehold.co/400x400/FFFFFF/333333?text=Tênis+Branco', badge: 'Clássico' },
            { id: 'tenis3', name: 'Tênis de Cano Alto Urbano', price: 'R$ 210,00', image: 'https://placehold.co/400x400/778899/333333?text=Tênis+Cano+Alto', badge: 'Street' },
            { id: 'tenis4', name: 'Tênis Esportivo Amortecedor', price: 'R$ 320,00', image: 'https://placehold.co/400x400/F0FFF0/333333?text=Tênis+Esportivo', badge: 'Premium' },
            { id: 'tenis5', name: 'Tênis de Couro Marrom', price: 'R$ 299,00', image: 'https://placehold.co/400x400/D2B48C/333333?text=Tênis+Couro', badge: 'Sofisticado' }
        ]
    };

    // Função para adicionar ao carrinho
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartUI();
        showNotification('Produto adicionado ao carrinho!');
    };

    // Função para alternar favorito
    const toggleFavorite = (productId) => {
        const index = favorites.indexOf(productId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            showNotification('Removido dos favoritos');
        } else {
            favorites.push(productId);
            showNotification('Adicionado aos favoritos!');
        }
        
        updateFavoritesUI();
    };

    // Função para atualizar UI do carrinho
    const updateCartUI = () => {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    };

    // Função para atualizar UI dos favoritos
    const updateFavoritesUI = () => {
        const favoriteCount = document.querySelector('.favorite-count');
        
        if (favoriteCount) {
            favoriteCount.textContent = favorites.length;
            favoriteCount.style.display = favorites.length > 0 ? 'block' : 'none';
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
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    };

    // Função para criar o HTML de um card de produto
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Badge HTML (se existir)
        const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        
        card.innerHTML = `
            <div class="shine-effect"></div>
            ${badgeHTML}
            <div class="favorite-icon ${favorites.includes(product.id) ? 'active' : ''}"></div>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
            <button class="add-to-cart-btn">Adicionar ao Carrinho</button>
        `;
        
        // Adicionar evento de clique para o ícone de favorito
        const favoriteIcon = card.querySelector('.favorite-icon');
        favoriteIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
            favoriteIcon.classList.toggle('active');
        });
        
        // Adicionar evento de clique para o botão do carrinho
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
        });
        
        return card;
    };

    // Determina a categoria com base no nome do arquivo da URL
    const currentPage = window.location.pathname.split('/').pop();
    let category;

    if (currentPage === 'shorts.html') {
        category = 'shorts';
    } else if (currentPage === 'tenis.html') {
        category = 'tenis';
    } else {
        category = 'blusas'; // Padrão para index.html
    }

    // Carrega e exibe os produtos da categoria correta
    const productsToDisplay = products[category] || [];
    productsToDisplay.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    // Inicializar UI
    updateCartUI();
    updateFavoritesUI();
});