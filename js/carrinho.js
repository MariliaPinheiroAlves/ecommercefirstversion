const produtosCarrinho = document.getElementById('produtos');
const subtotalElement = document.getElementById('precoFinal');

let carrinho = [];

const atualizarSubtotal = () => {
    const subtotal = carrinho.reduce((total, item) => {
        return total + item.quantity * item.product.price;
    }, 0);
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
};

const renderizarCarrinho = () => {
    produtosCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto';

        const img = document.createElement('img');
        img.src = item.product.image;
        img.alt = item.product.title;

        const detalhesProdutoDiv = document.createElement('div');
        detalhesProdutoDiv.className = 'detalhes-produto';

        const titulo = document.createElement('h3');
        titulo.className = 'titulo-produto';
        titulo.textContent = item.product.title;

        const preco = document.createElement('p');
        preco.className = 'preco-produto';
        preco.textContent = `$${item.product.price.toFixed(2)}`;

        detalhesProdutoDiv.appendChild(titulo);
        detalhesProdutoDiv.appendChild(preco);

        const detalhesCompraDiv = document.createElement('div');
        detalhesCompraDiv.className = 'detalhes-compra';

        const quantidadeDiv = document.createElement('div');
        quantidadeDiv.className = 'quantidade';

        const btnMenos = document.createElement('button');
        btnMenos.textContent = '-';
        btnMenos.onclick = () => {
            if (item.quantity > 1) {
                item.quantity--;
                renderizarCarrinho();
                atualizarSubtotal();
            }
        };

        const quantidade = document.createElement('p');
        quantidade.id = 'quantidade';
        quantidade.textContent = `0${item.quantity} un.`;

        const btnMais = document.createElement('button');
        btnMais.textContent = '+';
        btnMais.onclick = () => {
            item.quantity++;
            renderizarCarrinho();
            atualizarSubtotal();
        };

        const lixeira = document.createElement('i');
        lixeira.className = 'fas fa-trash';
        lixeira.onclick = () => {
            carrinho = carrinho.filter(carrinhoItem => carrinhoItem !== item);
            renderizarCarrinho();
            atualizarSubtotal();
        };

        quantidadeDiv.appendChild(btnMenos);
        quantidadeDiv.appendChild(quantidade);
        quantidadeDiv.appendChild(btnMais);
        detalhesCompraDiv.appendChild(quantidadeDiv);
        detalhesCompraDiv.appendChild(lixeira);

        const produtoInfoDiv = document.createElement('div');
        produtoInfoDiv.className = 'infos-do-produto';
        produtoInfoDiv.appendChild(detalhesProdutoDiv);
        produtoInfoDiv.appendChild(detalhesCompraDiv);

        produtoDiv.appendChild(img);
        produtoDiv.appendChild(produtoInfoDiv);

        produtosCarrinho.appendChild(produtoDiv);
    });
};

const loadCarrinho = async () => {
    try {
        //por enquanto o acesso ao carrinho não está dinâmico
        const response = await fetch('https://fakestoreapi.com/carts/1');
        const produtos = await response.json();

        const productRequests = produtos.products.map(async (item) => {
            const productResponse = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
            const product = await productResponse.json();
            return { ...item, product };
        });

        carrinho = await Promise.all(productRequests);

        renderizarCarrinho();
        atualizarSubtotal();
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
    }
};

loadCarrinho();