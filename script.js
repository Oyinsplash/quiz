const control = document.querySelector(".control");
const questionElement = document.querySelector(".question");
const quizContainer = document.querySelector(".quiz-container");
const answerContainer = document.querySelector(".answer_container");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const quizNumber = document.querySelector(".quiz_number");
const score = document.querySelector(".score");
const summary = document.querySelector("total-score");
const buttons = document.querySelectorAll(".btn");
// store all questions in db array
const db = [
  {
    question: "	HTML is what type of language ?",
    options: [
      { text: "Scripting Language", correct: false },
      { text: "Markup Language", correct: true },
      { text: "Programming Language", correct: false },
      { text: "Network Protocol", correct: false },
    ],
  },
  {
    question: "HTML uses",
    options: [
      { text: "User defined tags", correct: false },
      { text: "Pre-specified tags", correct: false },
      { text: "Fixed tags defined by the language", correct: true },
      { text: "Tags only for linking", correct: false },
    ],
  },
  {
    question: "Fundamental HTML Block is known as ___________.",
    options: [
      { text: "HTML Body", correct: false },
      { text: "HTML Element", correct: false },
      { text: "HTML Element", correct: false },
      { text: "HTML Tag", correct: true },
    ],
  },
  {
    question: "Apart from &lt b &gt tag, what other tag makes text bold ?",
    options: [
      { text: "&lt fat &gt", correct: false },
      { text: "&lt emp &gt", correct: false },
      { text: "&lt strong &gt", correct: true },
      { text: "&lt black &gt", correct: false },
    ],
  },
  {
    question: "HTML web pages can be read and rendered by _________.",
    options: [
      { text: "Compiler", correct: false },
      { text: "Web Browser", correct: true },
      { text: "Server", correct: false },
      { text: "Interpreter", correct: false },
    ],
  },
];
let count = 0;

let scoreCalculator = 0;

function startApp() {
  // Displays quiz on the click of the start button
  if (control.innerHTML === "start" || control.innerHTML === "play again") {
    quizContainer.classList.remove("hide");
    quizNumber.classList.remove("hide");
    control.innerHTML = "next";
    // control.disabled = true;
    // console.log("yea1")
    count = 0;
    score.innerHTML = 0;
  }
  // Changes next button to play again if questions have beenn exhausted
  else if (control.innerHTML === "next" && db.length === count) {
    control.innerHTML = "play again";
    quizContainer.classList.add("hide");
    questionElement.classList.add("hide");
    answerContainer.innerHTML = " ";
    buttons.classList.add("hide");
    quizNumber.textContent = " ";
  }
  // Ensures a user picks an answer before moving to the next question
  if (control.innerHTML === "next") {
    control.disabled = true;
  }

  // Remove previous aswer button when next is clicked
  if (control.innerHTML === "next" || control.innerHTML === "play again") {
    answerContainer.innerHTML = " ";
  }
  // counts number of displayed questions
  if (count < db.length) {
    count += 1;
  }

  // displays number of atempted questions
  quizNumber.innerHTML = `${count}/${db.length}`;

  // displays question
  questionElement.innerHTML = db[count - 1].question;

  for (let select = 0; select < db[count - 1].options.length; select++) {
    const button = document.createElement("button");

    //assigns answer to a button
    button.innerHTML = db[count - 1].options[select].text;
    // adds class of btn to each button
    button.classList.add("btn");
    button.style.cssText =
      "width: 7rem; padding: 0.5rem 0.5rem; background-color: #24116A; color: #FCFAFC; ";

    // if (control.disabled === false) {
    //   button.disabled = true
    // }

    // assigns an attribute of dataset-correct to the button with the right answer
    if (db[count - 1].options[select].correct) {
      button.dataset.correct = db[count - 1].options[select].correct;
    }
    button.addEventListener("click", (e) => {
      const check = button.hasAttribute("data-correct");
      let markGotten = 0;
      //Checks if answer is correct and adds style
      if (check) {
        let markGotten = 50;
        scoreCalculator += markGotten;
        button.style.cssText =
          "width: 7rem; padding: 0.5rem 0.5rem; background-color: #59D590; color: #FCFAFC;";
        button.textContent = "correct";
        // button.setAttribute("marked", true);
        button.disabled = true;
      }

      // Add style for wrong answer
      else {
        let markGotten = 0;
        scoreCalculator += markGotten;
        button.style.cssText =
          "width: 7rem; padding: 0.5rem 0.5rem; background-color: #EF0100; color: #FCFAFC;";
        button.textContent = "wrong";
      }

      control.disabled = false;
      score.innerHTML = scoreCalculator;
    });

    answerContainer.appendChild(button);
  }
}

control.addEventListener("click", startApp);
