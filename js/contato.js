const searchInput = document.getElementById('search');
const itemsContainer = document.querySelector('.items');

let produtos = [];

itemsContainer.style.display = 'none';

searchInput.addEventListener('focus', async () => {
  itemsContainer.style.display = 'block';

  if (produtos.length > 0) return;

  try {
    const response = await fetch('https://tcc-japuiba.onrender.com/api/produtos');
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


document.getElementById('form-contato').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const resposta = document.getElementById('resposta-formulario');
    resposta.textContent = `Obrigado pela mensagem, ${nome}! Entrarei em contato pelo email ${email}.`;
    resposta.style.color = 'black';

    this.reset();
});
function toggleMenu() {
  const navburguer = document.querySelector('.navburguer');
  const hamburguer = document.querySelector('.hamburguer');

  navburguer.classList.toggle('active');
  hamburguer.classList.toggle('open');
}

