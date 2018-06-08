import { combineReducers } from "redux";
import { REQUEST_DECKS, RECEIVE_DECKS, RECEIVE_DECK, RECEIVE_CARD } from "../actions";

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
const decks = (state = {}, action) => {
    const { title } = action
    switch (action.type) {
        case RECEIVE_DECK:
            const { deck } = action
            return {
              ...state,
              [deck.title]: deck
            }
        case RECEIVE_DECKS:
            return {
              ...state,
              ...action.decks
            }
        case RECEIVE_CARD:
            const { card } = action
            return {
              ...state,
              [title]: {
                ...state[title],
                questions: state[title].questions.concat(card)
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
