const consentText = `<p class='instructions-text'>By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology.
If you have questions about this research, please contact <strong>Ben Prystawski</strong> at <a href='mailto:benpry@stanford.edu'>benpry@stanford.edu</a> or
Noah Goodman at ngoodman@stanford.edu. You must be at least 18 years old to participate. Your participation in this research is voluntary.
You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences.
Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.</p>`;

const instructionPages = [
  `<p class='instructions-text'>This is an experiment investigating how people learn and reason.</p>
     <p class='instructions-text'>You will see a bunch of samples from a joint distribution, then we'll ask you to predict conditional probabilities.</p>
     <p class='instructions-text'>TODO: write good instructions here.</p>`,
];

const names = {
  A: "Alice",
  B: "Bob",
  C: "Charlie",
  D: "David",
  E: "Eve",
};

const stimulusSentences = {
  1: "%NAME% knows about this rumor",
  0: "%NAME% does not know about this rumor",
  "?": "Does %NAME% know about this rumor?",
};
