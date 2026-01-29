//document.getElementById('form-login').addEventListener('submit',
    
//     function(e) {
//     e.preventDefault();

//     const emailDigitado = document.getElementById('email').value;
//     const senhaDigitada = document.getElementById('senha').value;

   
//     const dadosSalvos = localStorage.getItem('usuarioCadastrado');

//     if (dadosSalvos) {
//         const usuario = JSON.parse(dadosSalvos);

    
//         if (emailDigitado === usuario.email && senhaDigitada === usuario.senha) {
//             alert('Acesso permitido! Bem-vindo(a), ' + usuario.nome);
//             window.location.href = '../index/index.html'; 
//         } else {
//             alert('E-mail ou senha incorretos. Tente novamente.');
//         }
//     } else {
//         alert('Nenhum cadastro encontrado. Por favor, crie uma conta primeiro.');
//         window.location.href = 'cadastro.html';
//     }

// });

function logar(e){
    e.preventDefault();

    let input_usuario = document.getElementById("email");
    let input_senha = document.getElementById("senha");

    if(!input_usuario || !input_senha){
        return;
    }

    console.log(input_usuario)

    let usuario = input_usuario.value;
    let senha = input_senha.value;

    fetch("http://localhost:1880/autenticacao/autenticar",{
        method:"POST",
        body:JSON.stringify({usuario,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then((usuario)=>{
        window.location.href = '../index/index.html'; 
    })


}