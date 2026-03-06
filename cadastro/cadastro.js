document.getElementById('form-cadastro').addEventListener('submit', function(e){
    e.preventDefault();

    // Capturando os elementos conforme os IDs exatos do seu HTML
    let input_nome = document.getElementById("nome-cadastro");
    let input_data = document.getElementById("dt_nascimento-cadastro");
    let input_email = document.getElementById("email-cadastro");
    let input_senha = document.getElementById("senha-cadastro");
    let input_tipo = document.getElementById("tipo-usuario");

    // Verificação se todos os campos existem
    if(!input_nome || !input_data || !input_email || !input_senha || !input_tipo){
        console.log("Erro: Algum campo do formulário não foi encontrado.");
        return;
    }

    // Preparando o objeto para o Node-RED
    let dados = { 
        nome: input_nome.value,
        dt_nascimento: input_data.value, // Nome que o seu SQL espera
        email: input_email.value,
        senha: input_senha.value,
        tipo: input_tipo.value
    };

    // O comando fetch atualizado com Headers (ESSENCIAL)
    fetch("http://localhost:1880/criar/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Avisa ao Node-RED que é um JSON
        },
        body: JSON.stringify(dados)
    })
    .then((resposta) => {
        if(resposta.ok){
            alert('Cadastro realizado com sucesso! Agora você pode entrar.');
            window.location.href = '../login/login.html'; 
        } else {
            alert('O servidor recebeu os dados, mas houve um erro no processamento.');
        }
    })
    .catch((erro) => {
        console.error("Erro na requisição:", erro);
        alert('Não foi possível conectar ao Node-RED. Verifique se ele está ligado.');
    });
});