import { getAppropriateStartingPoint } from "./helpers";

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

  // 2. Get a starting point coordinates with my not so useful (for now!) helper function
  const startingPoint = getAppropriateStartingPoint(
    rows,
    cols,
    true,
    demoWordsArray[0]
  );
  // Returned => [5,5] coordinates

  // 3. Try to place the first word

  console.log(sortedArray);
  console.log(startingPoint);
};
