let carrinho = [];
let total = 0;

function adicionarAoCarrinho(modelo, preco) {
    carrinho.push({ modelo, preco });
    total += preco;

    // Atualiza o número de itens no carrinho
    atualizarNumeroItensCarrinho();

    // Chame a função exibirItensCarrinho para mostrar os itens do carrinho
    exibirItensCarrinho();

    // Atualize o carrinho
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    // Verifique se o índice é válido
    if (index >= 0 && index < carrinho.length) {
        // Remova o item do carrinho pelo índice
        const removedItem = carrinho.splice(index, 1)[0];
        // Subtraia o preço do item removido do total
        total -= removedItem.preco;
        // Atualize o carrinho na interface do usuário
        exibirItensCarrinho();
        // Atualize o número de itens no carrinho
        atualizarNumeroItensCarrinho();
        // Atualize o total na interface do usuário
        atualizarCarrinho();
    }
}

function atualizarNumeroItensCarrinho() {
    const countElement = document.getElementById('cart-item-count');
    countElement.textContent = carrinho.length.toString();

    // Verifica se o carrinho está vazio e controla a visibilidade do contador
    if (carrinho.length > 0) {
        countElement.style.display = 'inline-block'; // Mostra o contador
    } else {
        countElement.style.display = 'none'; // Oculta o contador
    }
}

let carrinhoVisivel = false;

function toggleCart() {
    carrinhoVisivel = !carrinhoVisivel;

    // Atualize o carrinho quando ele for exibido/ocultado
    if (carrinhoVisivel) {
        exibirItensCarrinho();
    }

    const carrinhoElement = document.querySelector('.carrinho');
    const cartIcon = document.getElementById('cart-icon');

    if (carrinhoVisivel) {
        // Se o carrinho estiver visível, posicione-o abaixo do ícone do carrinho
        const iconRect = cartIcon.getBoundingClientRect();
        carrinhoElement.style.top = `${iconRect.bottom}px`;
        carrinhoElement.style.left = `${iconRect.left}px`;
        carrinhoElement.style.display = 'flex';
    } else {
        // Se o carrinho estiver oculto, simplesmente esconda-o
        carrinhoElement.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Oculta o botão de finalizar compra quando a página é carregada
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    finalizarCompraBtn.style.display = 'none';

    const cartIcon = document.getElementById('cart-icon');
    const carrinho = document.getElementById('carrinho');

    // Adicione um evento de clique ao ícone do carrinho
    cartIcon.addEventListener('click', function() {
        carrinhoVisivel = !carrinhoVisivel;
        atualizarCarrinho();

        carrinho.style.display = carrinhoVisivel ? 'flex' : 'none';
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

function exibirItensCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    carrinhoLista.innerHTML = '';  // Limpa a lista para evitar duplicatas

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.modelo} - R$ ${item.preco.toFixed(2)}`;

        // Adiciona um botão de remover para cada item na lista
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'X';
        btnRemover.classList.add('btn-remover');
        btnRemover.addEventListener('click', () => removerDoCarrinho(index));
        li.appendChild(btnRemover);

        carrinhoLista.appendChild(li);
    });

    // Verifique se o carrinho está vazio e mostre ou oculte o botão de finalizar compra
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (carrinho.length > 0) {
        finalizarCompraBtn.style.display = 'block';
    } else {
        finalizarCompraBtn.style.display = 'none';
    }

    // Atualize o número de itens no carrinho
    atualizarNumeroItensCarrinho();
}

function atualizarCarrinho() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}
