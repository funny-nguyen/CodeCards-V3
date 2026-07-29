export function updateCardProgress(card, rating) {
  const day = 24 * 60 * 60 * 1000;

  switch (rating) {
    case "wrong":
      card.wrong++;

      card.level = 0;

      // sofort wieder lernen
      card.nextReview = Date.now();

      break;

    case "hard":
      card.correct++;

      card.nextReview = Date.now() + day;

      break;

    case "good":
      card.correct++;

      card.level++;

      if (card.level === 1) {
        card.nextReview = Date.now() + 2 * day;
      } else if (card.level === 2) {
        card.nextReview = Date.now() + 5 * day;
      } else {
        card.nextReview = Date.now() + 14 * day;
      }

      break;

    case "easy":
      card.correct++;

      card.level += 2;

      card.nextReview = Date.now() + 30 * day;

      break;
  }

  return card;
}

export function getDueCards(cards) {
  const now = Date.now();

  return cards.filter((card) => {
    return !card.nextReview || card.nextReview <= now;
  });
}
