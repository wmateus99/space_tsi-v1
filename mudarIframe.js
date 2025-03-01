document.addEventListener('DOMContentLoaded', function() {
    // Selecionando os itens do menu
    const menuItems = document.querySelectorAll('.item-menu a');
    const iframe = document.querySelector('iframe');

    // Links dos iframes correspondentes a cada item do menu
    const links = {
        'Início': './_pags/index.html',
        'Atividades': './_pags/atividade/index.html',
        'Textos/Digitar': './_pags/txt_digitar/index.html',
        'Auxiliares': './_pags/auxiliares/index.html',
        'Prova/Final': 'https://extsi.netlify.app/forms/menu.html',
        'Games': './_pags/games/index.html'
    };

    // Função para atualizar o src do iframe
    function updateIframeLink(event) {
        // Removendo a classe 'ativo' do menu anterior
        document.querySelector('.item-menu.ativo').classList.remove('ativo');
        
        // Adicionando a classe 'ativo' ao item clicado
        const clickedItem = event.target.closest('.item-menu');
        clickedItem.classList.add('ativo');
        
        // Alterando o link do iframe de acordo com o menu clicado
        const linkText = clickedItem.querySelector('.txt-link').textContent;
        iframe.src = links[linkText];
    }

    // Adicionando o evento de click aos itens do menu
    menuItems.forEach(item => {
        item.addEventListener('click', updateIframeLink);
    });
});
