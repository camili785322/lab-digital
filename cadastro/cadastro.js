function handleCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
    const messageElement = document.getElementById('cadastro-message');

    let usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    
    if (usuarios.find(u => u.email === email)) {
        messageElement.textContent = 'Erro: Este email já está cadastrado.';
        messageElement.style.color = 'red';
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));

    messageElement.textContent = 'Sucesso! Redirecionando...';
    messageElement.style.color = 'green';
    setTimeout(() => { window.location.href = 'login.html'; }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) cadastroForm.addEventListener('submit', handleCadastro);
});
