const questions = [
  { sentence: "Je mange ___ pomme.", answer: "une", choices: ["un", "une", "des"], note: "« Pomme » est féminin singulier." },
  { sentence: "Il lit ___ journal.", answer: "le", choices: ["la", "le", "les"], note: "« Journal » est masculin singulier." },
  { sentence: "Nous achetons ___ fleurs.", answer: "des", choices: ["un", "une", "des"], note: "« Fleurs » est pluriel." },
  { sentence: "Tu bois ___ eau.", answer: "de l’", choices: ["du", "de la", "de l’"], note: "On utilise « de l’ » devant une voyelle." },
  { sentence: "Elle prépare ___ soupe.", answer: "de la", choices: ["du", "de la", "des"], note: "« Soupe » est féminin et la quantité n’est pas comptée." },
  { sentence: "J’aime ___ musique française.", answer: "la", choices: ["le", "la", "l’"], note: "« Musique » est féminin singulier." },
  { sentence: "Voici ___ ami de Paul.", answer: "l’", choices: ["le", "la", "l’"], note: "On utilise « l’ » devant une voyelle." },
  { sentence: "Ils veulent ___ pain.", answer: "du", choices: ["du", "de la", "de l’"], note: "« Pain » est masculin et la quantité n’est pas comptée." },
  { sentence: "C’est ___ maison bleue.", answer: "une", choices: ["un", "une", "des"], note: "« Maison » est féminin singulier." },
  { sentence: "Regarde ___ enfants !", answer: "les", choices: ["le", "la", "les"], note: "« Enfants » est pluriel." },
];

const sentence = document.querySelector("#sentence");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next");
const progress = document.querySelector("#progress");
const scoreDisplay = document.querySelector("#score");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[currentQuestion];
  answered = false;
  sentence.textContent = question.sentence;
  feedback.textContent = "";
  progress.textContent = `Question ${currentQuestion + 1} sur ${questions.length}`;
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Voir le résultat" : "Question suivante";
  choices.innerHTML = "";

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(button, choice));
    choices.append(button);
  });
}

function checkAnswer(button, choice) {
  if (answered) return;
  answered = true;
  const question = questions[currentQuestion];
  const isCorrect = choice === question.answer;

  if (isCorrect) {
    score += 1;
    scoreDisplay.textContent = score;
    feedback.textContent = `Bravo ! ${question.note}`;
  } else {
    feedback.textContent = `Presque ! La bonne réponse est « ${question.answer} ». ${question.note}`;
  }

  [...choices.children].forEach((choiceButton) => {
    choiceButton.disabled = true;
    if (choiceButton.textContent === question.answer) choiceButton.classList.add("correct");
  });

  if (!isCorrect) button.classList.add("incorrect");
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  currentQuestion += 1;

  if (currentQuestion >= questions.length) {
    sentence.textContent = `Résultat : ${score}/${questions.length}`;
    choices.innerHTML = "";
    feedback.textContent = score === questions.length
      ? "Parfait ! Tu maîtrises très bien les articles."
      : "Recommence pour améliorer ton score.";
    progress.textContent = "Exercice terminé";
    nextButton.textContent = "Recommencer";
    nextButton.disabled = false;
    currentQuestion = -1;
    score = 0;
    return;
  }

  if (currentQuestion === 0) scoreDisplay.textContent = score;
  renderQuestion();
});

renderQuestion();
