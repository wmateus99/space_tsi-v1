// Seleciona os elementos necessários
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const messageElement = document.getElementById("message");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const restartButton = document.getElementById("restartButton");
let score = 0;
let timeLeft = 60; // Tempo de 1 minuto
let gameActive = false;
let timerInterval;
let isPaused = false;
// Função para mover o alvo para uma posição aleatória
function moveTarget() {
const areaWidth = gameArea.clientWidth - target.clientWidth;
const areaHeight = gameArea.clientHeight - target.clientHeight;
const randomX = Math.floor(Math.random() * areaWidth);
const randomY = Math.floor(Math.random() * areaHeight);
target.style.left = `${randomX}px`;
target.style.top = `${randomY}px`;
}
// Função para atualizar a contagem regressiva
function updateTimer() {
timerInterval = setInterval(() => {
    if (!isPaused && timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = timeLeft;
    } else if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endGame();
    }
}, 1000);
}
// Função para finalizar o jogo
function endGame() {
gameActive = false;
clearInterval(timerInterval);
target.style.display = "none"; // Esconde o alvo
restartButton.style.display = "block"; // Mostra o botão de reiniciar
startButton.style.display = "none"; // Esconde o botão de iniciar
pauseButton.style.display = "none"; // Esconde o botão de pausar
if (score >= 40) {
    messageElement.textContent = "Parabéns! Você fez mais de 40 pontos!";
    messageElement.style.color = "green";
} else {
    messageElement.textContent = "Continue praticando! Você pode melhorar.";
    messageElement.style.color = "red";
}
}
// Função para reiniciar o jogo
function restartGame() {
score = 0;
timeLeft = 60;
gameActive = false;
isPaused = false;
messageElement.textContent = ""; // Limpa a mensagem
scoreElement.textContent = score;
timerElement.textContent = timeLeft;
restartButton.style.display = "none"; // Esconde o botão de reiniciar
startButton.style.display = "block"; // Mostra o botão de iniciar
pauseButton.style.display = "none"; // Esconde o botão de pausar
target.style.display = "none"; // Esconde o alvo inicialmente
}
// Função para pausar o jogo
function pauseGame() {
isPaused = true;
gameActive = false;
pauseButton.textContent = "Retomar";
}
// Função para retomar o jogo
function resumeGame() {
isPaused = false;
gameActive = true;
pauseButton.textContent = "Pausar";
moveTarget(); // Move o alvo novamente
}
// Quando clicar no alvo
target.addEventListener("click", () => {
if (gameActive) {
    score++;
    scoreElement.textContent = score;
    moveTarget();
}
});
// Quando clicar fora do alvo (dentro da área de jogo)
gameArea.addEventListener("click", (event) => {
if (gameActive && event.target !== target) {
    score--;
    if (score < 0) score = 0; // A pontuação não pode ser negativa
    scoreElement.textContent = score;
}
});
// Quando clicar no botão de iniciar
startButton.addEventListener("click", () => {
gameActive = true;
isPaused = false;
startButton.style.display = "none"; // Esconde o botão de iniciar
pauseButton.style.display = "block"; // Mostra o botão de pausar
target.style.display = "block"; // Mostra o alvo
moveTarget();
updateTimer();
});
// Quando clicar no botão de pausar
pauseButton.addEventListener("click", () => {
if (isPaused) {
    resumeGame(); // Retoma o jogo se estiver pausado
} else {
    pauseGame(); // Pausa o jogo se estiver ativo
}
});
// Quando clicar no botão de reiniciar
restartButton.addEventListener("click", () => {
clearInterval(timerInterval); // Para o cronômetro anterior
restartGame(); // Reinicia o jogo
});