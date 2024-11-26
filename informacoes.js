async function obterDetalhesProduto(id) {
    try {
      const response = await fetch('https://tcc-japuiba.onrender.com/api/produtos');
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
        <div class="info">
        <img src="${produto.imagem}" alt="${produto.titulo}" class="detalhes-imagem">
         <div class="detalhes-secundarios">
        <h2>${produto.titulo}</h2>
        <p class="produto"><strong>Item:</strong> ${produto.item}</p>
        <p class="marca"><strong>Marca:</strong> ${produto.marca}</p>
          <p class="descricao"><strong>Descrição:</strong> ${produto.descr}</p>
          <button class="button2" onclick="window.history.back()">Veja mais</button>
           <button class="button1" onclick="window.history.back()">Voltar</button>
        </div>
        </div>
         </div>

    `;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id');
  
  if (produtoId) {
    obterDetalhesProduto(produtoId);
  } else {
    document.getElementById('detalhes-container').innerHTML = 'Produto não encontrado.';
  }
