async function obterDetalhesProduto(id) {
    try {
      const response = await fetch('http://localhost:3000/api/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do produto');
      }
      const produtos = await response.json();
      const produto = produtos.find(p => p.id === parseInt(id));
      
      if (produto) {
        mostrarDetalhesProduto(produto);
      } else {
        document.getElementById('detalhes-container').innerHTML = 'Produto não encontrado.';
      }
    } catch (error) {
      console.error('Erro:', error);
      document.getElementById('detalhes-container').innerHTML = 'Erro ao carregar o produto.';
    }
  }
  
  function mostrarDetalhesProduto(produto) {
    const detalhesContainer = document.getElementById('detalhes-container');
    detalhesContainer.innerHTML = `
      <div class="detalhes">
        <img src="${produto.imagem}" alt="${produto.titulo}" class="detalhes-imagem">
        <h2>${produto.titulo}</h2>
        <p><strong>Item:</strong> ${produto.item}</p>
        <p><strong>Marca:</strong> ${produto.marca}</p>
        <p><strong>Descrição:</strong> ${produto.descr}</p>
      </div>
      <button onclick="window.history.back()">Voltar</button>
    `;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id');
  
  if (produtoId) {
    obterDetalhesProduto(produtoId);
  } else {
    document.getElementById('detalhes-container').innerHTML = 'Produto não encontrado.';
  }
  