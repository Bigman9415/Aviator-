const multiplierDisplay = document.querySelector('.multiplier-display');
const startButton = document.getElementById('startGame');
const cashOutButton = document.getElementById('cashOut');
const betAmountInput = document.getElementById('betAmount');
const resultsDiv = document.querySelector('.results');

let currentMultiplier = 1.00;
let isGameRunning = false;
let crashPoint = 0;
let intervalId = null;

// Simulate crash point generation (basic version)
function generateCrashPoint() {
    return Math.floor(Math.random() * 100) + 1.5; // Random crash between 1.5x-100x
}

function startGame() {
    if (isGameRunning) return;
    
    const betAmount = parseFloat(betAmountInput.value);
    if (betAmount <= 0) {
        alert("Invalid bet amount!");
        return;
    }

    isGameRunning = true;
    startButton.disabled = true;
    cashOutButton.disabled = false;
    crashPoint = generateCrashPoint();
    currentMultiplier = 1.00;

    intervalId = setInterval(() => {
        currentMultiplier += 0.01;
        multiplierDisplay.textContent = currentMultiplier.toFixed(2) + 'x';
        
        // Draw simple plane animation
        const canvas = document.getElementById('planeCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(currentMultiplier * 10, 50, 20, 20);

        if (currentMultiplier >= crashPoint) {
            endGame(false);
        }
    }, 50);
}

function cashOut() {
    if (!isGameRunning) return;
    endGame(true);
}

function endGame(manualCashOut) {
    clearInterval(intervalId);
    isGameRunning = false;
    startButton.disabled = false;
    cashOutButton.disabled = true;

    const result = manualCashOut ?
        `Cashed out at ${currentMultiplier.toFixed(2)}x!` :
        `Crashed at ${crashPoint.toFixed(2)}x!`;

    resultsDiv.innerHTML += `<div>${result}</div>`;
    multiplierDisplay.textContent = '1.00x';
}

// Event listeners
startButton.addEventListener('click', startGame);
cashOutButton.addEventListener('click', cashOut);

