let currentQuestion = 0;
let score = 0;
let timer;
let totalTime = 600; // in seconds

function startQuiz() {
  const nameInput = document.getElementById('name').value;
  if (!nameInput) {
    alert('Please enter your name.');
    return;
  }

  document.getElementById('participant-name').innerText = `Participant: ${nameInput}`;

  document.getElementById('home-page').style.display = 'none';
  document.getElementById('quiz-page').style.display = 'block';

  startTimer();
  loadQuestion(currentQuestion);
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  document.getElementById('timer').innerText = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  totalTime--;
  if (totalTime < 0) {
    clearInterval(timer);
    endQuiz();
  }
}

function loadQuestion(questionIndex) {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = `<h3>Question ${questionIndex + 1}</h3>
    <p>Sample Question ${questionIndex + 1}</p>
    <button onclick="checkAnswer('A')">Option A</button>
    <button onclick="checkAnswer('B')">Option B</button>
    <button onclick="checkAnswer('C')">Option C</button>
    <button onclick="checkAnswer('D')">Option D</button>`;
}

function checkAnswer(selectedOption) {
  // Assume correct answer is 'A' for all questions
  const correctAnswer = 'A';
  if (selectedOption === correctAnswer) {
    score++;
  }
  document.getElementById('score').innerText = `Score: ${score}`;
  currentQuestion++;
  if (currentQuestion < 10) {
    loadQuestion(currentQuestion);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById('quiz-page').style.display = 'none';
  document.getElementById('result-page').style.display = 'block';

  document.getElementById('total-time').innerText = `Total Time Taken: ${600 - totalTime} seconds`;
  document.getElementById('total-questions').innerText = `Total Questions: 10`;
  document.getElementById('attempted-questions').innerText = `Attempted Questions: 10`;
  document.getElementById('correct-questions').innerText = `Correct Questions: ${score}`;
  document.getElementById('wrong-questions').innerText = `Wrong Questions: ${10 - score}`;
  const scorePercentage = (score / 10) * 100;
  document.getElementById('score-percentage').innerText = `Score Percentage: ${scorePercentage}%`;
}

// Continued from the previous code snippet...

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
  
    document.getElementById('total-time').innerText = `Total Time Taken: ${600 - totalTime} seconds`;
    document.getElementById('total-questions').innerText = `Total Questions: 10`;
    document.getElementById('attempted-questions').innerText = `Attempted Questions: 10`;
    document.getElementById('correct-questions').innerText = `Correct Questions: ${score}`;
    document.getElementById('wrong-questions').innerText = `Wrong Questions: ${10 - score}`;
    const scorePercentage = (score / 10) * 100;
    document.getElementById('score-percentage').innerText = `Score Percentage: ${scorePercentage}%`;
  }
  
  function nextQuestion() {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
  
  function goToHomePage() {
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
  }
  