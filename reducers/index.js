import { combineReducers } from "redux";
import { ADD_DECK, REQUEST_DECKS, ADD_CARD } from "../actions";

const DEFAULTDECKS = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
}
const decks = (state = DEFAULTDECKS, action) => {
    switch (action.type) {
        case ADD_DECK:
            const { deck } = action
            return {
                ...state,
                [deck.title]: deck
            }
            break;
        case REQUEST_DECKS:
            return state
        case ADD_CARD:
            const { title, card } = action
            console.log(title, card);
            return {
              ...state,
              [title]: {
                ...state[title],
                questions: state[title].questions.concat([card])
              }
            }
        default:
            break;
    }
  return state
};

export default combineReducers({
  decks
});
