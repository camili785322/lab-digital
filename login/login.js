
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
        method:"POST",
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