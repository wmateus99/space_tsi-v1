document.addEventListener('DOMContentLoaded', () => {
    // Theme switching functionality
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Set cyan as default theme
    document.body.classList.add('cyan-theme');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            
            // Remove all theme classes
            document.body.classList.remove('light-theme', 'cyan-theme', 'pink-theme', 'green-theme', 'orange-theme');
            
            // Add the selected theme class (except for dark which is default)
            if (theme !== 'dark') {
                document.body.classList.add(`${theme}-theme`);
            }
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Save theme preference
            localStorage.setItem('preferred-theme', theme);
        });
    });
    
    // Load saved theme preference or set cyan as default
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (themeOption) {
            themeOption.click();
        }
    } else {
        // Set cyan as default if no saved preference
        const cyanOption = document.querySelector('.theme-option[data-theme="cyan"]');
        if (cyanOption) {
            cyanOption.click();
        }
    }
    
    // Rest of the code remains unchanged
    // Elementos do DOM
    const wordDisplay = document.getElementById('word-display');
    const wordInput = document.getElementById('word-input');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    // Novos elementos para o progresso
    const progressBar = document.getElementById('progress-bar');
    const wordsCount = document.getElementById('words-count');
    const wordsTarget = document.getElementById('words-target');

    // Ranking estático (será atualizado manualmente)
    const topPlayers = [
        { name: "Wesley Rafael", score: 1050, level: 105 },
        { name: "Emilly Yasmin", score: 392, level: 40 },
        { name: "Gabriel Pontes", score: 300, level: 30 }
    ];

    // Variáveis do jogo
    let currentWord = '';
    let score = 0;
    let level = 1;
    let timeLeft = 90;
    let maxTime = 90;
    let minTime = 45;
    let isPlaying = false;
    let isPaused = false;
    let timer;
    const wordsPerLevel = 10; // Palavras necessárias para subir de nível

    // Inicializar o jogo
    function init() {
        score = 0;
        level = 1;
        timeLeft = 90;
        maxTime = 90;
        
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        timeDisplay.textContent = timeLeft;
        
        // Inicializar o progresso
        updateProgress(0);
        
        wordInput.value = '';
        wordInput.disabled = false;
        wordInput.focus();
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        isPlaying = true;
        isPaused = false;
        
        showWord();
        startTimer();
    }

    // Atualizar a barra de progresso
    function updateProgress(wordCount) {
        const percentage = (wordCount % wordsPerLevel) / wordsPerLevel * 100;
        progressBar.style.width = `${percentage}%`;
        wordsCount.textContent = wordCount % wordsPerLevel;
        wordsTarget.textContent = wordsPerLevel;
    }

    // Mostrar uma palavra aleatória
    function showWord() {
        const randomIndex = Math.floor(Math.random() * palavras.length);
        // Use the word as-is without changing capitalization
        currentWord = palavras[randomIndex];
        
        // Mostrar a palavra com letras individuais em spans para colorir depois
        wordDisplay.innerHTML = '';
        for (let i = 0; i < currentWord.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = currentWord[i];
            letterSpan.className = 'letter';
            wordDisplay.appendChild(letterSpan);
        }
    }

    // Iniciar o temporizador
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                timeDisplay.textContent = timeLeft;
                
                if (timeLeft === 0) {
                    gameOver();
                }
            }
        }, 1000);
    }

    // Fim de jogo
    function gameOver() {
        isPlaying = false;
        clearInterval(timer);
        wordDisplay.textContent = 'Fim de Jogo!';
        wordInput.disabled = true;
        startBtn.textContent = 'Reiniciar';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // Verificar se o jogador entrou no ranking
        checkRanking();
    }
    
    // Verificar se o jogador entrou no ranking
    function checkRanking() {
        // Verificar se a pontuação é maior que algum dos top 3
        const lowestTopScore = topPlayers[topPlayers.length - 1].score;
        
        if (score > lowestTopScore) {
            // Mostrar botão para salvar em PDF
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Salvar Resultado em PDF';
            saveBtn.className = 'btn save-btn';
            saveBtn.addEventListener('click', () => saveToPDF());
            
            const controlsDiv = document.querySelector('.controls');
            controlsDiv.appendChild(saveBtn);
            
            // Mostrar mensagem
            wordDisplay.innerHTML = `Parabéns! Você superou um recorde!<br>Pontuação: ${score} | Nível: ${level}`;
        }
    }
    
    // Salvar resultado em PDF
    function saveToPDF() {
        // Criar conteúdo para o PDF
        const content = `
            Resultado do Jogo de Digitação
            -----------------------------
            Nome: _________________
            Pontuação: ${score}
            Nível: ${level}
            Data: ${new Date().toLocaleDateString()}
            
            Ranking Atual:
            1. ${topPlayers[0].name} - ${topPlayers[0].score} pontos (Nível ${topPlayers[0].level})
            2. ${topPlayers[1].name} - ${topPlayers[1].score} pontos (Nível ${topPlayers[1].level})
            3. ${topPlayers[2].name} - ${topPlayers[2].score} pontos (Nível ${topPlayers[2].level})
        `;
        
        // Criar um elemento para o PDF
        const element = document.createElement('div');
        element.style.display = 'none';
        element.innerHTML = content.replace(/\n/g, '<br>');
        document.body.appendChild(element);
        
        // Usar html2pdf.js para gerar o PDF
        html2pdf()
            .from(element)
            .save('resultado-jogo-digitacao.pdf');
            
        // Remover o elemento após gerar o PDF
        setTimeout(() => {
            document.body.removeChild(element);
        }, 100);
    }

    // Verificar a palavra digitada
    function checkMatch() {
        const typedValue = wordInput.value; // Remove toLowerCase() to make it case-sensitive
        
        // Colorir as letras conforme digitação
        const letters = wordDisplay.querySelectorAll('.letter');
        
        for (let i = 0; i < letters.length; i++) {
            if (i < typedValue.length) {
                // Verificar se a letra digitada corresponde à letra da palavra (case-sensitive)
                if (typedValue[i] === currentWord[i]) {
                    letters[i].className = 'letter correct';
                } else {
                    letters[i].className = 'letter incorrect';
                }
            } else {
                letters[i].className = 'letter';
            }
        }
        
        // Verificar se a palavra está completa e correta (case-sensitive)
        if (typedValue === currentWord) {
            wordInput.value = '';
            score++;
            scoreDisplay.textContent = score;
            
            // Atualizar o progresso
            updateProgress(score);
            
            // Verificar se deve avançar de nível
            if (score % wordsPerLevel === 0) {
                levelUp();
            } else {
                showWord();
            }
        }
    }

    // Avançar de nível
    function levelUp() {
        level++;
        levelDisplay.textContent = level;
        
        // Reduzir o tempo máximo (até o mínimo de 45s)
        maxTime = Math.max(minTime, maxTime - 5);
        
        // Reiniciar o tempo para o novo máximo
        timeLeft = maxTime;
        timeDisplay.textContent = timeLeft;
        
        wordDisplay.innerHTML = `<span class="level-up">Nível ${level}!</span>`;
        
        // Pequena pausa antes de mostrar a próxima palavra
        setTimeout(() => {
            showWord();
        }, 1000);
    }

    // Pausar/Continuar o jogo
    function togglePause() {
        isPaused = !isPaused;
        
        if (isPaused) {
            pauseBtn.textContent = 'Continuar';
            wordDisplay.innerHTML = '<span class="paused">JOGO PAUSADO</span>';
            wordInput.disabled = true;
        } else {
            pauseBtn.textContent = 'Pausar';
            showWord();
            wordInput.disabled = false;
            wordInput.focus();
        }
    }

    // Exibir o ranking
    function displayRanking() {
        const rankingDiv = document.getElementById('ranking');
        
        // Criar um botão de toggle para o ranking
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '🏆 Ver Ranking';
        toggleBtn.className = 'toggle-ranking-btn';
        
        // Criar o conteúdo do ranking (inicialmente oculto)
        const rankingContent = document.createElement('div');
        rankingContent.className = 'ranking-content';
        rankingContent.style.display = 'none';
        
        // Título do ranking
        const rankingTitle = document.createElement('h3');
        rankingTitle.textContent = 'Top 3 Jogadores';
        rankingContent.appendChild(rankingTitle);
        
        // Criar cards para cada jogador do ranking
        topPlayers.forEach((player, index) => {
            const playerCard = document.createElement('div');
            playerCard.className = `player-card rank-${index + 1}`;
            
            const medal = document.createElement('div');
            medal.className = 'medal';
            medal.textContent = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
            
            const playerInfo = document.createElement('div');
            playerInfo.className = 'player-info';
            
            const playerName = document.createElement('div');
            playerName.className = 'player-name';
            playerName.textContent = player.name;
            
            const playerStats = document.createElement('div');
            playerStats.className = 'player-stats';
            playerStats.textContent = `${player.score} pontos | Nível ${player.level}`;
            
            playerInfo.appendChild(playerName);
            playerInfo.appendChild(playerStats);
            
            playerCard.appendChild(medal);
            playerCard.appendChild(playerInfo);
            
            rankingContent.appendChild(playerCard);
        });
        
        // Adicionar evento de toggle ao botão
        toggleBtn.addEventListener('click', () => {
            const isHidden = rankingContent.style.display === 'none';
            rankingContent.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? '🏆 Ocultar Ranking' : '🏆 Ver Ranking';
        });
        
        // Limpar e adicionar elementos ao container de ranking
        rankingDiv.innerHTML = '';
        rankingDiv.appendChild(toggleBtn);
        rankingDiv.appendChild(rankingContent);
    }

    // Event Listeners
    startBtn.addEventListener('click', init);
    
    pauseBtn.addEventListener('click', togglePause);
    
    wordInput.addEventListener('input', () => {
        if (isPlaying && !isPaused) {
            checkMatch();
        }
    });
    
    // Exibir o ranking ao carregar a página
    displayRanking();
    
    // Calculate and display days until ranking reset
    function updateResetCountdown() {
        const resetDate = new Date('2025-06-14');
        const today = new Date();
        
        // Calculate the difference in days
        const diffTime = resetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Display the countdown
        const countdownElement = document.getElementById('reset-countdown');
        if (countdownElement) {
            countdownElement.textContent = diffDays;
        }
    }
    
    // Update the countdown when the page loads
    updateResetCountdown();
});