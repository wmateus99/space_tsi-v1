                                                let currentWord = "";
let score = 0;
let level = 1;
let pointsToNextLevel = 5; // Para o Nível 2, o objetivo é atingir 5 pontos
let wordsTyped = 0;

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const startButton = document.getElementById("start-button");

const section1 = ["Escola TSI", "paz", "feliz", "futuro", "casa"];
const section2 = ["Fácil", "Árvore", "Anúncio", "Relógio", "Médio", "Rápido", "Sólido", "Dominó", "Parabéns", "Bíblia"];
const section3 = ["Ângulo", "Metrô", "Porquê", "Êxito", "Câmbio", "Camelô", "Mateus", "Você", "Judô", "Bambolê"];
const section4 = ["@@@", "###", ":)", "!!", "$$$", "(-_-)", "&&&", "R$", "¹¹¹  ²²²  ³³³", "Fim!"];

let sections = [section1, section2, section3, section4]; // Array de seções
let sectionIndex = 0;
let wordIndex = 0;
let currentSection = sections[sectionIndex]; 

function getNextWord() {
    const word = currentSection[wordIndex];
    wordIndex++;

    if (wordIndex >= currentSection.length) {
        sectionIndex++;
        wordIndex = 0;
        if (sectionIndex < sections.length) {
            currentSection = sections[sectionIndex];
        }
    }
    return word;
}

function startGame() {
    if (score === 0) {
        currentWord = getNextWord();
        displayWord(currentWord);
        wordInput.value = "";
        wordInput.focus();
        startButton.style.display = "none"; // Esconde o botão "Iniciar" durante o jogo
    }
}

function displayWord(word) {
    const wordArray = word.split("");
    wordDisplay.innerHTML = "";
    wordArray.forEach((letter) => {
        const span = document.createElement("span");
        span.innerText = letter;
        wordDisplay.appendChild(span);
    });
}

function updateScore() {
    score++;
    wordsTyped++;
    scoreDisplay.innerText = `${score}`;

    // Verifica se atingiu a meta de pontos
    if (score >= pointsToNextLevel) {
        levelUp();
    } else {
        currentWord = getNextWord();
        displayWord(currentWord);
    }
}

function levelUp() {
    level++;
    wordsTyped = 0; // Resetar contador de palavras

    // Define os pontos necessários para o próximo nível
    if (level === 2) {
        pointsToNextLevel = 15; // 5 + 10
    } else if (level === 3) {
        pointsToNextLevel = 25; // 15 + 10
    } else if (level === 4) {
        pointsToNextLevel = 35; // 25 + 10
    }

    levelDisplay.innerText = `${level}`; // Nível

    if (level <= 4) {
        Swal.fire({
            icon: 'success',
            title: `Parabéns! Você avançou para o nível ${level}!`,
        }).then(() => {
            currentWord = getNextWord();
            displayWord(currentWord);
            wordInput.value = "";
        });
    } else {
        // Final do jogo - Nível 5
        Swal.fire({
            icon: 'success',
            title: 'Parabéns! Você completou todos os níveis!',
            text: 'Você é um mestre na digitação!',
            footer: '<a href="../../jogos/game-mouse/index.html">Bora praticar o uso do Mouse?</a>'
        }).then(() => {
            // resetGame(); // Reinicia o jogo após o final
            location.reload();
        });
    }
}

function resetGame() {
    score = 0;
    level = 1;
    pointsToNextLevel = 5; // Para o Nível 2, a meta é 5 pontos
    wordsTyped = 0;
    scoreDisplay.innerText = `${score}`;
    levelDisplay.innerText = `${level}`;
    startButton.style.display = "block"; // Exibe o botão "Iniciar" novamente
}

wordInput.addEventListener("input", () => {
    const typedWord = wordInput.value.trim();
    const currentWordArray = currentWord.split("");
    const typedWordArray = typedWord.split("");

    currentWordArray.forEach((letter, index) => {
        const span = wordDisplay.children[index];
        if (!span) return;
        const typedLetter = typedWordArray[index];
        if (typedLetter === letter) {
            span.classList.add("correct");
        } else {
            span.classList.remove("correct");
        }
    });

    if (typedWord === currentWord) {
        updateScore();
        wordInput.value = "";
    }
});

startButton.addEventListener("click", () => {
    startGame();
});
