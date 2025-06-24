document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");
    const difficultySelect = document.getElementById("difficulty");
    const playerCountSelect = document.getElementById("playerCount");
    const player1NameInput = document.getElementById("player1Name");
    const player2NameInput = document.getElementById("player2Name");
    const roundsInput = document.getElementById("rounds");
    const gameSection = document.querySelector(".game-section");
    const restartBtn = document.getElementById("restartBtn");
    const resetSettingsBtn = document.getElementById("resetSettingsBtn");

    const timerPlayer1 = document.getElementById("timerPlayer1");
    const timerPlayer2 = document.getElementById("timerPlayer2");
    const movesPlayer1 = document.getElementById("movesPlayer1");
    const movesPlayer2 = document.getElementById("movesPlayer2");
    const matchesPlayer1 = document.getElementById("matchesPlayer1");
    const matchesPlayer2 = document.getElementById("matchesPlayer2");

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let totalPairs = 0;
    let moves = 0;
    let timer;
    let timeLeft;
    let roundStartTime;

    let currentPlayerIndex = 0;
    let players = [];
    let totalRounds = 1;
    let currentRound = 1;

    startButton.addEventListener("click", startGame);
    restartBtn.addEventListener("click", () => {
        startRound(timeLeft, parseInt(rowsInput.value), parseInt(colsInput.value));
    });

    function updateGrid(rows, cols) {
        const board = document.getElementById("gameBoard");
        board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      }
            

    resetSettingsBtn.addEventListener("click", () => {
        rowsInput.value = 4;
        colsInput.value = 4;
        difficultySelect.value = "easy";
        playerCountSelect.value = "1";
        player2NameInput.parentElement.style.display = "none";
        player1NameInput.value = "Гравець 1";
        player2NameInput.value = "Гравець 2";
        roundsInput.value = 1;
    });

    playerCountSelect.addEventListener("change", () => {
        player2NameInput.parentElement.style.display =
            playerCountSelect.value === "2" ? "block" : "none";
        document.querySelector(".player2").style.display =
            playerCountSelect.value === "2" ? "block" : "none";
    });

    function startGame() {
        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);
        if ((rows * cols) % 2 !== 0 || rows < 4 || cols < 4) {
            alert("Розмір поля має бути парним і не менше 4x4");
            return;
        }
        updateGrid(rows, cols);

        switch (difficultySelect.value) {
            case "easy": timeLeft = 180; break;
            case "normal": timeLeft = 120; break;
            case "hard": timeLeft = 60; break;
        }

        totalRounds = parseInt(roundsInput.value);
        players = [
            { name: player1NameInput.value, totalMoves: 0, totalTime: 0, matches: 0 }
        ];
        if (playerCountSelect.value === "2") {
            players.push({ name: player2NameInput.value, totalMoves: 0, totalTime: 0, matches: 0 });
        }

        currentRound = 1;
        currentPlayerIndex = 0;

        document.getElementById("playerName1").textContent = players[0].name;
        if (players.length > 1) {
            document.getElementById("playerName2").textContent = players[1].name;
        }

        startRound(timeLeft, rows, cols);
    }

    function startRound(time, rows, cols) {
        matchedPairs = 0;
        moves = 0;
        flippedCards = [];
        updatePlayerStats();
        resetBoard();
        generateCards(rows, cols);
        shuffleCards();
        startTimer(time);
        roundStartTime = Date.now();
    }

    function generateCards(rows, cols) {
        const cardContainer = document.querySelector(".game-section");
        cardContainer.innerHTML = "";
        totalPairs = (rows * cols) / 2;
        cards = [];

        for (let i = 0; i < totalPairs; i++) {
            cards.push(i);
            cards.push(i);
        }

        cards.sort(() => 0.5 - Math.random());

        cards.forEach((num) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = num;
            card.style.backgroundImage = "url(./images/back.jpg)";
            card.style.backgroundSize = "cover";
            card.addEventListener("click", handleCardClick);
            cardContainer.appendChild(card);
        });
    }

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        const cardElements = [...gameSection.children];
        cardElements.forEach((card, i) => {
            card.dataset.value = cards[i];
        });
    }

    function handleCardClick(e) {
        const clicked = e.target;
        if (flippedCards.includes(clicked) || clicked.classList.contains("matched")) return;

        showCard(clicked);
        flippedCards.push(clicked);

        if (flippedCards.length === 2) {
            moves++;
            updatePlayerStats();
            checkForMatch();
        }
    }

    function showCard(card) {
        const type = card.dataset.value;
        card.style.backgroundImage = `url(./images/img_${type}.png)`;
        card.style.backgroundSize = "cover";
        card.textContent = "";
    }

    function hideCard(card) {
        card.style.backgroundImage = `url(./images/back.jpg)`;
        card.style.backgroundSize = "cover";
        card.textContent = "";
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;
            players[currentPlayerIndex].matches++;
            updatePlayerStats();

            if (matchedPairs === totalPairs) {
                clearInterval(timer);

                const roundTime = Math.floor((Date.now() - roundStartTime) / 1000);
                const player = players[currentPlayerIndex];
                player.totalMoves += moves;
                player.totalTime += roundTime;

                currentRound++;
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

                if (currentRound > totalRounds) {
                    showWinner();
                } else {
                    alert(`Раунд завершено. Наступний гравець: ${players[currentPlayerIndex].name}`);
                    startRound(timeLeft, parseInt(rowsInput.value), parseInt(colsInput.value));
                }
            }
        } else {
            setTimeout(() => {
                hideCard(card1);
                hideCard(card2);

                if (players.length === 2) {
                    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
                    updatePlayerStats();
                }
            }, 500);
        }
        flippedCards = [];
    }

    function resetBoard() {
        gameSection.innerHTML = "";
    }

    function startTimer(duration) {
        timeLeft = duration;
        updatePlayerStats();
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            updatePlayerStats();
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Час вичерпано! Гру завершено.");
            }
        }, 1000);
    }

    function updatePlayerStats() {
        const p1 = players[0];
        timerPlayer1.textContent = `Time: ${formatTime(timeLeft)}`;
        movesPlayer1.textContent = `Moves: ${moves}`;
        matchesPlayer1.textContent = `Match: ${p1.matches}`;

        timerPlayer1.style.backgroundColor = "";
        timerPlayer2.style.backgroundColor = "";

        if (players.length > 1) {
            const p2 = players[1];
            timerPlayer2.textContent = `Time: ${formatTime(timeLeft)}`;
            movesPlayer2.textContent = `Moves: ${moves}`;
            matchesPlayer2.textContent = `Match: ${p2.matches}`;

            if (currentPlayerIndex === 0) {
                timerPlayer1.style.backgroundColor = "lightgreen";
            } else {
                timerPlayer2.style.backgroundColor = "lightgreen";
            }
        } else {
            timerPlayer1.style.backgroundColor = "lightgreen";
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    }

    function showWinner() {
        let resultMsg = "Результати гри:\n";
        players.reduce((a, b) => {
                if (a.matches > b.matches) resultMsg += `Переможець ${a.name}`;
                else if(a.matches === b.matches) resultMsg += "Нічия";
                else resultMsg+= `Переможець ${b.name}`;
            }
        );
        alert(resultMsg);
    }

    document.getElementById("restartBtn").addEventListener("click", () => startGame())

});
