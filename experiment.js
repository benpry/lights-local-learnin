function compileTimeline() {
  // pre-load stimuli
  const preLoad = {
    type: jsPsychPreload,
    images: [
      "assets/alice.png",
      "assets/bob.png",
      "assets/charlie.png",
      "assets/david.png",
      "assets/eve.png",
      "assets/yes.png",
      "assets/no.png",
      "assets/question-mark.png",
      "assets/example-rumor.png",
      "assets/example-test.png",
    ],
  };

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
  const learningTrials = trainStimuli.map((s) => {
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
      "<p class='instructions-text'>You have finished the observing. Press 'Next' to begin predicting who knows about new rumors.</p>",
    ],
    show_clickable_nav: true,
    allow_previous: false,
  };

  // test phase trials
  const testTrials = testStimuli.map((s) => {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: formatStimulus(s),
      choices: ["n", "y"],
      prompt: `<p>Press "y" for yes, "n" for no.</p>`,
    };
  });
  shuffle(testTrials);

  const postExperimentSurvey = {
    type: jsPsychSurveyText,
    preamble:
      "You have reached the end of the experiment! The experiment will be over after this survey.",
    questions: [
      {
        prompt:
          "Please describe the strategy you used to answer the questions in this experiment.",
        rows: 6,
        columns: 50,
        name: "strategy",
      },
      {
        prompt: "What did you think this experiment was about?",
        rows: 6,
        columns: 50,
        name: "about",
      },
      {
        prompt:
          "Please give any feedback you have about the experiment, including problems encountered.",
        rows: 6,
        columns: 50,
        name: "feedback",
      },
    ],
    name: "strategy",
  };

  return [
    preLoad,
    consent,
    instructions,
    ...learningTrials,
    doneLearningMessage,
    ...testTrials,
    postExperimentSurvey,
  ];
}

const timeline = compileTimeline();

const jsPsych = initJsPsych({
  on_finish: function (data) {
    proliferate.submit({
      trials: data.values(),
      condition: "goofing around",
    });
  },
});

jsPsych.run(timeline);
