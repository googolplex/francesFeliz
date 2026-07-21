const series = [
  [
    { phrase: "Je mange ___ pomme rouge.", reponse: "une", choix: ["un", "une", "des"], correction: "« Pomme » est féminin singulier : on dit « une pomme »." },
    { phrase: "Tu écoutes ___ radio le matin.", reponse: "la", choix: ["le", "la", "les"], correction: "« Radio » est féminin singulier : on dit « la radio »." },
    { phrase: "Nous buvons ___ eau fraîche.", reponse: "de l’", choix: ["du", "de la", "de l’"], correction: "Devant une voyelle, on écrit « de l’eau »." },
  ],
  [
    { phrase: "Il achète ___ livre d’histoire.", reponse: "un", choix: ["un", "une", "des"], correction: "« Livre » est masculin singulier : on dit « un livre »." },
    { phrase: "Regarde ___ étoiles !", reponse: "les", choix: ["le", "la", "les"], correction: "« Étoiles » est pluriel : on dit « les étoiles »." },
    { phrase: "Elle prépare ___ soupe.", reponse: "de la", choix: ["du", "de la", "de l’"], correction: "Pour une quantité non comptée avec un nom féminin, on dit « de la soupe »." },
  ],
  [
    { phrase: "J’aime ___ musique classique.", reponse: "la", choix: ["le", "la", "l’"], correction: "« Musique » est féminin singulier : on dit « la musique »." },
    { phrase: "Ils mangent ___ pain.", reponse: "du", choix: ["du", "de la", "des"], correction: "Pour une quantité non comptée avec un nom masculin, on dit « du pain »." },
    { phrase: "Voici ___ ami de Claire.", reponse: "l’", choix: ["le", "la", "l’"], correction: "Devant une voyelle, « le » devient « l’ »." },
  ],
  [
    { phrase: "Nous avons ___ idées intéressantes.", reponse: "des", choix: ["un", "une", "des"], correction: "« Idées » est pluriel : on dit « des idées »." },
    { phrase: "Elle ferme ___ porte.", reponse: "la", choix: ["le", "la", "les"], correction: "« Porte » est féminin singulier : on dit « la porte »." },
    { phrase: "Je voudrais ___ café, s’il te plaît.", reponse: "un", choix: ["un", "une", "des"], correction: "« Café » est masculin singulier : on dit « un café »." },
  ],
];

const phrase = document.querySelector("#sentence");
const choix = document.querySelector("#choices");
const retour = document.querySelector("#feedback");
const boutonSuite = document.querySelector("#next");
const progression = document.querySelector("#progress");
const scoreAffiche = document.querySelector("#score");
const bilan = document.querySelector("#summary");

let numeroSerie = 0;
let numeroQuestion = 0;
let score = 0;
let repondu = false;
let corrections = [];

function questionsActuelles() {
  return series[numeroSerie];
}

function afficherQuestion() {
  const questions = questionsActuelles();
  const question = questions[numeroQuestion];
  repondu = false;
  phrase.textContent = question.phrase;
  retour.textContent = "";
  bilan.innerHTML = "";
  progression.textContent = `Question ${numeroQuestion + 1} sur 3`;
  boutonSuite.disabled = true;
  boutonSuite.textContent = numeroQuestion === 2 ? "Voir la correction" : "Question suivante";
  choix.innerHTML = "";

  question.choix.forEach((option) => {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "choice";
    bouton.textContent = option;
    bouton.addEventListener("click", () => verifierReponse(bouton, option));
    choix.append(bouton);
  });
}

function verifierReponse(bouton, option) {
  if (repondu) return;
  repondu = true;
  const question = questionsActuelles()[numeroQuestion];
  const juste = option === question.reponse;

  if (juste) {
    score += 1;
    scoreAffiche.textContent = score;
    retour.textContent = `Bravo ! ${question.correction}`;
  } else {
    retour.textContent = `Correction : la bonne réponse est « ${question.reponse} ». ${question.correction}`;
  }

  corrections.push({ question: question.phrase, reponse: question.reponse, correction: question.correction, juste });

  [...choix.children].forEach((boutonChoix) => {
    boutonChoix.disabled = true;
    if (boutonChoix.textContent === question.reponse) boutonChoix.classList.add("correct");
  });

  if (!juste) bouton.classList.add("incorrect");
  boutonSuite.disabled = false;
}

function afficherBilan() {
  phrase.textContent = `Résultat : ${score}/3`;
  choix.innerHTML = "";
  progression.textContent = "Série terminée";
  retour.textContent = score === 3
    ? "Excellent ! Continue avec la série suivante."
    : "Relis la correction, puis essaie une nouvelle série.";
  bilan.innerHTML = corrections.map((item, index) => `
    <li class="${item.juste ? "ok" : "nok"}">
      <span>${index + 1}. ${item.question.replace("___", `<strong>${item.reponse}</strong>`)}</span>
      <small>${item.correction}</small>
    </li>
  `).join("");
  boutonSuite.textContent = "Nouvelle série de 3 questions";
  boutonSuite.disabled = false;
}

boutonSuite.addEventListener("click", () => {
  if (numeroQuestion === 2 && repondu) {
    afficherBilan();
    numeroQuestion = 3;
    return;
  }

  if (numeroQuestion >= 3) {
    numeroSerie = (numeroSerie + 1) % series.length;
    numeroQuestion = 0;
    score = 0;
    corrections = [];
    scoreAffiche.textContent = score;
    afficherQuestion();
    return;
  }

  numeroQuestion += 1;
  afficherQuestion();
});

afficherQuestion();
