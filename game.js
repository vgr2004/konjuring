document.addEventListener('DOMContentLoaded', function () {
  const gameContainer = document.getElementById('gamecontainer');
  let score = 0;
  let timer;
  let timeLeft = 60;
  let gameStarted = false;
  let gameSound;
  let backgroundMusic;
  let scoreDisplay;
  let timerDisplay;

  function playSound(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
    return audio;
  }

  function stopSound(sound) {
    if (sound) {
      sound.pause();
    }
  }

  function displayElement(elementType, text) {
    const element = document.createElement(elementType);
    element.textContent = text;
    gameContainer.appendChild(element);
    return element;
  }

  function createButton(text, clickFunction) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickFunction);
    gameContainer.appendChild(button);
  }

  function updateScoreDisplay() {
    if (!scoreDisplay) {
      scoreDisplay = displayElement('div', `Score: ${score}`);
    } else {
      scoreDisplay.textContent = `Score: ${score}`;
    }
  }

  function updateTimerDisplay() {
    if (!timerDisplay) {
      timerDisplay = displayElement('div', `Time left: ${timeLeft} seconds`);
    } else {
      timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
    }
  }

  function createEnemy() {
    if (gameStarted) {
      const enemy = document.createElement('img');
      enemy.src = '200w.gif';
      enemy.classList.add('enemy');
      const gameWidth = gameContainer.offsetWidth;
      const gameHeight = gameContainer.offsetHeight;
      const enemyWidth = 100; 
      const enemyHeight = 100;
      const randomLeft = Math.random() * (gameWidth - enemyWidth);
      const randomTop = Math.random() * (gameHeight - enemyHeight);
      enemy.style.position = 'absolute';
      enemy.style.left = randomLeft + 'px';
      enemy.style.top = randomTop + 'px';

      enemy.addEventListener('click', () => {
        playSound('gunfire.mp3');
        score++;
        enemy.remove();
        updateScoreDisplay();
      });

      gameContainer.appendChild(enemy);

      setTimeout(() => {
        enemy.remove();
      }, 2000);
    }
  }

  function startGame() {
    stopSound(backgroundMusic);
    gameContainer.innerHTML = '';
    gameSound = playSound('gamesound.mp3');
    score = 0;
    updateScoreDisplay();
    updateTimerDisplay();
    timeLeft = 60;
    gameStarted = true;

    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
        createEnemy();
      } else {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    stopSound(gameSound);
    playSound('bgm.mp3');
    gameContainer.innerHTML = '';

    const user = JSON.parse(localStorage.getItem('user'));
    const message = score > 49 ? `You did great, ${user.nickname}!` : `Better luck next time, ${user.nickname}!`;
    displayElement('h1', message);
    displayElement('h2', `Your score: ${score}`);

    createButton('Restart Game', () => {
      location.reload();
    });

    createButton('Go to Home', () => {
      window.location.href = 'home.html';
    });
  }

  const user = JSON.parse(localStorage.getItem('user'));
  displayElement('h1', `Hi ${user.name}, welcome to Konjuring!`);
  displayElement('h2', 'Instructions:');
  displayElement('h2', 'Shoot as many ghouls as possible in 1 minute. Shoot at least 50 to win.');

  createButton('Start', startGame);

  backgroundMusic = playSound('bgm.mp3');

  setInterval(() => {
    if (gameStarted) {
      updateScoreDisplay();
      updateTimerDisplay();
    }
  }, 1000);
});
