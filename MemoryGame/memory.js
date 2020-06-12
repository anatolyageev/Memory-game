const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let counter = document.querySelector(".moves");
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;
let matchedCard = document.getElementsByClassName("match");
let stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1")

document.querySelector('.fa-repeat').addEventListener('click', startGame);
document.getElementById('play-again').addEventListener('click', playAgain);
document.body.onload = startGame();

function startGame() {
    resetFlip();
    resetRating();
    shuffle();
    resetTimer();
    moves = 0;
    counter.innerHTML = moves;
}

function flipCard() {
    if (lockBoard) {
        return;
    }
    if (this === firstCard) {
        return;
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moveCounter();
    ratingSet();
    checkForMatch();
}

function checkForMatch() {
    firstCard.dataset.planet === secondCard.dataset.planet ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

function resetFlip() {
    cards.forEach(card => {
        card.classList.remove('flip', 'match');
        card.addEventListener('click', flipCard);
        card.addEventListener("click", congratulations);
    })
}

function resetRating() {
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
}

function resetTimer() {
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}



function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    launchTimer();
}

function launchTimer() {
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

function ratingSet() {
    if (moves > 10) {
        stars[2].style.visibility = "collapse";
    }
    else if (moves > 16) {
        stars[1].style.visibility = "collapse";
    }
}

function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        let finalTime = timer.innerHTML;
        let starRating = document.querySelector(".stars").innerHTML;

        modal.classList.add("show");
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        closeModal();
    };
}

function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain() {
    modal.classList.remove("show");
    startGame();
}