const STAT_KEY = "codecards_statistics";

export function loadStatistics() {
  const saved = localStorage.getItem(STAT_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    correct: 0,

    wrong: 0,

    learned: 0,
  };
}

export function saveStatistics(stats) {
  localStorage.setItem(STAT_KEY, JSON.stringify(stats));
}

export function addResult(result) {
  const stats = loadStatistics();

  if (result === "wrong") {
    stats.wrong++;
  } else {
    stats.correct++;
  }

  stats.learned++;

  saveStatistics(stats);

  return stats;
}
