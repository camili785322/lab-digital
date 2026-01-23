function abrirModalPedido() { document.getElementById('modalPedido').style.display = 'block'; }
function fecharModalPedido() { document.getElementById('modalPedido').style.display = 'none'; }
function abrirModalDetalhes() { document.getElementById('modalDetalhes').style.display = 'block'; }
function fecharModalDetalhes() { document.getElementById('modalDetalhes').style.display = 'none'; }

document.getElementById('form-pedido').addEventListener('submit', function(e) {
    e.preventDefault();
    const cor = document.getElementById('cor-input').value;
    const qtd = document.getElementById('qtd-input').value;
    
    iniciarProducao(cor, qtd);
    fecharModalPedido();
});

function iniciarProducao(cor, quantidade) {
    document.querySelectorAll('.status-value').forEach(el => {
        el.textContent = "Trabalhando";
        el.className = "status-value trabalhando";
    });

    document.getElementById('detalhe-info').textContent = `Pedido: ${quantidade}x Peça ${cor}`;
    document.getElementById('barra-progresso').style.width = "35%";
    document.getElementById('step-1').classList.add('active');
    
    alert(`Pedido de ${quantidade} peças ${cor} iniciado!`);
}

function cancelarProducao() {
    if(confirm("Deseja interromper a produção atual?")) {
        location.reload();
    }
}
