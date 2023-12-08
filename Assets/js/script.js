//Question Array with title, choices,anwers//
var questions = [{
    title: "What is the primary purpose of JavaScript in web development?",
    choices: ["Styling web pages", "Enhancing user interfaces", "Managing server databases", "Creating server-side applications"],
    answer: "Enhancing user interfaces"
},
{
    title: "How to write an IF statement in JavaScript?",
    choices: ["if i=5", "if i=5 then", "if(i==5)", "if i==5 then"],
    answer: "if(i==5)"
},
{
    title: "What is the role of the addEventListener method in JavaScript?",
    choices: ["Creating HTML elements", "Modifying CSS styles", "Attaching event handlers to DOM elements", "Fetching data from a server"],
    answer: "Attaching event handlers to DOM elements"
},
{
    title: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    choices: ["if (i<>5)", " if i=! 5 then", "if i<>5", "if (i !=5)"],
    answer: "if (i !=5)"
},
{
    title: "What does the acronym API stand for in the context of web development?",
    choices: ["Advanced Programming Interface", "Application Protocol Interface", "Application Programming Interface", "Advanced Protocol Integration"],
    answer: "Application Programming Interface"
},
{
    title: "What is the purpose of the JSON.parse() method in JavaScript?",
    choices: ["Convert a JavaScript object to a JSON string", "Parse JSON data into a JavaScript object", "Validate the syntax of a JSON string", "Encode special characters in a JSON string"],
    answer: "Parse JSON data into a JavaScript object"
}
]

//Declarations for function variables, scores, and timers //
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Function to start the timer//
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
   
    //when the timer reaches 0, than the Quiz is over//
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//  Clearing timer //
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Quiz Completed</h2>
<h3>Your final score: ` + score +  ` /100</h3>
<h3>That means you got: ` + score / 10 +  ` questions correct</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Submit</button>`;

document.getElementById("main_quiz_screen").innerHTML = quizContent;
}

// local storage for Scores value//
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// Recording users initials & score //
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + ` 's Highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Go Back</button>`;

document.getElementById("main_quiz_screen").innerHTML = quizContent;
}

// Clear users initials & score from local storage//
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//Reset function//
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1> Code Quiz </h1>
<button onclick="start()">Start</button>`;

document.getElementById("main_quiz_screen").innerHTML = quizContent;
}

//Adjusting the timer if the users chooses an incorrect answer//
function incorrect() {
timeLeft -= 10; 
next();
}

// Adjusting the time if the users chooses the correct answer//
function correct() {
score += 15;
next();
}

//loops for the quiz questions//
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()"); 
    } 
    else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()"); 
    }
    quizContent += buttonCode
}



document.getElementById("main_quiz_screen").innerHTML = quizContent;
}
