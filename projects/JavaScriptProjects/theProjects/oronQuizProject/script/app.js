const message = document.getElementById('userMessage'); /* Success or Fail message */
const numT1 = document.getElementById('number1'); /* First Number */
const opSpan = document.getElementById('operator') /* Operator */
const numT2 = document.getElementById('number2'); /* Second Number */
const check = document.getElementById('checkBtn'); /* Check result */
const reset = document.getElementById('resetBtn'); /* Reset */
const userResult = document.getElementById('answer'); /* Input - Users Answer */
const probCounter = document.getElementById('probCounter');
let counter = 0;

const probs = [];
const correctResults = [];
const userAnswers = [];

// Generates an operation for the generateQuestion() function. 
function generateOperator() {
    let operators = ["-", "+", "/", '*'];
    let random = operators[Math.floor(Math.random() * operators.length)];
    return random;
}

// Function that generates the question. Used by the generateQuestions() function.
function generateQuestion() {
    let gen = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    let x = y * gen;
    while (x < y) {
        gen = Math.floor(Math.random() * 10) + 1;
        x = y * gen;
    };
    let operator = generateOperator();
    let result;

    switch (operator) {
        case "+":
            result = x + y;
            break;
        case "-":
            result = x - y;
            break;
        case "*":
            result = x * y;
            break;
        case "/":
            result = y !== 0 ? (x / y) : "Cannot divide by 0";
            break;
    }

    let equation = `${x} ${operator} ${y}`;
    let exists = probs.find((prob) => prob.equation === equation);
    if (!exists) {
        probs.push({ equation, correctAnswer: result });
    }
};

// Function to generate requested AMOUNT of questions.
function generateQuestions(num) {
    for (let i = 0; i < num; i++) {
        generateQuestion();
    }
    console.log(probs);
}

let currentQuestionIndex = 0;

// Display the question using the probs array
function displayQuestion() {
    // Check if we still have questions to display
    if (currentQuestionIndex < probs.length) {
        let problem = probs[currentQuestionIndex];
        let parts = problem.equation.split(" ");

        numT1.innerHTML = parts[0];
        opSpan.innerHTML = parts[1];
        numT2.innerHTML = parts[2];

        counter++;
        probCounter.innerHTML = `Question ${counter} out of ${probs.length}`;

    } else {
        numT1.innerHTML = "";
        numT2.innerHTML = "";
        opSpan.innerHTML = "";
        probCounter.style.color = 'darkgreen';
        probCounter.innerHTML = `<strong>You are done!<br> Check results!</strong>`;

        displayResults();
    }
}

function handleAnswer() {
    let userAnswer = userResult.value;

    userAnswers.push(userAnswer);
    correctResults.push(probs[currentQuestionIndex].correctAnswer);
    // add to the currentQuestion counter and display the next question
    currentQuestionIndex++;

    displayQuestion();
};

check.addEventListener('click', () => {
    handleAnswer();
    userResult.value = "";
    console.log(correctResults);
    console.log(userAnswers);
});

function displayResults() {
    let resultsHTML = /* html */`<h4> Quiz Results </h4>`;

    for (let i = 0; i < probs.length; i++) {
        let userAnswer = userAnswers[i];
        let correctAnswer = correctResults[i];
        let userIsCorrect = userAnswer == correctAnswer;
        resultsHTML += /* html */`Question ${i + 1}: <br>
        ${probs[i].equation} = ${userAnswer} <strong>${userIsCorrect ? '<span style="color:green">Correct</span>' : '<span style="color:red">Incorrect</span>'}</strong>${!userIsCorrect ? ` - The result is ${correctAnswer}` : ''} <br><br>`
    }
    document.getElementById('results').innerHTML = resultsHTML;
    let container = document.getElementsByClassName('container2');
    container[0].className = 'appear'
};

reset.addEventListener('click', () => {
    window.location.reload();
});

// Initialization
generateQuestions(10);
displayQuestion();