$(document).ready(function () {

  var correct = 0; //holds correct answer value
  var incorrect = 0; //hold incorrect answer value
  var counter = 0; //holds question position
  var innerLength = 0;
  var questionSec = 10;
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
      img: "./assets/images/yajirobe"
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

  console.log("Question 2 answer: " + triviaQuestions[1].answer);
  console.log("You guessed: " + triviaQuestions[1].choice[0]);
  console.log("correct answer: " + triviaQuestions[1].answer);
  console.log("image src: " + triviaQuestions[0].img);


  innerLength = triviaQuestions[0].choice.length;
  outerLength = triviaQuestions.length;

  //console.log(triviaQuestions[counter].question);

  //generate question function
  function showQuestion(num) {

    /* for (var i = 0; i < triviaQuestions.length; i++) {
      
      $("#question").append("<h2>" + triviaQuestions[i].question + "</h2>")

      for (var j = 0; j < triviaQuestions[i].choice.length; j++) {

        $("#question").append(`<input type = "radio" name = ${i} value = ${j}>${triviaQuestions[i].choice[j]}</input>`)
      }
    } */

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

  $(document).on("click", ".user-choice", function () {

    //extract the value from the button user clicks
    var userChoice = ($(this).attr("value"));

    //convert to integer since this was originally a string
    userChoice = parseInt(userChoice);

    console.log(userChoice);

    if (userChoice === triviaQuestions[counter].answer) {
      correct++;
      isCorrect = true;
      questionStop();
      timeMsg(counter);
      $("#choice").empty();
      transitionStart();
    }
    else if (userChoice != triviaQuestions[counter].answer) {
      incorrect++;
      isIncorrect = true;
      questionStop();
      timeMsg(counter);
      $("#choice").empty();
      transitionStart();
    }
    console.log("correct answer: " + correct);
    console.log("incorrect answer: " + incorrect);
    console.log("counter: " + counter);
    console.log("isCorrect: " + isCorrect);
    console.log("inIncorrect: " + isIncorrect);

  });



  $("#submit-quiz").on("click", function (event) {

    event.preventDefault();

    /* var q1 = $('input[name=0]:checked').val();
 
     var q2 = $('input[name=1]:checked').val();
 
     var q3 = $('input[name=2]:checked').val();
 
     var q4 = $('input[name=3]:checked').val();
 
     var q5 = $('input[name=4]:checked').val();
 
     var q6 = $('input[name=5]:checked').val();
 
     var q7 = $('input[name=6]:checked').val();
 
     var q8 = $('input[name=7]:checked').val();
 
     var q9 = $('input[name=8]:checked').val();
 
     var q10 = $('input[name=9]:checked').val();
 
     var userSubmit = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
     console.log(userSubmit); 
 
      for (var i = 0; i < userSubmit.length; i++) {
       if (userSubmit[i] == correctAnswers[i]) {
         correct++;
       }
     } 
 
     $("#msg").append(`<h2>${correct}</h2>`); */


  });

  showQuestion(counter);

  //clear choice function
  function reInit() {
    counter++;
    questionSec = 10;
    transitionSec = 5;
    isCorrect = false;
    isIncorrect = false;
    isTimeUp = false;
    //$("#choice").empty();
    $("#msg").empty();
    //$("#correct-image").empty();
  }

  //function to handle image output and message output to user...
  function timeMsg(num) {

    var choiceImage = $("<img>");

    //handles if the user chooses correct answer
    if (isCorrect == true) {

      $("#msg").append("Correct Answer!");
      //$("#correct-answer").append(triviaQuestions[num].answer);
      choiceImage.attr("src", triviaQuestions[num].img);
      $("#correct-image").empty().append(choiceImage);
    }
    //handles if the user chooses incorrect answer
    else if (isIncorrect == true) {

      $("#msg").append("Incorrect Answer!");
      //$("#correct-answer").append(triviaQuestions[num].answer);
      choiceImage.attr("src", triviaQuestions[num].img);
      $("#correct-image").empty().append(choiceImage);
    }
    //handles if the user time runs out
    else if (isTimeUp == true) {

      $("#msg").append("Out of Time!");
      //$("#correct-answer").append(triviaQuestions[num].answer);
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
      reInit();
      showQuestion(counter);
      questionStart();

    }

  }

  //stops question timer
  function questionStop() {
    clearInterval(questionID);
  }

  //stops transition timer
  function transitionStop() {
    clearInterval(transitionID);
  }

  questionStart();




  //}


});