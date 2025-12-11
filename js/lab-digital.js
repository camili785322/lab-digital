

const USUARIOS_PADRAO = [
    { email: 'professor@exemplo.com', senha: '123', nome: 'Professor', tipo: 'Professor', data_nascimento: '1985-10-20' },
    { email: 'aluno@exemplo.com', senha: '123', nome: 'Aluno Teste', tipo: 'Aluno', data_nascimento: '2000-01-01' }
];

let USUARIOS_CADASTRADOS = (() => {
    const salvos = localStorage.getItem('listaUsuarios');
    if (salvos) {
        return JSON.parse(salvos);
    }
    localStorage.setItem('listaUsuarios', JSON.stringify(USUARIOS_PADRAO));
    return USUARIOS_PADRAO;
})();

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
        localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
    
        if (messageElement) messageElement.textContent = ''; 
        window.location.href = '../index/index.html'; 
    } else {
        if (messageElement) {
             messageElement.textContent = 'Email ou senha incorretos.';
             messageElement.style.color = 'red';
        } else {
             alert('Email ou senha incorretos.');
        }
    }
}

function handleCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const data_nascimento = document.getElementById('data-nascimento-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
    const tipo = document.getElementById('tipo-cadastro').value;
    const messageElement = document.getElementById('cadastro-message');

    const emailExistente = USUARIOS_CADASTRADOS.find(u => u.email === email);
    if (emailExistente) {
        messageElement.textContent = 'Erro: Este email já está cadastrado.';
        messageElement.style.color = 'red';
        return;
    }

    const novoUsuario = { nome, email, senha, tipo, data_nascimento };
    USUARIOS_CADASTRADOS.push(novoUsuario);


    localStorage.setItem('listaUsuarios', JSON.stringify(USUARIOS_CADASTRADOS)); 

    messageElement.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
    messageElement.style.color = 'green';

    document.getElementById('cadastro-form').reset();
    
    setTimeout(() => {
        window.location.href = 'login.html'; 
    }, 2000);
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
    const path = window.location.pathname;
    const isDashboard = path.includes('index.html');
    const isLoginOrCadastro = path.includes('login.html') || path.includes('cadastro.html');

    
    if (isDashboard && !usuario) {
        window.location.href = 'login.html';
    }

   
    if (isLoginOrCadastro && usuario) {
        window.location.href = 'index.html';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    

    
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }
    
   
    const isDashboard = window.location.pathname.includes('index.html');
    if (isDashboard) {
    
        atualizarRodape();
        atualizarVariaveisAmbientais();
        setupPedidoSelection();
    }
});
  
