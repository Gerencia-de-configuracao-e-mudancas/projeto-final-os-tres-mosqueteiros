document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-list');

    // Dados dos produtos, organizados por categoria
    const products = {
        blusas: [
            { name: 'Blusa de Verão Floral', price: 'R$ 69,90', image: 'https://placehold.co/400x400/FFD1DC/333333?text=Blusa+Floral' },
            { name: 'Blusa Casual Listrada', price: 'R$ 55,50', image: 'https://placehold.co/400x400/D3D3D3/333333?text=Blusa+Listrada' },
            { name: 'Blusa Básica de Malha', price: 'R$ 49,90', image: 'https://placehold.co/400x400/ADD8E6/333333?text=Blusa+Malha' },
            { name: 'Blusa de Manga Longa', price: 'R$ 79,90', image: 'https://placehold.co/400x400/90EE90/333333?text=Blusa+Manga' },
            { name: 'Blusa com Estampa Geométrica', price: 'R$ 85,00', image: 'https://placehold.co/400x400/FFB6C1/333333?text=Blusa+Geométrica' }
        ],
        shorts: [
            { name: 'Short Jeans Casual', price: 'R$ 99,90', image: 'https://placehold.co/400x400/B0C4DE/333333?text=Shorts+Jeans' },
            { name: 'Short Esportivo de Linho', price: 'R$ 75,00', image: 'https://placehold.co/400x400/E6E6FA/333333?text=Shorts+Linho' },
            { name: 'Short de Praia com Estampa', price: 'R$ 65,00', image: 'https://placehold.co/400x400/F08080/333333?text=Shorts+Praia' },
            { name: 'Short de Alfaiataria', price: 'R$ 110,00', image: 'https://placehold.co/400x400/DDA0DD/333333?text=Shorts+Alfaiataria' },
            { name: 'Short Saia para Academia', price: 'R$ 89,90', image: 'https://placehold.co/400x400/A2D2FF/333333?text=Shorts+Saia' }
        ],
        tenis: [
            { name: 'Tênis de Corrida Leve', price: 'R$ 250,00', image: 'https://placehold.co/400x400/B0E0E6/333333?text=Tênis+Corrida' },
            { name: 'Tênis Casual Branco', price: 'R$ 180,00', image: 'https://placehold.co/400x400/FFFFFF/333333?text=Tênis+Branco' },
            { name: 'Tênis de Cano Alto Urbano', price: 'R$ 210,00', image: 'https://placehold.co/400x400/778899/333333?text=Tênis+Cano+Alto' },
            { name: 'Tênis Esportivo Amortecedor', price: 'R$ 320,00', image: 'https://placehold.co/400x400/F0FFF0/333333?text=Tênis+Esportivo' },
            { name: 'Tênis de Couro Marrom', price: 'R$ 299,00', image: 'https://placehold.co/400x400/D2B48C/333333?text=Tênis+Couro' }
        ]
    };

    // Função para criar o HTML de um card de produto
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        `;
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
});