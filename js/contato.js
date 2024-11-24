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
