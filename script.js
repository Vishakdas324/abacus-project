

  let timerId;
  let result = 0;
  let isTimerRunning = false;
  let transitionSpeed = 1000;
  let negativeCount = 0;
  let generationCount = 0;

  function startTimer() {
    if (!isTimerRunning) {
      displayRandomNumber();
      timerId = setInterval(displayRandomNumber, transitionSpeed);
      isTimerRunning = true;
    }
  }

  function stopTimer() {
    clearInterval(timerId);
    isTimerRunning = false;
  }

  function resetProgram() {
    clearInterval(timerId);
    result = 0;
    const output = document.getElementById('output');
    output.style.opacity = 1;
    output.classList.remove('final-result');
    output.innerHTML = '0';
    isTimerRunning = false;
    negativeCount = 0;
    generationCount = 0;
  }

  function displayRandomNumber() {
    if (isTimerRunning) {
      const randomNumber = generateRandomNumber();

      const output = document.getElementById('output');
      output.style.opacity = 0;

      // Play sound effect
      playTicSound();

      setTimeout(() => {
        output.textContent = randomNumber;
        output.style.opacity = 1;
      }, transitionSpeed);

      result = calculateResult(result, '+', randomNumber);

      generationCount++;

      if (generationCount === 15) {
        negativeCount = 0;
        generationCount = 0;
      }
    }
  }

  function playTicSound() {
    const ticSound = document.getElementById('ticSound');
    ticSound.pause();
    ticSound.currentTime = 0; // Reset the audio to the beginning
    ticSound.play();
  }

  function generateRandomNumber() {
    let randomNumber;
    if (generationCount < 2) {
      randomNumber = Math.floor(Math.random() * 100);
    } else {
      randomNumber = Math.floor(Math.random() * 20) + 1;
      randomNumber *= Math.random() < 0.5 ? -1 : 1;

      if (randomNumber < 0) {
        negativeCount++;
      }

      if (negativeCount > 2) {
        randomNumber = Math.abs(randomNumber);
      }
    }

    return randomNumber;
  }

  function calculateResult(currentResult, symbol, number) {
    return currentResult + number;
  }

  function showAnswer() {
    const output = document.getElementById('output');
    output.classList.add('final-result');
    output.innerHTML = result;
    setTimeout(() => {
      output.style.opacity = 1;
    }, transitionSpeed);
  }

  function adjustSpeed(value) {
    transitionSpeed = value * 1000;
    if (isTimerRunning) {
      clearInterval(timerId);
      timerId = setInterval(displayRandomNumber, transitionSpeed);
    }
  }

  document.getElementById('speedInput').addEventListener('change', function () {
    const speedValue = parseFloat(this.value);
    adjustSpeed(speedValue);
  });

  var speedDiv = document.getElementById('speedDiv');
  var stopwatchLink = document.getElementById('stopwatchLink');
  var setButton = document.getElementById('setButton');

  stopwatchLink.addEventListener('click', function () {
    speedDiv.classList.remove('d-none');
  });

  setButton.addEventListener('click', function () {
    speedDiv.classList.add('d-none');
  });
