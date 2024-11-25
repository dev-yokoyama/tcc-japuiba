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
    
      const itensPorPagina = 4;
    
      function embaralharProdutos(produtos) {
        return produtos.sort(() => Math.random() - 0.5);
      }
    
      function renderizarProdutos() {
        const cardLista = document.getElementById('card-lista');
        cardLista.innerHTML = '';
    
        const produtosSelecionados = embaralharProdutos(produtos).slice(0, itensPorPagina);
    
        produtosSelecionados.forEach(produto => {
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
      }
    
      renderizarProdutos();
    }
    
    mostrarProdutos();
  
