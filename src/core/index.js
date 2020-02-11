export const exampleWorkflow = () => {
  // Fake testing data
  const demoWordsArray = [
    "test",
    "words",
    "array",
    "crossword",
    "generation",
    "games",
    "puzzle",
    "comparison",
    "solutions",
    "use"
  ];

  const rows = 20;
  const cols = 20;

  // 1. Sort the words array by length (1st placed will be the longest)
  const sortedArray = demoWordsArray.sort((a, b) => b.length - a.length);

  console.log(sortedArray);
};
