document.getElementById('form-usuario').addEventListener('submit', function(e){
    e.preventDefault();

    let input_nome = document.getElementById("nome-usuario");
    let input_email = document.getElementById("email-usuario");
    let input_senha = document.getElementById("senha-usuario");
    let input_dt_nascimento = document.getElementById("dt_nascimento-usuario");
    let input_tipo = document.getElementById("tipo-usuario");


    if(!input_nome || !input_email || !input_senha || !input_dt_nascimento || !input_tipo){
        console.log("Inputs não encontrados")
        return;
    }

    console.log(input_email)

    let nome = input_nome.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let dt_nascimento = input_dt_nascimento.value;
    let tipo = input_tipo.value;

    fetch("http://localhost:1880/criar/usuario",{
        method:"POST",
        body:JSON.stringify({ nome,email,senha,dt_nascimento,tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }

    }).then((email)=>{
        alert('Cadastro realizado com sucesso!')
        listarUsuario();

});
 
    })


window.onload = async () => {
    await listarUsuario(); 
};

async function listarUsuario() {
    try {
       
        let response = await fetch("http://localhost:1880/listar/usuario");

        if (!response.ok) {
            alert("Erro ao buscar dados do servidor");
            return;
        }

        let usuarios = await response.json();
        const corpoTabela = document.querySelector("table tbody");
        
        corpoTabela.innerHTML = ""; 

        usuarios.forEach(user => {
            const linha = document.createElement("tr");
            
            linha.innerHTML = `
                <td>${user.nome_completo || ""}</td>
                <td>${user.email || ""}</td>
                <td>${user.dt_nascimento || ""}</td>
                <td>${user.tipo || ""}</td>
            `;
            corpoTabela.appendChild(linha);
        });
        
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}


/*document.getElementById('form-usuario').addEventListener('submit', function(e){
    e.preventDefault();

     let input_nome = document.getElementById("nome-usuario");
    let input_email = document.getElementById("email-usuario");
    let input_senha = document.getElementById("senha-usuario");
    let input_dt_nascimento = document.getElementById("dt_nascimento-usuario");
    let input_tipo = document.getElementById("tipo-usuario");

     if(!input_nome || !input_email || !input_senha || !input_dt_nascimento || !input_tipo){
        console.log("Inputs não encontrados")
        return;
    }

    console.log(input_email)

    let nome = input_nome.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let dt_nascimento = input_dt_nascimento.value;
    let tipo = input_tipo.value;

    fetch("http://localhost:1880/alterar/usuario",{
        method:"PUT",
        body:JSON.stringify({ nome,dt_nascimento,email,senha,tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }

    }).then((email)=>{
        alert('Usuario alterado!')
    })
})

document.getElementById('form-usuario').addEventListener('submit', function(e){
    e.preventDefault();

     let input_nome = document.getElementById("nome-usuario");
    let input_email = document.getElementById("email-usuario");
    let input_senha = document.getElementById("senha-usuario");
    let input_dt_nascimento = document.getElementById("dt_nascimento-usuario");
    let input_tipo = document.getElementById("tipo-usuario");

     if(!input_nome || !input_email || !input_senha || !input_dt_nascimento || !input_tipo){
        console.log("Inputs não encontrados")
        return;
    }

    console.log(input_email)

    let nome = input_nome.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let dt_nascimento = input_dt_nascimento.value;
    let tipo = input_tipo.value;

   fetch("http://localhost:1880/remove/usuario",{
        method:"DELETE",
        body:JSON.stringify({ nome,dt_nascimento,email,senha,tipo})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }

    }).then((email)=>{
        alert('Usuario Excluido!')
    })
})*/






