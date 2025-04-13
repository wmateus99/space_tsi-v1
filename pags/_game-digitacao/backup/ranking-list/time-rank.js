        // Função para calcular os dias restantes
        function calcularDiasRestantes() {
            const dataFinal = new Date("2025-06-24"); // Data de fim
            const dataAtual = new Date(); // Data atual
            const diferençaEmMilissegundos = dataFinal - dataAtual; // Diferença entre as datas em milissegundos
            const diasRestantes = Math.ceil(diferençaEmMilissegundos / (1000 * 60 * 60 * 24)); // Converte milissegundos para dias
            return diasRestantes;
        }

        // Exibe a mensagem na página
        function exibirMensagem() {
            const dias = calcularDiasRestantes();
            const mensagem = `O ranking reseta em ${dias} dias!`;
            document.getElementById("mensagem").innerText = mensagem;
        }

        // Chama a função para exibir a mensagem assim que a página for carregada
        window.onload = exibirMensagem;