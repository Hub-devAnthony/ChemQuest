const button = document.querySelector('.welcome-page-button');
const welcomePage = document.querySelector('.welcome-page');
const gamePage = document.querySelector('.game-page');
const resultPage = document.querySelector('.result-page');

button.addEventListener('click', () => {
  welcomePage.classList.add('hidden');
  setTimeout(() => {
    welcomePage.style.display = 'none';
    gamePage.style.display = 'block';
  }, 500);
});

let currentQuestionIndex = 0;
let correctOption = 0;
let wrongOption = 0

const questionElement = document.querySelector('.question');
const answerButtons = document.querySelectorAll('.answer');
const submitButton = document.querySelector('.submit');
const playAgain = document.querySelector('.play-again-button');
const message = document.querySelector('.result-message');

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index];
    button.classList.remove('correct', 'wrong');
    button.disabled = false;
  });
    document.querySelector('.submit').style.display = 'none';
}
showQuestion();

answerButtons.forEach(button => {
  button.addEventListener('click', () =>
    selectAnswer(button));
});

function selectAnswer (selectedButton) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;
  if (selectedButton.textContent === correctAnswer) {
    correctOption++; document.querySelector('.correct-option').innerHTML = correctOption; 
     if (correctOption > 20) {
      message.textContent = "Good job! You're a sustainability superstar!"
     } 
    selectedButton.classList.add('correct');
  } else {
    wrongOption++;
    if (wrongOption < 10 ) {
      message.textContent = "Don't worry, every step counts toward a greener future!"
    } 
    selectedButton.classList.add('wrong');
    document.querySelectorAll('.answer').forEach(button => {
      if (button.textContent === correctAnswer) {
        button.classList.add('correct');
      } 
    });
  }
  document.querySelectorAll('.answer').forEach(button => {
    button.disabled = true;
  });
  document.querySelector('.submit').style.display = "block";
}

submitButton.addEventListener('click', () => {
   if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; document.querySelector('.progress').innerHTML = currentQuestionIndex;
    showQuestion();
  } else {
    submitButton.textContent = 'View Result';
    submitButton.classList.add('view-result-button');
    submitButton.addEventListener('click', () => {
      gamePage.classList.add('hidden');
      setTimeout(() => {
        gamePage.style.display = 'none';
        resultPage.style.display = 'block';
        resultPage.classList.remove('hidden');
      }, 500);
    });
  }
});

playAgain.addEventListener('click', () => {
  resultPage.classList.add('hidden');
  setTimeout(() => {
    resultPage.style.display = 'none';
    gamePage.style.display = 'block';
    gamePage.classList.remove('hidden');
  }, 500);
});