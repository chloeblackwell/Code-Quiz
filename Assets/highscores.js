// Variables 

var highScore = document.querySelector("#highscore");
var clear = document.querySelector(".clear");
var back = document.querySelector(".back");

// Event listener to clear scores 

clear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});

var combinedScores = localStorage.getItem('combinedScores');
combinedScores = JSON.parse(combinedScores);

if (combinedScores !== null) {

    for (var i = 0; i < combinedScores.length; i++) {

        var newLi = document.createElement("li");
        newLi.textContent = combinedScores[i].initials + " " + combinedScores[i].score;
        highScore.appendChild(newLi);
    }
}

// Event listener to move back to index page 
back.addEventListener('click', function () {
    window.location.replace("./index.html");
});
