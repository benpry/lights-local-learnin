// the stimuli for th experiment

const trainSamples = [
  {
    A: 0,
    B: 1,
  },
  {
    B: 1,
    C: 0,
  },
  {
    B: 0,
    C: 1,
  },
  {
    C: 1,
    D: 1,
  },
  {
    D: 0,
    E: 0,
  },
  {
    D: 1,
    E: 1,
  },
];

const testQueries = [
  {
    A: 0,
    B: "?",
  },
  {
    B: 0,
    C: "?",
  },
  {
    A: 1,
    D: "?",
  },
];
