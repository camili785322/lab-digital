//guardam a memoria do meu script 
let progressoAtivo = 0;
let dadosPedido = { 
    cor: 'Azul',
    velocidade: 0      
};

// lista de atalhos 
const dom = {
    revCor: document.getElementById('rev-cor'),    
    revVel: document.getElementById('rev-vel'),    
    slider: document.getElementById('range-vel'),  
    valorRpm: document.getElementById('valor-range'),
    barra: document.getElementById('barra-interna'),
    porcento: document.getElementById('porcento'),
    msg: document.getElementById('msg-progresso')
};


//controlam a parte visual e a navegação da sua interface
function abrirModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}

function mudarPasso(passo) {
    document.querySelectorAll('.step-p').forEach(s => {
        s.classList.remove('active');
        if (parseInt(s.dataset.step) <= passo) s.classList.add('active');
    });

    document.querySelectorAll('.step-content-p').forEach(c => c.classList.remove('active'));
    document.getElementById(`step-${passo}`).classList.add('active');
    
    //garante que mudei de aba 
    atualizarResumo();
}


//captura as escolhas do usuário
document.querySelectorAll('.option-card-p').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.option-card-p').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');

        dadosPedido.cor = this.dataset.value;
        atualizarResumo();
    });
});


if (dom.slider) {
    dom.slider.addEventListener('input', function() {
        const valor = this.value;
        dadosPedido.velocidade = valor;
        if (dom.valorRpm) dom.valorRpm.innerText = valor;
        atualizarResumo();
    });
}


function atualizarResumo() {
    if (dom.revCor) dom.revCor.innerText = dadosPedido.cor;
    if (dom.revVel) dom.revVel.innerText = dadosPedido.velocidade;
}


//envia para o node red
async function cor(corEscolhida) {
    const dados = {
        cor: corEscolhida,
    };

    try {
        const resposta = await fetch("http://localhost:1880/escolhe/cor", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            console.log(`Cor ${corEscolhida} salva no Node-RED`);
        }
    } catch (error) {
        console.error("Erro ao conectar com Node-RED para cor:", error);
    }
}



function finalizarPedido() {
    fecharModal('modalPedido');
    
   
   cor(dadosPedido.cor);

    const statusIds = ['st-estoque', 'st-processo', 'st-montagem', 'st-expedicao'];
    statusIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = 'Trabalhando';
            el.className = 'trabalhando'; 
        }
    });

    iniciarSimulacao();
}

//simulação analises
function iniciarSimulacao() {
    progressoAtivo = 0;
    const intervalo = setInterval(() => {
        progressoAtivo += 2;
        
        if (dom.barra) dom.barra.style.width = progressoAtivo + '%';
        if (dom.porcento) dom.porcento.textContent = progressoAtivo + '%';

        if (progressoAtivo >= 100) {
            clearInterval(intervalo);
            
            
            const dadosAnalise = {
                temperatura: (Math.random() * (28 - 24) + 24).toFixed(2), 
                umidade: (Math.random() * (70 - 60) + 60).toFixed(2),
                tensao: 220.00,
                corrente: 5.50
            };

            salvarAnalise(dadosAnalise);
        }
    }, 150);
}

//analises
async function salvarAnalise(dados) {
    try {
        await fetch("http://localhost:1880/processo/analise", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });
        console.log("Análises da produção salvas!");
    } catch (error) {
        console.error("Erro ao salvar análises:", error);
    }
}

//cancelamento
async function cancelarPedido() {
    let motivo = prompt("Motivo do cancelamento:");
    
    if (!motivo?.trim()) return alert("Motivo obrigatório!");

    try {
        await fetch("http://localhost:1880/pedido/cancela", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ motivo })
        });
        
        alert("Pedido cancelado com sucesso!");
        
        location.reload(); 
    } catch (e) {
        console.error("Erro:", e);
        alert(" O cancelamento não foi registrado.");
    }
}

