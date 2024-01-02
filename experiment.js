// consent form and instructions
const consent = {
  type: jsPsychInstructions,
  pages: [consentText],
  show_clickable_nav: true,
};

const instructions = {
  type: jsPsychInstructions,
  pages: instructionPages,
  show_clickable_nav: true,
};

// learning phase trials
const learningTrials = trainSamples.map((s) => {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: formatStimulus(s),
    choices: [" "],
    prompt: "<p>Press space to continue.</p>",
  };
});
shuffle(learningTrials);

const doneLearningMessage = {
  type: jsPsychInstructions,
  pages: [
    "<p class='instructions-text'>You have finished the learning phase. Press 'Next' to begin the test phase.</p>",
  ],
  show_clickable_nav: true,
  allow_previous: false,
};

// test phase trials
const testTrials = testQueries.map((s) => {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: formatStimulus(s),
    choices: ["0", "1"],
  };
});
shuffle(testTrials);

const timeline = [
  consent,
  instructions,
  ...learningTrials,
  doneLearningMessage,
  ...testTrials,
];

const jsPsych = initJsPsych({
  on_finish: function (data) {
    proliferate.submit({
      trials: data.values(),
      condition: "goofing around",
    });
  },
});

jsPsych.run(timeline);
