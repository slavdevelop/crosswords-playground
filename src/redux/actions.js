import nanoid from "nanoid";

export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const GENERATE_CROSSWORD = "GENERATE_CROSSWORD";

export const addWord = text => {
  return {
    type: ADD_WORD,
    word: {
      id: nanoid(),
      text: text
    }
  };
};

export const removeWord = wordText => {
  return {
    type: REMOVE_WORD,
    wordText
  };
};

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const generateCrossword = words => {
  return {
    type: GENERATE_CROSSWORD,
    words
  };
};
