import nanoid from "nanoid";

export const getAppropriateStartingPoint = (matrixSize, word) => {
  const startingPoint = parseInt(matrixSize / 2) - parseInt(word.length / 2);

  return { x: startingPoint, y: startingPoint };
};

export const getPlaygroundInstance = matrixSize =>
  [...Array(matrixSize)].map((element, index) => {
    const boxArray = [];

    for (let i = 0; i < matrixSize; i++) {
      const box = { id: nanoid(), row: index, col: i };
      boxArray.push(box);
    }

    return boxArray;
  });

export const isStringLengthValid = (str, xSize) =>
  str.length >= 2 && str.length <= xSize ? true : false;

// [A-Za-z]
export const isLetterCorrect = letter => {
  const charCode = letter.charCodeAt();

  if (charCode >= 65 && charCode <= 90) return true;

  if (charCode >= 97 && charCode <= 122) return true;

  return false;
};
