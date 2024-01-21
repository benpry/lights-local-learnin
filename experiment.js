const conditionNames = {
  0: "unspeeded",
  1: "speeded",
  2: "verbal-protocol",
  3: "test",
};
const trialDuration = 10000;
let included = false;

function compileTimeline(condition) {
  // pre-load stimuli
  const preLoad = {
    type: jsPsychPreload,
    images: [
      "assets/red-off.svg",
      "assets/red-on.svg",
      "assets/red-question-mark.svg",
      "assets/green-off.svg",
      "assets/green-on.svg",
      "assets/green-question-mark.svg",
      "assets/purple-off.svg",
      "assets/purple-on.svg",
      "assets/purple-question-mark.svg",
      "assets/blue-off.svg",
      "assets/blue-on.svg",
      "assets/blue-question-mark.svg",
      "assets/yellow-off.svg",
      "assets/yellow-on.svg",
      "assets/yellow-question-mark.svg",
      "assets/inhibiting-example.png",
      "assets/supporting-example.png",
      "assets/example-query.png",
    ],
  };

  // consent form and instructions
  const consent = {
    type: jsPsychInstructions,
    pages: [consentText],
    show_clickable_nav: true,
    button_label_next: "I agree",
  };

  const browserCheck = {
    type: jsPsychBrowserCheck,
    inclusion_function: (browser) => {
      if (browser["browser"] == "chrome") {
        included = true;
      }
      return included;
    },
    exclusion_message: () =>
      `<p>This study only supports Google Chrome. You must use Chrome to complete the experiment.</p>`,
  };

  const instructions = {
    type: jsPsychInstructions,
    pages: getInstructionPages(condition),
    show_clickable_nav: true,
  };

  const setupStages = [preLoad, consent, browserCheck, instructions];

  if (condition == "verbal-protocol") {
    const initMic = {
      type: jsPsychInitializeMicrophone,
    };
    setupStages.push(initMic);
  }

  const learningTrials = [
    // make a prediction
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        return formatStimulus(
          jsPsych.timelineVariable("observedVar"),
          jsPsych.timelineVariable("observedVal"),
          jsPsych.timelineVariable("targetVar"),
          "?",
        );
      },
      choices: ["0", "1"],
      data: function () {
        return { correctAnswer: jsPsych.timelineVariable("correctAnswer") };
      },
      prompt: "<p>Press 0 for off, 1 for on.</p>",
    },
    // get feedback
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        const lastTrial = jsPsych.data.get().last(1).values()[0];
        const lastTrialCorrect =
          parseInt(lastTrial["response"]) == lastTrial["correctAnswer"];
        return formatStimulus(
          jsPsych.timelineVariable("observedVar"),
          jsPsych.timelineVariable("observedVal"),
          jsPsych.timelineVariable("targetVar"),
          jsPsych.timelineVariable("correctAnswer"),
          lastTrialCorrect,
        );
      },
      choices: "ALL_KEYS",
      prompt: "<p>Press any key to continue.</p>",
    },
  ];

  const learningTimelineVariables = trainStimuli.map((s) => {
    const observedVar = Object.keys(s)[0];
    const targetVar = Object.keys(s)[1];
    return {
      observedVar: observedVar,
      observedVal: s[observedVar],
      targetVar: targetVar,
      correctAnswer: s[targetVar],
    };
  });

  const learningLoop = {
    timeline: learningTrials,
    timeline_variables: learningTimelineVariables,
    randomize_order: true,
    loop_function: function (data) {
      // continue if fewer than 2 errors were made.
      const learningTrials = data
        .values()
        .filter((x) => Object.hasOwn(x, "correctAnswer"));
      // loop again if the participant made more than one error
      return (
        learningTrials.filter(
          (x) => parseInt(x["response"]) != x["correctAnswer"],
        ).length > 1 && condition != "test"
      );
    },
  };

  const doneLearningMessage = {
    type: jsPsychInstructions,
    pages: getDoneLearningPages(condition),
    show_clickable_nav: true,
    allow_previous: false,
  };

  // test phase trials
  const testTrials = testStimuli.map((s) => {
    const observedVar = Object.keys(s)[0];
    const targetVar = Object.keys(s)[1];
    return {
      type:
        condition == "verbal-protocol"
          ? jsPsychHtmlKeyboardResponseAudioRecording
          : jsPsychHtmlKeyboardResponse,
      stimulus: formatStimulus(observedVar, s[observedVar], targetVar, "?"),
      choices: ["0", "1"],
      prompt:
        condition == "verbal-protocol"
          ? ` <p>Press 0 for off, 1 for on. Please describe your thinking aloud.</p>`
          : `<p>Press 0 for off, 1 for on.</p>`,
      on_load: condition == "speeded" ? startTimer : null,
      trial_duration: condition == "speeded" ? trialDuration : null,
    };
  });

  const colorblindScreening = {
    type: jsPsychSurveyMultiChoice,
    preamble:
      "<p>Please let us know if you are colorblind. Your response will not affect your compensation for this experiment.</p>",
    questions: [
      {
        prompt: "Are you colorblind?",
        options: ["Yes", "No"],
        name: "colorblind",
        required: true,
      },
    ],
    name: "colorblind-screening",
  };

  const postExperimentSurvey = {
    type: jsPsychSurveyText,
    preamble:
      "<p>You have reached the end of the experiment!</p><p>You will be redirected to Prolific after this survey. Please do not navigate away from this page.</p>",
    questions: [
      {
        prompt:
          "Please describe the strategy you used to answer the questions in this experiment.",
        rows: 6,
        columns: 50,
        name: "strategy",
      },
      {
        prompt: "Were any of the instructions unclear?",
        rows: 6,
        columns: 50,
        name: "instructions",
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

  shuffle(testTrials);

  return [
    ...setupStages,
    learningLoop,
    doneLearningMessage,
    ...testTrials,
    colorblindScreening,
    postExperimentSurvey,
  ];
}

// get the condition from the URL
const jsPsych = initJsPsych({
  on_finish: function (data) {
    if (included) {
      proliferate.submit({
        trials: data.values(),
      });
    }
  },
});

const conditionInt = jsPsych.data.getURLVariable("condition");
const condition = conditionNames[conditionInt];

const timeline = compileTimeline(condition);

jsPsych.run(timeline);
