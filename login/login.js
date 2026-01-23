
function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value;
    const senhaInput = document.getElementById('senha').value;
    const messageElement = document.getElementById('login-message'); 
    
    const salvos = JSON.parse(localStorage.getItem('listaUsuarios')) || USUARIOS_PADRAO;
    const usuario = salvos.find(u => u.email === emailInput && u.senha === senhaInput);

    if (usuario) {
        localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
        window.location.href = '../index/index.html'; 
    } else {
        if (messageElement) {
            messageElement.textContent = 'Email ou senha incorretos.';
            messageElement.style.color = 'red';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});