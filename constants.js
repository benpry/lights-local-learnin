const consentText = `<p class='instructions-text'>By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology.
If you have questions about this research, please contact <strong>Ben Prystawski</strong> at <a href='mailto:benpry@stanford.edu'>benpry@stanford.edu</a> or
Noah Goodman at ngoodman@stanford.edu. You must be at least 18 years old to participate. Your participation in this research is voluntary.
You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences.
Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you.</p>`;

const instructionPages = [
  `<p class='instructions-text'>This is an experiment investigating how people learn and reason.</p>
  <p class='instructions-text'>A series of rumors will spread in a population of five people: Alice, Bob, Charlie, Daniel, and Eve. For each rumor, you will see whether two people know about it or not.</p>
  <p class='instructions-text'>For example, you might see this rumor:</p>
  <img src="assets/example-rumor.png">
  <p class='instructions-text'>Some people talk with each other a lot and other people never talk with each other, so <strong>knowing whether one person knows a rumor tells you about whether other people know it</strong>. Your job is to learn the pattern of who shares information with whom from these rumors.</p>`,
  `<p class='instructions-text'>After observing some rumors, you will be tested on new rumors. You will see whether one person knows a rumor and asked to predict whether another person knows it. Here is an example of being asked to predict whether someone knows a rumor:</p>
  <img src="assets/example-test.png">
  <p class="instructions-text">You should press "y" if you think the person knows the rumor and "n" if you think the person does not know the rumor.</p>
  <p class="instructions-text">Press "next" to begin observing rumors.</p>`,
];

const names = {
  A: "Alice",
  B: "Bob",
  C: "Charlie",
  D: "David",
  E: "Eve",
};

const stimulusSentences = {
  1: "%NAME% knows about this rumor.",
  0: "%NAME% does not know about this rumor.",
  "?": "Does %NAME% know this rumor?",
};

const stimulusTemplate = `
<div class="stimulus">
  <p>There's a rumor going around...</p>
  <div class="stimulus-wrapper">
    <div class="top-left">%TEXT1%</div>
    <div class="top-right">%TEXT2%</div>
    <div class="mid-left">
      <img src="assets/%TRUTH1%.png">
    </div>
    <div class="mid-right">
      <img src="assets/%TRUTH2%.png">
    </div>
    <div class="bottom-left">
      <img src="assets/%NAME1%.png">
    </div>
    <div class="bottom-right">
      <img src="assets/%NAME2%.png">
    </div>
  </div>
</div>
`;
