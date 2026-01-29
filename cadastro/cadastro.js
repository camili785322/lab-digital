document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };


    localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

    alert('Cadastro realizado com sucesso! Agora você pode entrar.');
    
   
    window.location.href = '../login/login.html';
});stroForm.addEventListener('submit', handleCadastro);

