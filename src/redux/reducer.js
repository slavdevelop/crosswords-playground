import {
  ADD_WORD,
  REMOVE_WORD,
  UPDATE_FILTER,
  GENERATE_CROSSWORD
} from "./actions";

export const VisualInfoOptions = {
  SHOW_ALL: "All",
  SHOW_MAIN: "Main",
  SHOW_DETAILS: "Details"
};

const INITIAL_STATE = {
  words: [],
  filter: VisualInfoOptions.SHOW_ALL,
  enrichedWords: []
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_WORD:
      return {
        ...state,
        words: [...state.words, action.word]
      };
    case REMOVE_WORD:
      return {
        ...state,
        words: [...state.words.filter(w => w.text != action.wordText)]
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: VisualInfoOptions[action.filter]
      };
    case GENERATE_CROSSWORD:
      return {
        ...state,
        enrichedWords: action.words
      };
    default:
      return state;
  }
};
