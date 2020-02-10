export const getAppropriateStartingPoint = (matrixSize, word) => {
  const startingPoint = parseInt(matrixSize / 2) - parseInt(word.length / 2);

  return { x: startingPoint, y: startingPoint };
};

export const getPlaygroundInstance = matrixSize =>
  [...Array(matrixSize)].map(() => Array(matrixSize).fill());

export const isStringLengthValid = (str, xSize) =>
  str.length >= 2 && str.length <= xSize ? true : false;

// [A-Za-z]
export const isLetterCorrect = letter => {
  const charCode = letter.charCodeAt();

  if (charCode >= 65 && charCode <= 90) return true;

  if (charCode >= 97 && charCode <= 122) return true;

  return false;
};
