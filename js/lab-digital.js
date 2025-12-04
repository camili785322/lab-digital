

const USUARIOS_CADASTRADOS = [
    
    { email: 'savio@exemplo.com', senha: '123', nome: 'Sávio Zoboli', tipo: 'Professor' },
    { email: 'aluno@exemplo.com', senha: '123', nome: 'Aluno Teste', tipo: 'Aluno' }
];

const DADOS_AMBIENTAIS = {
    estoque: { temp: "26.0°C", umid: "59%" },
    processo: { temp: "28.5°C", umid: "54%" },
    montagem: { temp: "24.2°C", umid: "61%" },
    expedicao: { temp: "25.3°C", umid: "57%" }
};

const DETALHES_PEDIDOS = {
    '10012': { status: 'Em Processo', etapa: 'Montagem do Componente Azul', historico: 'Iniciado Processo em 04/12.' },
    '10013': { status: 'Finalizado', etapa: 'Pronto para Despacho', historico: 'Finalizado em 04/12, 10:30h.' },
    '10014': { status: 'Cancelado', etapa: 'N/A', historico: 'Cancelado pelo cliente.' },
    '10016': { status: 'Não Iniciado', etapa: 'Aguardando Liberação de Matéria-Prima', historico: 'Aguardando MP V1.' },
    '10017': { status: 'Aguardando Módulo', etapa: 'Módulo de Processo Ocupado', historico: 'Aguardando a liberação do Robô.' },
    '10019': { status: 'Em Processo', etapa: 'Teste de Qualidade', historico: 'Passou pelo Processo.' },
    '10020': { status: 'Finalizado', etapa: 'Enviado para Expedição', historico: 'Concluído o Teste de Qualidade.' },
    '10021': { status: 'Em Processo', etapa: 'Aguardando Montagem', historico: 'Componente Vermelho em produção.' },
    '10023': { status: 'Cancelado', etapa: 'N/A', historico: 'Erro na especificação.' }
};



function handleLogin(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById('email').value;
    const senhaInput = document.getElementById('senha').value;
    const messageElement = document.getElementById('login-message');

    const usuario = USUARIOS_CADASTRADOS.find(u => u.email === emailInput && u.senha === senhaInput);

    if (usuario) {
        // Se o usuário existe, salva e redireciona
        localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
        window.location.href = 'dashboard.html'; 
    } else {
        // Se o login falhar, mostra a mensagem de erro
        messageElement.textContent = 'Email ou senha incorretos.';
    }
}

function atualizarVariaveisAmbientais() {
    for (const modulo in DADOS_AMBIENTAIS) {
        const dados = DADOS_AMBIENTAIS[modulo];
        
        const tempElement = document.querySelector(`.temp-value[data-modulo="${modulo}"]`);
        const umidElement = document.querySelector(`.umid-value[data-modulo="${modulo}"]`);
        
        if (tempElement) tempElement.textContent = dados.temp;
        if (umidElement) umidElement.textContent = dados.umid;
    }
}

function setupPedidoSelection() {
    const posicoesExpedicao = document.querySelectorAll('.posicao-expedicao');
    const detalhesSection = document.getElementById('detalhes-pedido');
    
    posicoesExpedicao.forEach(posicao => {
        posicao.addEventListener('click', () => {
            
            const pedidoNumElement = posicao.querySelector('.pedido-num');
            if (!pedidoNumElement) return;

            let pedidoNum = pedidoNumElement.textContent.replace('Nº Pedido: ', '').trim();

            if (pedidoNum === 'Vazio') {
                detalhesSection.style.display = 'none';
                return;
            }

            const detalhes = DETALHES_PEDIDOS[pedidoNum];

            if (detalhes) {
                document.getElementById('detalhe-num-pedido').textContent = pedidoNum;
                document.getElementById('detalhe-status').textContent = detalhes.status;
                document.getElementById('detalhe-etapa').textContent = detalhes.etapa;
                
                detalhesSection.style.display = 'block';
                detalhesSection.scrollIntoView({ behavior: 'smooth' }); 
            } else {
                detalhesSection.style.display = 'none';
            }
        });
    });
}

function atualizarRodape() {
    const dataHoraElement = document.getElementById('data-hora-atualizacao');
    if (dataHoraElement) {
        const data = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'medium' });
        dataHoraElement.textContent = data;
    }
}

function verificarAutenticacao() {
  
    const usuario = localStorage.getItem('usuarioAutenticado');
    const isDashboard = window.location.pathname.includes('dashboard.html');

    if (isDashboard && !usuario) {
        window.location.href = 'login.html';
    }

    const isLogin = window.location.pathname.includes('login.html');
    if (isLogin && usuario) {
        window.location.href = 'dashboard.html';
    }
}


document.addEventListener('DOMContentLoaded', () => {
  
    verificarAutenticacao();
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        
        loginForm.addEventListener('submit', handleLogin);
    }
    
  
    const isDashboard = window.location.pathname.includes('dashboard.html');
    if (isDashboard) {
        atualizarRodape();
        atualizarVariaveisAmbientais();
        setupPedidoSelection();
        
    
    }
});

/*document.addEventListener('DOMContentLoaded', () => {
    const isLoginPage = window.location.pathname.includes('login.html');
    const loginForm = document.getElementById('login-form');
    
   
    if (isLoginPage && loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        return; 
    }
    
   
    let usuarioObj = null;
    const usuarioString = localStorage.getItem('usuarioAutenticado');
    
    if (usuarioString) {
        try {
            usuarioObj = JSON.parse(usuarioString);
        } catch (e) {
            console.error("Erro ao carregar usuário logado:", e);
        }
    }
    
  
    if (!usuarioObj && !isLoginPage) {
        window.location.href = 'login.html';
        return;
    }

    if (document.getElementById('status-geral')) {
        const nomeUsuario = usuarioObj ? usuarioObj.nome : 'Visitante';
        console.log(`Bem-vindo, ${nomeUsuario}! Dashboard carregado.`);
        
        atualizarVariaveisAmbientais();
        setupPedidoSelection();
        atualizarRodape();
        
        setInterval(atualizarVariaveisAmbientais, 5000); 
        setInterval(atualizarRodape, 1000); 
    }
});*/