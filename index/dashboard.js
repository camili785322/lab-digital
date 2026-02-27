
let progressoAtivo = 0;
let dadosPedido = { 
    cor: 'Azul',      
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


function finalizarPedido() {
    fecharModal('modalPedido');
    
    
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
        if (dom.msg) dom.msg.textContent = `Processando peça ${dadosPedido.cor}...`;

        if (progressoAtivo >= 100) {
            clearInterval(intervalo);
            if (dom.msg) dom.msg.textContent = "Produção Concluída!";
            
           
            setTimeout(() => {
                alert(`Sucesso: Peça ${dadosPedido.cor} finalizada `);
            });
        }
    }, 150);
}


function cancelarPedido() {
    let motivo = prompt("Por qual motivo o pedido foi cancelado?");

    if (motivo === null) {
        return; 
    }

    if (motivo.trim() === "") {
        alert("Por favor, informe um motivo para cancelar.");
        return;
    }

    alert("Cancelando pedido");
    
    fetch("http://localhost:1880/cancela/pedido", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            status: "Cancelado",
            justificativa: motivo,
            data_hora: new Date().toLocaleString()
        })
    })
    .then(resposta => {
        if(resposta.ok) {
            alert("Pedido cancelado com sucesso!");
            
            location.reload(); 
        }

        
        
    });
}

