// Define your questions with options for each category
const questions = {
    "Pipes and Cisterns": [{
            question: "A pipe can fill a tank in 6 hours. After half the tank is filled, three more similar pipes are opened. What is the total time taken to fill the tank completely if all the pipes are opened together?",
            options: ["9 hours", "6 hours", "4 hours", "3 hours"],
            correctAnswer: "3 hours"
        },
        {
            question: "Pipe A can fill a tank in 10 hours, while Pipe B can fill the same tank in 15 hours. If both pipes are opened together, how long will it take to fill the tank?",
            options: ["6 hours", "7.5 hours", "8 hours", "9 hours"],
            correctAnswer: "6 hours"
        },
        {
            question: "Two pipes A and B can fill a tank in 20 hours and 30 hours respectively. If both pipes are opened simultaneously, after how much time should pipe A be closed so that the tank is full in 18 hours?",
            options: ["10 hours", "12 hours", "14 hours", "16 hours"],
            correctAnswer: "10 hours"
        },
        {
            question: "Pipe A can fill a tank in 8 hours and Pipe B can empty the same tank in 12 hours. If both pipes are opened together, in how many hours will the tank be filled?",
            options: ["24 hours", "16 hours", "18 hours", "20 hours"],
            correctAnswer: "24 hours"
        },
        {
            question: "Pipe A can fill a tank in 12 hours and Pipe B can fill the same tank in 15 hours. If both pipes are opened together and Pipe B is closed after 3 hours, how long will it take for Pipe A to fill the tank?",
            options: ["6 hours", "7 hours", "8 hours", "9 hours"],
            correctAnswer: "7 hours"
        }
    ],
    "Probability": [{
            question: "What is the probability of rolling a prime number on a fair six-sided die?",
            options: ["1/2", "1/3", "1/4", "1/6"],
            correctAnswer: "1/3"
        },
        {
            question: "If you draw a card from a standard deck of 52 playing cards, what is the probability of drawing a red card?",
            options: ["1/2", "1/3", "1/4", "1/5"],
            correctAnswer: "1/2"
        },
        {
            question: "If you toss a fair coin three times, what is the probability of getting exactly two heads?",
            options: ["1/4", "1/2", "1/8", "1/3"],
            correctAnswer: "1/4"
        },
        {
            question: "In a bag, there are 4 red balls, 3 green balls, and 2 blue balls. If you randomly pick one ball from the bag, what is the probability of picking a red ball?",
            options: ["2/9", "1/3", "1/4", "4/9"],
            correctAnswer: "1/3"
        },
        {
            question: "A jar contains 20 marbles, of which 4 are black, 6 are blue, and 10 are white. If you pick one marble at random from the jar, what is the probability of picking a black or blue marble?",
            options: ["1/2", "1/3", "5/10", "4/20"],
            correctAnswer: "1/2"
        }
    ]
};

// Function to redirect to the quiz page with selected category
function redirectToQuiz(category) {
    // Store the selected category and user's name in localStorage for later use
    localStorage.setItem('selectedCategory', category);
    localStorage.setItem('userName', document.getElementById('name').value.trim());
    // Redirect to the quiz page
    window.location.href = 'quiz.html';
}

// Function to start the quiz
function startQuiz() {
    var name = document.getElementById('name').value.trim();
    if (name === '') {
        alert('Please enter your name to start the quiz.');
    } else {
        // Store the user's name in localStorage for later use
        localStorage.setItem('userName', name);
        // Redirect to the category selection page
        window.location.href = 'category.html';
    }
}


// Function to handle category selection and start the quiz
function selectCategory(category) {
    redirectToQuiz(category);
}

let currentQuestionIndex = 0;
let score = 0;

// Function to load next question on the quiz page
function loadNextQuestion() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    const categoryQuestions = questions[selectedCategory];
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    questionContainer.innerHTML = ''; // Clear previous question
    optionsContainer.innerHTML = ''; // Clear previous options

    // Display the current question
    const currentQuestion = categoryQuestions[currentQuestionIndex];
    const questionElement = document.createElement('p');
    questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    questionContainer.appendChild(questionElement);

    // Display options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.onclick = function() {
            checkAnswerAndLoadNext(option);
        };
        optionsContainer.appendChild(optionElement);
    });
}

// Function to check the answer and load the next question
function checkAnswerAndLoadNext(selectedOption) {
    const selectedCategory = localStorage.getItem('selectedCategory');
    const categoryQuestions = questions[selectedCategory];
    const currentQuestion = categoryQuestions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        score++; // Increment score for correct answer
    }

    // Increase the question index
    currentQuestionIndex++;

    // Load the next question if available
    if (currentQuestionIndex < categoryQuestions.length) {
        loadNextQuestion();
    } else {
        // If all questions are answered, redirect to the result page
        localStorage.setItem('score', score);
        window.location.href = 'result.html';
    }
}

// Function to display the result
function displayResult() {
    const userName = localStorage.getItem('userName');
    const selectedCategory = localStorage.getItem('selectedCategory');
    const totalQuestions = questions[selectedCategory].length;
    const userScore = localStorage.getItem('score');

    document.getElementById('name').textContent = userName;
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-answers').textContent = userScore;
    document.getElementById('score').textContent = ((userScore / totalQuestions) * 100).toFixed(2) + '%';
}
// Function to start the quiz again
function startAgain() {
    // Clear the stored score
    localStorage.removeItem('score');

    // Check if a category was previously selected
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
        // If a category was selected, redirect to the quiz page with the same category
        window.location.href = 'quiz.html';
    } else {
        // If no category was selected, redirect to the result selection page
        window.location.href = 'result.html';
    }
}

function goToHome() {
    // Redirect to the home page
    window.location.href = 'index.html';
}

// Logic for different pages
const currentPage = window.location.pathname.split('/').pop(); // Get current page filename
if (currentPage === 'quiz.html') {
    loadNextQuestion();
} else if (currentPage === 'result.html') {
    displayResult();
}

// Timer functionality
let timeLeft = 10;
const timerElement = document.getElementById('time');

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            // Add your logic here for when time runs out
            alert('Time is up!');
            // You might want to load the next question or handle the timeout scenario
        }
    }, 1000);
}

// Call the startTimer function to begin the countdown
startTimer();