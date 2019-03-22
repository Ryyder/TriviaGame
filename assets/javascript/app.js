$(document).ready(function () {

  var correct = 0; //holds correct answer value
  var incorrect = 0; //hold incorrect answer value
  var counter = 0; //holds question position
  var innerLength = 0;
  var outerLength = 0;
  var questionSec = 10;
  var transitionSec = 5;
  var questionID;
  var transitionID;


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
      answer: 2
    },
     {
      question: "What planet did the saiyans come from?",
      choice: [
        "Planet Vegeta",
        "Namek",
        "Earth",
        "Prison Planet"
     ],
      answer: 0
    },
    {
      question: "Who cut Vegeta's tail off?",
      choice: [
        "Goku",
        "Gohan",
        "Krillin",
        "Yajirobe"
      ],
      answer: 3
    }, 
    {
      question: "How many Dragon Balls are needed to make a wish?",
      choice: [
        "2",
        "5",
        "7",
        "10"
      ],
      answer: 2
    },
    {
      question: "Who is Goku's father?",
      choice: [
        "Bardock",
        "Raditz",
        "Broly",
        "King Vegeta"
      ],
      answer: 0
    },
    {
      question: "What body part is Future Gohan missing?",
      choice: [
        "Foot",
        "Eye",
        "Ear",
        "Arm"
      ],
      answer: 3
    },
    {
      question: "Who did Trunks & Goten disguise themselves as while fighting Android 18?",
      choice: [
        "Masked Man",
        "Mighty Mask",
        "Mystery Mask",
        "Great Saiyman"
      ],
      answer: 1
    },
    {
      question: "Who uses the 'Wolf Fang Fist' technique?",
      choice: [
        "Goku",
        "Yamcha",
        "Krillin",
        "Tien"
      ],
      answer: 1
    },
    {
      question: "Time traveler that came from the future?",
      choice: [
        "Trunks",
        "Goku",
        "Vegeta",
        "Dende"
      ],
      answer: 0
    },
    {
      question: "Who is Vegeta's wife?",
      choice: [
        "Chi Chi",
        "Android 18",
        "Videl",
        "Bulma"
      ],
      answer: 3
    }
  ];

  /* console.log("Questions: " + triviaQuestions[0].question);
  console.log("choices: " + triviaQuestions[0].choice);
  console.log("Correct Answer: " + triviaQuestions[0].answer); */
  console.log("choices: " + triviaQuestions[0].answer);

  innerLength = triviaQuestions[0].choice.length;
  outerLength = triviaQuestions.length;

  console.log(triviaQuestions[counter].question);
  
  //generate question function
  function showQuestion(num) {
      //output question and possible choices
      $("#question").html("<h1>" + triviaQuestions[num].question + "</h1>");
      for (var j = 0; j < innerLength; j++) {
        //output the choices
        $("#choice").append("<p>Choices: " + triviaQuestions[num].choice[j] + "</p>");
      }     
  }

  /* $("#choice").html("<p>Choices: " + triviaQuestions[0].choice[0]+ "</p>");
  $("#choice").html("<p>Choices: " + triviaQuestions[0].choice[1]+ "</p>"); */
  //console.log(counter);
  showQuestion(counter);

  //clear choice function
  function reInit() {
    counter++;
    questionSec = 30;
    transitionSec = 5;
    $("#choice").empty();
    $("#msg").empty();
  }

  function timeMsg() {
    $("#msg").append("Out of Time!");
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
      questionStop();
      timeMsg();
      //reInit();
      transitionStart();
      //showQuestion(counter);
      //questionStart();
      //alert("Time Up!");
    }
  }
  
  function transitionStart() {
    transitionID = setInterval(transitionTimer, 1000);

  }

  //function transition timer
  function transitionTimer() {

    transitionSec--;

    console.log("transition time: " + transitionSec);

    if(transitionSec === 0) {
      transitionStop();
      timeMsg();
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

  //reset game function
  function resetGame() {



  }

  //
});