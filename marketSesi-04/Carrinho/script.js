$(document).ready(function(){
    // recupera o carrinho do localstorage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    // atribuir a uma variavel a lista do html
    const listaElement = $('#lista')

    // atribuir a uma variavel o total referente no html
    const totalElement = $('#total')

    // função para exibir este carrinho

    function exibirCarrinho(){
        // limpa o conteudo atual da lista no cache do sistema
        listaElement.empty()

        // variavel para calcular o total
        let totalPreco = 0

        $.each(carrinho, function(index, item){
            // criar um elemento de lista para cada item no for
            const listItem = $("<li>").text(`${item.descricao} - Preço: $${item.preco.toFixed(2)}`)

            //cria um botao de remover o item com X
            const removeButton = $('<button>').text('❌').css('margin-left', '10px').click(function(){
                removerItemDoCarrinho(index)
            })

            listItem.append(removeButton)
            listaElement.append(listItem)

            // adiciona o preco do item ao total
            totalPreco += item.preco
        })

        // exibe o total em preco no elemento totalElement
        totalElement.text(`Total: $${totalPreco.toFixed(2)}`)
    }

        function removerItemDoCarrinho(index){
            carrinho.splice(index, 1)
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            exibirCarrinho()
        }

        exibirCarrinho()
})

function gerarPedido(){
    const listaElement = document.getElementById('lista')
    const totalElement = document.getElementById('total')

    const listaClone = listaElement.cloneNode(true)

    $(listaClone).find('button').remove()

    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML

    const conteudoHTML = `
        <html>
            <head>
                <meta charset='UTF-8'/>
            </head>
            <body>
                <h1>Pedido Confirmado</h1>
                <h3>Agradecemos sua compra conosco e sua preferência</h3>
                <br>
                ${listaHtml}
                <br>
                <br>
                ${totalHtml}
            </body>
        </html>
    `;

    const blob = new Blob([conteudoHTML], {type: 'application/msword'})
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = 'pedido.doc'
    link.click()

    document.getElementById('pedido').style.display = 'block'
}

function successClose(){
    document.getElementById('pedido').style.display = 'none'
}