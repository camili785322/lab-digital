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

    let input_email = document.getElementById("email");
    let input_senha = document.getElementById("senha");

    if(!input_email|| !input_senha){
        return;
    }

    console.log(input_email)

    let email = input_email.value;
    let senha = input_senha.value;

    fetch("http://localhost:1880/autenticacao/autenticar",{
        method:"GET",
        body:JSON.stringify({email,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then((email)=>{
        window.location.href = '../index/index.html'; 
    })


}