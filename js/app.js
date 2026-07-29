import { saveCards, loadCards } from "./storage.js";

import { updateCardProgress, getDueCards } from "./scheduler.js";

console.log("CodeCards V3 Lernqueue gestartet");

let cards = [];

let learningQueue = [];

let currentCard = null;

const category = document.getElementById("category");

const question = document.getElementById("question");

const answer = document.getElementById("answer");

const showAnswer = document.getElementById("showAnswer");

const rating = document.getElementById("rating");

async function loadCardData() {
  const savedCards = loadCards();

  if (savedCards) {
    cards = savedCards;
  } else {
    const response = await fetch("data/cards.json");

    cards = await response.json();

    saveCards(cards);
  }

  learningQueue = getDueCards(cards);

  shuffleQueue();

  showNextCard();
}

function shuffleQueue() {
  learningQueue.sort(() => Math.random() - 0.5);
}

function showNextCard() {
  if (learningQueue.length === 0) {
    question.textContent = "🎉 Keine Karten fällig!";

    answer.style.display = "none";

    rating.style.display = "none";

    showAnswer.style.display = "none";

    return;
  }

  currentCard = learningQueue.shift();

  category.textContent = currentCard.category;

  question.textContent = currentCard.question;

  answer.textContent = currentCard.answer;

  answer.style.display = "none";

  rating.style.display = "none";

  showAnswer.style.display = "inline-block";
}

showAnswer.addEventListener("click", () => {
  answer.style.display = "block";

  rating.style.display = "block";

  showAnswer.style.display = "none";
});

document.querySelectorAll("#rating button").forEach((button) => {
  button.addEventListener("click", () => {
    const result = button.dataset.rating;

    rateCurrentCard(result);

    showNextCard();
  });
});

function rateCurrentCard(result) {
  updateCardProgress(currentCard, result);

  saveCards(cards);

  // Falsche Karten kommen zurück
  if (result === "wrong") {
    learningQueue.push(currentCard);
  }
}

loadCardData();
