
let progressoAtivo = 0;
let dadosPedido = { 
    cor: 'Azul',
    velocidade: 0      
};

const dom = {
    revCor: document.getElementById('rev-cor'),    
    revVel: document.getElementById('rev-vel'),    
    slider: document.getElementById('range-vel'),  
    valorRpm: document.getElementById('valor-range'),
    barra: document.getElementById('barra-interna'),
    porcento: document.getElementById('porcento'),
    msg: document.getElementById('msg-progresso')
};

// --- FUNÇÕES DE INTERFACE ---

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
    
    atualizarResumo();
}

// Seleção de Cor nos Cards
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

// --- INTEGRAÇÃO COM NODE-RED ---

// 1. Função para salvar a cor escolhida
async function enviarCorAoNodeRed(corEscolhida) {
    const dados = {
        cor: corEscolhida,
        status: "Iniciado",
        timestamp: new Date().toISOString()
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

// 2. Finalizar Pedido e Iniciar Produção
function finalizarPedido() {
    fecharModal('modalPedido');
    
    // Salva a cor no Node-RED antes de começar
    enviarCorAoNodeRed(dadosPedido.cor);

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

function iniciarSimulacao() {
    progressoAtivo = 0;
    const intervalo = setInterval(() => {
        progressoAtivo += 2;
        
        if (dom.barra) dom.barra.style.width = progressoAtivo + '%';
        if (dom.porcento) dom.porcento.textContent = progressoAtivo + '%';

        if (progressoAtivo >= 100) {
            clearInterval(intervalo);
            
            // Dados para a tabela Analises
            const dadosAnalise = {
                temp: (Math.random() * (28 - 24) + 24).toFixed(2), // Ex: 25.50
                umid: (Math.random() * (70 - 60) + 60).toFixed(2),
                tensao: 220.00,
                corrente: 5.50
            };

            salvarAnalise(dadosAnalise);
        }
    }, 150);
}

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
// 3. Cancelar Pedido e enviar motivo
/*async function cancelarPedido() {
    let motivo = prompt("Por qual motivo o pedido foi cancelado?");

    if (motivo === null) return; 

    if (motivo.trim() === "") {
        alert("Por favor, informe um motivo para cancelar.");
        return;
    }*/


fetch("http://localhost:1880/escolhe/cor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cor: "Azul" }) // O Node-RED lerá dados.cor
});




    /*try {
        const resposta = await fetch("http://localhost:1880/pedido/cancela", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                status: "Cancelado",
                justificativa: motivo,
                cor: dadosPedido.cor,
                data_hora: new Date().toISOString()
            })
        });

        if (resposta.ok) {
            alert("Pedido cancelado e motivo registrado!");
            location.reload(); 
        }
    } catch (error) {
        console.error("Erro ao cancelar pedido:", error);
        alert("Erro ao conectar ao Node-RED.");
    }
}*/