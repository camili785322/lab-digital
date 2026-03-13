
// Cria usuario 

document.getElementById('form-usuario').addEventListener('submit', async function(e){
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

   
    let dados = { nome, email, senha, dt_nascimento, tipo };
    let url = "http://localhost:1880/criar/usuario";
    let metodo = "POST";

     //função para alterar
    if (usuarioEmEdicao) {
        url = "http://localhost:1880/alterar/usuario";
        metodo = "PUT"; 
        dados.idOriginal = usuarioEmEdicao; 
    }

    try {
        let resposta = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            alert(usuarioEmEdicao ? 'Usuário atualizado!' : 'Cadastro realizado com sucesso!');
            
            this.reset();
            usuarioEmEdicao = null;
            if (document.getElementById("btn-finalizar")) {
                document.getElementById("btn-finalizar").innerText = "Finalizar Cadastro";
            }
            
            //função para listar
            listarUsuario();
        }
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
});

   

// Lista Usuario 

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

    user.dt_nascimento = new Date(user.dt_nascimento);
    
    linha.innerHTML = `
                <td>${user.nome_completo || ""}</td>
                <td>${user.email || ""}</td>
                <td>${user.dt_nascimento.toLocaleDateString('pt-br') || ""}</td>
                <td>${user.tipo || ""}</td>
                <td>
                    <div class="acoes-container">
                        <button class="btn-acao btn-alterar-tab" onclick='prepararEdicao(${JSON.stringify(user)})'>
                            Alterar
                        </button>
                        <button class="btn-acao btn-excluir-tab" onclick="excluirUsuario('${user.email}')">
                            Excluir
                        </button>
                    </div>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
    }
}

// Altera Usuario 

function prepararEdicao(user) {
    document.getElementById("nome-usuario").value = user.nome_completo;
    document.getElementById("email-usuario").value = user.email;

    const campoSenha = document.getElementById("senha-usuario");
    if (campoSenha) {
        campoSenha.value = user.senha; 
        campoSenha.disabled = true; 
    }

    let date = user.dt_nascimento.split('T');
    document.getElementById("dt_nascimento-usuario").value = date[0];
    document.getElementById("tipo-usuario").value = user.tipo;

    usuarioEmEdicao = user.email; 

    document.getElementById("btn-finalizar").innerText = "Salvar Alterações";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetarFormulario() {
    document.getElementById('form-usuario').reset();
    
    
    const campoSenha = document.getElementById("senha-usuario");
    if (campoSenha) {
        campoSenha.disabled = false; 
    }

    usuarioEmEdicao = null;
    document.getElementById("btn-finalizar").innerText = "Finalizar Cadastro";
}

function finalizarCadastroOuEdicao() {
    document.getElementById("senha-usuario").disabled = false;
    
}

// Exclui Usuario 

async function excluirUsuario(emailUsuario) {
    console.log(emailUsuario)
    if (!confirm(`Tem certeza que deseja excluir o usuário com e-mail: ${emailUsuario}?`)) {
        return;
    }

    try {
        const response = await fetch("http://localhost:1880/remove/usuario", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailUsuario })
        });

        if (response.ok) {
            alert("Usuário excluído com sucesso!");
            //tabela atualiza
            listarUsuario(); 
        } else {
            alert("Erro ao excluir usuário no servidor.");
        }
    } catch (error) {
        console.error("Erro na requisição de exclusão:", error);
    }
}







