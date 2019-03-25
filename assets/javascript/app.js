$(document).ready(function () {

  var correct = 0; //holds correct answer value
  var incorrect = 0; //hold incorrect answer value
  var counter = 0; //holds question position
  var innerLength = 0;
  var questionSec = 30;
  var transitionSec = 5;
  var questionID;
  var transitionID;
  var isCorrect = false;
  var isIncorrect = false;
  var isTimeUp = false;

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

  innerLength = triviaQuestions[0].choice.length;
  outerLength = triviaQuestions.length;

  var audio = new Audio('./assets/audio/uigoku.mp3');
  var hitSound = new Audio('./assets/audio/dbz hit.mp3');
  var powerSound = new Audio('./assets/audio/powerup.mp3');

  //plays Dragon Ball Z music
  function playTheme() {
    audio.play();
  }

  //plays sound effect
  function hit() {
    hitSound.play();
  }

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

      button.addClass("user-choice");

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

    counter = 0;
    questionSec = 30;
    transitionSec = 5;
    audio.pause();
    audio.currentTime = 0;
    questionStop();
    transitionStop();
    event.preventDefault();
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

  //we reinitialize our variables to our timer can restart correctly
  function reInit() {
    counter++;
    questionSec = 30;
    transitionSec = 5;
    isCorrect = false;
    isIncorrect = false;
    isTimeUp = false;
    $("#msg").empty();
  }

  function endGame(num) {

    if (num == 9) {
      questionStop();
      transitionStop();
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

    questionSec--;

    $("#show-time").html("<h2> Time Remaining: " + questionSec + "</h2>");

    if (questionSec === 0) {
      endGame(counter);
      incorrect++;
      isTimeUp = true;
      questionStop();
      timeMsg(counter);
      $("#choice").empty();
      transitionStart();
    }
  }

  function transitionStart() {
    transitionID = setInterval(transitionTimer, 1000);

  }

  //function transition timer
  function transitionTimer() {

    transitionSec--;

    console.log("transition time: " + transitionSec);

    if (transitionSec === 0) {
      transitionStop();
      $("#correct-image").empty();
      $("#correct-answer").empty();
      reInit();
      showQuestion(counter);
      questionStart();

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

  //questionStart();




  //}


});