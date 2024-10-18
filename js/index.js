const cardDetalhes = document.getElementById('cardDetalhes');
const fecharCard = document.getElementById('fecharCard');
const imgDetalhe = cardDetalhes.querySelector('img');
const tituloDetalhe = cardDetalhes.querySelector('.titulo-produto');
const descricaoDetalhe = cardDetalhes.querySelector('.descricao-produto');
const categoriaDetalhe = cardDetalhes.querySelector('.categoria-produto');
const precoDetalhe = cardDetalhes.querySelector('.preco-produto');

const loadProdutos = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const produtos = await response.json();

        const container = document.getElementById('produtos');
        // container.innerHTML = '';

        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.className = 'produto';

            const icon = document.createElement('i');
            icon.className = 'fa fa-search';
            icon.onclick = () => exibirDetalhe(produto);

            const infosDiv = document.createElement('div');
            infosDiv.className = 'infos';

            const img = document.createElement('img');
            img.src = produto.image;
            img.alt = produto.title;

            const titulo = document.createElement('h3');
            titulo.className = 'titulo-produto';
            titulo.textContent = produto.title;

            const preco = document.createElement('p');
            preco.className = 'preco-produto';
            preco.textContent = `$${produto.price.toFixed(2)}`;

            infosDiv.appendChild(img);
            infosDiv.appendChild(titulo);
            infosDiv.appendChild(preco);
            produtoDiv.appendChild(icon);
            produtoDiv.appendChild(infosDiv);
            container.appendChild(produtoDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
};

const exibirDetalhe = (produto) => {
    imgDetalhe.src = produto.image;
    imgDetalhe.alt = produto.title;
    tituloDetalhe.textContent = produto.title;
    descricaoDetalhe.textContent = produto.description;
    categoriaDetalhe.textContent = produto.category;
    precoDetalhe.textContent = `$${produto.price.toFixed(2)}`;
    cardDetalhes.classList.remove('hidden');
}

const fecharCardDetalhe = () => {
    cardDetalhes.classList.add('hidden');
};

fecharCard.onclick = fecharCardDetalhe;
loadProdutos();
