import { combineReducers } from "redux";
import { REQUEST_DECKS, RECEIVE_DECKS, RECEIVE_DECK, RECEIVE_CARD } from "../actions";

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
