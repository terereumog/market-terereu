let produtos

window.onload = function () {
    var storedUser = localStorage.getItem("usuario");
    var user = JSON.parse(storedUser);

    var dataEntrada = new Date(user.dataEntrada);
    var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("perfil").innerText = dataFormatada;
    document.getElementById("user").innerText = user.name;
    document.getElementById("idPerfil").innerText = user.id;
};

document.addEventListener("DOMContentLoaded", function () {
    //busca dos produtos e armazenamento dos dados na variavel global
    fetch('../Dados/mock.json')
        .then((response) => response.json())
        .then((data) => {
            produtos = data
            // console.log(data)

            const produtosContainer = document.getElementById('produtos-container')
            produtos.forEach((produto, index) => {

                const card = document.createElement('div')
                card.className = 'card'
                card.style.width = '18rem'
                card.style.marginRight = '12px'
                card.style.marginBottom = '10px'

                const imagem = document.createElement('img')
                imagem.src = produto.imagem
                imagem.className = 'card-img-top'
                imagem.style.height = '10rem'
                imagem.style.width = 'fit-content'
                imagem.style.alignSelf = 'center'

                const cardBody = document.createElement('div')
                cardBody.className = 'card-body'

                const cardTitle = document.createElement('h5')
                cardTitle.className = 'card-title'
                cardTitle.textContent = produto.descricao

                const cardText = document.createElement('p')
                cardText.className = 'card-text'
                cardText.textContent = 'Preço: $' + produto.preco.toFixed(2)

                const btnAdicionarAoCarrinho = document.createElement('a')
                btnAdicionarAoCarrinho.href = '#'
                btnAdicionarAoCarrinho.className = 'btn btn-outline-dark btn-sm btn-adicionar-ao-carrinho'
                btnAdicionarAoCarrinho.textContent = 'Adicionar ao carrinho'
                btnAdicionarAoCarrinho.setAttribute('data-indice', index)

                //criando os pais e filhos segundo o bootstrap
                cardBody.appendChild(cardTitle)
                cardBody.appendChild(cardText)
                cardBody.appendChild(btnAdicionarAoCarrinho)

                card.appendChild(imagem)
                card.appendChild(cardBody)

                produtosContainer.appendChild(card)
            });
        }).catch((error) => console.error('Erro ao carregar dados', error))

        $('#produtos-container').on('click', '.btn-adicionar-ao-carrinho', function() {
            const indexDoProduto = $(this).data('indice')
            const produtoSelecionado = produtos[indexDoProduto]

            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
            carrinho.push(produtoSelecionado)
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            alert("Produto adicionado com sucesso")
        })

});

