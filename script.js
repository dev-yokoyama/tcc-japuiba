async function listarProdutos() {
  try {
    const response = await fetch('https://tcc-japuiba.onrender.com/api/produtos');
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const produtos = await response.json();
    return produtos;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

async function mostrarProdutos() {
  const todosProdutos = await listarProdutos();
  const itensPorPagina = 12;
  let paginaAtual = 1;
  let produtosFiltrados = [...todosProdutos]; 

  function renderizarProdutos(produtosParaExibir) {
    const cardLista = document.getElementById('card-lista');
    cardLista.innerHTML = '';

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const produtosPagina = produtosParaExibir.slice(inicio, fim);

    produtosPagina.forEach(produto => {
      const li = document.createElement('li');
      li.className = 'card-item';
      li.innerHTML = `
        <a class="card-link" href="detalhes.html?id=${produto.id}">
          <img class="card-imagem" src="${produto.imagem}" alt="${produto.titulo}">
          <p class="item">${produto.item}</p>
          <h2 class="card-titulo">${produto.titulo}</h2>
          <button class="card-button">Veja mais</button>
        </a>
      `;
      cardLista.appendChild(li);
    });

    atualizarBotoesPaginacao(produtosParaExibir);
  }

  function atualizarBotoesPaginacao(produtosParaExibir) {
    const paginacaoContainer = document.getElementById('paginacao');
    paginacaoContainer.innerHTML = '';
    const totalPaginas = Math.ceil(produtosParaExibir.length / itensPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
      const botaoPagina = document.createElement('button');
      botaoPagina.className = 'page-button';
      botaoPagina.textContent = i;
      botaoPagina.addEventListener('click', () => {
        paginaAtual = i;
        renderizarProdutos(produtosParaExibir);
      });

      if (i === paginaAtual) {
        botaoPagina.classList.add('active');
      }

      paginacaoContainer.appendChild(botaoPagina);
    }
  }

  function exibirMensagem() {
    const mensagem = document.getElementById('mensagem');
    mensagem.style.display = 'block';
  }

  function filtrarProdutos(itemSelecionado) {
    if (itemSelecionado === 'Todos') {
      exibirMensagem();  // Exibe a mensagem ao selecionar "Todos"
      produtosFiltrados = [...todosProdutos];  // Mostra todos os produtos
    } else {
      produtosFiltrados = todosProdutos.filter(produto => produto.item === itemSelecionado);
    }

    paginaAtual = 1; // Reseta para a primeira página ao filtrar
    renderizarProdutos(produtosFiltrados);
  }

  document.querySelectorAll('.filtro').forEach(botao => {
    botao.addEventListener('click', (event) => {
      const itemSelecionado = event.target.getAttribute('data-categoria');
      filtrarProdutos(itemSelecionado);
    });
  });

  renderizarProdutos(produtosFiltrados); // Exibe os produtos ao carregar
}

mostrarProdutos();
