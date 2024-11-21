async function listarProdutos() {
    try {
      const response = await fetch('http://localhost:3000/api/produtos');
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
    const produtos = await listarProdutos();
    const itensPorPagina = 12;
    let paginaAtual = 1;
  
    function renderizarProdutos() {
      const cardLista = document.getElementById('card-lista');
      cardLista.innerHTML = '';
  
      const inicio = (paginaAtual - 1) * itensPorPagina;
      const fim = inicio + itensPorPagina;
      const produtosPagina = produtos.slice(inicio, fim);
  
      produtosPagina.forEach(produto => {
        const li = document.createElement('li');
        li.className = 'card-item';
        li.innerHTML = `
          <a class="card-link" href="detalhes.html?id=${produto.id}">
            <img class="card-imagem" src="${produto.imagem}" alt="${produto.titulo}">
            <p class="item">${produto.item}</p>
            <h2 class="card-titulo">${produto.titulo}</h2>
            <button class="card-button"><i class="bi bi-arrow-right"></i></button>
          </a>
        `;
        cardLista.appendChild(li);
      });
  
      atualizarBotoesPaginacao();
    }
  
    function atualizarBotoesPaginacao() {
      const paginacaoContainer = document.getElementById('paginacao');
      paginacaoContainer.innerHTML = '';
      const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  
      for (let i = 1; i <= totalPaginas; i++) {
        const botaoPagina = document.createElement('button');
        botaoPagina.className = 'page-button';
        botaoPagina.textContent = i;
        botaoPagina.addEventListener('click', () => {
          paginaAtual = i;
          renderizarProdutos();
        });
  
        if (i === paginaAtual) {
          botaoPagina.classList.add('active');
        }
  
        paginacaoContainer.appendChild(botaoPagina);
      }
    }
  
    renderizarProdutos();
  }
  
  mostrarProdutos();