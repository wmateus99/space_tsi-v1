// Compartilhamento 

// Game Digitação
const clickGameDig = document.getElementById('gameDig');

clickGameDig.addEventListener('click', function() {
    window.location.href = '/_pags/games/_digitacao/digitacao.html';
});

// Página TsiFlix
const clickTsiFlix = document.getElementById('tsiFlix');

clickTsiFlix.addEventListener('click', function() {
    window.open('https://ead10.com.br/escolatsiinformatica/portal/access', '_blank');
});

// Início Teclado / Mouse
const clickInicioTeclado = document.getElementById('inicioTeclado');
const clickInicioMouse = document.getElementById('inicioMouse');

clickInicioTeclado.addEventListener('click', function() {
    window.location.href = '/_pags/_aulainicial/teclado/index.html';
});
clickInicioMouse.addEventListener('click', function() {
    window.location.href = '/_pags/_aulainicial/mouse/index.html';
});

// Atividade Avaliativa Profissional
