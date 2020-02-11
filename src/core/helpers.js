export const getAppropriateStartingPoint = (
  rowNumber,
  colNumber,
  isHorizontal = true,
  word
) => {
  if (rowNumber === colNumber) {
    const nearCenter = parseInt(rowNumber / 2) - parseInt(word.length / 2);

    return [nearCenter, nearCenter];
  }

  if (rowNumber < colNumber && isHorizontal) {
    const horizontalCenter =
      parseInt(colNumber / 2) - parseInt(word.length / 2);
    const verticalCenter = parseInt(row / 2);

    return [horizontalCenter, verticalCenter];
  }

  return [rowNumber / 2 + 1, colNumber / 2 + 1];
};

export const isStringLengthValid = (str, xSize) =>
  str.length >= 2 && str.length <= xSize ? true : false;

// [A-Za-z]
export const isLetterCorrect = letter => {
  const charCode = letter.charCodeAt();

  if (charCode >= 65 && charCode <= 90) return true;

  if (charCode >= 97 && charCode <= 122) return true;

  return false;
};
