document.getElementById('form-cadastro').addEventListener('submit', function(e){
    e.preventDefault();

    let input_nome = document.getElementById("nome-cadastro");
    let input_email = document.getElementById("email-cadastro");
    let input_senha = document.getElementById("senha-cadastro");

    if(!input_nome || !input_email || !input_senha ){
        console.log("Inputs não encontrados")
        return;
    }

    console.log(input_email)

    let nome = input_nome.value;
    let email = input_email.value;
    let senha = input_senha.value;

    fetch("http://localhost:1880/criar/usuario",{
        method:"POST",
        body:JSON.stringify({ nome,email,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }

    }).then((email)=>{
        alert('Cadastro realizado com sucesso!')
 
    })

})



document.getElementById('form-cadastro').addEventListener('submit', function(e){
    e.preventDefault();

    let input_nome = document.getElementById("Nome");
    let input_email = document.getElementById("E-mail");


    if(!input_nome || !input_email ){
        console.log("Inputs não encontrados")
        return;
    }

    console.log(input_email)

    let nome = input_nome.value;
    let email = input_email.value;

    fetch("http://localhost:1880/listar/usuario",{
        method:"POST",
        body:JSON.stringify({ nome,data,email,senha,tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }

    }).then((email)=>{
        alert('Cadastro realizado com sucesso!')
    })
})

function removerUsuario(idUsuario) {
    if (confirm("Deseja realmente excluir este usuário?")) {
        fetch("http://localhost:1880/remove/usuario", {
            method: "DELETE",
            body: JSON.stringify({ id: idUsuario }) 
        })
        .then((resposta) => {
            if (resposta.ok) {
                alert('Cadastro excluído com sucesso!');
                carregarUsuariosNaTabela(); 
            }
        })
    
    }
}


