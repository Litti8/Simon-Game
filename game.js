// alert("This is alert, that everything is OK");
let userClickedPattern = [];
let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
let level = 0;

$("body").keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

// function handler: addEventListener for each button
// add this choice to userClickedPattern array
// play the sound that corresponds to the button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  // play button audio
  var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
  audio.play();

  // Animated Press.
  animatedPress(userChosenColour);

  // check the answer
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  console.log("success");

  // check if the secuence is going success
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Succes");

    // check if the secuence has finished
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");

    // play the wrong sound, showing the background wrong answer and game over message.
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    // reset the values for the new start
    startOver();
  }
}

function nextSequence() {
  // reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

  // increase the variable level by 1
  level++;
  // update the "h1".
  $("#level-title").text("Level " + level);

  // create a random number beetwen 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);

  // chosen a random colour
  let randomChosenColour = buttonColors[randomNumber];

  //add a new item color to game pattern
  gamePattern.push(randomChosenColour);

  //select a button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // play button audio
  var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// Animated Press function
function animatedPress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// this function reset some values to restart
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
