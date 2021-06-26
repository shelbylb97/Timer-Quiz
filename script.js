//Link elements by ID
var startButton = document.querySelector("#startButton");
var timerEl = document.querySelector('#timer');

var questionEl = document.querySelector('#question');
var b1El = document.querySelector('#b1');
var b2El = document.querySelector('#b2');
var b3El = document.querySelector('#b3');
var b4El = document.querySelector('#b4');

var introEl = document.querySelector("#intro");
var quizEl = document.querySelector("#quiz");

//Questions and Answers
var questions = [
	{
		question: "Who was the first Avenger?",
		q1: "Capitan America",
		q2: "Hulk",
		q3: "Iron Man",
		q4: "Hawkeye",
		answer: "Capitan America"
	},
	{
		question: "Who does Bruce Banner turn into when he's angry?",
		q1: "Abomination",
		q2: "Hulk",
		q3: "Hercules",
		q4: "Sentry",
		answer: "Hulk"
	},
	{
		question: "Who does Galactus use as a henchman?",
		q1: "Magneto",
		q2: "Silver Surfer",
		q3: "Professor X",
		q4: "Wolverine",
		answer: "Silver Surfer"
	},
	{
		question: "Who is Tony Stark?",
		q1: "Iron Monger",
		q2: "Whiplash",
		q3: "War Machine",
		q4: "Iron Man",
		answer: "Iron Man"
	},
	{
		question: "Who wants all the Infinity Stones?",
		q1: "Thor",
		q2: "Thanos",
		q3: "Galactus",
		q4: "Dr. Strange",
		answer: "Thanos"
	},
	{
		question: "Who is the coolest?",
		q1: "Not this one",
		q2: "Not this one",
		q3: "Not this one",
		q4: "Hulk",
		answer: "Hulk"
	}];

//Initial variables
var userScore;
var secondsLeft = 60;
var questionIndex = 0;
var timeInt;

//Start the timer
function startTimer() {
	timeInt = setInterval(
		function () {
			secondsLeft--;
			timerEl.textContent = `Timer: ${secondsLeft}`;
			if (secondsLeft === 0) {
				userScore = 0;
				clearInterval(timeInt);
				timerEl.textContent = " ";
				alert("Times Up!");
				userScore = 0;
				enterHiSc();
			}
		}, 1000);
};

//Start the game 
startButton.addEventListener("click", startQuiz);
function startQuiz() {
	userScore = 0;
	startTimer();
	introEl.setAttribute("style", "display: none");
	quizEl.setAttribute("style", "display: block");
	loadQuestions();
};

//Load the questions based on the index
function loadQuestions() {
	questionEl.textContent = questions[questionIndex].question;
	b1El.textContent = `${questions[questionIndex].q1}`;
	b2El.textContent = `${questions[questionIndex].q2}`;
	b3El.textContent = `${questions[questionIndex].q3}`;
	b4El.textContent = `${questions[questionIndex].q4}`;
};

//Validate the users choices
var wrongEl = document.querySelector("#wrong");
quizEl.addEventListener("click", function (event) {
	var element = event.target;
	if (element.matches(".quizB")) {
		var check = element.innerText;
		if (check === questions[questionIndex].answer) {
			secondsLeft = secondsLeft + 5;
			alert("Correct!");
			wrongEl.textContent = " ";
			//Run through the questions
			var qLength = questions.length - 1;
			if (questionIndex < qLength) {
				questionIndex++;
				loadQuestions();
			} else {
				//Ran through all the questions - finish
				alert("All Done!");
				userScore = secondsLeft;
				clearInterval(timeInt);
				timerEl.textContent = " ";
				enterHiSc();
			}
		} else {
			secondsLeft = secondsLeft - 5;
			wrongEl.textContent = "Incorrect -5 seconds";
			if (secondsLeft <= 0) {
				userScore = 0;
				clearInterval(timeInt);
				timerEl.textContent = " ";
				alert("Ran out of time!");
				enterHiSc();
			}
		}
	}
});

//Just to see if I could do it, made the elements in JS for the enter high score part.
var mainEl = document.querySelector('main');
var sectionEl = document.createElement("section");
var h1El = document.createElement("h1");
var h2El = document.createElement("h2");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var buttonEl = document.createElement("button");

function enterHiSc() {
	quizEl.setAttribute("style", "display: none");

	mainEl.appendChild(sectionEl);
	sectionEl.appendChild(h1El);
	sectionEl.appendChild(h2El);
	sectionEl.appendChild(labelEl);
	sectionEl.appendChild(inputEl);
	sectionEl.appendChild(buttonEl);

	sectionEl.setAttribute("class", "sectionEl");
	h1El.setAttribute("class", "h1El");
	h2El.setAttribute("class", "h2El");
	labelEl.setAttribute("class", "labelEl");
	inputEl.setAttribute("class", "inputEl");
	inputEl.setAttribute("placeholder", "...");
	buttonEl.setAttribute("class", "buttonEl");

	h1El.textContent = "Thanks for playing!";
	h2El.textContent = `Your score is ${userScore}.`;
	labelEl.textContent = "Please enter your initials: ";
	buttonEl.textContent = "Post";

	//Save values to array
	buttonEl.addEventListener("click", function (event) {
		event.preventDefault();
		var highScore =JSON.parse(localStorage.getItem("highScores")) || [];

		var highScores = {
			name: inputEl.value.trim(),
			score: userScore
		};

		highScore.push(highScores);

		localStorage.setItem("highScores", JSON.stringify(highScore));
	});
};