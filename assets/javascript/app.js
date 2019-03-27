$(document).ready(function () {

  var correct = 0; //holds correct answer value
  var incorrect = 0; //hold incorrect answer value
  var counter = 0; //holds question position
  var innerLength = 0;
  var questionSec = 30; //question duration (30 seconds)
  var transitionSec = 5; //transition duration (5 seconds)
  var questionID; //holds value of our question timer variable
  var transitionID; //holds value of our transition timer variable
  var isCorrect = false; //boolean to check if the user selected correct answer
  var isIncorrect = false; //boolean to check if the user selected the incorrect answer
  var isTimeUp = false; //boolean to check if the time ran out for the question

  //structure to hold trivia questions, choices, and answers
  var triviaQuestions = [
    {
      question: "Which saga did Goku attain Super Saiyan 3?",
      choice: [
        "Frieza Saga",
        "Cell Saga",
        "Buu Saga",
        "Tournament of Power"
      ],
      answer: 2,
      img: "./assets/images/buusaga.jpg"
    },
    {
      question: "What planet did the saiyans come from?",
      choice: [
        "Planet Vegeta",
        "Namek",
        "Earth",
        "Prison Planet"
      ],
      answer: 0,
      img: "./assets/images/planetvegeta.jpg"
    },
    {
      question: "Who cut Vegeta's tail off?",
      choice: [
        "Goku",
        "Gohan",
        "Krillin",
        "Yajirobe"
      ],
      answer: 3,
      img: "./assets/images/yajirobe.jpg"
    },
    {
      question: "How many Dragon Balls are needed to make a wish?",
      choice: [
        "2",
        "5",
        "7",
        "10"
      ],
      answer: 2,
      img: "./assets/images/dragonballs.jpg"
    },
    {
      question: "Who is Goku's father?",
      choice: [
        "Bardock",
        "Raditz",
        "Broly",
        "King Vegeta"
      ],
      answer: 0,
      img: "./assets/images/bardock.png"
    },
    {
      question: "What body part is Future Gohan missing?",
      choice: [
        "Foot",
        "Eye",
        "Ear",
        "Arm"
      ],
      answer: 3,
      img: "./assets/images/futuregohan.png"
    },
    {
      question: "Who did Trunks & Goten disguise themselves as while fighting Android 18?",
      choice: [
        "Masked Man",
        "Mighty Mask",
        "Mystery Mask",
        "Great Saiyman"
      ],
      answer: 1,
      img: "./assets/images/mightymask.png"
    },
    {
      question: "Who uses the 'Wolf Fang Fist' technique?",
      choice: [
        "Goku",
        "Yamcha",
        "Krillin",
        "Tien"
      ],
      answer: 1,
      img: "./assets/images/yamcha.jpg"
    },
    {
      question: "Time traveler that came from the future?",
      choice: [
        "Trunks",
        "Goku",
        "Vegeta",
        "Dende"
      ],
      answer: 0,
      img: "./assets/images/futuretrunks.jpg"
    },
    {
      question: "Who is Vegeta's wife?",
      choice: [
        "Chi Chi",
        "Android 18",
        "Videl",
        "Bulma"
      ],
      answer: 3,
      img: "./assets/images/bulma.jpg"
    }
  ];

  //length of our choices
  innerLength = triviaQuestions[0].choice.length;

  //variables to play our audio
  var audio = new Audio('./assets/audio/uigoku.mp3');
  var hitSound = new Audio('./assets/audio/dbz hit.mp3');
  var powerSound = new Audio('./assets/audio/powerup.mp3');

  //plays Dragon Ball Z music
  function playTheme() {
    audio.play();
  }

  //plays sound effect on incorrect answer
  function hit() {
    hitSound.play();
  }

  //plays sound effect on correct answer
  function power() {
    powerSound.play();
  }

  //generate question function
  function showQuestion(num) {

    //output question and possible choices
    $("#question").html("<h2>" + triviaQuestions[num].question + "</h2>");

    for (var j = 0; j < innerLength; j++) {

      //output choices to the user
      var button = $("<button>" + triviaQuestions[num].choice[j] + "</button>" + "<br>");

      button.addClass("user-choice btn btn-primary");

      //append button values to our choice div
      $("#choice").append(button);

      //each choice div will have a value, that correlates to it's position in our triviaquestion.choice object array
      button.attr("value", j);
    }

  }

  //click event handler for whichever button the user clicks....
  $(document).on("click", ".user-choice", function () {

    //extract the value from the button user clicks
    var userChoice = ($(this).attr("value"));

    //convert to integer since this was originally a string
    userChoice = parseInt(userChoice);

    console.log(userChoice);

    //if the user choice is correct
    if (userChoice === triviaQuestions[counter].answer) {
      endGame(counter);
      power(); //play sound effect
      correct++; //increment our correct variable
      isCorrect = true; //change our boolean to true
      questionStop(); //stop our question timer
      timeMsg(counter); //output the correct msg to user
      $("#choice").empty(); //clear out our div
      transitionStart(); //start our transition timer
    }
    //if the user choice is incorrect
    else if (userChoice != triviaQuestions[counter].answer) {
      endGame(counter);
      hit(); //play sound effect
      incorrect++; //increment our incorrect variable
      isIncorrect = true; //change our boolean to true
      questionStop(); //stop our question timer
      timeMsg(counter); //output the incorrect msg to user
      $("#choice").empty(); //clear out our div
      transitionStart(); //start our transition timer
    }
  });

  //starts trivia game
  $("#start").on("click", function (event) {

    //we have to reinitialize our variable here, empty divs and stop/start our timers
    counter = 0;
    questionSec = 30;
    transitionSec = 5;
    audio.pause();
    audio.currentTime = 0;
    questionStop();
    transitionStop();
    $("#question").empty();
    $("#show-time").empty();
    $("#msg").empty();
    $("#choice").empty();
    $("#correct-answer").empty();
    $("#result").empty();
    $("#correct-image").empty();
    playTheme(); //start our theme music
    showQuestion(counter); //shows our question
    questionStart(); //starts our question timer
  
  });

  //pauses and restart music on user click
  $("#pause").on("click", function () {
    if (audio.paused) {
      audio.play();
    }
    else {
      audio.pause();
    }
  });

  //we reinitialize our variables so our timer can restart correctly
  function reInit() {
    counter++;
    questionSec = 30;
    transitionSec = 5;
    isCorrect = false;
    isIncorrect = false;
    isTimeUp = false;
    $("#msg").empty();
  }

  //stops the game and outputs the results of the trivia game to the user
  function endGame(num) {

    if (num == 9) {
      questionStop();
      transitionStop();
      $("#result").empty();
      $("#result").append("Correct: " + correct + "<br>");
      $("#result").append("Incorrect: " + incorrect);

    }

  }

  //function to handle image output and message output to user...
  function timeMsg(num) {

    //our image variable
    var choiceImage = $("<img>");
    //our correct answer, we'll use this as an index
    var choiceIndex = triviaQuestions[num].answer;

    //handles if the user chooses correct answer
    if (isCorrect == true) {

      $("#msg").append("Correct Answer!");
      $("#correct-answer").append(triviaQuestions[num].choice[choiceIndex]);
      choiceImage.attr("src", triviaQuestions[num].img);
      $("#correct-image").empty().append(choiceImage);
    }
    //handles if the user chooses incorrect answer
    else if (isIncorrect == true) {

      $("#msg").append("Incorrect Answer!");
      $("#correct-answer").append(triviaQuestions[num].choice[choiceIndex]);
      choiceImage.attr("src", triviaQuestions[num].img);
      $("#correct-image").empty().append(choiceImage);
    }
    //handles if the user time runs out
    else if (isTimeUp == true) {

      $("#msg").append("Out of Time!");
      $("#correct-answer").append(triviaQuestions[num].choice[choiceIndex]);
      choiceImage.attr("src", triviaQuestions[num].img);
      $("#correct-image").empty().append(choiceImage);

    }
  }

  //starts my timer
  function questionStart() {
    questionID = setInterval(questionTimer, 1000);
  }

  //function question timer
  function questionTimer() {

    //countdown the question timer
    questionSec--;

    //append to our show-time div
    $("#show-time").html("<h2> Time Remaining: " + questionSec + "</h2>");

    //if the timer hits 0, we ....
    if (questionSec === 0) {
      //endGame(counter); //check end of game
      incorrect++; //increment incorrect guess variable
      isTimeUp = true; //turn our boolean to true
      questionStop(); //stop the question timer
      timeMsg(counter); //display our message
      $("#choice").empty(); //empty our div
      transitionStart(); //start our transition timer
    }
  }

  //starts my transition timer
  function transitionStart() {
    transitionID = setInterval(transitionTimer, 1000);

  }

  //function transition timer
  function transitionTimer() {

    //countdown the transition timer
    transitionSec--;

    //if the transition timer hits 0, we ...
    if (transitionSec === 0) {
      console.log("counter: " + counter);
      endGame(counter); //check end of game
      transitionStop(); //stop our transition timer
      $("#correct-image").empty(); //empty our image div
      $("#correct-answer").empty(); //empty our correct-answer div
      reInit(); //reinitialize our timers for question and transition
      showQuestion(counter); //show our next question
      if (counter < 9) {
        questionStart(); //start our question timer
      }
      
    }

  }

  //stops question timer
  function questionStop() {
    clearInterval(questionID);
    $("#correct-image").empty();
    $("#correct-answer").empty();
  }

  //stops transition timer
  function transitionStop() {
    clearInterval(transitionID);
    $("#correct-image").empty();
    $("#correct-answer").empty();
  }

});