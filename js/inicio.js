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
  
  const searchInput = document.getElementById('search');
  const itemsContainer = document.querySelector('.items');
  
  let produtos = [];
  
  itemsContainer.style.display = 'none';
  
  searchInput.addEventListener('focus', async () => {
    itemsContainer.style.display = 'block';
  
    if (produtos.length > 0) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
  
      produtos = await response.json();
  
      itemsContainer.innerHTML = '';
  
      produtos.forEach((produto) => {
        const item = document.createElement('li');
        item.className = 'item';
        item.innerHTML = `
            <div class="item-imagem">
              <img src="${produto.imagem}" alt="${produto.titulo}">
            </div>
            <div class="item-content">
             <a class="card-link" href="detalhes.html?id=${produto.id}">
              <h2 class="item-title">${produto.titulo}</h2>
              <p class="item-subtitle"><i class="bi bi-pencil"></i> ${produto.item}</p>
              <p class="item-description">${produto.descr}</p>
               </a>
            </div>
        `;
        itemsContainer.appendChild(item);
      });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#pesquisa')) {
      itemsContainer.style.display = 'none';
    }
  });
  
  searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value);
  
    const items = document.querySelectorAll('.items .item');
    items.forEach((item) => {
      const text = formatString(item.textContent);
      item.style.display = text.includes(value) ? 'flex' : 'none';
    });
  });
  
  function formatString(value) {
    return value.toLowerCase().trim();
  }
  