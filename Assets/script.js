var questionsArray = [
    {
        questionText: "Commonly used data types DO NOT inlude:",
        answers: ["alerts", "booleans", "numbers", "strings"],
        answerId:"alerts"
    },
    {
        questionText: "The condition in an if/else statement is enclosed within __________",
        answers: ["curly braces", "parenthesis", "quotes", "square brackets"],
        answerId: "parenthesis"
    },
    {
        questionText: "Arrays in JavaScript can be used to store __________",
        answers: ["booleans", "numbers and strings", "other arrays", "all of the above"],
        answerId: "all of the above"
    },
    {
        questionText: "String values must be enclosed within __________ when being assigned to variables.",
        answers: ["commas", "curly braces", "quotes", "parenthesis"],
        answerId: "quotes"
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the degugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answerId: "for loops"
    }
]
// Variables 
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var startQuiz = document.querySelector(".start-quiz");
var questions = document.querySelector("#questions");
var mainContent = document.querySelector("#main");
// Seconds in the game 
var secondsLeft = 90; 
// Seconds that are penalised 
var penalty = 15;
var interval = 0;
var ulNew = document.createElement("ul");

// Adding click function to the button 

startQuiz.addEventListener('click', function  () {
    if (interval === 0 ) {
        interval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft;

            if (secondsLeft <=0 ) {
                clearInterval(interval);
                finished();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {

    questions.innerHTML = "";
    ulNew.innerHTML = "";

    // Loops through the questions 

    for ( var i = 0; i < questionsArray.length; i++) {

        var userQuestions = questionsArray[questionIndex].questionText;
        var userOptions = questionsArray[questionIndex].answers;
        questions.textContent = userQuestions; 
    }

    userOptions.forEach(function (newOption) {
        var optionList = document.createElement("li");
        optionList.textContent = newOption;
        questions.appendChild(ulNew);
        ulNew.appendChild(optionList);
        optionList.addEventListener('click', (compare));
    })
}
// This function compares the answers of the question to the correct answer 
function compare(event) {

    var element = event.target;

    if (element.matches("li")) {

      var wording = document.createElement("h3");
      wording.setAttribute("id", "wording");
      
      if (element.textContent == questionsArray[questionIndex].answerId) {
          score++;
          wording.textContent = "Correct!" 
      } else { 
          // Deducts 15 seconds off time for all wrong answers
          secondsLeft = secondsLeft - penalty;
          wording.textContent = "Wrong!" 
      }
    };

    questionIndex++;

    if (questionIndex >= questionsArray.length) {
        finished();
        wording.textContent = "End of quiz!" + " " + "You got " + score;
    } else {
        render(questionIndex);
    };

    questions.appendChild(wording);
};
// This will append the last page 
function finished() {
    questions.innerHTML = "";
    timer.innerHTML = "";

    var newH1 = document.createElement("h1");
    newH1.setAttribute("id" , "newH1");
    newH1.textContent = "All Done!";

    questions.appendChild(newH1);

    var newP = document.createElement("p");
    newP.setAttribute("id" , "newP");

    questions.appendChild(newP);

    // Turns time remaining into score 
    if (secondsLeft >= 0) {
        var remainingTime = secondsLeft;
        var secondP = document.createElement("p");
        clearInterval(interval);
        newP.textContent = "Your final score is: " + remainingTime;

        questions.appendChild(secondP);
    }

    // Labels 

    var label = document.createElement("label");
    label.setAttribute("id", "label");
    label.textContent = "Enter you initials: ";

    questions.appendChild(label);

    // User Input 

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.textContent = "";

    questions.appendChild(input);

    // Submit Button 

    var submit = document.createElement("button");
    submit.setAttribute("type","submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";

    questions.appendChild(submit);

    // Local storage for highscores and event listener 

    submit.addEventListener('click', function () {
        var initials = input.value;

        if (initials === null ) {
            alert ("No initals entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: remainingTime
            }
            var combinedScores = localStorage.getItem('combinedScores');
            if (combinedScores === null ) {
                combinedScores = [];
            } else {
                combinedScores = JSON.parse(combinedScores);
            }
            combinedScores.push(finalScore);
            var newScores = JSON.stringify(combinedScores);
            localStorage.setItem("combinedScores", newScores);

            // Takes user to final page 

            window.location.replace("./highscores.html");

        }
    });

};
    

