// The Fisher-Yates shuffle implementation that everyone has to copy-paste from
// StackOverflow because JavaScript doesn't have a built-in shuffle function.
// Code from here: https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// range function, from here: https://stackoverflow.com/a/10050831
function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function formatStimulus(s) {
  let stimulusString = "<p>There's a rumor going around...</p>";
  for (const [key, value] of Object.entries(s)) {
    stimulusString += `<p>${stimulusSentences[value].replace(
      "%NAME%",
      names[key],
    )}</p>`;
  }
  return stimulusString;
}
