const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Tesla", "Edison"],
    answer: "Einstein",
  },
  {
    question: "Which ocean is the largest?",
    options: ["Indian", "Pacific", "Atlantic", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "70°C"],
    answer: "100°C",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Charles Dickens", "Mark Twain", "Wordsworth"],
    answer: "Shakespeare",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Dolphin"],
    answer: "Blue Whale",
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Tiger", "Leopard", "Cheetah", "Lion"],
    answer: "Cheetah",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 30;
let timerInterval;
let totalTime = 0;

const questionContainer = document.getElementById("questionContainer");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer");
const currentQuestionDisplay = document.getElementById("currentQuestion");
const scoreContainer = document.getElementById("scoreContainer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

function loadQuestion() {
  clearInterval(timerInterval);
  timer = 30;
  timerDisplay.textContent = timer;
  feedback.textContent = "";
  currentQuestionDisplay.textContent = currentQuestionIndex + 1;

  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    ${currentQuestion.options
      .map(
        (option, index) =>
          `<div><label><input type="radio" name="answer" value="${option}"> ${option}</label></div>`
      )
      .join("")}
  `;

  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    totalTime++;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    feedback.textContent = "Please select an answer!";
    feedback.className = "feedback incorrect";
    return;
  }

  const answer = selected.value;
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (answer === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
    score += 10;
  } else {
    feedback.textContent = `❌ Incorrect! Correct: ${correctAnswer}`;
    feedback.className = "feedback incorrect";
  }

  clearInterval(timerInterval);
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = "<h2>🎉 Quiz Completed!</h2>";
  feedback.textContent = "";
  scoreContainer.innerHTML = `
    <p>Total Score: ${score} / 100</p>
    <p>Total Time Used: ${totalTime}s</p>
  `;
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";
}

prevBtn.addEventListener("click", prevQuestion);
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitAnswer);

loadQuestion();
