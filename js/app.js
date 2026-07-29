import { saveCards, loadCards } from "./storage.js";

console.log("CodeCards V3 Lernmodus gestartet");

let cards = [];

let currentCardIndex = 0;

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

  shuffleCards();

  showCard();
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

function showCard() {
  const card = cards[currentCardIndex];

  category.textContent = card.category;

  question.textContent = card.question;

  answer.textContent = card.answer;

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

    updateCard(result);

    nextCard();
  });
});

function updateCard(result) {
  const card = cards[currentCardIndex];

  if (result === "wrong") {
    card.wrong++;

    card.level = 0;
  }

  if (result === "hard") {
    card.wrong++;
  }

  if (result === "good") {
    card.correct++;

    card.level++;
  }

  if (result === "easy") {
    card.correct += 2;

    card.level += 2;
  }

  saveCards(cards);
}

function nextCard() {
  currentCardIndex++;

  if (currentCardIndex >= cards.length) {
    currentCardIndex = 0;
  }

  showCard();
}

loadCardData();
