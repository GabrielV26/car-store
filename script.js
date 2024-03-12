let carrinho = [];
let total = 0;

function adicionarAoCarrinho(modelo, preco) {
    carrinho.push({ modelo, preco });
    total += preco;

    // Chame a função exibirItensCarrinho para mostrar os itens do carrinho
    exibirItensCarrinho();

    // Atualize o carrinho
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function exibirItensCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    carrinhoLista.innerHTML = '';  // Limpa a lista para evitar duplicatas

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.modelo} - R$ ${item.preco.toFixed(2)}`;
        carrinhoLista.appendChild(li);
    });

    // Exiba o carrinho ao adicionar um item
    carrinhoVisivel = true;
    const carrinhoElement = document.querySelector('.carrinho');
    carrinhoElement.style.display = 'block';
}

let carrinhoVisivel = false;

function toggleCart() {
    carrinhoVisivel = !carrinhoVisivel;

    // Atualize o carrinho quando ele for exibido/ocultado
    if (carrinhoVisivel) {
        exibirItensCarrinho();
    }

    const carrinhoElement = document.querySelector('.carrinho');
    carrinhoElement.style.display = carrinhoVisivel ? 'block' : 'none';
}

// ... (seu código JavaScript existente) ...

document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const carrinho = document.getElementById('carrinho');

    // Adicione um evento de clique ao ícone do carrinho
    cartIcon.addEventListener('click', function() {
        carrinhoVisivel = !carrinhoVisivel;
        atualizarCarrinho();

        carrinho.style.display = carrinhoVisivel ? 'block' : 'none';
    });

    // Adicione um evento de clique ao botão "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll('.car button');
    botoesAdicionar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const modelo = botao.parentElement.querySelector('h2').textContent;
            const preco = parseFloat(botao.parentElement.querySelector('p:last-child').textContent.split('R$ ')[1].replace(',', ''));
            adicionarAoCarrinho(modelo, preco);
        });
    });
});

// ... (seu código JavaScript existente) ...

