const consentText = `<p class="consent-text" style="text-align: center"><strong>CONSENT</strong></p>

<p class="consent-text"><strong>DESCRIPTION:</strong> You are invited to participate in a research study on human reasoning. We will ask you to answer a series of questions in order to learn how people reason. You will be asked to think about problems and answer by pressing buttons or writing text. Participation in this research is voluntary, and you are free to withdraw your consent at any time.</p>

<p class="consent-text"><strong>TIME INVOLVEMENT:</strong> Your participation will take approximately 10 minutes.</p>

<p class="consent-text"><strong>PAYMENTS:</strong> You will receive $1.70 as payment for your participation, as well as a bonus of up to $0.40 depending on your performance.</p>

<p class="consent-text"><strong>PRIVACY AND CONFIDENTIALITY:</strong> The risks associated with this study are minimal. Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confidentiality breach. Your individual privacy will be maintained during the research and in all published and written data resulting from the study.</p>

<p class="consent-text"><strong>CONTACT INFORMATION:</strong></p>
<p class="consent-text"><emph>Questions:</emph> If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact <strong>Ben Prystawski</strong> (<a href="mailto://benpry@stanford.edu">benpry@stanford.edu</a>) or the Protocol Director, Noah Goodman (ngoodman@stanford.edu).</p>

<p class="consent-text"><strong>Independent Contact:</strong> If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at 650-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306.</p>

<p class="consent-text">Please save or print a copy of this page for your records.</p>

<p class="consent-text">If you agree to participate in this research, please click "I agree" below.</p>`;

const getInstructionPages = (condition) => {
  const instructionPages = [
    `<p class='instructions-text'>This is an experiment investigating how people learn and reason. In the experiment there is a population of five people: Alice, Bob, Charlie, Daniel, and Eve. Many rumors spread among these people.</p>
    <p class='instructions-text'>Some people talk with each other a lot and other people never talk with each other, so <strong>knowing whether one person knows about a rumor tells you about who else knows about it</strong>. Your job is to learn the pattern of who shares information with whom from these rumors.</p>
    <p class='instructions-text'>For each rumor, you will see a pair of people and whether they know about the rumor or not. Here is an example of observing a rumor:</p>
    <img src="assets/example-rumor.png" style="width: 500px">`,
    `<p class='instructions-text'>After observing some rumors, you will be tested on new rumors. You will see whether one person knows about a rumor and be asked to predict whether another person knows about it. Here is an example of being asked to predict whether someone knows about a rumor:</p>
    <img src="assets/example-test.png" style="width: 500px">
    <p class="instructions-text">You should press "y" if you think the person with the question mark over their head knows the rumor and "n" if you think they do not.</p>`,
  ];

  if (condition == "speeded") {
    instructionPages[1] = instructionPages[1].concat(
      "<p class='instructions-text'>You will only have <strong>3 seconds</strong> to answer to each question, so you should make sure to answer quickly.</p>",
    );
  }
  instructionPages[1] = instructionPages[1]
    .concat(`<p class="instructions-text">You will earn a bonus of <strong>1 cent for every correct answer</strong>.</p>
<p class="instructions-text">Press "Next" to begin observing rumors.</p>`);

  return instructionPages;
};

const doneLearningPages = [
  "<p class='instructions-text'>You have finished observing rumors. Press 'Next' to begin predicting who knows about new rumors.</p>",
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
  "?": "Does %NAME% know about this rumor?",
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
