document.getElementById('form-cadastro').addEventListener('submit', function(e){
    e.preventDefault();

    let input_nome = document.getElementById("nome-cadastro");
    let input_data = document.getElementById("dt_nascimento-cadastro");
    let input_email = document.getElementById("email-cadastro");
    let input_senha = document.getElementById("senha-cadastro");
    let input_tipo = document.getElementById("tipo-usuario");

    if(!input_nome || !input_data || !input_email || !input_senha || !input_tipo){
        console.log("Inputs não encontrados")
        return;
    }

    console.log(input_email)

    let nome = input_nome.value;
    let data = input_data.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let tipo = input_tipo.value;

    fetch("http://localhost:1880/criar/usuario",{
        method:"POST",
        body:JSON.stringify({ nome,data,email,senha,tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }

    }).then((email)=>{
        alert('Cadastro realizado com sucesso! Agora você pode entrar.')
        window.location.href = '../login/login.html'; 
    })
    


})


